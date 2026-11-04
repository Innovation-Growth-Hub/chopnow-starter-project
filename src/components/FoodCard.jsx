export default function FoodCard({ meal, onAddToTray = () => {} }) {
  const {
    name,
    category,
    price = 0,
    prepTimeMins,
    rating,
    isAvailable = true,
    isSpicy = false,
    image,
    description,
    tags = [],
  } = meal;

  return (
    <div className="bg-white rounded-xl overflow-hidden flex flex-col justify-between transition hover:shadow-xs">
      <div>
        <div className="h-48 bg-slate-100 relative">
          <img
            src={image}
            alt={name}
            className={`w-full h-full object-cover ${!isAvailable ? "opacity-60 grayscale" : ""}`}
          />

          {/* Conditional badges on the image */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-2">
            {isSpicy && (
              <span className="text-xs font-semibold bg-red-600 text-white px-2 py-1 rounded">
                Spicy
              </span>
            )}
            {!isAvailable && (
              <span className="text-xs font-semibold bg-slate-800 text-white px-2 py-1 rounded">
                Sold Out
              </span>
            )}
          </div>

          {/* Category badge */}
          <span className="absolute bottom-2 left-2 text-xs font-semibold bg-white/90 text-slate-700 px-2 py-1 rounded">
            {category}
          </span>
        </div>

        {/* Card Content */}
        <div className="p-4">
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className="font-bold text-lg text-slate-800">{name}</h3>
            <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-1 rounded whitespace-nowrap">
              ★ {rating}
            </span>
          </div>

          <p className="text-sm text-slate-600 line-clamp-2 mb-3">{description}</p>

          <p className="text-xs font-medium text-slate-500 mb-3">
            Prep time: {prepTimeMins} mins
          </p>

          {/* Meal tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium bg-orange-50 text-orange-700 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Price & Action Button */}
      <div className="p-4 pt-0 flex items-center justify-between mt-2">
        <div>
          <span className="font-extrabold text-lg text-slate-900">
            ₦{Number(price).toLocaleString()}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onAddToTray(meal)}
          disabled={!isAvailable}
          className={`text-sm font-semibold px-4 py-2 rounded-lg transition ${
            isAvailable
              ? "bg-orange-600 hover:bg-orange-700 text-white cursor-pointer"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          {isAvailable ? "+ Add to Tray" : "Sold Out"}
        </button>
      </div>
    </div>
  );
}
