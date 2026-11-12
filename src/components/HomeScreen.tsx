import React from 'react';
import { Screen } from '../types';
import { HERO_IMAGE, CORSET_SAREE_IMAGE, TRENCH_KURTA_IMAGE, ORGANZA_SAREE_IMAGE, ATELIER_IMAGE, GENZ_EDITORIAL_IMAGE, ACCESSORIES_IMAGE, HAATHPHOOL_IMAGE, EMERALD_POTLI_IMAGE, ACCESSORIES_COLLECTION } from '../data/products';
import { ArrowRight, Sparkles, Clock, ShieldCheck, Compass, ShoppingBag } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="w-full">
      {/* Editorial Hero Section */}
      <section className="relative px-3 md:px-8 max-w-7xl mx-auto pt-4 md:pt-8 pb-16 md:pb-24">
        <div className="relative rounded-2xl overflow-hidden bg-[#1A1615] text-[#FAF8F5] min-h-[580px] md:min-h-[680px] flex flex-col justify-end p-6 md:p-14 border border-[#EAE4DC]/20 shadow-2xl">
          {/* Background Hero Image */}
          <img
            src={HERO_IMAGE}
            alt="SHRI SAVITRI Editorial Couture Drape"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-85 transition-transform duration-1000 scale-100 hover:scale-105"
          />

          {/* Luxury Editorial Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1615] via-[#1A1615]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1615]/70 via-transparent to-transparent hidden md:block" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-4 text-[#C5A059] text-[11px] md:text-xs uppercase font-semibold tracking-[0.25em]">
              <span>Haute Couture Drop 04</span>
              <span aria-hidden="true">·</span>
              <span>The Varanasi Atelier</span>
            </div>

            <h1 className="font-['Playfair_Display'] text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] font-normal tracking-tight text-[#FAF8F5] mb-5 md:mb-6 text-balance">
              Architectural Drapes Meet Heritage Weaves.
            </h1>

            <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base md:text-lg text-[#FAF8F5]/85 font-light leading-relaxed mb-6 md:mb-8 max-w-xl">
              Where 5,000 years of unstitched silk heritage intersects Parisian corsetry 
              and sharp Savile Row tailoring. Designed for effortless 2-minute wear.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('catalogue')}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#FAF8F5] text-[#1A1615] hover:bg-[#C5A059] hover:text-[#1A1615] transition-all duration-300 text-xs md:text-sm font-semibold tracking-[0.14em] uppercase rounded shadow-lg flex items-center justify-center gap-3 cursor-pointer group"
              >
                <span>Explore Drop</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate('brand-story')}
                className="w-full sm:w-auto px-7 py-3.5 border border-[#FAF8F5]/40 text-[#FAF8F5] hover:bg-[#FAF8F5]/10 transition-all duration-300 text-xs md:text-sm font-medium tracking-[0.12em] uppercase rounded flex items-center justify-center"
              >
                Atelier Process
              </button>
            </div>
          </div>

          {/* Hero Micro Metadata Strip */}
          <div className="relative z-10 mt-12 pt-6 border-t border-[#FAF8F5]/20 flex flex-wrap items-center justify-between gap-4 text-xs tracking-wider text-[#FAF8F5]/70 font-light">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Pre-Pleated 2-Minute Drape</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Pure Varanasi Gold Zari</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Bespoke Couture Tailoring Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gen-Z Customizer Studio Showcase Banner */}
      <section className="px-3 md:px-8 max-w-7xl mx-auto -mt-6 mb-12">
        <div className="rounded-2xl bg-[#F5F0EA] border border-[#EAE4DC] p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#C5A059] flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              New · Gen-Z Bespoke Studio
            </span>
            <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1A1615] font-normal mb-2">
              Design Your Own Indo-Western Look
            </h2>
            <p className="text-xs md:text-sm text-[#1A1615]/75 font-light leading-relaxed mb-4">
              Don't settle for off-the-rack. Choose your custom bodice tone, drape flow, 
              boning intensity, and layer with sculpted brass waist chains and zari chokers. 
              Our real-time engine recommends the ideal pairings for your chosen palette.
            </p>
            <div className="flex flex-wrap items-center gap-2 mb-4 text-[11px] font-semibold text-[#1A1615]">
              <span className="bg-[#FAF8F5] border border-[#EAE4DC] px-2.5 py-1 rounded-full">
                🎨 Dual-Tone Palette (8 Swatches)
              </span>
              <span className="bg-[#FAF8F5] border border-[#EAE4DC] px-2.5 py-1 rounded-full">
                ⚡ 60-Sec Slip-On or Classic Drape
              </span>
              <span className="bg-[#FAF8F5] border border-[#EAE4DC] px-2.5 py-1 rounded-full">
                💍 Handcrafted Gen-Z Accessories
              </span>
            </div>
            <button
              onClick={() => onNavigate('catalogue')}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#1A1615] text-[#FAF8F5] hover:bg-[#C5A059] hover:text-[#1A1615] text-xs font-semibold uppercase tracking-wider rounded transition-all shadow cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <span>Open Customizer Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 w-full sm:w-auto shrink-0">
            <div className="relative w-1/2 sm:w-36 md:w-40 aspect-[3/4] rounded-lg overflow-hidden border border-[#EAE4DC] shadow-md">
              <img
                src={GENZ_EDITORIAL_IMAGE}
                alt="Custom Outfit Preview"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
              <span className="absolute bottom-1 inset-x-1 text-[9px] font-semibold uppercase tracking-wider bg-[#1A1615]/80 text-[#FAF8F5] py-0.5 text-center rounded">
                Custom Drape
              </span>
            </div>

            <div className="relative w-1/2 sm:w-36 md:w-40 aspect-[3/4] rounded-lg overflow-hidden border border-[#EAE4DC] shadow-md">
              <img
                src={ACCESSORIES_IMAGE}
                alt="Paired Accessories"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 inset-x-1 text-[9px] font-semibold uppercase tracking-wider bg-[#1A1615]/80 text-[#FAF8F5] py-0.5 text-center rounded">
                Paired Jewelry
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection: Curated Silhouettes */}
      <section className="px-3 md:px-8 max-w-7xl mx-auto py-12 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#EAE4DC] gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#C5A059] block mb-2">
              Autumn / Winter Archive
            </span>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#1A1615] font-normal tracking-tight">
              Curated Silhouettes
            </h2>
          </div>

          <a
            href="#catalogue"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('catalogue');
            }}
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-[0.12em] uppercase text-[#1A1615] hover:text-[#C5A059] transition-colors self-start md:self-auto group"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Card 1: Corset Saree 2.0 */}
          <div
            onClick={() => onNavigate('product-corset-saree')}
            className="group cursor-pointer flex flex-col bg-[#FAF8F5] transition-all duration-300"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded bg-[#F5F0EA] mb-4">
              <img
                src={CORSET_SAREE_IMAGE}
                alt="Corset Saree 2.0"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-[#C85A32] text-[#FAF8F5] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
                Iconic Silhouette
              </div>
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1A1615]/85 text-[#FAF8F5] text-[11px] font-medium tracking-wider uppercase px-3 py-1.5 rounded backdrop-blur-sm">
                View Piece →
              </div>
            </div>

            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[11px] uppercase tracking-[0.15em] text-[#687259] font-medium block mb-1">
                  Pre-Draped Silk
                </span>
                <h4 className="font-['Playfair_Display'] text-xl md:text-2xl text-[#1A1615] font-medium group-hover:text-[#C5A059] transition-colors">
                  Corset Saree 2.0
                </h4>
                <p className="text-xs text-[#1A1615]/60 mt-1 line-clamp-1">
                  Hand-boned bodice in pure gold zari with unstitched cascade
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="font-['Plus_Jakarta_Sans'] text-sm md:text-base font-semibold text-[#1A1615] tabular-nums block">
                  ₹6,850
                </span>
                <span className="text-[11px] text-[#1A1615]/50 block">
                  $82 USD
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[#EAE4DC] flex items-center gap-3 text-[11px] text-[#C5A059] font-semibold tracking-wider uppercase">
              <span>Aari Embroidery</span>
              <span>·</span>
              <span>Chanderi Silk</span>
              <span>·</span>
              <span>2-Min Drape</span>
            </div>
          </div>

          {/* Card 2: The Trench Kurta */}
          <div
            onClick={() => onNavigate('product-corset-saree')}
            className="group cursor-pointer flex flex-col bg-[#FAF8F5] transition-all duration-300"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded bg-[#F5F0EA] mb-4">
              <img
                src={TRENCH_KURTA_IMAGE}
                alt="The Trench Kurta"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-[#1A1615] text-[#FAF8F5] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded shadow-sm">
                Drop 04 Exclusive
              </div>
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1A1615]/85 text-[#FAF8F5] text-[11px] font-medium tracking-wider uppercase px-3 py-1.5 rounded backdrop-blur-sm">
                View Piece →
              </div>
            </div>

            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[11px] uppercase tracking-[0.15em] text-[#687259] font-medium block mb-1">
                  Architectural Outerwear
                </span>
                <h4 className="font-['Playfair_Display'] text-xl md:text-2xl text-[#1A1615] font-medium group-hover:text-[#C5A059] transition-colors">
                  The Trench Kurta
                </h4>
                <p className="text-xs text-[#1A1615]/60 mt-1 line-clamp-1">
                  Espresso charcoal matka wool with Mughal filigree needlework
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="font-['Plus_Jakarta_Sans'] text-sm md:text-base font-semibold text-[#1A1615] tabular-nums block">
                  ₹5,800
                </span>
                <span className="text-[11px] text-[#1A1615]/50 block">
                  $70 USD
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[#EAE4DC] flex items-center gap-3 text-[11px] text-[#C5A059] font-semibold tracking-wider uppercase">
              <span>Zari Filigree</span>
              <span>·</span>
              <span>Structured Bandhgala</span>
            </div>
          </div>

          {/* Card 3: Metallic Organza Saree */}
          <div
            onClick={() => onNavigate('product-corset-saree')}
            className="group cursor-pointer flex flex-col bg-[#FAF8F5] transition-all duration-300"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded bg-[#F5F0EA] mb-4">
              <img
                src={ORGANZA_SAREE_IMAGE}
                alt="Metallic Organza Saree"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-[#775a19] text-[#FAF8F5] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded shadow-sm">
                Atelier Archive
              </div>
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1A1615]/85 text-[#FAF8F5] text-[11px] font-medium tracking-wider uppercase px-3 py-1.5 rounded backdrop-blur-sm">
                View Piece →
              </div>
            </div>

            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[11px] uppercase tracking-[0.15em] text-[#687259] font-medium block mb-1">
                  Liquid Light Sheer
                </span>
                <h4 className="font-['Playfair_Display'] text-xl md:text-2xl text-[#1A1615] font-medium group-hover:text-[#C5A059] transition-colors">
                  Metallic Organza Saree
                </h4>
                <p className="text-xs text-[#1A1615]/60 mt-1 line-clamp-1">
                  Molten copper-gold tissue with terracotta silk underlayer
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="font-['Plus_Jakarta_Sans'] text-sm md:text-base font-semibold text-[#1A1615] tabular-nums block">
                  ₹4,200
                </span>
                <span className="text-[11px] text-[#1A1615]/50 block">
                  $50 USD
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[#EAE4DC] flex items-center gap-3 text-[11px] text-[#C5A059] font-semibold tracking-wider uppercase">
              <span>Handloom Organza</span>
              <span>·</span>
              <span>Molten Zari Sheen</span>
            </div>
          </div>
        </div>
      </section>

      {/* Handcrafted Gen-Z Accessories & Jewelry Showcase */}
      <section className="px-3 md:px-8 max-w-7xl mx-auto py-10 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EAE4DC] gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#C5A059] block mb-2">
              Atelier Ornaments & Heirlooms
            </span>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#1A1615] font-normal tracking-tight">
              Gen-Z Jewelry & Accessories
            </h2>
          </div>
          <button
            onClick={() => onNavigate('catalogue')}
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-[0.12em] uppercase text-[#1A1615] hover:text-[#C5A059] transition-colors self-start md:self-auto cursor-pointer"
          >
            <span>Explore All 8 Accessories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACCESSORIES_COLLECTION.slice(0, 4).map((acc) => (
            <div
              key={acc.id}
              onClick={() => onNavigate('catalogue')}
              className="bg-[#FAF8F5] border border-[#EAE4DC] rounded-xl overflow-hidden p-4 flex flex-col justify-between hover:border-[#C5A059] transition-all duration-300 shadow-sm cursor-pointer group"
            >
              <div>
                <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#F5F0EA] mb-4">
                  <img
                    src={acc.image}
                    alt={acc.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-[#FAF8F5]/90 backdrop-blur-sm text-[9px] font-semibold uppercase tracking-wider text-[#687259] px-2 py-0.5 rounded border border-[#EAE4DC]">
                    {acc.vibeTag}
                  </span>
                </div>

                <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-bold block mb-1">
                  {acc.category.toUpperCase()} ATELIER
                </span>
                <h3 className="font-['Playfair_Display'] text-base font-semibold text-[#1A1615] mb-1 line-clamp-1 group-hover:text-[#C5A059] transition-colors">
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

                <span className="text-xs font-semibold text-[#1A1615] group-hover:text-[#C5A059] flex items-center gap-1 uppercase tracking-wider">
                  <span>Pair</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Atelier Craft Spotlight Section */}
      <section className="px-3 md:px-8 max-w-7xl mx-auto py-12 md:py-20">
        <div className="rounded-2xl bg-[#F5F0EA] border border-[#EAE4DC] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-6 p-8 md:p-14 flex flex-col justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A059] block mb-3">
                The Drape Manifesto
              </span>
              <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#1A1615] font-normal leading-tight mb-6">
                “We do not simply stitch garments; we engineer architectural freedom for the unstitched drape.”
              </h3>
              <p className="text-sm md:text-base text-[#1A1615]/75 font-light leading-relaxed mb-6">
                Centuries of drape wisdom in Varanasi and Kancheepuram celebrated the fluidity of unstitched fabric. 
                SHRI SAVITRI introduces internal structural engineering—flexible boning, concealed pre-pleat anchors, and 
                ergonomic waist cradles—so you step into a 5-yard couture statement in seconds.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#EAE4DC]">
                <div>
                  <span className="font-['Playfair_Display'] text-2xl md:text-3xl font-medium text-[#1A1615] block">
                    120+
                  </span>
                  <span className="text-xs uppercase tracking-wider text-[#1A1615]/60">
                    Artisanal Handloom Hours
                  </span>
                </div>
                <div>
                  <span className="font-['Playfair_Display'] text-2xl md:text-3xl font-medium text-[#1A1615] block">
                    &lt; 120s
                  </span>
                  <span className="text-xs uppercase tracking-wider text-[#1A1615]/60">
                    Effortless Wear Time
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={() => onNavigate('brand-story')}
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#1A1615] hover:text-[#C5A059] transition-colors"
              >
                <span>Read The Drape Manifesto</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 min-h-[360px] lg:min-h-full relative overflow-hidden bg-[#1A1615]">
            <img
              src={ATELIER_IMAGE}
              alt="Artisans at SHRI SAVITRI Atelier"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-[#FAF8F5]/90 backdrop-blur-md p-4 rounded border border-[#EAE4DC] flex items-center justify-between text-xs text-[#1A1615]">
              <div>
                <span className="font-semibold block">Varanasi Handloom Guild #08</span>
                <span className="text-[#1A1615]/60">Master Weaver Shivram with Apprentice Priya</span>
              </div>
              <Compass className="w-4 h-4 text-[#C5A059]" />
            </div>
          </div>
        </div>
      </section>

      {/* Press & Vogue Editorial Excerpt */}
      <section className="px-3 md:px-8 max-w-7xl mx-auto pb-16 md:pb-24">
        <div className="text-center max-w-3xl mx-auto py-12 px-6 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC]">
          <span className="font-['Playfair_Display'] text-sm tracking-[0.3em] uppercase text-[#C5A059] block mb-4">
            VOGUE INDIA · EDITORIAL COUTURE
          </span>
          <blockquote className="font-['Playfair_Display'] text-xl md:text-2xl text-[#1A1615] italic leading-snug mb-4">
            “SHRI SAVITRI Studio has resolved the eternal paradox of Indian occasion wear: the poetic grandeur of royal heritage weaving paired with the athletic liberty and precision of contemporary bespoke tailoring.”
          </blockquote>
          <span className="text-xs uppercase tracking-widest text-[#1A1615]/50 font-medium">
            Fashion Feature, The New Vanguard of Indo-Western Couture
          </span>
        </div>
      </section>
    </div>
  );
};
