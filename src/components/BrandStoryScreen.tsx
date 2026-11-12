import React, { useState } from 'react';
import { Screen } from '../types';
import { ATELIER_IMAGE, HERO_IMAGE, CORSET_SAREE_IMAGE, TRENCH_KURTA_IMAGE } from '../data/products';
import { ArrowRight, Sparkles, Compass, Feather, ShieldCheck, Heart } from 'lucide-react';

interface BrandStoryScreenProps {
  onNavigate: (screen: Screen) => void;
}

export const BrandStoryScreen: React.FC<BrandStoryScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'manifesto' | 'artisans' | 'anatomy'>('manifesto');

  const anatomyPoints = [
    {
      title: '01. The Unstitched 5-Yard Silk',
      origin: 'Varanasi & Chanderi Handlooms',
      detail: 'Pure silk threads dipped in botanical extracts and metallic zari alloy. Woven on traditional wooden pit looms taking up to 3 weeks per panel.',
    },
    {
      title: '02. Spiral Steel Boning Core',
      origin: 'Bespoke Atelier Engineering',
      detail: '16 curved flexible steel stays encased in natural cotton grosgrain channels. Distributes weight evenly across the pelvic crest so breathing is effortless.',
    },
    {
      title: '03. Pin-Free Magnetic Anchor',
      origin: 'Proprietary Drape Technology',
      detail: 'Concealed micro-neodymium clips permanently replace piercing safety pins. Your pallu remains securely poised through galas, dancing, and evening travel.',
    },
    {
      title: '04. Hand-Cast Antique Brass Hardware',
      origin: 'Dhokra Artisan Casting, Bastar',
      detail: 'Custom sculpted buckles and clasps cast in recycled bell metal and finished with antique burnished patina to resist tarnish.',
    },
  ];

  return (
    <div className="w-full px-3 md:px-8 max-w-7xl mx-auto py-6 md:py-12">
      {/* Atelier Hero Title */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A059] block mb-3">
          The Atelier & Heritage Archive
        </span>
        <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl md:text-6xl text-[#1A1615] font-normal tracking-tight mb-6">
          The Drape Manifesto
        </h1>
        <p className="font-['Plus_Jakarta_Sans'] text-base md:text-lg text-[#1A1615]/75 font-light leading-relaxed">
          For five millennia, the saree has celebrated the infinite possibilities of the unstitched cloth. 
          SHRI SAVITRI was founded on a singular conviction: honouring tradition does not mean accepting discomfort or complexity.
        </p>
      </div>

      {/* Hero Documentary Media Banner */}
      <div className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] w-full bg-[#1A1615] mb-14 shadow-xl border border-[#EAE4DC]">
        <img
          src={ATELIER_IMAGE}
          alt="SHRI SAVITRI Master Weavers Loom"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1615] via-[#1A1615]/30 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-[#FAF8F5]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold block mb-1">
              Varanasi Master Loom Guild · Uttar Pradesh
            </span>
            <p className="text-sm md:text-base font-light max-w-xl">
              Preserving rare kadwa and fekwa zari weaving techniques across three generations of master weavers.
            </p>
          </div>
          <button
            onClick={() => onNavigate('catalogue')}
            className="px-5 py-2.5 bg-[#FAF8F5] text-[#1A1615] hover:bg-[#C5A059] text-xs font-semibold tracking-wider uppercase rounded transition-colors"
          >
            Explore Silhouettes
          </button>
        </div>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="p-8 rounded-xl bg-[#F5F0EA] border border-[#EAE4DC]">
          <Feather className="w-6 h-6 text-[#C5A059] mb-4" />
          <h3 className="font-['Playfair_Display'] text-2xl text-[#1A1615] font-normal mb-3">
            Zero Safety Pins
          </h3>
          <p className="text-xs text-[#1A1615]/75 font-light leading-relaxed">
            The traditional saree demanded up to a dozen sharp safety pins that damage precious zari filaments. 
            Our engineered hook cradles and magnetic pallu snaps eliminate pins entirely.
          </p>
        </div>

        <div className="p-8 rounded-xl bg-[#F5F0EA] border border-[#EAE4DC]">
          <Sparkles className="w-6 h-6 text-[#C5A059] mb-4" />
          <h3 className="font-['Playfair_Display'] text-2xl text-[#1A1615] font-normal mb-3">
            24K Electroplated Zari
          </h3>
          <p className="text-xs text-[#1A1615]/75 font-light leading-relaxed">
            We reject plastic lurex and synthetic tinsels. Every metallic shimmer in our garments is pure silver wire 
            electroplated with 24K antique gold, creating warm, non-glaring heirloom patina.
          </p>
        </div>

        <div className="p-8 rounded-xl bg-[#F5F0EA] border border-[#EAE4DC]">
          <Heart className="w-6 h-6 text-[#C5A059] mb-4" />
          <h3 className="font-['Playfair_Display'] text-2xl text-[#1A1615] font-normal mb-3">
            Fair Weaver Royalties
          </h3>
          <p className="text-xs text-[#1A1615]/75 font-light leading-relaxed">
            18% of every garment revenue flows directly back into the Varanasi and Kashmir craft cooperatives, 
            ensuring master weavers earn 3.5x regional minimum wage.
          </p>
        </div>
      </div>

      {/* Interactive Silhouette Anatomy */}
      <div className="rounded-2xl bg-[#FAF8F5] border border-[#EAE4DC] p-8 md:p-14 mb-16">
        <div className="max-w-2xl mb-8">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#687259] block mb-2">
            Inside the Construction
          </span>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#1A1615] font-normal mb-3">
            Anatomy of the Corset Saree
          </h2>
          <p className="text-sm text-[#1A1615]/70 font-light">
            Each silhouette is developed in collaboration with a London-trained corset patternmaker and a fifth-generation Varanasi weaver.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {anatomyPoints.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg bg-[#F5F0EA] border border-[#EAE4DC] hover:border-[#C5A059] transition-all"
            >
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[#C5A059] block mb-1">
                {item.origin}
              </span>
              <h4 className="font-['Playfair_Display'] text-xl text-[#1A1615] font-medium mb-2">
                {item.title}
              </h4>
              <p className="text-xs text-[#1A1615]/75 font-light leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Footer Box */}
      <div className="text-center py-12 px-6 rounded-2xl bg-[#1A1615] text-[#FAF8F5] max-w-4xl mx-auto">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold block mb-3">
          Step Into The Future of Occasion Wear
        </span>
        <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-normal mb-6">
          Experience Drop 04 in Person or Online
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('catalogue')}
            className="px-8 py-3.5 bg-[#FAF8F5] text-[#1A1615] hover:bg-[#C5A059] hover:text-[#1A1615] text-xs font-semibold tracking-[0.14em] uppercase rounded transition-colors shadow"
          >
            Explore Catalogue
          </button>
          <button
            onClick={() => onNavigate('product-corset-saree')}
            className="px-8 py-3.5 border border-[#FAF8F5]/40 text-[#FAF8F5] hover:bg-[#FAF8F5]/10 text-xs font-semibold tracking-[0.14em] uppercase rounded transition-colors"
          >
            View Corset Saree 2.0
          </button>
        </div>
      </div>
    </div>
  );
};
