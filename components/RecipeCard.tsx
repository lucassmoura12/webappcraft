import React, { useState } from 'react';
import { CraftableItem, ItemType } from '../types';

interface RecipeCardProps {
  item: CraftableItem;
  onAdd: (quantity: number) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ item, onAdd }) => {
  const [amount, setAmount] = useState<number>(item.yieldBase || 10);

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

  // Generic Icon Generator based on name/type
  const getGenericIcon = (name: string, type?: ItemType, className: string = "w-6 h-6") => {
    const n = name.toLowerCase();
    
    // Potions
    if (type === ItemType.Potion || n.includes('poção') || n.includes('potion')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M11 2a1 1 0 011 1v1.65a7.51 7.51 0 014.28 2.62 1 1 0 11-1.57 1.25A5.5 5.5 0 0012 6.5a5.5 5.5 0 00-2.71 2.02 1 1 0 11-1.57-1.25A7.51 7.51 0 0112 4.65V3a1 1 0 01-1-1z" />
          <path d="M12 8.5a5.5 5.5 0 00-5.4 6.6l.33 1.63a5.5 5.5 0 005.07 4.27h.01a5.5 5.5 0 005.06-4.27l.34-1.63A5.5 5.5 0 0012 8.5zm-1 9a1 1 0 112 0 1 1 0 01-2 0z" />
        </svg>
      );
    }
    
    // Food
    if (type === ItemType.Food || n.includes('guisado') || n.includes('stew') || n.includes('omelete') || n.includes('omelette') || n.includes('sanduíche') || n.includes('sandwich') || n.includes('torta') || n.includes('pie') || n.includes('salada') || n.includes('salad')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007zm-1.033 9.037a3 3 0 013 0h.01a3 3 0 010 5h-.01a3 3 0 01-3 0v-5z" clipRule="evenodd" />
           <path d="M12 1a1 1 0 011 1v4h-2V2a1 1 0 011-1z" opacity="0.5"/>
        </svg>
      );
    }

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

  const tierInfo = getTierColorInfo(item.tier);

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
                {getGenericIcon(item.name, item.type, `w-8 h-8 ${tierInfo.text} opacity-90`)}
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
                <div className="w-8 h-8 bg-black/30 rounded border border-slate-700 flex-shrink-0 flex items-center justify-center p-0.5 text-slate-400">
                    {getGenericIcon(ing.name, undefined, "w-5 h-5 opacity-70")}
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