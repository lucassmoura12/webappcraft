import React, { useMemo } from 'react';
import { QueueItem, ShoppingListItem, City } from '../types';
import { CITY_COLORS } from '../constants';

interface ShoppingListProps {
  queue: QueueItem[];
}

// Helper to get thematic icons for each city
const getCityIcon = (city: string) => {
  const iconProps = { className: "w-6 h-6", strokeWidth: 2 };
  
  switch (city) {
    case City.Martlock: // Highland/Shield/Rock
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...iconProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l-9 4.3v6.3a11.3 11.3 0 005.8 9.6l3.2 1.8 3.2-1.8a11.3 11.3 0 005.8-9.6V6.3L12 2z" />
        </svg>
      );
    case City.Bridgewatch: // Steppe/Sun
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...iconProps}>
          <circle cx="12" cy="12" r="4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      );
    case City.Lymhurst: // Forest/Tree
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...iconProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 22v-9m0 0l-4.5 4.5M12 13l4.5 4.5M12 13l-6-6a2.5 2.5 0 010-3.5 2.5 2.5 0 013.5 0L12 6l2.5-2.5a2.5 2.5 0 013.5 0 2.5 2.5 0 010 3.5L12 13z" />
        </svg>
      );
    case City.FortSterling: // Mountain
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...iconProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 17l-7.5-12.5L2 17h19z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17l4.5-8 2 3.5" />
        </svg>
      );
    case City.Thetford: // Swamp/Drop/Bio
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...iconProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16h.01" />
        </svg>
      );
    case City.Caerleon: // Swords
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...iconProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 17.5L3 6V3h3l11.5 11.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 19l6-6 5 5-3 3-8-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 6.5L21 18v3h-3L6.5 9.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L5 11 0 6l3-3 8 2z" />
        </svg>
      );
    case City.Brecilien: // Moon/Magic
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...iconProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      );
    default: // Any/Map
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...iconProps}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      );
  }
};

const ShoppingList: React.FC<ShoppingListProps> = ({ queue }) => {
  const aggregatedList = useMemo(() => {
    const list: Record<string, ShoppingListItem> = {};

    queue.forEach(({ item, quantityToCraft }) => {
      const yieldPerCraft = item.yieldBase || 1;
      const craftsNeeded = Math.ceil(quantityToCraft / yieldPerCraft);

      item.ingredients.forEach((ing) => {
        const key = `${ing.name}-${ing.recommendedCity}`;
        if (!list[key]) {
          list[key] = {
            name: ing.name,
            totalQuantity: 0,
            recommendedCity: ing.recommendedCity,
            tiers: ing.tier ? [ing.tier] : [],
            uniqueName: ing.uniqueName
          };
        }
        
        list[key].totalQuantity += (ing.quantity * craftsNeeded);
        if (ing.tier && !list[key].tiers.includes(ing.tier)) {
          list[key].tiers.push(ing.tier);
        }
      });
    });

    return Object.values(list).sort((a, b) => a.recommendedCity.localeCompare(b.recommendedCity));
  }, [queue]);

  // Generic Icon Generator for shopping list
  const getGenericIcon = (name: string, className: string = "w-6 h-6") => {
    const n = name.toLowerCase();
    
    // Ingredients - Meat
    if (n.includes('carne') || n.includes('meat') || n.includes('pork') || n.includes('beef') || n.includes('bear')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
          <path fillRule="evenodd" d="M3.019 11.115L18 5.667a2 2 0 012.53 2.53l-5.447 14.98a2 2 0 01-2.531-.476l-1.996-2.662a.75.75 0 01.378-1.223l.756-.15a.75.75 0 00.548-.507l.808-2.697a3 3 0 00-3.66-3.774l-2.698.81a.75.75 0 00-.507.547l-.15.756a.75.75 0 01-1.223.378L1.64 12.162a2 2 0 01.477-2.531c.264-.23.575-.411.902-.516z" clipRule="evenodd" />
        </svg>
      );
    }

    // Ingredients - Fish
    if (n.includes('peixe') || n.includes('fish') || n.includes('enguia') || n.includes('eel') || n.includes('caranguejo') || n.includes('crab') || n.includes('kraken') || n.includes('lula') || n.includes('squid') || n.includes('pargo') || n.includes('snapper')) {
       return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path fillRule="evenodd" d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.06 0c-4.98-4.979-13.053-4.979-18.032 0l-.531.53a.75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.061z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M4.293 11.707a1 1 0 011.414 0L12 18.001l6.293-6.293a1 1 0 111.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414z" clipRule="evenodd" opacity="0.6" />
            <path d="M12 4a1 1 0 100 2 1 1 0 000-2z" />
        </svg>
       );
    }

    // Ingredients - Plants/Herbs
    if (n.includes('planta') || n.includes('plant') || n.includes('erva') || n.includes('herb') || n.includes('milho') || n.includes('corn') || n.includes('abóbora') || n.includes('pumpkin') || n.includes('trigo') || n.includes('wheat') || n.includes('batata') || n.includes('potato') || n.includes('nabo') || n.includes('turnip') || n.includes('repolho') || n.includes('cabbage') || n.includes('feijão') || n.includes('bean') || n.includes('cardo') || n.includes('teasel') || n.includes('dedaleira') || n.includes('foxglove') || n.includes('milefólio') || n.includes('yarrow') || n.includes('verbasco') || n.includes('mullein') || n.includes('confrei') || n.includes('comfrey') || n.includes('cogumelo') || n.includes('mushroom') || n.includes('agaric')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
           <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177 7.547 7.547 0 01-1.705-1.715.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
        </svg>
      );
    }
    
    // Liquids (Milk, Alcohol, etc)
    if (n.includes('leite') || n.includes('milk') || n.includes('manteiga') || n.includes('butter') || n.includes('schnapps') || n.includes('cachaça') || n.includes('hooch') || n.includes('moonshine') || n.includes('sangue') || n.includes('blood')) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
                <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v1.5h1.5a.75.75 0 010 1.5h-4.5a.75.75 0 010-1.5h1.5V3a.75.75 0 01.75-.75z" clipRule="evenodd" />
                <path d="M6.75 7.5a.75.75 0 00-.75.75v10.5c0 1.657 2.686 3 6 3s6-1.343 6-3V8.25a.75.75 0 00-.75-.75H6.75z" opacity="0.8"/>
            </svg>
        )
    }

    // Default (Box/Resource)
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03z" />
        <path d="M21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
      </svg>
    );
  };

  if (aggregatedList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-500 bg-[#1a202c] rounded-xl border-2 border-dashed border-slate-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-30 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-xl font-fantasy text-slate-400">Pergaminho em Branco</p>
        <p className="text-sm opacity-60">Visite a Estação de Craft para adicionar ordens.</p>
      </div>
    );
  }

  // Group by City for better UI
  const groupedByCity = aggregatedList.reduce((acc, item) => {
    if (!acc[item.recommendedCity]) acc[item.recommendedCity] = [];
    acc[item.recommendedCity].push(item);
    return acc;
  }, {} as Record<string, ShoppingListItem[]>);

  return (
    <div className="space-y-8 pb-12">
      <div className="grid grid-cols-1 gap-8">
        {Object.entries(groupedByCity).map(([city, rawItems]) => {
          // Explicit cast to avoid implicit 'unknown' type on map usage
          const items = rawItems as ShoppingListItem[];
          const cityColorClass = CITY_COLORS[city as City] || CITY_COLORS[City.Any];
          // Extract just the text color class for the icon
          const textColorClass = cityColorClass.split(' ').find(c => c.startsWith('text-')) || 'text-slate-200';
          const borderColorClass = cityColorClass.split(' ').find(c => c.startsWith('border-')) || 'border-slate-700';

          return (
            <div key={city} className={`relative rounded-lg border-2 bg-[#131824] shadow-xl ${borderColorClass} overflow-hidden`}>
              
              {/* City Header Banner */}
              <div className={`px-6 py-4 border-b border-slate-700 bg-gradient-to-r from-black/60 to-transparent flex items-center gap-4 relative overflow-hidden`}>
                 {/* Background sheen */}
                 <div className={`absolute top-0 left-0 w-1 bg-gradient-to-b from-transparent via-current to-transparent h-full opacity-50 ${textColorClass}`}></div>

                <div className={`p-3 rounded bg-[#0b0f19] border border-slate-600 shadow-inner ${textColorClass}`}>
                   {getCityIcon(city)}
                </div>
                <div>
                    <h3 className={`text-2xl font-bold font-fantasy ${textColorClass} drop-shadow-sm`}>
                    {city}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-widest font-semibold">
                      <span>Mercado Local</span>
                      <span className="w-1 h-1 rounded-full bg-slate-500"></span>
                      <span>Buy Orders</span>
                    </div>
                </div>
              </div>
              
              {/* Items List (Grid Layout) */}
              <div className="p-4 bg-[#1a2130]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-[#0f141f] border border-slate-700/50 rounded p-3 hover:border-slate-500 transition-colors group shadow-sm">
                        
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-black/40 rounded border border-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0 text-slate-500">
                                {getGenericIcon(item.name, "w-6 h-6")}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-slate-200 text-sm group-hover:text-amber-400 transition-colors">
                                    {item.name}
                                </span>
                                <div className="flex gap-1 mt-1">
                                    {item.tiers.map(t => (
                                        <span key={t} className="text-[10px] font-bold px-1.5 rounded-sm bg-slate-800 text-slate-400 border border-slate-700/50">
                                            T{t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="text-right pl-4 border-l border-slate-800 ml-2">
                            <span className="block text-xl font-bold font-mono text-amber-500 tabular-nums leading-none">
                                {item.totalQuantity.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-slate-500 uppercase">unidades</span>
                        </div>

                    </div>
                    ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShoppingList;