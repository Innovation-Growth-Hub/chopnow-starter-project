export default function OrderTray({ trayItems, onUpdateQuantity, onRemoveItem, onClearTray }) {
  // TODO 1: Calculate the Subtotal using .reduce() or a loop
  // Formula: sum of (item.price * item.quantity) for all items in trayItems
  const subtotal = 0;

  // TODO 2: Calculate Delivery Fee & Discount using JS Operators
  // Rule 1: Delivery fee is ₦1,000 (or ₦0 if tray is empty)
  // Rule 2: Promo Discount! If subtotal is >= ₦10,000, apply a 10% discount (subtotal * 0.10)
  const deliveryFee = 0;
  const discount = 0;

  // TODO 3: Calculate Grand Total
  const grandTotal = subtotal + deliveryFee - discount;

  return (
    <aside className="bg-white rounded-xl p-5 sticky top-6">
      <div className="flex justify-between items-center pb-3 mb-4">
        <h2 className="font-bold text-xl text-slate-800">Your Order Tray</h2>
        {trayItems.length > 0 && (
          <button
            onClick={onClearTray}
            className="text-xs text-red-600 hover:underline font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Empty State vs. Tray Items */}
      {trayItems.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          <p className="text-sm">Your tray is currently empty.</p>
          <p className="text-xs mt-1">Click "+ Add to Tray" on any available meal!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* TODO 4: Map through `trayItems` and display each item's name, price, 
              and quantity buttons (- and +) that trigger `onUpdateQuantity` */}
          <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
            {trayItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-slate-50 p-3 rounded-lg"
              >
                <div>
                  <h4 className="font-semibold text-sm text-slate-800">{item.name}</h4>
                  <p className="text-xs text-slate-500">
                    ₦{item.price} x {item.quantity}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="w-7 h-7 rounded bg-slate-200 hover:bg-slate-300 font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="text-sm font-semibold w-5 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="w-7 h-7 rounded bg-orange-100 text-orange-700 hover:bg-orange-200 font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Breakdown */}
          <div className="border-t border-slate-200 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>₦{subtotal}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery Fee</span>
              <span>₦{deliveryFee}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600 font-medium">
                <span>10% Promo Discount (Orders ₦10k+)</span>
                <span>-₦{discount}</span>
              </div>
            )}
            <div className="flex justify-between font-extrabold text-base text-slate-900 border-t border-slate-200 pt-2">
              <span>Total</span>
              <span>₦{grandTotal}</span>
            </div>
          </div>

          <button
            onClick={() => alert(`Order placed! Total: ₦${grandTotal}`)}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition cursor-pointer"
          >
            Checkout Now
          </button>
        </div>
      )}
    </aside>
  );
}