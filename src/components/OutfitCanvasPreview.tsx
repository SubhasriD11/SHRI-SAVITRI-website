import React, { useState } from 'react';
import { ColorSwatch, AccessoryItem, Product } from '../types';
import {
  Sparkles,
  X,
  Check,
  Eye,
  Layers,
  RotateCcw,
  Sliders,
  ZoomIn,
  Palette,
  Shuffle,
  ShieldCheck,
} from 'lucide-react';

interface OutfitCanvasPreviewProps {
  baseProduct: Product;
  bodiceColor: ColorSwatch;
  drapeColor: ColorSwatch;
  zariFinish: 'antique-gold' | 'silver-noir' | 'rose-bronze';
  drapeSpeed?: '60-sec-slip-on' | 'classic-gathered';
  waistFit?: 'sculpted-corset' | 'fluid-high-rise';
  palluStyle?: 'single-shoulder-trail' | 'belted-cross-body' | 'cape-wing';
  selectedAccessories: AccessoryItem[];
  onToggleAccessory?: (id: string) => void;
  editorialImage?: string;
  onRandomize?: () => void;
  onReset?: () => void;
}

export const OutfitCanvasPreview: React.FC<OutfitCanvasPreviewProps> = ({
  baseProduct,
  bodiceColor,
  drapeColor,
  zariFinish,
  drapeSpeed = '60-sec-slip-on',
  waistFit = 'sculpted-corset',
  palluStyle = 'single-shoulder-trail',
  selectedAccessories,
  onToggleAccessory,
  onRandomize,
  onReset,
}) => {
  // Prototype Studio Viewport Controls
  const [viewZoom, setViewZoom] = useState<'full' | 'bodice' | 'drape'>('full');
  const [canvasTheme, setCanvasTheme] = useState<'parchment' | 'dark-atelier'>('dark-atelier');

  // Metallic Zari styling
  const zariDetails = {
    'antique-gold': {
      label: '24K Varanasi Gold',
      stroke: '#D4AF37',
      fill: '#F3E5AB',
      highlight: '#FFF9D2',
      shadow: '#8C6F12',
    },
    'silver-noir': {
      label: 'Silver Noir Luster',
      stroke: '#CBD5E1',
      fill: '#F1F5F9',
      highlight: '#FFFFFF',
      shadow: '#64748B',
    },
    'rose-bronze': {
      label: 'Rose Bronze Sheen',
      stroke: '#B85D36',
      fill: '#F8D7C7',
      highlight: '#FFE8DE',
      shadow: '#6C2A0E',
    },
  }[zariFinish];

  // Accessory presence checks
  const hasWaistChain = selectedAccessories.some((a) => a.id === 'acc-waist-chain');
  const hasChoker = selectedAccessories.some((a) => a.id === 'acc-choker');
  const hasHaathphool = selectedAccessories.some((a) => a.id === 'acc-haathphool' || a.id === 'acc-ring-harness');
  const hasEarCuffs = selectedAccessories.some((a) => a.id === 'acc-ear-cuffs');
  const hasPotli = selectedAccessories.some((a) => a.id === 'acc-emerald-potli' || a.id === 'acc-potli-clutch');
  const hasBrocadeBelt = selectedAccessories.some((a) => a.id === 'acc-brocade-belt');

  const accessoriesTotalINR = selectedAccessories.reduce((sum, item) => sum + item.priceINR, 0);
  const totalOutfitPriceINR = baseProduct.priceINR + accessoriesTotalINR;

  const isDark = canvasTheme === 'dark-atelier';

  return (
    <div
      className={`relative aspect-[3/4] w-full overflow-hidden rounded-2xl border transition-colors duration-500 shadow-2xl flex flex-col justify-between select-none ${
        isDark
          ? 'bg-[#141110] border-[#38302D] text-[#FAF8F5]'
          : 'bg-[#F9F6F0] border-[#E5DEC9] text-[#1A1615]'
      }`}
    >
      {/* =========================================================================
          COUTURE DRAFTING CANVAS GRID & MEASUREMENT TICKS
         ========================================================================= */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(circle at 1px 1px, rgba(197,160,89,0.3) 1px, transparent 0)'
            : 'radial-gradient(circle at 1px 1px, rgba(26,22,21,0.2) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Atelier Specification Watermark */}
      <div className="absolute top-12 left-4 pointer-events-none opacity-40 text-[9px] uppercase tracking-[0.25em] font-mono leading-relaxed">
        <div>SHRI SAVITRI STUDIO</div>
        <div>CROQUIS PROTOTYPE · 04</div>
        <div className="text-[#C5A059]">SCALE 1:12 · BESPOKE FIT</div>
      </div>

      {/* =========================================================================
          TOP FLOATING BAR: THEME, ZOOM & SHUFFLE CONTROLS
         ========================================================================= */}
      <div className="relative z-30 p-3 sm:p-4 flex items-center justify-between gap-2">
        {/* Active Colors Swatch Indicator */}
        <div
          className={`px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border shadow-md flex items-center gap-2 backdrop-blur-md ${
            isDark ? 'bg-[#1C1816]/90 border-[#38302D] text-[#FAF8F5]' : 'bg-[#FAF8F5]/90 border-[#EAE4DC] text-[#1A1615]'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <span
              className="w-3.5 h-3.5 rounded-full border border-black/30 shadow-inner"
              style={{ backgroundColor: bodiceColor.hex }}
            />
            <span className="font-bold">{bodiceColor.name.split(' ')[0]}</span>
          </div>
          <span className="text-[#C5A059] font-bold">×</span>
          <div className="flex items-center gap-1.5">
            <span
              className="w-3.5 h-3.5 rounded-full border border-black/30 shadow-inner"
              style={{ backgroundColor: drapeColor.hex }}
            />
            <span className="font-bold">{drapeColor.name.split(' ')[0]}</span>
          </div>
        </div>

        {/* Prototype Toolbar */}
        <div
          className={`flex items-center gap-1.5 p-1 rounded-full border shadow-md backdrop-blur-md ${
            isDark ? 'bg-[#1C1816]/90 border-[#38302D]' : 'bg-[#FAF8F5]/90 border-[#EAE4DC]'
          }`}
        >
          {/* Zoom Level Switcher */}
          <button
            onClick={() => {
              if (viewZoom === 'full') setViewZoom('bodice');
              else if (viewZoom === 'bodice') setViewZoom('drape');
              else setViewZoom('full');
            }}
            title="Toggle Viewport Zoom"
            className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#C5A059]/20 text-[#C5A059] hover:bg-[#C5A059]/30 transition-all cursor-pointer"
          >
            {viewZoom === 'full' ? 'Full Figure' : viewZoom === 'bodice' ? 'Corset Zoom' : 'Drape Zoom'}
          </button>

          {/* Theme Toggle: Dark Atelier / Parchment */}
          <button
            onClick={() => setCanvasTheme(isDark ? 'parchment' : 'dark-atelier')}
            title="Toggle Canvas Theme"
            className="px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider text-[#C5A059] hover:text-white transition-colors cursor-pointer"
          >
            {isDark ? 'Parchment' : 'Dark'}
          </button>

          {/* Shuffle / Randomize */}
          {onRandomize && (
            <button
              onClick={onRandomize}
              title="Shuffle Look Options"
              className="p-1 rounded-full text-[#C5A059] hover:text-white transition-colors cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          PROTOTYPE MODEL SKETCH (HAUTE COUTURE MANNEQUIN CROQUIS)
          Zero photographic human clutter! Pure luxury fashion sketch where every
          color, fabric pleat, boning rib, and accessory is clearly and crisply rendered.
         ========================================================================= */}
      <div
        className={`relative flex-1 w-full flex items-center justify-center transition-transform duration-700 ${
          viewZoom === 'bodice'
            ? 'scale-150 translate-y-[18%]'
            : viewZoom === 'drape'
            ? 'scale-140 -translate-y-[15%]'
            : 'scale-100 translate-y-0'
        }`}
      >
        <svg
          viewBox="0 0 340 500"
          className="w-full h-full max-h-[460px] drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
        >
          <defs>
            {/* Linear and radial gradients for fabric sheen and shadows */}
            <linearGradient id="bodiceShine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={bodiceColor.hex} stopOpacity="1" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.25" />
              <stop offset="100%" stopColor={bodiceColor.hex} stopOpacity="0.85" />
            </linearGradient>

            <linearGradient id="drapeShine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={drapeColor.hex} stopOpacity="0.9" />
              <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.2" />
              <stop offset="70%" stopColor={drapeColor.hex} stopOpacity="1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
            </linearGradient>

            <linearGradient id="zariGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={zariDetails.shadow} />
              <stop offset="50%" stopColor={zariDetails.highlight} />
              <stop offset="100%" stopColor={zariDetails.stroke} />
            </linearGradient>

            <filter id="fabricDropShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* ===================================================================
              1. MANNEQUIN CROQUIS FORM (Head, Neck, Shoulders, Arms, Pedestal)
             =================================================================== */}
          <g id="mannequin-frame" opacity={isDark ? '0.75' : '0.6'}>
            {/* Elegant Head / Face Form */}
            <path
              d="M 170 32 C 160 32 154 44 154 58 C 154 74 163 86 170 88 C 177 86 186 74 186 58 C 186 44 180 32 170 32 Z"
              fill={isDark ? '#231E1C' : '#E8E1D5'}
              stroke={isDark ? '#4A403C' : '#C2B6A2'}
              strokeWidth="1.2"
            />
            {/* Haute Couture Slender Neck */}
            <path
              d="M 165 86 L 164 116 L 176 116 L 175 86 Z"
              fill={isDark ? '#231E1C' : '#E8E1D5'}
              stroke={isDark ? '#4A403C' : '#C2B6A2'}
              strokeWidth="1.2"
            />
            {/* Clavicle / Shoulder Baseline */}
            <path
              d="M 130 125 Q 170 118 210 125"
              fill="none"
              stroke={isDark ? '#4A403C' : '#C2B6A2'}
              strokeWidth="1.5"
            />
            {/* Graceful Arms (Holding Drape Posture) */}
            {/* Left Arm */}
            <path
              d="M 130 125 Q 112 170 108 220 Q 106 250 118 280"
              fill="none"
              stroke={isDark ? '#3D3430' : '#CFC4B2'}
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Right Arm */}
            <path
              d="M 210 125 Q 228 170 232 220 Q 234 250 226 295"
              fill="none"
              stroke={isDark ? '#3D3430' : '#CFC4B2'}
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>

          {/* ===================================================================
              2. LOWER DRAPE / SAREE PLEATS / DHOTI TROUSERS
              Dynamically filled with drapeColor & pleat shadows
             =================================================================== */}
          <g id="lower-garment-layer" filter="url(#fabricDropShadow)">
            {baseProduct.id === 'corset-dhoti-jumpsuit' ? (
              /* Dhoti Cowl Jumpsuit Trousers */
              <g id="dhoti-pants">
                {/* Left Leg Cowl */}
                <path
                  d="M 148 215 Q 115 260 118 360 Q 120 420 144 465 L 164 465 Q 152 400 156 320 Q 160 260 170 225 Z"
                  fill={drapeColor.hex}
                  stroke={zariDetails.stroke}
                  strokeWidth="1.5"
                />
                {/* Right Leg Cowl */}
                <path
                  d="M 192 215 Q 225 260 222 360 Q 220 420 196 465 L 176 465 Q 188 400 184 320 Q 180 260 170 225 Z"
                  fill={drapeColor.hex}
                  stroke={zariDetails.stroke}
                  strokeWidth="1.5"
                />
                {/* Dhoti Pleat Fold Accents */}
                <path d="M 148 240 Q 130 300 152 380" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
                <path d="M 192 240 Q 210 300 188 380" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
              </g>
            ) : baseProduct.id === 'zari-trench-kurta' || baseProduct.id === 'the-trench-kurta-noir' ? (
              /* Zari Trench Kurta Silhouette */
              <g id="trench-kurta-skirt">
                <path
                  d="M 146 215 L 130 380 Q 170 395 210 380 L 194 215 Z"
                  fill={drapeColor.hex}
                  stroke={zariDetails.stroke}
                  strokeWidth="1.5"
                />
                {/* Front Center Slit */}
                <line x1="170" y1="260" x2="170" y2="385" stroke={zariDetails.stroke} strokeWidth="2" strokeDasharray="4,2" />
                {/* Trench Hem Border */}
                <path d="M 130 380 Q 170 395 210 380" fill="none" stroke={zariDetails.stroke} strokeWidth="4" />
              </g>
            ) : (
              /* Saree Silhouette (Corset Saree 2.0 & Metallic Organza Saree) */
              <g id="saree-skirt-pleats">
                {/* Base Saree Skirt & Hemline */}
                <path
                  d="M 146 212 Q 130 260 126 340 Q 124 410 118 472 Q 170 484 222 472 Q 216 410 214 340 Q 210 260 194 212 Z"
                  fill="url(#drapeShine)"
                  stroke={zariDetails.stroke}
                  strokeWidth="1.5"
                />

                {/* Pre-Pleated Architectural Chanderi Silk Folds */}
                {[146, 155, 164, 173, 182, 191].map((px, i) => (
                  <path
                    key={i}
                    d={`M ${px} 215 Q ${px - 3 + i} 330 ${126 + i * 16} 474`}
                    fill="none"
                    stroke={i % 2 === 0 ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.2)'}
                    strokeWidth="1.8"
                  />
                ))}

                {/* Saree Border Zari Embroidery at Bottom Hem */}
                <path
                  d="M 118 472 Q 170 484 222 472"
                  fill="none"
                  stroke="url(#zariGlow)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M 119 466 Q 170 478 221 466"
                  fill="none"
                  stroke={zariDetails.stroke}
                  strokeWidth="1.5"
                  strokeDasharray="3,1.5"
                />
              </g>
            )}
          </g>

          {/* ===================================================================
              3. UPPER BODICE / ARCHITECTURAL CORSET
              Dynamically filled with bodiceColor with internal spiral boning lines
             =================================================================== */}
          <g id="corset-bodice-layer" filter="url(#fabricDropShadow)">
            {/* Corset Bodice Base Shape */}
            <path
              d="M 136 128 Q 153 118 170 126 Q 187 118 204 128 L 194 214 Q 170 218 146 214 Z"
              fill="url(#bodiceShine)"
              stroke={zariDetails.stroke}
              strokeWidth="2"
            />

            {/* Sweetheart Neckline Trim */}
            <path
              d="M 136 128 Q 153 118 170 126 Q 187 118 204 128"
              fill="none"
              stroke="url(#zariGlow)"
              strokeWidth="2.5"
            />

            {/* Architectural Spiral Steel Boning Channels (8 visible ribs) */}
            {[144, 152, 161, 170, 179, 188, 196].map((bx, i) => (
              <path
                key={i}
                d={`M ${bx} 125 Q ${bx < 170 ? bx + 2 : bx > 170 ? bx - 2 : bx} 170 ${
                  146 + i * 8
                } 214`}
                fill="none"
                stroke={i === 3 ? zariDetails.stroke : 'rgba(0,0,0,0.3)'}
                strokeWidth={i === 3 ? '1.8' : '1.2'}
                strokeDasharray={i === 3 ? 'none' : '4,2'}
              />
            ))}

            {/* Corset Waist Cinched Seam */}
            <path
              d="M 146 214 Q 170 219 194 214"
              fill="none"
              stroke="url(#zariGlow)"
              strokeWidth="3"
            />
          </g>

          {/* ===================================================================
              4. PALLU DRAPING LAYER
              Updates dynamically based on selected palluStyle:
              - single-shoulder-trail (Classic drape over shoulder down the back)
              - belted-cross-body (Modern cinched cross-body drape)
              - cape-wing (Architectural wings on both sides)
             =================================================================== */}
          <g id="pallu-drape-layer" filter="url(#fabricDropShadow)">
            {palluStyle === 'belted-cross-body' ? (
              /* Belted Cross-Body Sash Drape */
              <g id="pallu-crossbody">
                <path
                  d="M 140 126 L 196 212 L 184 220 L 130 134 Z"
                  fill={drapeColor.hex}
                  stroke={zariDetails.stroke}
                  strokeWidth="2"
                />
                {/* Zari Edges */}
                <line x1="140" y1="126" x2="196" y2="212" stroke="url(#zariGlow)" strokeWidth="2.5" />
                <line x1="130" y1="134" x2="184" y2="220" stroke="url(#zariGlow)" strokeWidth="2.5" />
              </g>
            ) : palluStyle === 'cape-wing' ? (
              /* Architectural Cape Wings */
              <g id="pallu-cape-wing">
                {/* Left Shoulder Wing */}
                <path
                  d="M 136 128 Q 70 170 76 300 Q 110 240 134 190 Z"
                  fill={drapeColor.hex}
                  opacity="0.8"
                  stroke={zariDetails.stroke}
                  strokeWidth="1.5"
                />
                {/* Right Shoulder Wing */}
                <path
                  d="M 204 128 Q 270 170 264 300 Q 230 240 206 190 Z"
                  fill={drapeColor.hex}
                  opacity="0.8"
                  stroke={zariDetails.stroke}
                  strokeWidth="1.5"
                />
              </g>
            ) : (
              /* Classic Single-Shoulder Cascading Trail */
              <g id="pallu-shoulder-trail">
                <path
                  d="M 136 128 Q 110 170 96 260 Q 88 360 82 460 Q 106 440 118 360 Q 126 260 144 200 Z"
                  fill={drapeColor.hex}
                  stroke={zariDetails.stroke}
                  strokeWidth="1.5"
                />
                {/* Pallu Border Zari Ribbon */}
                <path
                  d="M 136 128 Q 110 170 96 260 Q 88 360 82 460"
                  fill="none"
                  stroke="url(#zariGlow)"
                  strokeWidth="3.5"
                />
              </g>
            )}
          </g>

          {/* ===================================================================
              5. ATTACHED ACCESSORIES (CUSTOMIZED ON THE CROQUIS)
              No plus icons! Clean luxury jewelry rendered on anatomical points.
             =================================================================== */}
          <g id="accessories-overlay">
            {/* 5A. Sculpted Waist Chain (Kamarbandh) */}
            {hasWaistChain && (
              <g id="acc-waist-chain-render" filter="url(#fabricDropShadow)">
                <path
                  d="M 144 218 Q 170 236 196 218"
                  fill="none"
                  stroke={zariDetails.stroke}
                  strokeWidth="3"
                />
                <path
                  d="M 146 224 Q 170 244 194 224"
                  fill="none"
                  stroke={zariDetails.highlight}
                  strokeWidth="1.8"
                  strokeDasharray="3,1.5"
                />
                {/* Micro Ghungroo Bell Charms */}
                {[152, 161, 170, 179, 188].map((cx, i) => (
                  <circle
                    key={i}
                    cx={cx}
                    cy={i === 2 ? 238 : i === 1 || i === 3 ? 234 : 228}
                    r="2.5"
                    fill={zariDetails.stroke}
                    stroke="#1A1615"
                    strokeWidth="0.6"
                  />
                ))}
              </g>
            )}

            {/* 5B. Chunky Antique Zari Collar Choker */}
            {hasChoker && (
              <g id="acc-choker-render" filter="url(#fabricDropShadow)">
                <path
                  d="M 160 106 Q 170 114 180 106"
                  fill="none"
                  stroke={zariDetails.shadow}
                  strokeWidth="5"
                />
                <path
                  d="M 160 106 Q 170 114 180 106"
                  fill="none"
                  stroke="url(#zariGlow)"
                  strokeWidth="3.5"
                  strokeDasharray="2,1"
                />
                {/* Center pearl drop */}
                <circle cx="170" cy="116" r="2.5" fill="#FAF8F5" stroke={zariDetails.stroke} strokeWidth="0.8" />
              </g>
            )}

            {/* 5C. Temple Haathphool & Filigree Cuff on Wrist */}
            {hasHaathphool && (
              <g id="acc-haathphool-render">
                {/* Wrist Cuff */}
                <ellipse cx="114" cy="272" rx="5" ry="3" fill="none" stroke="url(#zariGlow)" strokeWidth="3" />
                {/* Chain to Finger */}
                <line x1="114" y1="272" x2="116" y2="284" stroke={zariDetails.stroke} strokeWidth="1" strokeDasharray="1.5,1" />
                {/* Finger Ring */}
                <circle cx="116" cy="285" r="2" fill={zariDetails.stroke} />
              </g>
            )}

            {/* 5D. Mughal Jaali Ear Wraps on Ear */}
            {hasEarCuffs && (
              <g id="acc-ear-cuffs-render">
                <circle cx="186" cy="56" r="3.5" fill="url(#zariGlow)" stroke="#1A1615" strokeWidth="0.6" />
                <path d="M 186 58 Q 188 64 187 68" fill="none" stroke={zariDetails.stroke} strokeWidth="1.2" />
              </g>
            )}

            {/* 5E. Velvet Micro Potli Bag hanging at Hip */}
            {hasPotli && (
              <g id="acc-potli-render" filter="url(#fabricDropShadow)">
                {/* Hanging pearl drawstring */}
                <line x1="198" y1="228" x2="204" y2="260" stroke={zariDetails.stroke} strokeWidth="1.5" strokeDasharray="2,1" />
                {/* Potli pouch */}
                <path
                  d="M 197 262 C 192 262 192 276 195 282 C 198 288 210 288 213 282 C 216 276 216 262 211 262 Z"
                  fill="#687259"
                  stroke={zariDetails.stroke}
                  strokeWidth="1.2"
                />
                {/* Potli Gold Tassel */}
                <line x1="204" y1="282" x2="204" y2="292" stroke="url(#zariGlow)" strokeWidth="1.8" />
              </g>
            )}

            {/* 5F. Zari Brocade Corset Belt */}
            {hasBrocadeBelt && (
              <g id="acc-belt-render">
                <path
                  d="M 144 212 Q 170 216 196 212 L 196 220 Q 170 224 144 220 Z"
                  fill="url(#zariGlow)"
                  stroke={zariDetails.stroke}
                  strokeWidth="1"
                />
                {/* Cast Buckle */}
                <rect x="166" y="212" width="8" height="9" fill={zariDetails.shadow} stroke={zariDetails.highlight} strokeWidth="1" />
              </g>
            )}
          </g>

          {/* ===================================================================
              6. CROQUIS SKETCH PEDESTAL (Atelier Mannequin Base)
             =================================================================== */}
          <g id="pedestal" opacity={isDark ? '0.5' : '0.4'}>
            <line x1="170" y1="472" x2="170" y2="495" stroke={isDark ? '#4A403C' : '#C2B6A2'} strokeWidth="2.5" />
            <ellipse cx="170" cy="495" rx="28" ry="4" fill={isDark ? '#231E1C' : '#E8E1D5'} stroke={isDark ? '#4A403C' : '#C2B6A2'} strokeWidth="1.2" />
          </g>
        </svg>
      </div>

      {/* =========================================================================
          BOTTOM ATELIER SPECIFICATION & LIVE PRICE DASHBOARD
         ========================================================================= */}
      <div
        className={`relative z-30 p-4 space-y-2 border-t backdrop-blur-md ${
          isDark
            ? 'bg-[#141110]/95 border-[#38302D] text-[#FAF8F5]'
            : 'bg-[#FAF8F5]/95 border-[#EAE4DC] text-[#1A1615]'
        }`}
      >
        <div className="flex items-end justify-between text-xs">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold block">
                Atelier Prototype Studio
              </span>
            </div>
            <h4 className="font-['Playfair_Display'] text-lg font-medium leading-tight">
              {baseProduct.name}
            </h4>
            <span className="text-[11px] opacity-80 font-light block">
              {bodiceColor.name} Corset × {drapeColor.name} Drape
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-semibold block">
              {zariDetails.label}
            </span>
            <span className="text-xs font-bold block tabular-nums">
              ₹{totalOutfitPriceINR.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center gap-1.5 text-[9px] uppercase tracking-wider font-semibold">
          <span
            className={`px-2 py-0.5 rounded border ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
            }`}
          >
            {drapeSpeed === '60-sec-slip-on' ? '⚡ 60-Sec Drape' : 'Hand-Gathered'}
          </span>
          <span
            className={`px-2 py-0.5 rounded border ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
            }`}
          >
            {waistFit === 'sculpted-corset' ? '⌛ Sculpted Boning' : 'Fluid High-Rise'}
          </span>
          <span
            className={`px-2 py-0.5 rounded border ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
            }`}
          >
            {palluStyle === 'belted-cross-body'
              ? '⚔️ Belted Cross-Body'
              : palluStyle === 'cape-wing'
              ? '🪽 Cape Wing'
              : '✨ Single Shoulder Trail'}
          </span>
        </div>

        {/* Attached Accessories Chips */}
        <div className="pt-2 border-t border-current/15">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] opacity-85 font-semibold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              Fitted Accessories ({selectedAccessories.length}):
            </span>
            <span className="text-[10px] text-[#C5A059] tabular-nums font-semibold">
              +₹{accessoriesTotalINR.toLocaleString('en-IN')}
            </span>
          </div>

          {selectedAccessories.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1.5">
              {selectedAccessories.map((acc) => (
                <div
                  key={acc.id}
                  className={`border px-2.5 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1.5 shadow-sm ${
                    isDark ? 'bg-[#1F1A18] border-[#3D332F]' : 'bg-white border-[#EAE4DC]'
                  }`}
                >
                  <span className="truncate max-w-[100px]">{acc.name.split(' ')[0]}</span>
                  <span className="text-[9px] text-[#687259] tabular-nums">₹{acc.priceINR}</span>
                  {onToggleAccessory && (
                    <button
                      onClick={() => onToggleAccessory(acc.id)}
                      title={`Remove ${acc.name}`}
                      className="opacity-60 hover:opacity-100 hover:text-[#C85A32] ml-0.5 cursor-pointer"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <span className="text-[10px] opacity-60 italic block">
              Tap any accessory in Step 3 to see it fitted onto the croquis sketch.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
