"use client";

import React, { useState, useEffect } from "react";
import FoodCard from "@/components/FoodCard";
import OrderTray from "@/components/OrderTray";

const CATEGORIES = ["All", "Rice Dishes", "Swallow & Soups", "Local Delicacies", "Sides & Grills", "Drinks"];

const TRAY_STORAGE_KEY = "chopnow-tray";

export default function HomePage() {
  const [meals, setMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [trayItems, setTrayItems] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [isTrayReady, setIsTrayReady] = useState(false);

  // Level 1: fetch the menu once when the page mounts.
  useEffect(() => {
    let ignore = false;

    async function loadMeals() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch("/menu.json");
        if (!response.ok) {
          throw new Error(`Could not load the menu (status ${response.status}).`);
        }

        const data = await response.json();
        if (!ignore) {
          setMeals(data);
        }
      } catch (fetchError) {
        if (!ignore) {
          setError(fetchError.message || "Something went wrong while loading the menu.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadMeals();

    return () => {
      ignore = true;
    };
  }, [loadAttempt]);

  // Optional: restore the tray from localStorage (client only, after mount).
  useEffect(() => {
    try {
      const savedTray = window.localStorage.getItem(TRAY_STORAGE_KEY);
      if (savedTray) {
        const parsedTray = JSON.parse(savedTray);
        if (Array.isArray(parsedTray)) {
          // Intentional: localStorage only exists on the client, so the saved
          // tray is restored after mount to keep the server HTML stable.
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setTrayItems(parsedTray);
        }
      }
    } catch (storageError) {
      console.error("Could not restore the order tray:", storageError);
    } finally {
      setIsTrayReady(true);
    }
  }, []);

  // Optional: save the tray whenever it changes (after the initial restore).
  useEffect(() => {
    if (!isTrayReady) return;

    try {
      window.localStorage.setItem(TRAY_STORAGE_KEY, JSON.stringify(trayItems));
    } catch (storageError) {
      console.error("Could not save the order tray:", storageError);
    }
  }, [trayItems, isTrayReady]);

  // Level 3: add a meal to the tray, or bump its quantity if it is already there.
  function handleAddToOrder(meal) {
    if (!meal.isAvailable) return;

    setTrayItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === meal.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...currentItems, { ...meal, quantity: 1 }];
    });
  }

  // Level 3: plus/minus controls. A quantity of 0 removes the meal entirely.
  function handleUpdateQuantity(mealId, change) {
    setTrayItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === mealId ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function handleRemoveItem(mealId) {
    setTrayItems((currentItems) => currentItems.filter((item) => item.id !== mealId));
  }

  function handleClearTray() {
    setTrayItems([]);
  }

  function handleRetry() {
    setLoadAttempt((attempt) => attempt + 1);
  }

  // Level 2: category + live search, then optional sorting.
  const normalizedSearch = searchQuery.trim().toLowerCase();

  const filteredMeals = meals
    .filter((meal) => {
      const matchesCategory =
        selectedCategory === "All" || meal.category === selectedCategory;

      const matchesSearch =
        normalizedSearch === "" ||
        meal.name.toLowerCase().includes(normalizedSearch) ||
        meal.description.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    })
    .sort((firstMeal, secondMeal) => {
      if (sortOption === "price-asc") return firstMeal.price - secondMeal.price;
      if (sortOption === "price-desc") return secondMeal.price - firstMeal.price;
      if (sortOption === "prep-asc") return firstMeal.prepTimeMins - secondMeal.prepTimeMins;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header / Navbar */}
      <header className="bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-orange-600 tracking-tight">
              ChopNow
            </h1>
          </div>

          {/* Search Input */}
          <div className="w-full sm:w-80">
            <input
              type="text"
              placeholder="Search jollof, abacha, zobo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search meals"
              className="w-full px-4 py-2 text-sm bg-gray-100 border border-transparent rounded-xl focus:bg-white focus:border-orange-500 focus:outline-none transition"
            />
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter Pills + Sort Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === category
                    ? "bg-orange-600 text-white"
                    : "bg-white text-gray-600 hover:border-orange-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="whitespace-nowrap">Sort by</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl text-slate-700 focus:border-orange-500 focus:outline-none cursor-pointer"
            >
              <option value="default">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="prep-asc">Fastest Prep Time</option>
            </select>
          </label>
        </div>

        {!isLoading && !error && (
          <p className="text-xs text-slate-500 mb-5">
            Showing {filteredMeals.length} of {meals.length} meals
          </p>
        )}

        {/* 2-Column Grid: Menu List (Left) & Order Tray (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Menu Cards Grid (Takes 2 columns on desktop) */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {isLoading && (
              <div className="col-span-full text-center py-16 text-slate-400">
                <p className="text-sm font-medium">Loading the menu...</p>
                <p className="text-xs mt-1">Fresh meals are on the way.</p>
              </div>
            )}

            {!isLoading && error && (
              <div className="col-span-full text-center py-16">
                <p className="text-sm font-semibold text-red-600">{error}</p>
                <button
                  type="button"
                  onClick={handleRetry}
                  className="mt-4 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition cursor-pointer"
                >
                  Try Again
                </button>
              </div>
            )}

            {!isLoading && !error && filteredMeals.length === 0 && (
              <div className="col-span-full text-center py-16 text-slate-400">
                <p className="text-sm font-medium">
                  No meals found matching your search. Try ordering Abacha instead!
                </p>
              </div>
            )}

            {!isLoading &&
              !error &&
              filteredMeals.map((meal) => (
                <FoodCard key={meal.id} meal={meal} onAddToTray={handleAddToOrder} />
              ))}
          </div>

          {/* Order Summary Sidebar (Takes 1 column on desktop) */}
          <div className="lg:col-span-1">
            <OrderTray
              trayItems={trayItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearTray={handleClearTray}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
