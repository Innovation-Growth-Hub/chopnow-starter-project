import Image from "next/image";

export default function FoodCard({ meal, onAddToTray }) {
  const {
    name,
    category,
    price,
    prepTimeMins,
    rating,
    isAvailable,  
    isSpicy,
    image,
    description,
    tags,
  } = meal;

  return (
    <div className="bg-white rounded-xl overflow-hidden flex flex-col justify-between transition hover:shadow-xs">
      <div>
        {/* Render the meal image here. 
            Add a "Sold Out" badge overlay if `isAvailable` is false, 
            and a "Spicy" badge if `isSpicy` is true! */}
        <div className="h-48 bg-slate-100 relative">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />

          {isSpicy && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
              Spicy
            </span>
          )}

          {!isAvailable && (
            <span className="absolute top-2 right-2 bg-slate-800 text-white text-xs font-semibold px-2 py-1 rounded">
              Sold Out
            </span>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4">
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className="font-bold text-lg text-slate-800">{name}</h3>
            <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-1 rounded">
              <span aria-hidden="true">★</span> {rating}
            </span>
          </div>

          {/* Display the description, prepTimeMins, and map through `tags` */}
          <p className="text-sm text-slate-600 line-clamp-2 mb-3">
            {description}
          </p>

          <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
            <span>{category}</span>
            <span>{prepTimeMins} mins</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-slate-100 text-slate-600 text-xs font-medium px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Price & Action Button */}
      <div className="p-4 pt-0 flex items-center justify-between mt-2">
        <div>
          {/* Format the price nicely (e.g., ₦4,500) */}
          <span className="font-extrabold text-lg text-slate-900">
            ₦{price.toLocaleString()}
          </span>
        </div>

        {/* 
            - If `isAvailable` is false, disable this button and change its text to "Sold Out" and style to gray.
            - When clicked, call `onAddToTray(meal)` */}
        <button
          onClick={() => onAddToTray(meal)}
          disabled={!isAvailable}
          className={`text-sm font-semibold px-4 py-2 rounded-lg transition ${
            isAvailable
              ? "bg-orange-600 hover:bg-orange-700 text-white cursor-pointer"
              : "bg-slate-300 text-slate-500 cursor-not-allowed"
          }`}
        >
          {isAvailable ? "+ Add to Tray" : "Sold Out"}
        </button>
      </div>
    </div>
  );
}