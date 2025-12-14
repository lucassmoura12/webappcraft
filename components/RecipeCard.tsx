import React, { useState } from 'react';
import { CraftableItem } from '../types';

interface RecipeCardProps {
  item: CraftableItem;
  onAdd: (quantity: number) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ item, onAdd }) => {
  const [amount, setAmount] = useState<number>(item.yieldBase || 10);
  const [imageError, setImageError] = useState(false);

  const handleAdd = () => {
    onAdd(amount);
  };

  // Albion Tier Color Logic
  const getTierColorInfo = (tier: number) => {
    switch (tier) {
      case 4: return { border: 'border-blue-500', text: 'text-blue-400', bg: 'bg-blue-900/20' };
      case 5: return { border: 'border-red-600', text: 'text-red-500', bg: 'bg-red-900/20' };
      case 6: return { border: 'border-orange-500', text: 'text-orange-400', bg: 'bg-orange-900/20' };
      case 7: return { border: 'border-yellow-400', text: 'text-yellow-300', bg: 'bg-yellow-900/20' };
      case 8: return { border: 'border-white', text: 'text-white', bg: 'bg-slate-200/10' };
      default: return { border: 'border-slate-500', text: 'text-slate-400', bg: 'bg-slate-800' };
    }
  };

  const tierInfo = getTierColorInfo(item.tier);
  const isPotion = item.type === 'Potion';
  
  // Albion Render API URL
  const albionImageUrl = item.uniqueName 
    ? `https://render.albiononline.com/v1/item/${item.uniqueName}.png`
    : null;

  return (
    <div className={`relative bg-[#181d29] border-2 rounded-md shadow-lg overflow-hidden group transition-transform hover:-translate-y-1 hover:shadow-xl ${tierInfo.border}`}>
      
      {/* Card Header / Image Area */}
      <div className={`relative h-32 ${tierInfo.bg} flex flex-col items-center justify-center p-2 border-b border-slate-700/50`}>
        {/* Tier Indicator Corner */}
        <div className={`absolute top-0 left-0 px-2 py-0.5 text-xs font-bold bg-black/60 border-b border-r border-slate-700 rounded-br-md ${tierInfo.text}`}>
          Tier {item.tier}
        </div>
        
        {/* Icon Representation */}
        <div className="relative z-10 w-24 h-24 flex items-center justify-center filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
             {albionImageUrl && !imageError ? (
               <img 
                src={albionImageUrl} 
                alt={item.name} 
                className="w-full h-full object-contain"
                onError={() => setImageError(true)}
               />
             ) : (
                // Fallback SVG if image fails or ID is missing
                isPotion ? (
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-12 h-12 ${tierInfo.text} opacity-80`}>
                   <path d="M11 2a1 1 0 011 1v1.65a7.51 7.51 0 014.28 2.62 1 1 0 11-1.57 1.25A5.5 5.5 0 0012 6.5a5.5 5.5 0 00-2.71 2.02 1 1 0 11-1.57-1.25A7.51 7.51 0 0112 4.65V3a1 1 0 01-1-1z" />
                   <path d="M12 8.5a5.5 5.5 0 00-5.4 6.6l.33 1.63a5.5 5.5 0 005.07 4.27h.01a5.5 5.5 0 005.06-4.27l.34-1.63A5.5 5.5 0 0012 8.5zm-1 9a1 1 0 112 0 1 1 0 01-2 0z" />
                 </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-12 h-12 ${tierInfo.text} opacity-80`}>
                    <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 001.402 10.06a.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                    <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 0110.94 15.473a.75.75 0 011.06 0z" />
                  </svg>
                )
             )}
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-sm font-bold text-slate-100 mb-1 leading-snug line-clamp-2 min-h-[2.5rem] font-fantasy tracking-wide">
          {item.name}
        </h3>
        
        {/* Resource Icons Mini-preview */}
        <div className="flex gap-1 mb-3 h-6">
           {item.ingredients.slice(0, 4).map((ing, i) => (
               <div key={i} className="w-6 h-6 bg-black/50 rounded border border-slate-700 flex items-center justify-center relative group/tooltip">
                   {ing.uniqueName ? (
                      <img src={`https://render.albiononline.com/v1/item/${ing.uniqueName}.png`} className="w-full h-full p-0.5 object-contain" alt={ing.name} />
                   ) : (
                      <div className={`w-2 h-2 rounded-full ${ing.quantity > 10 ? 'bg-amber-500' : 'bg-slate-400'}`}></div>
                   )}
                   {/* Tooltip */}
                   <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-black/90 text-[10px] text-white rounded opacity-0 group-hover/tooltip:opacity-100 whitespace-nowrap z-50 pointer-events-none border border-slate-600">
                     {ing.name}
                   </div>
               </div>
           ))}
        </div>

        <div className="flex items-center gap-2 mt-auto pt-2 border-t border-slate-700/50">
          <input 
            type="number" 
            min={item.yieldBase}
            step={item.yieldBase}
            value={amount}
            onChange={(e) => setAmount(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-16 bg-[#0b0f19] border border-slate-600 rounded px-1 py-1 text-sm text-center text-white focus:outline-none focus:border-amber-500 shadow-inner"
          />
          <button 
            onClick={handleAdd}
            className="flex-1 bg-gradient-to-b from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-bold py-1.5 px-2 rounded border border-amber-900 shadow-md active:translate-y-0.5 transition-all uppercase tracking-wide"
          >
            Craftar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;