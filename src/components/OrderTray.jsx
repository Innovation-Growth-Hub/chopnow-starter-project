"use client";

import { useState } from "react";

export default function OrderTray({ trayItems, onUpdateQuantity, onRemoveItem, onClearTray }) {
  const [showReceipt, setShowReceipt] = useState(false);

  const subtotal = trayItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = trayItems.length > 0 ? 1000 : 0;
  const discount = subtotal >= 10000 ? Math.round(subtotal * 0.1) : 0;

  const grandTotal = subtotal + deliveryFee - discount;

  const estimatedMins =
    trayItems.reduce(
      (max, item) => Math.max(max, item.prepTimeMins || 0),
      0
    ) + 15;

  function closeReceipt() {
    setShowReceipt(false);
  }

  function handlePlaceOrder() {
    onClearTray();
    setShowReceipt(false);
  }

  return (
    <>
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
                    <h4 className="font-semibold text-sm text-slate-800">{item.name}</h4>
                    <p className="text-xs text-slate-500">
                      ₦{item.price.toLocaleString()} x {item.quantity}
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
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Fee</span>
                <span>₦{deliveryFee.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>10% Promo Discount (Orders ₦10k+)</span>
                  <span>-₦{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between font-extrabold text-base text-slate-900 border-t border-slate-200 pt-2">
                <span>Total</span>
                <span>₦{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => setShowReceipt(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition cursor-pointer"
            >
              Checkout Now
            </button>
          </div>
        )}
      </aside>

      {showReceipt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={closeReceipt}
        >
          <div
            className="bg-white rounded-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-slate-800">Order Receipt</h3>
              <button
                onClick={closeReceipt}
                className="text-slate-400 hover:text-slate-600 text-2xl leading-none cursor-pointer"
                aria-label="Close receipt"
              >
                &times;
              </button>
            </div>

            <div className="space-y-2 mb-4">
              {trayItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm text-slate-600"
                >
                  <span>
                    {item.name} &times; {item.quantity}
                  </span>
                  <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Fee</span>
                <span>₦{deliveryFee.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Discount</span>
                  <span>-₦{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between font-extrabold text-slate-900 border-t border-slate-200 pt-2">
                <span>Total</span>
                <span>₦{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Estimated delivery: ~{estimatedMins} mins
            </p>

            <div className="mt-5 flex gap-2">
              <button
                onClick={closeReceipt}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-lg transition cursor-pointer"
              >
                Keep Shopping
              </button>
              <button
                onClick={handlePlaceOrder}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition cursor-pointer"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
