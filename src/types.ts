export type Screen = 
  | 'home' 
  | 'catalogue' 
  | 'product-corset-saree' 
  | 'brand-story';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  priceINR: number;
  priceUSD: number;
  category: string;
  craftsmanshipTags: string[];
  image: string;
  secondaryImage?: string;
  description: string;
  fabricDetails: string;
  drapeTime: string;
  sizes: string[];
  limitedRun?: string;
  inStock: boolean;
}

export interface AccessoryItem {
  id: string;
  name: string;
  category: 'waist' | 'neck' | 'bag' | 'ears';
  priceINR: number;
  priceUSD: number;
  description: string;
  image: string;
  vibeTag: string;
  compatiblePalettes: string[];
  anchorLocation?: string;
}

export interface ColorSwatch {
  id: string;
  name: string;
  hex: string;
  borderHex?: string;
  mood: string;
  recommendedAccessories: string[];
}

export interface CustomOutfitConfig {
  baseProduct: Product;
  bodiceColor: ColorSwatch;
  drapeColor: ColorSwatch;
  zariFinish: 'antique-gold' | 'silver-noir' | 'rose-bronze';
  drapeSpeed: '60-sec-slip-on' | 'classic-gathered';
  waistFit: 'sculpted-corset' | 'fluid-high-rise';
  palluStyle: 'single-shoulder-trail' | 'belted-cross-body' | 'cape-wing';
  selectedAccessories: AccessoryItem[];
  selectedSize: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedDrapeStyle: string;
  quantity: number;
  customConfig?: {
    bodiceColorName: string;
    drapeColorName: string;
    zariFinish: string;
    drapeSpeed: string;
    waistFit: string;
    palluStyle: string;
    accessories: string[];
    totalCustomPriceINR: number;
  };
}
