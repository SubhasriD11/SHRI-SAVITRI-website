import React, { useState } from 'react';
import { Screen, Product, AccessoryItem } from '../types';
import {
  PRODUCTS,
  DRAPE_STYLES,
  ACCESSORIES_COLLECTION,
  CORSET_SAREE_IMAGE,
  HERO_IMAGE,
  ORGANZA_SAREE_IMAGE,
  GENZ_EDITORIAL_IMAGE,
  COLOR_SWATCHES,
} from '../data/products';
import {
  ArrowLeft,
  Clock,
  Sparkles,
  Shield,
  ChevronDown,
  Check,
  Ruler,
  Heart,
  Share2,
  MapPin,
  Plus,
  X,
  Eye,
} from 'lucide-react';

interface ProductDetailScreenProps {
  onNavigate: (screen: Screen) => void;
  onAddToCart: (product: Product, size: string, drapeStyle: string) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  onNavigate,
  onAddToCart,
}) => {
  const product = PRODUCTS[0]; // Corset Saree 2.0
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<string>('S (UK 8)');
  const [selectedDrapeStyle, setSelectedDrapeStyle] = useState<string>(DRAPE_STYLES[0].id);
  const [showFittingModal, setShowFittingModal] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('craft');
  const [addedToast, setAddedToast] = useState<boolean>(false);

  // Live Saree Color Palette Preview
  const [activeColorPalette, setActiveColorPalette] = useState<{
    id: string;
    name: string;
    bodiceHex: string;
    drapeHex: string;
  }>({
    id: 'sunset-terracotta',
    name: 'Sunset Terracotta × Charcoal Noir',
    bodiceHex: '#C85A32',
    drapeHex: '#2B2523',
  });

  // Attached accessories for this saree
  const [attachedAccessoryIds, setAttachedAccessoryIds] = useState<string[]>([
    'acc-waist-chain',
  ]);

  // Gallery images including Gen-Z editorial saree model
  const galleryImages = [
    { src: CORSET_SAREE_IMAGE, label: 'Front Bodice & Drape' },
    { src: GENZ_EDITORIAL_IMAGE, label: 'Gen-Z Editorial Drape Model' },
    { src: HERO_IMAGE, label: 'Runway Movement' },
    { src: ORGANZA_SAREE_IMAGE, label: 'Metallic Zari Reflection' },
  ];

  // Saree compatible accessories
  const compatibleAccessories = ACCESSORIES_COLLECTION.slice(0, 4);

  const toggleAttachedAccessory = (id: string) => {
    setAttachedAccessoryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const attachedItems = ACCESSORIES_COLLECTION.filter((a) =>
    attachedAccessoryIds.includes(a.id)
  );

  const accessoriesTotal = attachedItems.reduce((acc, a) => acc + a.priceINR, 0);
  const finalPriceINR = product.priceINR + accessoriesTotal;

  const handleAdd = () => {
    const drapeName =
      DRAPE_STYLES.find((d) => d.id === selectedDrapeStyle)?.name ||
      'Classic Architectural Drape';
    const finalNote =
      attachedItems.length > 0
        ? `${drapeName} (Includes ${attachedItems.map((a) => a.name).join(', ')})`
        : drapeName;

    onAddToCart(
      {
        ...product,
        priceINR: finalPriceINR,
      },
      selectedSize,
      finalNote
    );
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  return (
    <div className="w-full px-3 md:px-8 max-w-7xl mx-auto py-4 md:py-8">
      {/* Top Back Affordance - Required by Prototype Spec */}
      <div className="mb-6 flex items-center justify-between">
        <button
          aria-label="Go back"
          onClick={() => onNavigate('catalogue')}
          className="inline-flex items-center gap-2.5 px-3 py-2 text-xs font-semibold tracking-wider uppercase text-[#1A1615] hover:text-[#C5A059] bg-[#F5F0EA] hover:bg-[#EAE4DC] rounded transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Catalogue</span>
        </button>

        <div className="flex items-center gap-3 text-xs text-[#1A1615]/70">
          <span className="hidden sm:inline">Collection: Drop 04</span>
          <span className="hidden sm:inline">·</span>
          <span className="text-[#C85A32] font-semibold">Limited Run: 40 Pieces</span>
        </div>
      </div>

      {/* Product Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
        {/* Left Column: Couture Gallery & Saree Model */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Main Visual Stage with Live Saree Shading */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#1A1615] border border-[#EAE4DC] shadow-md">
            <img
              src={activeImage}
              alt="Corset Saree 2.0 Editorial View"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top transition-all duration-700"
            />

            {/* Vibrant Saree Hue Shading */}
            <div
              className="absolute top-0 inset-x-0 h-1/2 pointer-events-none transition-colors duration-500"
              style={{
                background: `radial-gradient(ellipse at 50% 40%, ${activeColorPalette.bodiceHex} 0%, transparent 80%)`,
                mixBlendMode: 'color',
                opacity: 0.7,
              }}
            />
            <div
              className="absolute bottom-0 inset-x-0 h-2/3 pointer-events-none transition-colors duration-500"
              style={{
                background: `radial-gradient(ellipse at 50% 70%, ${activeColorPalette.drapeHex} 0%, transparent 90%)`,
                mixBlendMode: 'color',
                opacity: 0.75,
              }}
            />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 bg-[#FAF8F5]/90 backdrop-blur-md px-3 py-1 rounded text-[11px] font-semibold uppercase tracking-wider text-[#1A1615] border border-[#EAE4DC]">
              Handcrafted in Varanasi
            </div>

            <div className="absolute top-4 right-4 bg-[#1A1615]/80 backdrop-blur-md px-3 py-1 rounded text-[10px] font-semibold uppercase tracking-wider text-[#FAF8F5] border border-[#FAF8F5]/30">
              {attachedItems.length > 0 ? `${attachedItems.length} Accessories Added` : 'Pure Handloom'}
            </div>

            {/* Bottom Saree Mobility Feature Pill */}
            <div className="absolute bottom-4 left-4 bg-[#1A1615]/85 backdrop-blur-md px-3.5 py-2 rounded text-xs font-medium text-[#FAF8F5] flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Pre-Draped Slip-On: 90 Seconds · Pure Silk</span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="grid grid-cols-4 gap-2.5">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img.src)}
                className={`relative aspect-[3/4] overflow-hidden rounded border transition-all ${
                  activeImage === img.src
                    ? 'border-[#1A1615] ring-2 ring-[#C5A059]/40'
                    : 'border-[#EAE4DC] opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
                <span className="absolute bottom-1 inset-x-1 text-[8px] font-semibold uppercase tracking-wider bg-[#1A1615]/85 text-[#FAF8F5] py-0.5 px-1 truncate text-center rounded">
                  {img.label}
                </span>
              </button>
            ))}
          </div>

          {/* Dynamic Color Palette Selector for Saree Model */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#1A1615]">
                Saree Color Combination:
              </span>
              <span className="text-xs text-[#C5A059] font-medium">
                {activeColorPalette.name}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                {
                  id: 'sunset-terracotta',
                  name: 'Sunset Terracotta',
                  bodiceHex: '#C85A32',
                  drapeHex: '#2B2523',
                },
                {
                  id: 'noir-minimalist',
                  name: 'Espresso Noir',
                  bodiceHex: '#2B2523',
                  drapeHex: '#1A1615',
                },
                {
                  id: 'copper-marigold',
                  name: 'Cyber Marigold',
                  bodiceHex: '#DA8B2A',
                  drapeHex: '#C85A32',
                },
                {
                  id: 'antique-heirloom',
                  name: 'Varanasi Gold',
                  bodiceHex: '#C5A059',
                  drapeHex: '#FAF8F5',
                },
              ].map((pal) => (
                <button
                  key={pal.id}
                  onClick={() => setActiveColorPalette(pal)}
                  className={`p-2 rounded-lg border text-left flex items-center gap-2 transition-all ${
                    activeColorPalette.id === pal.id
                      ? 'border-[#1A1615] bg-[#F5F0EA] font-semibold'
                      : 'border-[#EAE4DC] bg-white hover:border-[#C5A059]'
                  }`}
                >
                  <div className="flex -space-x-1">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20"
                      style={{ backgroundColor: pal.bodiceHex }}
                    />
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20"
                      style={{ backgroundColor: pal.drapeHex }}
                    />
                  </div>
                  <span className="text-[11px] truncate text-[#1A1615]">{pal.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module & Accessories Attachments */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          <div className="border-b border-[#EAE4DC] pb-5 mb-5">
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#687259] block mb-2">
              Haute Couture · Indo-Western Silhouette
            </span>
            <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl text-[#1A1615] font-normal tracking-tight mb-2">
              Corset Saree 2.0
            </h1>
            <p className="text-sm text-[#1A1615]/75 font-light leading-relaxed mb-4">
              Pre-draped pure Chanderi silk with architectural internal boning, 
              embroidered with 24K electroplated gold zari threads.
            </p>

            <div className="flex items-baseline gap-3">
              <span className="font-['Plus_Jakarta_Sans'] text-2xl font-semibold text-[#1A1615] tabular-nums">
                ₹{finalPriceINR.toLocaleString('en-IN')}
              </span>
              {accessoriesTotal > 0 && (
                <span className="text-xs text-[#687259] font-medium">
                  (Base ₹{product.priceINR.toLocaleString('en-IN')} + ₹{accessoriesTotal.toLocaleString('en-IN')} Accessories)
                </span>
              )}
              <span className="ml-auto text-xs font-semibold uppercase tracking-wider text-[#C5A059] bg-[#F5F0EA] px-2 py-0.5 rounded">
                Bespoke Alteration Included
              </span>
            </div>
          </div>

          {/* ATTACHABLE ACCESSORIES SECTION (DIRECTLY ON PDP) */}
          <div className="mb-6 p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC]">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#1A1615] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                Attach Accessories to this Saree:
              </label>
              <span className="text-[11px] text-[#687259] font-medium">
                {attachedItems.length} Attached
              </span>
            </div>
            <p className="text-[11px] text-[#1A1615]/70 mb-3">
              Handmade temple jewelry crafted to anchor directly into this corset saree's pleats and neckline:
            </p>

            <div className="space-y-2">
              {compatibleAccessories.map((acc) => {
                const isAttached = attachedAccessoryIds.includes(acc.id);
                return (
                  <div
                    key={acc.id}
                    onClick={() => toggleAttachedAccessory(acc.id)}
                    className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isAttached
                        ? 'border-[#1A1615] bg-[#F5F0EA] ring-1 ring-[#1A1615]'
                        : 'border-[#EAE4DC] bg-white hover:border-[#C5A059]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={acc.image}
                        alt={acc.name}
                        className="w-10 h-10 rounded object-cover border border-[#EAE4DC] shrink-0"
                      />
                      <div className="truncate">
                        <span className="text-xs font-semibold text-[#1A1615] block truncate">
                          {acc.name}
                        </span>
                        <span className="text-[10px] text-[#1A1615]/60 block">
                          {acc.anchorLocation || 'Saree Attachment'} · ₹{acc.priceINR.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1 ${
                        isAttached
                          ? 'bg-[#1A1615] text-[#FAF8F5]'
                          : 'bg-[#F5F0EA] text-[#1A1615] hover:bg-[#C5A059] hover:text-[#1A1615]'
                      }`}
                    >
                      {isAttached ? (
                        <>
                          <Check className="w-3 h-3 text-[#C5A059]" />
                          <span>Attached</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" />
                          <span>Attach</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Drape Style Selector */}
          <div className="mb-6">
            <label className="text-xs uppercase tracking-wider font-semibold text-[#1A1615] block mb-2">
              Select Signature Drape Style:
            </label>
            <div className="space-y-2">
              {DRAPE_STYLES.map((drape) => {
                const isSelected = selectedDrapeStyle === drape.id;
                return (
                  <button
                    key={drape.id}
                    onClick={() => setSelectedDrapeStyle(drape.id)}
                    className={`w-full text-left p-3 rounded border transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'border-[#1A1615] bg-[#F5F0EA]'
                        : 'border-[#EAE4DC] bg-[#FAF8F5] hover:border-[#C5A059]'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wide text-[#1A1615] block">
                        {drape.name}
                      </span>
                      <span className="text-[11px] text-[#1A1615]/70 block mt-0.5">
                        {drape.description}
                      </span>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#1A1615]">
                Size: <span className="font-normal text-[#C5A059]">{selectedSize}</span>
              </label>
              <button
                onClick={() => setShowFittingModal(true)}
                className="inline-flex items-center gap-1 text-[11px] text-[#1A1615]/70 hover:text-[#C5A059] underline cursor-pointer"
              >
                <Ruler className="w-3 h-3" />
                <span>Couture Size Guide</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {product.sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 px-3 text-xs font-medium tracking-wide rounded border transition-all text-center ${
                      isSelected
                        ? 'bg-[#1A1615] text-[#FAF8F5] border-[#1A1615]'
                        : 'bg-[#F5F0EA] text-[#1A1615] border-[#EAE4DC] hover:border-[#C5A059]'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 mb-8">
            <button
              onClick={handleAdd}
              className="w-full py-4 bg-[#1A1615] hover:bg-[#C5A059] hover:text-[#1A1615] text-[#FAF8F5] text-xs font-semibold tracking-[0.15em] uppercase rounded transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-3"
            >
              <span>Add to Bag · ₹{finalPriceINR.toLocaleString('en-IN')}</span>
            </button>

            <button
              onClick={() => onNavigate('catalogue')}
              className="w-full py-3.5 bg-[#F5F0EA] hover:bg-[#EAE4DC] border border-[#EAE4DC] text-[#1A1615] text-xs font-semibold tracking-[0.14em] uppercase rounded transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Customize Colors & Accessories in Studio</span>
            </button>

            <button
              onClick={() => setShowFittingModal(true)}
              className="w-full py-3 border border-[#1A1615]/40 text-[#1A1615]/80 hover:text-[#1A1615] hover:bg-[#F5F0EA] text-xs font-medium tracking-[0.14em] uppercase rounded transition-all flex items-center justify-center gap-2"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Book Atelier Fitting (Mumbai / Delhi / NYC)</span>
            </button>

            {addedToast && (
              <div className="p-3 bg-[#1A1615] text-[#FAF8F5] rounded text-xs text-center font-medium animate-fade-in flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-[#C5A059]" />
                <span>Corset Saree 2.0 with {attachedItems.length} accessories added to bag.</span>
              </div>
            )}
          </div>

          {/* Specifications Accordions */}
          <div className="divide-y divide-[#EAE4DC] border-y border-[#EAE4DC]">
            <div className="py-3.5">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'craft' ? null : 'craft')}
                className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1A1615] text-left"
              >
                <span>Artisan Weaving & Materials</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'craft' ? 'rotate-180 text-[#C5A059]' : ''}`} />
              </button>
              {openAccordion === 'craft' && (
                <div className="mt-3 text-xs text-[#1A1615]/80 font-light leading-relaxed space-y-2">
                  <p>• Handspun pure Chanderi silk with handwoven 24K gold zari borders by master weavers in Varanasi.</p>
                  <p>• Bodice structure utilizes 16 flexible spiral steel and grosgrain boning rods that adapt comfortably to natural movement.</p>
                  <p>• Certified genuine handloom with individual silk authenticity mark.</p>
                </div>
              )}
            </div>

            <div className="py-3.5">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'drape' ? null : 'drape')}
                className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1A1615] text-left"
              >
                <span>The 90-Second Drape Technology</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'drape' ? 'rotate-180 text-[#C5A059]' : ''}`} />
              </button>
              {openAccordion === 'drape' && (
                <div className="mt-3 text-xs text-[#1A1615]/80 font-light leading-relaxed space-y-2">
                  <p>1. Step into the pre-pleated skirt base using the concealed invisible side zip.</p>
                  <p>2. Fasten the corset back lacing or hook-and-eye closure for customized waist posture.</p>
                  <p>3. Sling the pre-gathered pallu over your shoulder; magnetic snap lock secures the drape in place with zero safety pins required.</p>
                </div>
              )}
            </div>

            <div className="py-3.5">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'delivery' ? null : 'delivery')}
                className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1A1615] text-left"
              >
                <span>Complimentary Delivery & Concierge</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'delivery' ? 'rotate-180 text-[#C5A059]' : ''}`} />
              </button>
              {openAccordion === 'delivery' && (
                <div className="mt-3 text-xs text-[#1A1615]/80 font-light leading-relaxed space-y-2">
                  <p>• Complimentary express DHL delivery worldwide with tamper-proof luxury garment trunk.</p>
                  <p>• Includes 1 complimentary virtual or in-person styling consultation with our head drape artist.</p>
                  <p>• 14-day exchange privilege for standard sizes.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fitting Concierge Modal */}
      {showFittingModal && (
        <div className="fixed inset-0 z-50 bg-[#1A1615]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] border border-[#EAE4DC] rounded-xl max-w-lg w-full p-6 md:p-8 shadow-2xl">
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#C5A059] block mb-1">
              Atelier Appointment
            </span>
            <h3 className="font-['Playfair_Display'] text-2xl text-[#1A1615] font-normal mb-3">
              Book a Private Fitting
            </h3>
            <p className="text-xs text-[#1A1615]/70 leading-relaxed mb-6">
              Experience the Corset Saree 2.0 at our flagship ateliers in Mumbai (Colaba), Delhi (Mehrauli), or New York (SoHo). Our master drape patterns are tailored to your exact measurements.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Your private fitting consultation request has been received. Our atelier concierge will contact you within 4 hours.');
                setShowFittingModal(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1615] mb-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Ananya Sen"
                  className="w-full bg-[#F5F0EA] border border-[#EAE4DC] rounded px-3 py-2 text-xs text-[#1A1615] focus:outline-none focus:border-[#1A1615]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1615] mb-1">
                    Atelier Location
                  </label>
                  <select className="w-full bg-[#F5F0EA] border border-[#EAE4DC] rounded px-3 py-2 text-xs text-[#1A1615]">
                    <option>Mumbai · Colaba Atelier</option>
                    <option>Delhi · Mehrauli Heritage Flagship</option>
                    <option>New York · SoHo Showroom</option>
                    <option>Virtual Video Drape Masterclass</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1615] mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full bg-[#F5F0EA] border border-[#EAE4DC] rounded px-3 py-2 text-xs text-[#1A1615]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowFittingModal(false)}
                  className="px-4 py-2 text-xs uppercase font-semibold text-[#1A1615]/70 hover:text-[#1A1615]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#1A1615] hover:bg-[#C5A059] hover:text-[#1A1615] text-[#FAF8F5] text-xs uppercase font-semibold tracking-wider rounded transition-colors"
                >
                  Confirm Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
