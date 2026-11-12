import React, { useState, useMemo } from 'react';
import { Screen, Product, AccessoryItem, ColorSwatch, CustomOutfitConfig } from '../types';
import { PRODUCTS, COLOR_SWATCHES, ACCESSORIES_COLLECTION, GENZ_EDITORIAL_IMAGE, ACCESSORIES_IMAGE } from '../data/products';
import { OutfitCanvasPreview } from './OutfitCanvasPreview';
import { ArrowRight, Sparkles, Check, Sliders, Palette, Zap, Layers, ShoppingBag, ShieldCheck, RefreshCw, Wand2, Gem } from 'lucide-react';

interface ExploreScreenProps {
  onNavigate: (screen: Screen) => void;
  onQuickAdd: (product: Product) => void;
  onAddCustomOutfit?: (config: CustomOutfitConfig) => void;
  onAddAccessoryToBag?: (accessory: AccessoryItem) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  onNavigate,
  onQuickAdd,
  onAddCustomOutfit,
  onAddAccessoryToBag,
}) => {
  // Navigation tabs: Customizer Studio (Default), All Silhouettes, or Jewelry & Accessories
  const [activeTab, setActiveTab] = useState<'customizer' | 'catalogue' | 'accessories'>('customizer');

  // Customizer state
  const [selectedBaseId, setSelectedBaseId] = useState<string>('corset-saree-2-0');
  const [bodiceColor, setBodiceColor] = useState<ColorSwatch>(COLOR_SWATCHES[0]); // Terracotta Vermillion
  const [drapeColor, setDrapeColor] = useState<ColorSwatch>(COLOR_SWATCHES[1]); // Espresso Charcoal
  const [zariFinish, setZariFinish] = useState<'antique-gold' | 'silver-noir' | 'rose-bronze'>('antique-gold');
  
  // Wearing preferences state
  const [drapeSpeed, setDrapeSpeed] = useState<'60-sec-slip-on' | 'classic-gathered'>('60-sec-slip-on');
  const [waistFit, setWaistFit] = useState<'sculpted-corset' | 'fluid-high-rise'>('sculpted-corset');
  const [palluStyle, setPalluStyle] = useState<'single-shoulder-trail' | 'belted-cross-body' | 'cape-wing'>('single-shoulder-trail');
  const [selectedSize, setSelectedSize] = useState<string>('S (UK 8)');

  // Selected accessories inside Customizer
  const [selectedAccessoryIds, setSelectedAccessoryIds] = useState<string[]>([
    'acc-waist-chain',
    'acc-haathphool',
  ]);

  // Accessories tab filter
  const [accessoryCategoryFilter, setAccessoryCategoryFilter] = useState<string>('all');

  // Toast feedback
  const [showAddedNotice, setShowAddedNotice] = useState<boolean>(false);
  const [noticeMessage, setNoticeMessage] = useState<string>('');

  // Active base garment
  const selectedBaseProduct = useMemo(() => {
    return PRODUCTS.find((p) => p.id === selectedBaseId) || PRODUCTS[0];
  }, [selectedBaseId]);

  // Selected accessories objects
  const selectedAccessories = useMemo(() => {
    return ACCESSORIES_COLLECTION.filter((acc) => selectedAccessoryIds.includes(acc.id));
  }, [selectedAccessoryIds]);

  // Calculate live total price
  const accessoriesTotalINR = useMemo(() => {
    return selectedAccessories.reduce((sum, item) => sum + item.priceINR, 0);
  }, [selectedAccessories]);

  const totalOutfitPriceINR = selectedBaseProduct.priceINR + accessoriesTotalINR;
  const totalOutfitPriceUSD = Math.round(totalOutfitPriceINR / 83);

  // Toggle accessory in customizer
  const toggleAccessory = (id: string) => {
    setSelectedAccessoryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Add individual accessory to shopping bag
  const handleSingleAccessoryAdd = (acc: AccessoryItem) => {
    if (onAddAccessoryToBag) {
      onAddAccessoryToBag(acc);
    } else {
      // Fallback: add dummy product wrapper
      onQuickAdd({
        id: acc.id,
        name: acc.name,
        subtitle: acc.vibeTag,
        priceINR: acc.priceINR,
        priceUSD: acc.priceUSD,
        category: 'Accessories',
        craftsmanshipTags: ['Cast Brass', 'Handcrafted'],
        image: acc.image,
        description: acc.description,
        fabricDetails: 'Antique Brass & Freshwater Pearls',
        drapeTime: 'Instant Wear',
        sizes: ['Universal Fit'],
        inStock: true,
      });
    }
    setNoticeMessage(`${acc.name} added to your shopping bag.`);
    setShowAddedNotice(true);
    setTimeout(() => setShowAddedNotice(false), 3000);
  };

  // Filtered standalone accessories
  const filteredAccessories = useMemo(() => {
    if (accessoryCategoryFilter === 'all') return ACCESSORIES_COLLECTION;
    return ACCESSORIES_COLLECTION.filter((a) => a.category === accessoryCategoryFilter);
  }, [accessoryCategoryFilter]);

  // Smart Gen-Z Recommendation Algorithm based on current choices
  const dynamicRecommendations = useMemo(() => {
    const isHighContrast = bodiceColor.id !== drapeColor.id;

    let styleVibe = 'High-Fashion Architectural Chic';
    let occasion = 'Sangeet Gala & Contemporary Reception';
    let stylistInsight = `Pairing ${bodiceColor.name} with ${drapeColor.name} channels the signature 2026 Gen-Z Indo-Western contrast.`;
    
    if (isHighContrast) {
      styleVibe = 'High-Contrast Maximalist Power';
      occasion = 'Sunset Cocktail & After-Party Rave';
      stylistInsight = `The juxtaposition between ${bodiceColor.name} and ${drapeColor.name} accentuates waist definition and creates runway-grade photo dimension.`;
    } else {
      styleVibe = 'Monochromatic Minimalist Luxury';
      occasion = 'Intimate Art Gallery Dinner & Minimalist Wedding';
      stylistInsight = `Tonal layering in ${bodiceColor.name} elongates the silhouette with subtle textural shifts between the corset weave and fluid silk pleats.`;
    }

    // Recommended accessories not yet selected
    const suggestedAccs = ACCESSORIES_COLLECTION.filter(
      (acc) =>
        !selectedAccessoryIds.includes(acc.id) &&
        (acc.compatiblePalettes.includes(bodiceColor.id) || acc.compatiblePalettes.includes(drapeColor.id))
    ).slice(0, 2);

    return {
      styleVibe,
      occasion,
      stylistInsight,
      suggestedAccs,
    };
  }, [bodiceColor, drapeColor, selectedAccessoryIds]);

  // Add all suggested accessories in one click
  const handleApplySuggestedAccessories = () => {
    const newIds = dynamicRecommendations.suggestedAccs.map((a) => a.id);
    setSelectedAccessoryIds((prev) => Array.from(new Set([...prev, ...newIds])));
  };

  // Handle Add Customized Outfit to Cart
  const handleAddCustomizedOutfit = () => {
    const customConfig: CustomOutfitConfig = {
      baseProduct: selectedBaseProduct,
      bodiceColor,
      drapeColor,
      zariFinish,
      drapeSpeed,
      waistFit,
      palluStyle,
      selectedAccessories,
      selectedSize,
    };

    if (onAddCustomOutfit) {
      onAddCustomOutfit(customConfig);
    } else {
      onQuickAdd(selectedBaseProduct);
    }

    setNoticeMessage(`Custom ${selectedBaseProduct.name} Outfit added to your bag!`);
    setShowAddedNotice(true);
    setTimeout(() => setShowAddedNotice(false), 3500);
  };

  // Preset Look Quick-Appliers for Gen-Z
  const applyPreset = (preset: 'sunset-rave' | 'minimalist-noir' | 'royal-heirloom' | 'dhoti-power') => {
    if (preset === 'sunset-rave') {
      setSelectedBaseId('corset-saree-2-0');
      setBodiceColor(COLOR_SWATCHES[0]); // Terracotta
      setDrapeColor(COLOR_SWATCHES[1]); // Charcoal
      setZariFinish('antique-gold');
      setDrapeSpeed('60-sec-slip-on');
      setPalluStyle('single-shoulder-trail');
      setSelectedAccessoryIds(['acc-waist-chain', 'acc-ear-cuffs']);
    } else if (preset === 'minimalist-noir') {
      setSelectedBaseId('zari-trench-kurta');
      setBodiceColor(COLOR_SWATCHES[1]); // Charcoal
      setDrapeColor(COLOR_SWATCHES[1]); // Charcoal
      setZariFinish('silver-noir');
      setWaistFit('sculpted-corset');
      setSelectedAccessoryIds(['acc-choker', 'acc-brocade-belt']);
    } else if (preset === 'royal-heirloom') {
      setSelectedBaseId('metallic-organza-saree');
      setBodiceColor(COLOR_SWATCHES[4]); // Molten Copper
      setDrapeColor(COLOR_SWATCHES[2]); // Antique Gold
      setZariFinish('antique-gold');
      setPalluStyle('cape-wing');
      setSelectedAccessoryIds(['acc-emerald-potli', 'acc-haathphool']);
    } else if (preset === 'dhoti-power') {
      setSelectedBaseId('corset-dhoti-jumpsuit');
      setBodiceColor(COLOR_SWATCHES[5]); // Cyber Marigold
      setDrapeColor(COLOR_SWATCHES[1]); // Charcoal
      setZariFinish('antique-gold');
      setSelectedAccessoryIds(['acc-haathphool', 'acc-ear-cuffs']);
    }
  };

  const handleRandomizeOutfit = () => {
    const randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
    const randomBodice = COLOR_SWATCHES[Math.floor(Math.random() * COLOR_SWATCHES.length)];
    const randomDrape = COLOR_SWATCHES[Math.floor(Math.random() * COLOR_SWATCHES.length)];
    const zariOptions: ('antique-gold' | 'silver-noir' | 'rose-bronze')[] = ['antique-gold', 'silver-noir', 'rose-bronze'];
    const randomZari = zariOptions[Math.floor(Math.random() * zariOptions.length)];
    const palluOptions: ('single-shoulder-trail' | 'belted-cross-body' | 'cape-wing')[] = ['single-shoulder-trail', 'belted-cross-body', 'cape-wing'];
    const randomPallu = palluOptions[Math.floor(Math.random() * palluOptions.length)];
    const numAccs = Math.floor(Math.random() * 3) + 1;
    const shuffledAccs = [...ACCESSORIES_COLLECTION].sort(() => 0.5 - Math.random());
    const randomAccIds = shuffledAccs.slice(0, numAccs).map((a) => a.id);

    setSelectedBaseId(randomProduct.id);
    setBodiceColor(randomBodice);
    setDrapeColor(randomDrape);
    setZariFinish(randomZari);
    setPalluStyle(randomPallu);
    setSelectedAccessoryIds(randomAccIds);
    setNoticeMessage(`Shuffled to ${randomProduct.name} in ${randomBodice.name.split(' ')[0]} × ${randomDrape.name.split(' ')[0]}!`);
    setShowAddedNotice(true);
    setTimeout(() => setShowAddedNotice(false), 2500);
  };

  const handleResetOutfit = () => {
    setSelectedBaseId('corset-saree-2-0');
    setBodiceColor(COLOR_SWATCHES[0]);
    setDrapeColor(COLOR_SWATCHES[1]);
    setZariFinish('antique-gold');
    setDrapeSpeed('60-sec-slip-on');
    setWaistFit('sculpted-corset');
    setPalluStyle('single-shoulder-trail');
    setSelectedAccessoryIds(['acc-waist-chain']);
  };

  return (
    <div className="w-full px-3 md:px-8 max-w-7xl mx-auto py-6 md:py-10 pb-28 lg:pb-10">
      {/* Studio Header & 3-Way Mode Switcher */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-2 text-[#C5A059] text-[11px] uppercase font-semibold tracking-[0.25em]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SHRI SAVITRI STUDIO · GEN-Z ATELIER</span>
        </div>
        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#1A1615] font-normal tracking-tight mb-3">
          Customizer, Silhouettes & Accessories
        </h1>
        <p className="text-sm md:text-base text-[#1A1615]/75 font-light leading-relaxed mb-6">
          Tailor your own Indo-Western aesthetic. Mix-and-match custom colors, 
          configure wearing preferences, and explore handcrafted temple jewelry & micro-potli bags.
        </p>

        {/* 3-Way Mode Switcher Tabs (Responsive on Mobile) */}
        <div className="inline-flex max-w-full overflow-x-auto p-1.5 rounded-full bg-[#F5F0EA] border border-[#EAE4DC] shadow-inner gap-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('customizer')}
            className={`px-3.5 sm:px-5 py-2 text-xs font-semibold tracking-wider uppercase rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'customizer'
                ? 'bg-[#1A1615] text-[#FAF8F5] shadow-sm'
                : 'text-[#1A1615]/70 hover:text-[#1A1615]'
            }`}
          >
            <span className="sm:hidden">🎨 Customizer</span>
            <span className="hidden sm:inline">🎨 Interactive Customizer</span>
          </button>
          <button
            onClick={() => setActiveTab('catalogue')}
            className={`px-3.5 sm:px-5 py-2 text-xs font-semibold tracking-wider uppercase rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'catalogue'
                ? 'bg-[#1A1615] text-[#FAF8F5] shadow-sm'
                : 'text-[#1A1615]/70 hover:text-[#1A1615]'
            }`}
          >
            <span className="sm:hidden">👗 Silhouettes ({PRODUCTS.length})</span>
            <span className="hidden sm:inline">👗 Silhouettes Archive ({PRODUCTS.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('accessories')}
            className={`px-3.5 sm:px-5 py-2 text-xs font-semibold tracking-wider uppercase rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'accessories'
                ? 'bg-[#1A1615] text-[#FAF8F5] shadow-sm'
                : 'text-[#1A1615]/70 hover:text-[#1A1615]'
            }`}
          >
            <span className="sm:hidden">💍 Jewelry ({ACCESSORIES_COLLECTION.length})</span>
            <span className="hidden sm:inline">💍 Accessories & Jewelry ({ACCESSORIES_COLLECTION.length})</span>
          </button>
        </div>
      </div>

      {/* QUICK PRESET MOOD SELECTOR (Gen-Z Favorites - Swipeable on Mobile) */}
      {activeTab === 'customizer' && (
        <div className="mb-6 md:mb-8 p-3 sm:p-4 rounded-xl bg-[#F5F0EA] border border-[#EAE4DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <Wand2 className="w-4 h-4 text-[#C5A059]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1615]">
              Instant Gen-Z Presets:
            </span>
          </div>
          <div className="flex flex-nowrap sm:flex-wrap overflow-x-auto pb-1.5 sm:pb-0 gap-2 scrollbar-none w-full sm:w-auto">
            <button
              onClick={() => applyPreset('sunset-rave')}
              className="px-3 py-1.5 text-xs font-medium rounded-full bg-[#FAF8F5] border border-[#EAE4DC] text-[#1A1615] hover:border-[#C5A059] transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              🌅 Sunset Sangeet
            </button>
            <button
              onClick={() => applyPreset('dhoti-power')}
              className="px-3 py-1.5 text-xs font-medium rounded-full bg-[#FAF8F5] border border-[#EAE4DC] text-[#1A1615] hover:border-[#C5A059] transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              ⚡ Cyber Dhoti
            </button>
            <button
              onClick={() => applyPreset('minimalist-noir')}
              className="px-3 py-1.5 text-xs font-medium rounded-full bg-[#FAF8F5] border border-[#EAE4DC] text-[#1A1615] hover:border-[#C5A059] transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              🖤 Noir Trench
            </button>
            <button
              onClick={() => applyPreset('royal-heirloom')}
              className="px-3 py-1.5 text-xs font-medium rounded-full bg-[#FAF8F5] border border-[#EAE4DC] text-[#1A1615] hover:border-[#C5A059] transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              ✨ Molten Organza
            </button>
            <button
              onClick={handleRandomizeOutfit}
              className="px-3.5 py-1.5 text-xs font-bold rounded-full bg-[#1A1615] text-[#FAF8F5] hover:bg-[#C5A059] hover:text-[#1A1615] transition-all flex items-center gap-1 shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
              title="Shuffle all customization options randomly"
            >
              <span>🎲 Shuffle Prototype</span>
            </button>
            <button
              onClick={handleResetOutfit}
              className="px-2.5 py-1.5 text-xs font-semibold rounded-full bg-[#FAF8F5] border border-[#EAE4DC] text-[#1A1615]/70 hover:text-[#1A1615] transition-all whitespace-nowrap shrink-0 cursor-pointer"
              title="Reset to default prototype"
            >
              ↺ Reset
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 1: INTERACTIVE CUSTOMIZER & OUTFIT BUILDER (STEP-BY-STEP FLOW)
         ========================================================================= */}
      {activeTab === 'customizer' && (
        <>
          {/* STEP-BY-STEP PROGRESS BANNER (Horizontal swipe on mobile) */}
          <div className="mb-6 p-3 sm:p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC] shadow-sm flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A059]" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#1A1615]">
                Steps:
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-medium shrink-0">
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#1A1615] text-[#FAF8F5] font-semibold whitespace-nowrap">
                1. Outfit
              </span>
              <span className="text-[#1A1615]/40 font-bold">→</span>
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#1A1615] text-[#FAF8F5] font-semibold whitespace-nowrap">
                2. Colours
              </span>
              <span className="text-[#1A1615]/40 font-bold">→</span>
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#1A1615] text-[#FAF8F5] font-semibold whitespace-nowrap">
                3. Accessories
              </span>
              <span className="text-[#1A1615]/40 font-bold">→</span>
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#C5A059] text-[#1A1615] font-bold whitespace-nowrap">
                4. Price & Bag
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-16 pb-20 lg:pb-0">
            {/* CONTROLS (Order-2 on mobile so preview appears at the top on phones, Order-1 on desktop) */}
            <div className="order-2 lg:order-1 lg:col-span-7 space-y-6 md:space-y-8">
              {/* STEP 1: CHOOSE BASE SILHOUETTE */}
              <div className="p-4 sm:p-6 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC] shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#1A1615] text-[#FAF8F5] text-xs font-bold flex items-center justify-center">
                      1
                    </span>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1A1615]">
                      Step 1: Select Outfit Type
                    </h2>
                  </div>
                  <span className="text-xs text-[#C5A059] font-medium">
                    {selectedBaseProduct.name}
                  </span>
                </div>
                <p className="text-xs text-[#1A1615]/70 mb-4">
                  Choose the garment silhouette. The picture on the right immediately displays the model wearing your selected outfit:
                </p>

              {/* Grid of Base Garments */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRODUCTS.map((prod) => {
                  const isSelected = selectedBaseId === prod.id;
                  return (
                    <div
                      key={prod.id}
                      onClick={() => setSelectedBaseId(prod.id)}
                      className={`group cursor-pointer p-3 rounded-lg border transition-all flex gap-3 items-center ${
                        isSelected
                          ? 'border-[#1A1615] bg-[#F5F0EA] ring-1 ring-[#1A1615]'
                          : 'border-[#EAE4DC] bg-white hover:border-[#C5A059]'
                      }`}
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-18 object-cover object-top rounded shrink-0 bg-[#FAF8F5]"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-[#687259] uppercase font-semibold block">
                          {prod.category}
                        </span>
                        <h3 className="font-['Playfair_Display'] text-sm font-medium text-[#1A1615] truncate">
                          {prod.name}
                        </h3>
                        <span className="text-xs font-semibold text-[#1A1615] block mt-0.5 tabular-nums">
                          ₹{prod.priceINR.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="shrink-0">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'border-[#1A1615] bg-[#1A1615] text-white'
                              : 'border-[#EAE4DC]'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-[#FAF8F5]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: CHOOSE COLORS (BODICE + DRAPE DUAL TONES) */}
            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC] shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#1A1615] text-[#FAF8F5] text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1A1615]">
                    Step 2: Choose Colours (Changes Selected Outfit in Picture)
                  </h2>
                </div>
                <span className="text-xs text-[#C5A059] font-medium">
                  {bodiceColor.name.split(' ')[0]} × {drapeColor.name.split(' ')[0]}
                </span>
              </div>
              <p className="text-xs text-[#1A1615]/70 mb-4">
                Select your bodice and drape colours. The colours in the picture on the right immediately transform to your selected palette:
              </p>

              {/* Bodice Color Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#1A1615]">
                    A. Bodice / Corset Color:
                  </label>
                  <span className="text-xs font-medium text-[#C5A059]">
                    {bodiceColor.name} · {bodiceColor.mood}
                  </span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {COLOR_SWATCHES.map((swatch) => {
                    const isSelected = bodiceColor.id === swatch.id;
                    return (
                      <button
                        key={`bodice-${swatch.id}`}
                        onClick={() => setBodiceColor(swatch)}
                        title={`${swatch.name} (${swatch.mood})`}
                        className={`group/color flex flex-col items-center p-2 rounded-lg border transition-all ${
                          isSelected
                            ? 'border-[#1A1615] bg-[#F5F0EA] scale-105 shadow-sm'
                            : 'border-[#EAE4DC] hover:border-[#C5A059]'
                        }`}
                      >
                        <div
                          className="w-7 h-7 rounded-full border shadow-inner mb-1 flex items-center justify-center"
                          style={{
                            backgroundColor: swatch.hex,
                            borderColor: swatch.borderHex || 'rgba(0,0,0,0.15)',
                          }}
                        >
                          {isSelected && (
                            <Check
                              className={`w-3.5 h-3.5 ${
                                swatch.hex === '#FAF8F5' ? 'text-[#1A1615]' : 'text-white'
                              }`}
                            />
                          )}
                        </div>
                        <span className="text-[9px] font-medium text-[#1A1615] truncate max-w-[55px] text-center">
                          {swatch.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Drape & Pleats Color Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#1A1615]">
                    B. Drape & Pleat Color:
                  </label>
                  <span className="text-xs font-medium text-[#C5A059]">
                    {drapeColor.name} · {drapeColor.mood}
                  </span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {COLOR_SWATCHES.map((swatch) => {
                    const isSelected = drapeColor.id === swatch.id;
                    return (
                      <button
                        key={`drape-${swatch.id}`}
                        onClick={() => setDrapeColor(swatch)}
                        title={`${swatch.name} (${swatch.mood})`}
                        className={`group/color flex flex-col items-center p-2 rounded-lg border transition-all ${
                          isSelected
                            ? 'border-[#1A1615] bg-[#F5F0EA] scale-105 shadow-sm'
                            : 'border-[#EAE4DC] hover:border-[#C5A059]'
                        }`}
                      >
                        <div
                          className="w-7 h-7 rounded-full border shadow-inner mb-1 flex items-center justify-center"
                          style={{
                            backgroundColor: swatch.hex,
                            borderColor: swatch.borderHex || 'rgba(0,0,0,0.15)',
                          }}
                        >
                          {isSelected && (
                            <Check
                              className={`w-3.5 h-3.5 ${
                                swatch.hex === '#FAF8F5' ? 'text-[#1A1615]' : 'text-white'
                              }`}
                            />
                          )}
                        </div>
                        <span className="text-[9px] font-medium text-[#1A1615] truncate max-w-[55px] text-center">
                          {swatch.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Zari Metallic Finish */}
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-[#1A1615] block mb-2">
                  C. Metallic Zari Thread Finish:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'antique-gold', label: '24K Antique Gold', desc: 'Warm Varanasi Patina' },
                    { id: 'silver-noir', label: 'Silver Noir Luster', desc: 'Cool Cyber Metallic' },
                    { id: 'rose-bronze', label: 'Rose Bronze Sheen', desc: 'Subtle Blush Shimmer' },
                  ].map((zari) => {
                    const isSelected = zariFinish === zari.id;
                    return (
                      <button
                        key={zari.id}
                        onClick={() => setZariFinish(zari.id as any)}
                        className={`p-2.5 rounded border text-left transition-all ${
                          isSelected
                            ? 'border-[#1A1615] bg-[#F5F0EA] font-semibold'
                            : 'border-[#EAE4DC] hover:border-[#C5A059]'
                        }`}
                      >
                        <span className="text-xs text-[#1A1615] block">{zari.label}</span>
                        <span className="text-[10px] text-[#1A1615]/60 block">{zari.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* STEP 3: WEARING PREFERENCES & FIT MOOD */}
            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC] shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#1A1615] text-[#FAF8F5] text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1A1615]">
                  Wearing Preferences (Gen-Z Fit & Drape Mobility)
                </h2>
              </div>

              <div className="space-y-4">
                {/* Drape Speed */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#1A1615] block mb-2">
                    Drape Speed & Mechanism:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setDrapeSpeed('60-sec-slip-on')}
                      className={`p-3 rounded border text-left transition-all ${
                        drapeSpeed === '60-sec-slip-on'
                          ? 'border-[#1A1615] bg-[#F5F0EA]'
                          : 'border-[#EAE4DC] hover:border-[#C5A059]'
                      }`}
                    >
                      <span className="text-xs font-semibold text-[#1A1615] block flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#C5A059]" />
                        60-Second Slip-On (Pre-Pleated)
                      </span>
                      <span className="text-[11px] text-[#1A1615]/70 block mt-0.5">
                        Invisible zip + magnetic pallu anchor. Zero pins required.
                      </span>
                    </button>

                    <button
                      onClick={() => setDrapeSpeed('classic-gathered')}
                      className={`p-3 rounded border text-left transition-all ${
                        drapeSpeed === 'classic-gathered'
                          ? 'border-[#1A1615] bg-[#F5F0EA]'
                          : 'border-[#EAE4DC] hover:border-[#C5A059]'
                      }`}
                    >
                      <span className="text-xs font-semibold text-[#1A1615] block">
                        Classic Hand-Gathered Cascade
                      </span>
                      <span className="text-[11px] text-[#1A1615]/70 block mt-0.5">
                        Adjustable pleat depth for custom event styling.
                      </span>
                    </button>
                  </div>
                </div>

                {/* Waist Fit & Boning */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#1A1615] block mb-2">
                    Corset Boning Intensity:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setWaistFit('sculpted-corset')}
                      className={`p-3 rounded border text-left transition-all ${
                        waistFit === 'sculpted-corset'
                          ? 'border-[#1A1615] bg-[#F5F0EA]'
                          : 'border-[#EAE4DC] hover:border-[#C5A059]'
                      }`}
                    >
                      <span className="text-xs font-semibold text-[#1A1615] block">
                        Sculpted Hourglass (16 Boning Rods)
                      </span>
                      <span className="text-[11px] text-[#1A1615]/70 block mt-0.5">
                        High structural posture with French grosgrain channeling.
                      </span>
                    </button>

                    <button
                      onClick={() => setWaistFit('fluid-high-rise')}
                      className={`p-3 rounded border text-left transition-all ${
                        waistFit === 'fluid-high-rise'
                          ? 'border-[#1A1615] bg-[#F5F0EA]'
                          : 'border-[#EAE4DC] hover:border-[#C5A059]'
                      }`}
                    >
                      <span className="text-xs font-semibold text-[#1A1615] block">
                        Fluid High-Rise (Comfort Flex)
                      </span>
                      <span className="text-[11px] text-[#1A1615]/70 block mt-0.5">
                        Flexible lightweight side boning for relaxed dancing.
                      </span>
                    </button>
                  </div>
                </div>

                {/* Sizing */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#1A1615] block mb-2">
                    Sizing:
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {['XS (UK 6)', 'S (UK 8)', 'M (UK 10)', 'L (UK 12)', 'Bespoke Fit'].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2 text-xs font-medium rounded border text-center transition-all ${
                          selectedSize === sz
                            ? 'bg-[#1A1615] text-[#FAF8F5] border-[#1A1615]'
                            : 'bg-[#F5F0EA] text-[#1A1615] border-[#EAE4DC] hover:border-[#C5A059]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3: GEN-Z ACCESSORIES PAIRING */}
            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC] shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#1A1615] text-[#FAF8F5] text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1A1615]">
                    Step 3: Choose Accessories (Adds into Picture on Outfit)
                  </h2>
                </div>
                <span className="text-xs text-[#687259] font-medium">
                  {selectedAccessories.length} added (+₹{accessoriesTotalINR.toLocaleString('en-IN')})
                </span>
              </div>
              <p className="text-xs text-[#1A1615]/70 mb-4">
                Click an accessory to add it directly onto the outfit in the picture. You'll see how it looks fitted on the model:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ACCESSORIES_COLLECTION.map((acc) => {
                  const isChecked = selectedAccessoryIds.includes(acc.id);
                  const isRecommended =
                    acc.compatiblePalettes.includes(bodiceColor.id) ||
                    acc.compatiblePalettes.includes(drapeColor.id);

                  return (
                    <div
                      key={acc.id}
                      onClick={() => toggleAccessory(acc.id)}
                      className={`cursor-pointer p-3 rounded-lg border transition-all flex gap-3 items-center ${
                        isChecked
                          ? 'border-[#1A1615] bg-[#F5F0EA] ring-1 ring-[#1A1615]'
                          : 'border-[#EAE4DC] bg-white hover:border-[#C5A059]'
                      }`}
                    >
                      <img
                        src={acc.image}
                        alt={acc.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 object-cover rounded shrink-0 bg-[#FAF8F5] border border-[#EAE4DC]"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] uppercase tracking-wider text-[#687259] font-semibold">
                            {acc.category}
                          </span>
                          {isRecommended && (
                            <span className="text-[8px] bg-[#C5A059]/15 text-[#775a19] px-1.5 py-0.2 rounded font-semibold uppercase tracking-wider shrink-0">
                              Matched
                            </span>
                          )}
                        </div>

                        <h4 className="text-xs font-semibold text-[#1A1615] truncate">
                          {acc.name}
                        </h4>
                        <span className="text-xs font-semibold text-[#1A1615] block tabular-nums">
                          ₹{acc.priceINR.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="shrink-0">
                        <div
                          className={`w-5 h-5 rounded border flex items-center justify-center ${
                            isChecked
                              ? 'bg-[#1A1615] border-[#1A1615] text-[#FAF8F5]'
                              : 'border-[#EAE4DC]'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* PREVIEW CANVAS (Order-1 on mobile so it displays at the top on phones, Order-2 on desktop) */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col gap-4 sm:gap-6">
            <div className="lg:sticky lg:top-24 space-y-4 sm:space-y-6">
              <div className="rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#EAE4DC] shadow-xl p-3 sm:p-5">
                {/* Live Responsive Outfit Color & Accessories Visualizer */}
                <div className="mb-4">
                  <OutfitCanvasPreview
                    baseProduct={selectedBaseProduct}
                    bodiceColor={bodiceColor}
                    drapeColor={drapeColor}
                    zariFinish={zariFinish}
                    drapeSpeed={drapeSpeed}
                    waistFit={waistFit}
                    palluStyle={palluStyle}
                    selectedAccessories={selectedAccessories}
                    onToggleAccessory={toggleAccessory}
                    editorialImage={selectedBaseProduct.image || GENZ_EDITORIAL_IMAGE}
                    onRandomize={handleRandomizeOutfit}
                    onReset={handleResetOutfit}
                  />
                </div>

                {/* REAL-TIME SMART RECOMMENDATION PANEL */}
                <div className="p-4 rounded-xl bg-[#F5F0EA] border border-[#EAE4DC] mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Gen-Z Stylist Recommendation
                    </span>
                    <span className="text-[10px] font-semibold text-[#687259] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#EAE4DC]">
                      {dynamicRecommendations.occasion}
                    </span>
                  </div>

                  <p className="text-xs text-[#1A1615]/80 leading-relaxed mb-3">
                    {dynamicRecommendations.stylistInsight}
                  </p>

                  {dynamicRecommendations.suggestedAccs.length > 0 && (
                    <div className="pt-2 border-t border-[#EAE4DC]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-semibold text-[#1A1615]">
                          Recommended for this Palette:
                        </span>
                        <button
                          onClick={handleApplySuggestedAccessories}
                          className="text-[11px] font-semibold text-[#C5A059] hover:underline"
                        >
                          + Add All ({dynamicRecommendations.suggestedAccs.length})
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        {dynamicRecommendations.suggestedAccs.map((sug) => (
                          <div
                            key={sug.id}
                            className="flex items-center justify-between text-xs text-[#1A1615]/75 bg-[#FAF8F5] p-2 rounded border border-[#EAE4DC]"
                          >
                            <span className="truncate max-w-[200px]">{sug.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-medium tabular-nums">
                                +₹{sug.priceINR.toLocaleString('en-IN')}
                              </span>
                              <button
                                onClick={() => toggleAccessory(sug.id)}
                                className="text-[10px] font-semibold uppercase bg-[#1A1615] text-[#FAF8F5] px-2 py-0.5 rounded hover:bg-[#C5A059] transition-colors"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* STEP 4: PRICING BREAKDOWN */}
                <div className="space-y-2 mb-5 text-xs text-[#1A1615] bg-[#F5F0EA] p-3.5 rounded-xl border border-[#EAE4DC]">
                  <div className="flex items-center justify-between pb-2 border-b border-[#EAE4DC]">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#C5A059]">
                      Step 4: Live Pricing Breakdown
                    </span>
                    <span className="text-[10px] text-[#687259] font-semibold">
                      Auto-Updated
                    </span>
                  </div>

                  <div className="flex justify-between pt-1">
                    <span className="text-[#1A1615]/70">Base Outfit ({selectedBaseProduct.name}):</span>
                    <span className="tabular-nums font-semibold">₹{selectedBaseProduct.priceINR.toLocaleString('en-IN')}</span>
                  </div>

                  {selectedAccessories.length > 0 ? (
                    <div className="py-1 space-y-1 pl-2 border-l-2 border-[#C5A059]/40">
                      <span className="text-[11px] font-semibold text-[#1A1615] block">
                        Selected Accessories Added in Picture:
                      </span>
                      {selectedAccessories.map((acc) => (
                        <div key={acc.id} className="flex justify-between text-[11px] text-[#1A1615]/80">
                          <span className="truncate max-w-[200px]">• {acc.name}</span>
                          <span className="tabular-nums font-medium">+₹{acc.priceINR.toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-between text-[11px] text-[#1A1615]/50 italic">
                      <span>No accessories added yet:</span>
                      <span>₹0</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-[#1A1615]/70">Bespoke Dye & Handloom Setup:</span>
                    <span className="text-[#687259] font-semibold uppercase text-[10px]">Complimentary</span>
                  </div>

                  <div className="pt-2.5 border-t border-[#EAE4DC] flex justify-between items-baseline">
                    <div>
                      <span className="text-xs uppercase tracking-wider font-bold text-[#1A1615] block">
                        Total Order Price:
                      </span>
                      <span className="text-[10px] text-[#1A1615]/50">
                        Includes GST & Bespoke Tailoring
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#1A1615] tabular-nums block">
                        ₹{totalOutfitPriceINR.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-[#1A1615]/50 block">
                        Approx. ${totalOutfitPriceUSD} USD
                      </span>
                    </div>
                  </div>
                </div>

                {/* ADD TO BAG CTA */}
                <button
                  onClick={handleAddCustomizedOutfit}
                  className="w-full py-4 bg-[#1A1615] hover:bg-[#C5A059] hover:text-[#1A1615] text-[#FAF8F5] text-xs font-semibold tracking-[0.15em] uppercase rounded transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2 mb-3"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Customized Outfit to Bag · ₹{totalOutfitPriceINR.toLocaleString('en-IN')}</span>
                </button>

                {showAddedNotice && (
                  <div className="p-3 bg-[#1A1615] text-[#FAF8F5] rounded text-xs text-center font-medium animate-fade-in flex items-center justify-center gap-2 mb-3">
                    <Check className="w-4 h-4 text-[#C5A059]" />
                    <span>{noticeMessage || 'Item successfully added to bag!'}</span>
                  </div>
                )}

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#687259]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Complimentary Bespoke Atelier Tailoring & Worldwide Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE STICKY PURCHASE BAR */}
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FAF8F5]/96 backdrop-blur-xl border-t border-[#EAE4DC] px-4 py-3 shadow-[0_-4px_25px_rgba(0,0,0,0.12)] flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-[#C5A059] block tracking-wider truncate">
              {selectedBaseProduct.name}
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#1A1615] tabular-nums">
              ₹{totalOutfitPriceINR.toLocaleString('en-IN')}
            </span>
          </div>
          <button
            onClick={handleAddCustomizedOutfit}
            className="px-5 py-2.5 bg-[#1A1615] text-[#FAF8F5] hover:bg-[#C5A059] hover:text-[#1A1615] rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all shrink-0 cursor-pointer min-h-[44px]"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </>
    )}

      {/* =========================================================================
          VIEW 2: READY-TO-WEAR ARCHIVAL SILHOUETTES (7 ITEMS)
         ========================================================================= */}
      {activeTab === 'catalogue' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              onClick={() => onNavigate('product-corset-saree')}
              className="group cursor-pointer flex flex-col bg-[#FAF8F5] border border-transparent hover:border-[#EAE4DC] p-3 rounded-lg transition-all duration-300"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded bg-[#F5F0EA] mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                {product.limitedRun && (
                  <div className="absolute top-3 left-3 bg-[#1A1615] text-[#FAF8F5] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded shadow-sm">
                    {product.limitedRun}
                  </div>
                )}

                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-[#FAF8F5]/90 text-[#1A1615] text-[11px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded backdrop-blur-md">
                    Explore Details
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickAdd(product);
                    }}
                    className="bg-[#1A1615] text-[#FAF8F5] hover:bg-[#C5A059] text-[11px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded transition-colors shadow-md"
                  >
                    + Quick Add
                  </button>
                </div>
              </div>

              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.14em] text-[#687259] font-medium block mb-1">
                    {product.category}
                  </span>
                  {/* h3 ensures all required test selectors continue matching! */}
                  <h3 className="font-['Playfair_Display'] text-xl md:text-2xl text-[#1A1615] font-medium group-hover:text-[#C5A059] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#1A1615]/70 mt-1 line-clamp-1">
                    {product.subtitle}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-['Plus_Jakarta_Sans'] text-base font-semibold text-[#1A1615] tabular-nums block">
                    ₹{product.priceINR.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-[#1A1615]/50 block">
                    ${product.priceUSD} USD
                  </span>
                </div>
              </div>

              <div className="mt-auto pt-3 border-t border-[#EAE4DC] flex flex-wrap items-center gap-2">
                {product.craftsmanshipTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-wider text-[#C5A059] font-semibold bg-[#FAF8F5] border border-[#C5A059]/40 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================================================================
          VIEW 3: JEWELRY & ACCESSORIES COLLECTION (STANDALONE BROWSABLE CATALOG)
         ========================================================================= */}
      {activeTab === 'accessories' && (
        <div className="mb-16">
          {/* Sub-Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {[
              { id: 'all', label: 'All Accessories (8)' },
              { id: 'waist', label: 'Waist Chains & Belts' },
              { id: 'neck', label: 'Chokers & Collars' },
              { id: 'bag', label: 'Velvet Potli Bags' },
              { id: 'ears', label: 'Jaali Ear Wraps' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setAccessoryCategoryFilter(f.id)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                  accessoryCategoryFilter === f.id
                    ? 'bg-[#1A1615] text-[#FAF8F5] shadow-sm'
                    : 'bg-[#F5F0EA] text-[#1A1615] border border-[#EAE4DC] hover:border-[#C5A059]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Standalone Accessories Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAccessories.map((acc) => (
              <div
                key={acc.id}
                className="bg-[#FAF8F5] border border-[#EAE4DC] rounded-xl overflow-hidden p-4 flex flex-col justify-between hover:border-[#C5A059] transition-all duration-300 shadow-sm"
              >
                <div>
                  <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#F5F0EA] mb-4">
                    <img
                      src={acc.image}
                      alt={acc.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-[#FAF8F5]/90 backdrop-blur-sm text-[9px] font-semibold uppercase tracking-wider text-[#687259] px-2 py-0.5 rounded border border-[#EAE4DC]">
                      {acc.vibeTag}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-bold block mb-1">
                    {acc.category.toUpperCase()} ATELIER
                  </span>
                  <h3 className="font-['Playfair_Display'] text-base font-semibold text-[#1A1615] mb-1 line-clamp-1">
                    {acc.name}
                  </h3>
                  <p className="text-xs text-[#1A1615]/70 line-clamp-2 mb-3">
                    {acc.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EAE4DC] flex items-center justify-between gap-2 mt-auto">
                  <div>
                    <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#1A1615] tabular-nums block">
                      ₹{acc.priceINR.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-[#1A1615]/50 block">
                      ${acc.priceUSD} USD
                    </span>
                  </div>

                  <button
                    onClick={() => handleSingleAccessoryAdd(acc)}
                    className="px-3.5 py-2 bg-[#1A1615] hover:bg-[#C5A059] hover:text-[#1A1615] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editorial Banner & Manifesto Callout (Ensures Read The Drape Manifesto remains available) */}
      <div className="rounded-xl bg-[#F5F0EA] border border-[#EAE4DC] p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A059] block mb-2">
            The Philosophy
          </span>
          <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1A1615] font-normal mb-3">
            Custom Couture Engineered for Gen-Z Liberty.
          </h2>
          <p className="text-sm text-[#1A1615]/75 font-light leading-relaxed">
            Every pleat is mathematically calibrated to fall effortlessly. Every corset is
            individually sculpted to support without restricting movement. Learn how our
            Varanasi atelier translates ancient weaving into contemporary statement wear.
          </p>
        </div>

        <div className="shrink-0">
          <a
            href="#story"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('brand-story');
            }}
            className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#1A1615] text-[#FAF8F5] hover:bg-[#C5A059] hover:text-[#1A1615] transition-all text-xs font-semibold tracking-[0.14em] uppercase rounded shadow cursor-pointer group"
          >
            <span>Read The Drape Manifesto</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
};
