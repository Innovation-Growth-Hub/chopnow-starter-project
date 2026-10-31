export default function FoodCard({ meal, onAddToTray = () => console.log("TODO: Pass onAddToTray prop from page.js!") }) {
  // hi there, Destructure the properties you need from the `meal` object
  // for example: name, category, price, prepTimeMins, rating, isAvailable, isSpicy, image, description, tags.

  return (
    <div className="bg-white rounded-xl overflow-hidden flex flex-col justify-between transition hover:shadow-xs">
      <div>
        {/* Render the meal image here. 
            Add a "Sold Out" badge overlay if `isAvailable` is false, 
            and a "Spicy" badge if `isSpicy` is true! */}
        <div className="h-48 bg-slate-100 relative">
          <img
            src={meal.image}
            alt={meal.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card Content */}
        <div className="p-4">
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className="font-bold text-lg text-slate-800">{meal.name}</h3>
            <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-1 rounded">
              replace with a star icon! {meal.rating}
            </span>
          </div>

          {/* Display the description, prepTimeMins, and map through `meal.tags` */}
          <p className="text-sm text-slate-600 line-clamp-2 mb-3">
            {meal.description}
          </p>
        </div>
      </div>

      {/* Price & Action Button */}
      <div className="p-4 pt-0 flex items-center justify-between mt-2">
        <div>
          {/* Format the price nicely (e.g., ₦4,500) */}
          <span className="font-extrabold text-lg text-slate-900">
            ₦{meal.price}
          </span>
        </div>

        {/* 
            - If `meal.isAvailable` is false, disable this button and change its text to "Sold Out" and style to gray.
            - When clicked, call `onAddToTray(meal)` */}
        <button
          onClick={() => onAddToTray(meal)}
          className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition cursor-pointer"
        >
          + Add to Tray
        </button>
      </div>
    </div>
  );
}