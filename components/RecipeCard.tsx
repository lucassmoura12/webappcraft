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

  // Helper for Roman Numerals (Game Style)
  const toRoman = (num: number) => {
    switch(num) {
        case 4: return 'IV';
        case 5: return 'V';
        case 6: return 'VI';
        case 7: return 'VII';
        case 8: return 'VIII';
        default: return num;
    }
  };

  // Albion Tier Color Logic
  const getTierColorInfo = (tier: number) => {
    switch (tier) {
      case 4: return { border: 'border-blue-500', text: 'text-blue-400', bg: 'bg-blue-900/20', badge: 'bg-blue-900/80' };
      case 5: return { border: 'border-red-600', text: 'text-red-500', bg: 'bg-red-900/20', badge: 'bg-red-900/80' };
      case 6: return { border: 'border-orange-500', text: 'text-orange-400', bg: 'bg-orange-900/20', badge: 'bg-orange-900/80' };
      case 7: return { border: 'border-yellow-400', text: 'text-yellow-300', bg: 'bg-yellow-900/20', badge: 'bg-yellow-900/80' };
      case 8: return { border: 'border-white', text: 'text-white', bg: 'bg-slate-200/20', badge: 'bg-slate-700' };
      default: return { border: 'border-slate-500', text: 'text-slate-400', bg: 'bg-slate-800', badge: 'bg-slate-800' };
    }
  };

  const tierInfo = getTierColorInfo(item.tier);
  const isPotion = item.type === 'Potion';
  
  // Albion Render API URL
  const albionImageUrl = item.uniqueName 
    ? `https://render.albiononline.com/v1/item/${item.uniqueName}.png`
    : null;

  return (
    <div className={`relative bg-[#181d29] border-l-4 rounded-r shadow-md hover:bg-[#1f2636] transition-colors flex flex-col md:flex-row items-start md:items-center p-3 gap-4 border-t border-b border-r border-t-slate-800 border-b-slate-800 border-r-slate-800 ${tierInfo.border}`}>
      
      {/* 1. Item Identity Section */}
      <div className="flex items-center gap-4 flex-1 min-w-[200px]">
        {/* Tier + Icon Container */}
        <div className="relative w-14 h-14 flex-shrink-0">
             {/* Tier Badge */}
             <div className={`absolute -top-1 -left-1 px-1.5 py-0.5 text-[10px] font-bold text-white rounded shadow-sm z-10 border border-white/10 ${tierInfo.badge}`}>
                {toRoman(item.tier)}
             </div>
             
             {/* Icon */}
             <div className={`w-full h-full rounded bg-black/40 border border-slate-700 flex items-center justify-center overflow-hidden`}>
                {albionImageUrl && !imageError ? (
                <img 
                    src={albionImageUrl} 
                    alt={item.name} 
                    className="w-full h-full p-1 object-contain"
                    onError={() => setImageError(true)}
                />
                ) : (
                    isPotion ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-8 h-8 ${tierInfo.text} opacity-80`}>
                    <path d="M11 2a1 1 0 011 1v1.65a7.51 7.51 0 014.28 2.62 1 1 0 11-1.57 1.25A5.5 5.5 0 0012 6.5a5.5 5.5 0 00-2.71 2.02 1 1 0 11-1.57-1.25A7.51 7.51 0 0112 4.65V3a1 1 0 01-1-1z" />
                    </svg>
                    ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-8 h-8 ${tierInfo.text} opacity-80`}>
                        <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 001.402 10.06a.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                    </svg>
                    )
                )}
             </div>
        </div>

        <div className="flex flex-col">
            <h3 className="text-sm md:text-base font-bold text-slate-200 leading-tight">
                {item.name}
            </h3>
            <span className="text-xs text-slate-500 font-mono hidden md:block">
                Yield: {item.yieldBase}
            </span>
        </div>
      </div>

      {/* 2. Ingredients Section */}
      <div className="flex flex-wrap md:flex-nowrap gap-2 md:justify-start w-full md:w-auto md:flex-[1.5]">
        {item.ingredients.map((ing, i) => (
            <div key={i} className="flex items-center gap-2 bg-[#131824] px-2 py-1.5 rounded border border-slate-700/50 min-w-[120px]">
                <div className="w-8 h-8 bg-black/30 rounded border border-slate-700 flex-shrink-0 p-0.5">
                    {ing.uniqueName ? (
                        <img src={`https://render.albiononline.com/v1/item/${ing.uniqueName}.png`} className="w-full h-full object-contain" alt={ing.name} />
                    ) : (
                        <div className="w-full h-full bg-slate-600 rounded-full opacity-20"></div>
                    )}
                </div>
                <div className="flex flex-col leading-none">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{ing.name}</span>
                    <span className="text-xs text-amber-500 font-mono">x{ing.quantity}</span>
                </div>
            </div>
        ))}
      </div>

      {/* 3. Action Section */}
      <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 border-slate-800 pt-3 md:pt-0 mt-1 md:mt-0">
          <div className="flex flex-col items-end mr-2">
            <label className="text-[10px] text-slate-500 uppercase font-bold mb-0.5">Quantidade</label>
            <input 
                type="number" 
                min={item.yieldBase}
                step={item.yieldBase}
                value={amount}
                onChange={(e) => setAmount(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-20 bg-[#0b0f19] border border-slate-600 rounded px-2 py-1.5 text-sm text-right text-white focus:outline-none focus:border-amber-500 shadow-inner font-mono"
            />
          </div>
          
          <button 
            onClick={handleAdd}
            className="bg-gradient-to-b from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white text-xs font-bold py-3 px-4 rounded border border-amber-900 shadow-lg active:translate-y-0.5 transition-all uppercase tracking-wide h-full self-end"
          >
            Adicionar
          </button>
      </div>

    </div>
  );
};

export default RecipeCard;