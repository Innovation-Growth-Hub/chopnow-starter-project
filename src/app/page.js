"use client";

import React, { useState, useEffect } from "react";
import FoodCard from "@/components/FoodCard";
import OrderTray from "@/components/OrderTray";

const CATEGORIES = ["All", "Rice Dishes", "Swallow & Soups", "Local Delicacies", "Sides & Grills", "Drinks"];

export default function HomePage() {
  // TODO 1: Create state for `meals` (array), `selectedCategory` (string, default "All"),
  // `searchQuery` (string, default ""), and `trayItems` (array, default [])
  const [meals, setMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [trayItems, setTrayItems] = useState([]);

  // TODO 2: Fetch data from '/menu.json' inside useEffect and save it to `meals` state
  useEffect(() => {
    // Write your fetch('/menu.json') logic here
  }, []);

  // TODO 3: Write a function `handleAddToOrder(meal)` that adds a meal to `trayItems`
  // Hint: If the meal is already in `trayItems`, increase its `quantity` by 1.
  // Otherwise, add it to the array with `quantity: 1`.

  // TODO 4: Filter `meals` based on `selectedCategory` AND `searchQuery`
  const filteredMeals = meals; // Replace this with your .filter() logic

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
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
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

        {/* 2-Column Grid: Menu List (Left) & Order Tray (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Menu Cards Grid (Takes 2 columns on desktop) */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* 
              TODO 5: Map through `filteredMeals` and render a <FoodCard /> for each item.
              Right now, we render one sample card so you can see how it looks!
            */}
            <FoodCard meal={{}} />
          </div>

          {/* Order Summary Sidebar (Takes 1 column on desktop) */}
          <div className="lg:col-span-1">
            <OrderTray trayItems={trayItems} />
          </div>
        </div>
      </main>
    </div>
  );
}