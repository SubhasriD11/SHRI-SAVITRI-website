import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const getItemPrice = (item: CartItem) => {
    return item.customConfig ? item.customConfig.totalCustomPriceINR : item.product.priceINR;
  };

  const totalINR = items.reduce((sum, item) => sum + getItemPrice(item) * item.quantity, 0);
  const totalUSD = Math.round(totalINR / 83);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `SAVITRI-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setCheckoutStep('confirmed');
  };

  const handleFinish = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#1A1615]/50 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#EAE4DC] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#EAE4DC] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
              <span className="font-['Playfair_Display'] text-lg font-medium text-[#1A1615]">
                {checkoutStep === 'confirmed' ? 'Order Confirmed' : checkoutStep === 'checkout' ? 'Atelier Checkout' : 'Shopping Bag'}
              </span>
              {checkoutStep === 'cart' && (
                <span className="text-xs text-[#1A1615]/50 font-sans">
                  ({items.reduce((s, i) => s + i.quantity, 0)} pieces)
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#1A1615]/60 hover:text-[#1A1615] hover:bg-[#F5F0EA] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {checkoutStep === 'confirmed' ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-[#C5A059] mx-auto mb-4" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#687259] block mb-1">
                  Atelier Reservation Confirmed
                </span>
                <h3 className="font-['Playfair_Display'] text-2xl text-[#1A1615] font-normal mb-2">
                  Order #{orderId}
                </h3>
                <p className="text-xs text-[#1A1615]/70 leading-relaxed mb-6">
                  Thank you, <strong className="text-[#1A1615]">{customerName}</strong>. Your couture pieces are now queued for hand-tailoring at our Varanasi and Mumbai ateliers. You will receive tracking details via SMS/Email.
                </p>

                <div className="p-4 bg-[#F5F0EA] rounded-lg text-left text-xs space-y-2 mb-6 border border-[#EAE4DC]">
                  <div className="flex justify-between">
                    <span className="text-[#1A1615]/60">Delivery Address:</span>
                    <span className="font-medium text-[#1A1615] text-right truncate max-w-[180px]">{customerAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1A1615]/60">Total Paid:</span>
                    <span className="font-semibold text-[#1A1615]">₹{totalINR.toLocaleString('en-IN')} (${totalUSD} USD)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1A1615]/60">Packaging:</span>
                    <span className="text-[#C5A059] font-medium">Bespoke Hard-Shell Garment Trunk</span>
                  </div>
                </div>

                <button
                  onClick={handleFinish}
                  className="w-full py-3 bg-[#1A1615] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#C5A059] hover:text-[#1A1615] transition-colors"
                >
                  Continue Exploring
                </button>
              </div>
            ) : checkoutStep === 'checkout' ? (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1615] mb-1">
                    Client Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Radhika Merchant"
                    className="w-full bg-[#F5F0EA] border border-[#EAE4DC] rounded px-3 py-2 text-xs text-[#1A1615] focus:outline-none focus:border-[#1A1615]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1615] mb-1">
                    Phone Number (for Courier & Atelier Concierge)
                  </label>
                  <input
                    required
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+91 98200 12345 / +1 (555) 019-2831"
                    className="w-full bg-[#F5F0EA] border border-[#EAE4DC] rounded px-3 py-2 text-xs text-[#1A1615] focus:outline-none focus:border-[#1A1615]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1615] mb-1">
                    Delivery Address
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Apartment, Street Address, City, Postal Code, Country"
                    className="w-full bg-[#F5F0EA] border border-[#EAE4DC] rounded px-3 py-2 text-xs text-[#1A1615] focus:outline-none focus:border-[#1A1615]"
                  />
                </div>

                <div className="pt-2 border-t border-[#EAE4DC]">
                  <div className="flex items-center gap-2 text-xs text-[#687259] mb-3">
                    <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                    <span>Complimentary Insured White-Glove Global Delivery</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('cart')}
                      className="w-1/3 py-3 border border-[#EAE4DC] text-xs font-semibold uppercase text-[#1A1615] rounded hover:bg-[#F5F0EA]"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 py-3 bg-[#1A1615] text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase rounded hover:bg-[#C5A059] hover:text-[#1A1615] transition-colors shadow"
                    >
                      Place Order · ₹{totalINR.toLocaleString('en-IN')}
                    </button>
                  </div>
                </div>
              </form>
            ) : items.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-12 h-12 text-[#1A1615]/20 mx-auto mb-3" />
                <p className="font-['Playfair_Display'] text-lg text-[#1A1615] mb-1">
                  Your bag is currently empty
                </p>
                <p className="text-xs text-[#1A1615]/60 mb-6">
                  Explore our curated pre-draped corset sarees and zari kurtas.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#1A1615] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#C5A059] hover:text-[#1A1615] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#F5F0EA] border border-[#EAE4DC] rounded-lg flex gap-3 items-start"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-20 object-cover object-top rounded bg-white shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-['Playfair_Display'] text-sm font-medium text-[#1A1615] truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-[#1A1615]/40 hover:text-[#C85A32] p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#1A1615]/70 space-y-0.5 mt-1">
                        <div>Size: <span className="font-medium text-[#1A1615]">{item.selectedSize}</span></div>
                        <div className="truncate">Drape: <span className="font-medium text-[#1A1615]">{item.selectedDrapeStyle}</span></div>
                        {item.customConfig && (
                          <div className="pt-1 mt-1 border-t border-[#EAE4DC]/60 space-y-0.5">
                            <div className="text-[10px] text-[#687259] font-medium truncate">
                              Palette: {item.customConfig.bodiceColorName} (Bodice) × {item.customConfig.drapeColorName} (Drape)
                            </div>
                            {item.customConfig.accessories.length > 0 && (
                              <div className="text-[10px] text-[#C5A059] font-medium truncate">
                                + {item.customConfig.accessories.join(', ')}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#EAE4DC]/60">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                            className="w-5 h-5 rounded border border-[#EAE4DC] bg-[#FAF8F5] flex items-center justify-center text-xs font-bold text-[#1A1615] hover:bg-white"
                          >
                            -
                          </button>
                          <span className="text-xs font-semibold tabular-nums">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                            className="w-5 h-5 rounded border border-[#EAE4DC] bg-[#FAF8F5] flex items-center justify-center text-xs font-bold text-[#1A1615] hover:bg-white"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-semibold text-[#1A1615] tabular-nums">
                          ₹{(getItemPrice(item) * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Subtotal & Checkout Trigger */}
          {checkoutStep === 'cart' && items.length > 0 && (
            <div className="p-6 border-t border-[#EAE4DC] bg-[#FAF8F5] space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-wider text-[#1A1615]/70">Subtotal:</span>
                <div className="text-right">
                  <span className="font-['Plus_Jakarta_Sans'] text-lg font-semibold text-[#1A1615] tabular-nums block">
                    ₹{totalINR.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-[#1A1615]/50 block">
                    Approx. ${totalUSD} USD
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-[#687259] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Includes complimentary custom fit & worldwide shipping.</span>
              </p>

              <button
                onClick={() => setCheckoutStep('checkout')}
                className="w-full py-3.5 bg-[#1A1615] hover:bg-[#C5A059] hover:text-[#1A1615] text-[#FAF8F5] text-xs font-semibold tracking-[0.14em] uppercase rounded transition-colors shadow flex items-center justify-center gap-2"
              >
                <span>Proceed to Bespoke Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
