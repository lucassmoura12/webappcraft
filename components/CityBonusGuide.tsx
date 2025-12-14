import React from 'react';
import { CITY_BONUSES, CITY_COLORS } from '../constants';

const CityBonusGuide: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
        <h2 className="text-2xl font-fantasy text-amber-500 mb-2">Bônus de Produção Local</h2>
        <p className="text-slate-300 text-sm">
          Fazer pedidos de compra (Buy Orders) nas cidades corretas pode economizar milhões de prata. 
          Abaixo estão os locais onde cada ingrediente tem <span className="text-green-400 font-bold">+10% de rendimento</span> de colheita/criação, resultando em maior oferta e menores preços.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CITY_BONUSES.map((bonus) => {
          const colorClass = CITY_COLORS[bonus.city];
          
          return (
            <div key={bonus.city} className={`rounded-xl border p-5 ${colorClass} relative overflow-hidden group`}>
              {/* Header */}
              <div className="flex flex-col mb-4 relative z-10">
                <h3 className="text-xl font-bold font-fantasy flex items-center gap-2">
                  {bonus.city}
                </h3>
                <span className="text-xs uppercase tracking-widest opacity-80 font-semibold mt-1">
                  {bonus.description}
                </span>
              </div>

              {/* Resource List */}
              <ul className="space-y-2 relative z-10">
                {bonus.resources.map((res, idx) => (
                  <li key={idx} className="flex items-center gap-2 bg-slate-900/30 p-2 rounded hover:bg-slate-900/50 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></div>
                    <span className="text-sm font-medium">{res}</span>
                  </li>
                ))}
              </ul>
              
              {/* Decorative Background Icon */}
              <div className="absolute -bottom-4 -right-4 text-9xl opacity-5 pointer-events-none select-none font-fantasy">
                 {bonus.city.charAt(0)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CityBonusGuide;