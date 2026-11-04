"use client";

import { useState } from "react";

function formatNaira(amount) {
  return `₦${Math.round(amount).toLocaleString()}`;
}

export default function OrderTray({
  trayItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearTray,
}) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Level 3: bill calculations.
  const subtotal = trayItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryFee = trayItems.length > 0 ? 1000 : 0;
  const discount = subtotal >= 10000 ? subtotal * 0.1 : 0;
  const grandTotal = subtotal + deliveryFee - discount;

  // Optional: estimated delivery based on the longest prep time.
  const longestPrepTime = trayItems.reduce(
    (longest, item) => Math.max(longest, item.prepTimeMins || 0),
    0
  );
  const estimatedDeliveryMins = longestPrepTime + 15;

  function handleCheckout() {
    if (trayItems.length === 0) return;
    setIsCheckoutOpen(true);
  }

  return (
    <>
      <aside className="bg-white rounded-xl p-5 sticky top-6">
        <div className="flex justify-between items-center pb-3 mb-4">
          <h2 className="font-bold text-xl text-slate-800">Your Order Tray</h2>
          {trayItems.length > 0 && (
            <button
              type="button"
              onClick={onClearTray}
              className="text-xs text-red-600 hover:underline font-medium cursor-pointer"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Empty State vs. Tray Items */}
        {trayItems.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            <p className="text-sm">Your tray is currently empty.</p>
            <p className="text-xs mt-1">
              Click &quot;+ Add to Tray&quot; on any available meal!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
              {trayItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-slate-50 p-3 rounded-lg"
                >
                  <div>
                    <h4 className="font-semibold text-sm text-slate-800">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {formatNaira(item.price)} x {item.quantity}
                    </p>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[11px] text-slate-400 hover:text-red-600 font-medium cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      aria-label={`Decrease ${item.name} quantity`}
                      className="w-7 h-7 rounded bg-slate-200 hover:bg-slate-300 font-bold text-sm cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      aria-label={`Increase ${item.name} quantity`}
                      className="w-7 h-7 rounded bg-orange-100 text-orange-700 hover:bg-orange-200 font-bold text-sm cursor-pointer"
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
                <span>{formatNaira(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Fee</span>
                <span>{formatNaira(deliveryFee)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>10% Promo Discount (Orders ₦10k+)</span>
                  <span>-{formatNaira(discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-extrabold text-base text-slate-900 border-t border-slate-200 pt-2">
                <span>Total</span>
                <span>{formatNaira(grandTotal)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition cursor-pointer"
            >
              Checkout Now
            </button>
          </div>
        )}
      </aside>

      {/* Optional: custom checkout modal (replaces the browser alert) */}
      {isCheckoutOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Order receipt"
          onClick={() => setIsCheckoutOpen(false)}
        >
          <div
            className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex justify-between items-start gap-4 mb-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Order Confirmed
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Thanks for ordering from ChopNow!
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                aria-label="Close receipt"
                className="text-slate-400 hover:text-slate-700 text-2xl leading-none cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="bg-slate-50 rounded-lg p-3 space-y-2 mb-4">
              {trayItems.map((item) => (
                <div key={item.id} className="flex justify-between gap-3 text-sm">
                  <span className="text-slate-700">
                    {item.name}{" "}
                    <span className="text-slate-500">x {item.quantity}</span>
                  </span>
                  <span className="font-semibold text-slate-800 whitespace-nowrap">
                    {formatNaira(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{formatNaira(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Fee</span>
                <span>{formatNaira(deliveryFee)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>10% Promo Discount</span>
                  <span>-{formatNaira(discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-extrabold text-base text-slate-900 border-t border-slate-200 pt-2">
                <span>Grand Total</span>
                <span>{formatNaira(grandTotal)}</span>
              </div>
            </div>

            <div className="mt-4 bg-orange-50 border border-orange-100 rounded-lg p-3 text-sm text-orange-800">
              <span className="font-semibold">Estimated delivery:</span>{" "}
              {estimatedDeliveryMins} minutes
            </div>

            <button
              type="button"
              onClick={() => setIsCheckoutOpen(false)}
              className="mt-4 w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition cursor-pointer"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}
    </>
  );
}
