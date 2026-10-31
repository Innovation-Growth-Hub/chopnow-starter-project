# ChopNow: React Capstone Challenge

Welcome, Dev!

Over the past few weeks in the hub, you’ve survived **HTML**, wrestled with **CSS & Tailwind**, conquered **JavaScript** (variables, data types, operators, arrays, objects, functions), and stepped into the world of **React**. 

Originally, this project was supposed to be a full-stack application with a database, authentication, and server-side APIs... **but I decided to have mercy on you.** 

Instead of building a backend from scratch, your "database" is already waiting for you inside `public/menu.json`. Your mission is to turn this starter template into a fully functional, interactive local food ordering app called **ChopNow**.



## What We Are Testing
Don't just copy and paste code you don't understand! This project is designed to test how well you can combine:
1. **React State & Effects (`useState`, `useEffect`)**: Fetching data and tracking user interactions.
2. **Props & Components**: Passing data and functions between `page.js`, `<FoodCard />`, and `<OrderTray />`.
3. **JavaScript Arrays & Objects**: Using `.map()`, `.filter()`, `.find()`, and `.reduce()` like a pro.
4. **JS Operators & Conditionals**: Calculating bills, checking discounts (`>=`), and disabling buttons when smoky jollof finishes (`isAvailable === false`).



## To Get Started, Do This First!

### 1. Fork & Clone
Do **NOT** clone this main repository directly you won't be able to push your code!
1. Click the **Fork** button at the top-right of this GitHub page to create your own copy.
2. Clone **your forked repository** to your computer:
   ```bash
   git clone https://github.com/YOUR-GITHUB-USERNAME/chopnow-starter.git
   ```
3. Enter the project folder and install the dependencies:
   ```bash
   cd chopnow-starter
   npm install
   ```
4. Fire up the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the ChopNow header, one lonely placeholder food card, and an empty Order Tray.


## Your Mission: Check the boxes as you complete them!

Open your code editor and look for the `// TODO:` comments inside `src/app/page.js`, `src/components/FoodCard.jsx`, and `src/components/OrderTray.jsx`.

### Level 1: Fetching & Rendering Data

Right now, the menu is showing dummy text. Let's fix that.
- [ ] **Fetch the Menu:** Inside `src/app/page.js`, use `useEffect` and `fetch('/menu.json')` to load the 12 local meals and store them in the `meals` state array.
- [ ] **Render the Grid:** Replace the single `<FoodCard />` in `page.js` by mapping over your meals array so all 12 dishes appear on screen. *(Don't forget the `key` prop!)*
- [ ] **Wire up `<FoodCard />` Props:** Inside `src/components/FoodCard.jsx`, replace all the hardcoded text with real data from the `meal` object (`name`, `category`, `price`, `prepTimeMins`, `rating`, `image`, `description`).
- [ ] **Render the Tags:** Map through `meal.tags` inside `<FoodCard />` and render each tag as a neat little badge.
- [ ] **Conditional Badges & Sold Out State:**
  - If `meal.isSpicy` is `true`, display a `Spicy` badge on the image.
  - If `meal.isAvailable` is `false` (like the Native Coconut Rice), disable the button, change the button text to **"Sold Out"**, and style it gray so nobody tries to order food that has finished!

<details>
<summary><b>Stuck on Level 1? Click here for a hint!</b></summary>
<br>
Because <code>menu.json</code> is inside the <code>public/</code> folder, you can fetch it just like a real API:

```javascript
useEffect(() => {
  fetch("/menu.json")
    .then((res) => res.json())
    .then((data) => setMeals(data));
}, []);
```
Also, to format the price nicely with commas (e.g., <code>₦4,500</code>), try using JavaScript's built-in <code>meal.price.toLocaleString()</code>!
</details>



### Level 2: Help Hungry People Find Food (Filtering & Search)

Nobody wants to scroll forever when they are hungry.
- [ ] **Category Filter:** Make the category buttons (`All`, `Rice Dishes`, `Swallow & Soups`, etc.) actually filter the displayed meals. When `"All"` is selected, show everything.
- [ ] **Live Search Bar:** Make the search input filter meals in real-time if the meal's `name` or `description` includes whatever the user typed (make sure it is **case-insensitive** searching `"jollof"` or `"JOLLOF"` should both work!).
- [ ] **Combine Both:** A user should be able to click `"Rice Dishes"` AND type `"coconut"` at the same time.
- [ ] **Empty Search State:** If a user searches for something we don't sell (like `"Pizza"`), show a friendly message like *"No meals found matching your search. Try ordering Abacha instead!"*

<details>
<summary><b>Stuck on Level 2? Click here for a hint!</b></summary>
<br>
You don't need a second state array for filtered meals! Just derive <code>filteredMeals</code> directly before your <code>return</code> statement using <code>.filter()</code> and the logical <code>&&</code> operator:

```javascript
const filteredMeals = meals.filter((meal) => {
  const matchesCategory = selectedCategory === "All" || meal.category === selectedCategory;
  const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase());
  return matchesCategory && matchesSearch;
});
```
</details>


### Level 3: Show Me the Money (The Order Tray & Math) 

Time to put your JavaScript functions and operators to work!
- [ ] **Add to Tray:** When a user clicks **"+ Add to Tray"** on an available meal, add it to the `trayItems` state array with a `quantity: 1` property.
- [ ] **No Duplicates in Tray:** If the meal is *already* in `trayItems`, do NOT add a duplicate card instead, increase its `quantity` by `1`.
- [ ] **Render Tray Items:** Inside `src/components/OrderTray.jsx`, map over `trayItems` to show each selected meal's name, unit price, current quantity, and `+` / `-` buttons.
- [ ] **Quantity Controls & Removal:**
  - Clicking `+` increases quantity by 1.
  - Clicking `-` decreases quantity by 1 (if quantity drops to `0`, remove the item from the tray completely!).
  - Clicking **"Clear All"** empties the entire tray.
- [ ] **The Bill Calculator (Math & Operators):**
  - **Subtotal:** Sum of `price * quantity` for every item in the tray.
  - **Delivery Fee:** Flat `₦1,000` if there is at least 1 item in the tray (`0` if the tray is empty).
  - **Big Spender Discount:** If `subtotal >= 10000`, automatically calculate a **10% discount** (`subtotal * 0.10`). Otherwise, discount is `0`.
  - **Grand Total:** `subtotal + deliveryFee - discount`.



## Optional 

Finished early and feeling dangerous? Pick one or two of these:
1. **Local Storage Persistence:** Save `trayItems` to `localStorage` so if the user refreshes the page, their Jollof rice doesn't disappear.
2. **Sort Dropdown:** Add a dropdown to sort meals by *"Price: Low to High"*, *"Price: High to Low"*, or *"Fastest Prep Time"*.
3. **Custom Checkout Modal:** Replace the boring browser `alert()` on the Checkout button with a clean React modal showing an Order Receipt and estimated delivery time.



## How to Submit Your Project

1. Make sure your code runs without errors (`npm run build` or test thoroughly in your browser).
2. Commit and push your changes to **your forked GitHub repository**:
   ```bash
   git add .
   git commit -m "Completed ChopNow React challenge"
   git push origin main
   ```
3. **(Recommended)** Deploy your forked repo on [Vercel](https://vercel.com) (it's free and takes 60 seconds) and paste your live link at the top of your README.
4. Come back to **this main repository**, click on the **Pull Requests** tab, and open a **New Pull Request** from your fork.
   - **PR Title:** `Submission: [Your Full Name]`
   - **PR Description:** Tell me what features you completed, your live Vercel link (if deployed), and which task gave you the toughest fight!

Good luck, have fun, and don't let the bugs eat your food! Phewwwwee!