"use client";

import React, { useState, useEffect } from "react";
import FoodCard from "@/components/FoodCard";
import OrderTray from "@/components/OrderTray";

const CATEGORIES = ["All", "Rice Dishes", "Swallow & Soups", "Local Delicacies", "Sides & Grills", "Drinks"];

const SORT_OPTIONS = [
  { value: "default", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "prep-asc", label: "Fastest Prep Time" },
];

const TRAY_STORAGE_KEY = "chopnow-tray";

export default function HomePage() {
  const [meals, setMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [trayItems, setTrayItems] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [trayLoaded, setTrayLoaded] = useState(false);

  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => setMeals(data));
  }, []);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- one-time hydration of the persisted tray on mount */
    try {
      const savedTray = localStorage.getItem(TRAY_STORAGE_KEY);
      if (savedTray) {
        setTrayItems(JSON.parse(savedTray));
      }
    } catch (error) {
      console.error("Failed to load tray from localStorage:", error);
    }
    setTrayLoaded(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (trayLoaded) {
      localStorage.setItem(TRAY_STORAGE_KEY, JSON.stringify(trayItems));
    }
  }, [trayItems, trayLoaded]);

  function handleAddToOrder(meal) {
    setTrayItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === meal.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === meal.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...meal, quantity: 1 }];
    });
  }

  function handleUpdateQuantity(id, delta) {
    setTrayItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function handleRemoveItem(id) {
    setTrayItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function handleClearTray() {
    setTrayItems([]);
  }

  const filteredMeals = meals.filter((meal) => {
    const matchesCategory =
      selectedCategory === "All" || meal.category === selectedCategory;
    const matchesSearch =
      meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const visibleMeals = [...filteredMeals].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "prep-asc") return a.prepTimeMins - b.prepTimeMins;
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
              className="w-full px-4 py-2 text-sm bg-gray-100 border border-transparent rounded-xl focus:bg-white focus:border-orange-500 focus:outline-none transition"
            />
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter Pills & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto">
            {CATEGORIES.map((category) => (
              <button
                key={category}
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

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-white text-gray-700 border border-gray-200 focus:border-orange-500 focus:outline-none transition cursor-pointer"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* 2-Column Grid: Menu List (Left) & Order Tray (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Menu Cards Grid (Takes 2 columns on desktop) */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {visibleMeals.length > 0 ? (
              visibleMeals.map((meal) => (
                <FoodCard
                  key={meal.id}
                  meal={meal}
                  onAddToTray={handleAddToOrder}
                />
              ))
            ) : (
              <div className="sm:col-span-2 text-center py-16">
                <p className="text-lg font-semibold text-gray-700">
                  No meals found matching your search.
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Try ordering Abacha instead!
                </p>
              </div>
            )}
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
