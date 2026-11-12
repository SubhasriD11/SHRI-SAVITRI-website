/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Screen, CartItem, Product, CustomOutfitConfig, AccessoryItem } from './types';
import { PRODUCTS, DRAPE_STYLES } from './data/products';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { ExploreScreen } from './components/ExploreScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { BrandStoryScreen } from './components/BrandStoryScreen';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [transitionDirection, setTransitionDirection] = useState<'push' | 'push_back' | 'none'>('none');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      selectedSize: 'S (UK 8)',
      selectedDrapeStyle: 'Classic Architectural Drape',
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Navigate with specific transition type
  const navigateTo = (newScreen: Screen, transitionType: 'push' | 'push_back' | 'none' = 'push') => {
    setTransitionDirection(transitionType);
    setCurrentScreen(newScreen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product, size: string, drapeStyle: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedDrapeStyle === drapeStyle
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      }
      return [
        ...prev,
        {
          product,
          selectedSize: size,
          selectedDrapeStyle: drapeStyle,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleQuickAdd = (product: Product) => {
    handleAddToCart(product, 'S (UK 8)', 'Classic Architectural Drape');
  };

  const handleAddCustomOutfit = (config: CustomOutfitConfig) => {
    const totalCustomPrice =
      config.baseProduct.priceINR +
      config.selectedAccessories.reduce((acc, a) => acc + a.priceINR, 0);

    setCartItems((prev) => [
      ...prev,
      {
        product: config.baseProduct,
        selectedSize: config.selectedSize,
        selectedDrapeStyle: `${config.bodiceColor.name} (Bodice) × ${config.drapeColor.name} (Drape)`,
        quantity: 1,
        customConfig: {
          bodiceColorName: config.bodiceColor.name,
          drapeColorName: config.drapeColor.name,
          zariFinish: config.zariFinish,
          drapeSpeed: config.drapeSpeed,
          waistFit: config.waistFit,
          palluStyle: config.palluStyle,
          accessories: config.selectedAccessories.map((a) => a.name),
          totalCustomPriceINR: totalCustomPrice,
        },
      },
    ]);
    setIsCartOpen(true);
  };

  const handleAddAccessoryToBag = (accessory: AccessoryItem) => {
    setCartItems((prev) => [
      ...prev,
      {
        product: {
          id: accessory.id,
          name: accessory.name,
          subtitle: accessory.vibeTag,
          priceINR: accessory.priceINR,
          priceUSD: accessory.priceUSD,
          category: 'Accessories',
          craftsmanshipTags: ['Cast Brass', 'Handcrafted'],
          image: accessory.image,
          description: accessory.description,
          fabricDetails: 'Antique Brass & Freshwater Pearls',
          drapeTime: 'Instant Wear',
          sizes: ['Universal Fit'],
          inStock: true,
        },
        selectedSize: 'Universal',
        selectedDrapeStyle: 'Individual Accessory Piece',
        quantity: 1,
      },
    ]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const next = [...prev];
      next[index].quantity = newQty;
      return next;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Motion animation variants based on transitionDirection
  const variants = {
    initial: (direction: 'push' | 'push_back' | 'none') => {
      if (direction === 'push') return { opacity: 0, x: 28 };
      if (direction === 'push_back') return { opacity: 0, x: -28 };
      return { opacity: 0, x: 0 };
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const },
    },
    exit: (direction: 'push' | 'push_back' | 'none') => {
      if (direction === 'push') return { opacity: 0, x: -28, transition: { duration: 0.2 } };
      if (direction === 'push_back') return { opacity: 0, x: 28, transition: { duration: 0.2 } };
      return { opacity: 0, x: 0, transition: { duration: 0.15 } };
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A1615] antialiased selection:bg-[#C5A059]/30">
      {/* Floating Navigation Bar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={(screen) => navigateTo(screen, 'none')}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Screen Transition Viewport */}
      <main className="flex-1 w-full relative">
        <AnimatePresence mode="wait" custom={transitionDirection}>
          {currentScreen === 'home' && (
            <motion.div
              key="home"
              custom={transitionDirection}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <HomeScreen
                onNavigate={(screen) => {
                  navigateTo(screen, 'push');
                }}
              />
            </motion.div>
          )}

          {currentScreen === 'catalogue' && (
            <motion.div
              key="catalogue"
              custom={transitionDirection}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ExploreScreen
                onNavigate={(screen) => {
                  navigateTo(screen, 'push');
                }}
                onQuickAdd={handleQuickAdd}
                onAddCustomOutfit={handleAddCustomOutfit}
                onAddAccessoryToBag={handleAddAccessoryToBag}
              />
            </motion.div>
          )}

          {currentScreen === 'product-corset-saree' && (
            <motion.div
              key="product-corset-saree"
              custom={transitionDirection}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ProductDetailScreen
                onNavigate={(screen) => {
                  navigateTo(screen, 'push_back');
                }}
                onAddToCart={handleAddToCart}
              />
            </motion.div>
          )}

          {currentScreen === 'brand-story' && (
            <motion.div
              key="brand-story"
              custom={transitionDirection}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <BrandStoryScreen
                onNavigate={(screen) => {
                  navigateTo(screen, 'push');
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer onNavigate={(screen) => navigateTo(screen, 'none')} />

      {/* Slide-over Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
