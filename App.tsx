import React, { useState, useCallback } from 'react';
import { CraftableItem, QueueItem, ItemType } from './types';
import { PRESET_RECIPES } from './constants';
import RecipeCard from './components/RecipeCard';
import ShoppingList from './components/ShoppingList';
import GeminiAdvisor from './components/GeminiAdvisor';
import CityBonusGuide from './components/CityBonusGuide';

const App: React.FC = () => {
  const [craftQueue, setCraftQueue] = useState<QueueItem[]>([]);
  const [activeTab, setActiveTab] = useState<'create' | 'list' | 'guide'>('create');
  const [filterType, setFilterType] = useState<'All' | ItemType.Potion | ItemType.Food>('All');

  const addToQueue = useCallback((item: CraftableItem, quantity: number) => {
    setCraftQueue(prev => {
      const existing = prev.find(q => q.item.id === item.id);
      if (existing) {
        return prev.map(q => q.item.id === item.id ? { ...q, quantityToCraft: q.quantityToCraft + quantity } : q);
      }
      return [...prev, { item, quantityToCraft: quantity }];
    });
  }, []);

  const removeFromQueue = (itemId: string) => {
    setCraftQueue(prev => prev.filter(q => q.item.id !== itemId));
  };

  const clearQueue = () => setCraftQueue([]);

  // Handler for when AI returns a custom recipe
  const handleAiImport = (item: CraftableItem) => {
    addToQueue(item, item.yieldBase || 10);
    setActiveTab('create');
  };

  const filteredRecipes = PRESET_RECIPES.filter(r => 
    filterType === 'All' ? true : r.type === filterType
  );

  return (
    <div className="min-h-screen text-slate-200 p-2 md:p-6 flex flex-col items-center">
      
      {/* Main "Window" Container */}
      <div className="w-full max-w-7xl bg-[#131824] border-2 border-[#475569] rounded-lg shadow-2xl overflow-hidden flex flex-col min-h-[90vh]">
        
        {/* Header / Title Bar */}
        <header className="bg-[#1f2937] border-b-2 border-amber-600/50 p-4 flex items-center justify-between shadow-md relative z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded border border-amber-300 shadow-lg flex items-center justify-center transform rotate-45">
              <span className="text-2xl font-bold text-slate-900 transform -rotate-45 font-fantasy">A</span>
            </div>
            <h1 className="text-2xl font-fantasy text-amber-500 tracking-wider drop-shadow-md">
              Albion <span className="text-slate-300">Ledger</span>
            </h1>
          </div>
          
          {/* Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 bg-black/30 px-3 py-1 rounded border border-slate-700">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-xs font-mono text-slate-400">ONLINE</span>
          </div>
        </header>

        {/* Navigation Tabs (Designed like game tabs) */}
        <div className="bg-[#1a2130] px-4 pt-4 border-b border-slate-700 flex gap-2 overflow-x-auto">
           {[
             { id: 'create', label: 'Estação de Craft' },
             { id: 'list', label: 'Mercado & Compras', count: craftQueue.length },
             { id: 'guide', label: 'Mapa Mundi (Bônus)' }
           ].map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`
                 px-6 py-2 rounded-t-lg text-sm font-bold tracking-wide uppercase border-t border-l border-r transition-all relative top-[1px]
                 ${activeTab === tab.id 
                   ? 'bg-[#252e40] border-slate-500 text-amber-500 border-b-[#252e40] z-10' 
                   : 'bg-[#0f141f] border-slate-800 text-slate-500 hover:bg-[#151c2a] hover:text-slate-300'}
               `}
             >
               {tab.label}
               {tab.count !== undefined && tab.count > 0 && (
                 <span className="ml-2 bg-amber-600 text-white text-[10px] px-1.5 py-0.5 rounded-full shadow-sm">
                   {tab.count}
                 </span>
               )}
             </button>
           ))}
        </div>

        {/* Content Area */}
        <main className="flex-1 bg-[#252e40] p-4 md:p-8 overflow-y-auto relative">
           {/* Subtle texture overlay */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

           <div className="relative z-10 max-w-7xl mx-auto">
            
            {activeTab === 'create' && (
              <div className="animate-in fade-in duration-300">
                <GeminiAdvisor onImportRecipe={handleAiImport} />

                {/* Filters */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 mt-8 border-b border-slate-600 pb-4 gap-4">
                  <h2 className="text-2xl font-fantasy text-slate-200 drop-shadow-lg">
                    Catálogo de Receitas
                  </h2>
                  <div className="flex bg-[#131824] p-1 rounded border border-slate-700">
                    {(['All', 'Potion', 'Food'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setFilterType(type as any)}
                        className={`px-4 py-1.5 rounded text-xs font-bold uppercase transition-colors ${
                          filterType === type 
                            ? 'bg-amber-600 text-white shadow' 
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {type === 'All' ? 'Tudo' : type === 'Potion' ? 'Poções' : 'Comidas'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                  {filteredRecipes.map(item => (
                    <RecipeCard key={item.id} item={item} onAdd={(qty) => addToQueue(item, qty)} />
                  ))}
                </div>

                {/* Queue Mini-Bar */}
                {craftQueue.length > 0 && (
                   <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[#131824] border border-amber-600/50 rounded-lg shadow-2xl p-4 w-[90%] max-w-4xl z-50 flex items-center justify-between backdrop-blur-sm bg-opacity-95">
                     <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
                        <span className="text-amber-500 font-bold font-fantasy whitespace-nowrap mr-2 border-r border-slate-700 pr-4">
                           FILA:
                        </span>
                        {craftQueue.map((q, idx) => (
                          <div key={`${q.item.id}-${idx}`} className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded border border-slate-600 min-w-max">
                            <span className="text-xs text-slate-300">{q.item.name}</span>
                            <span className="text-xs text-amber-400 font-mono">x{q.quantityToCraft}</span>
                            <button onClick={() => removeFromQueue(q.item.id)} className="text-slate-500 hover:text-red-400 ml-1">×</button>
                          </div>
                        ))}
                     </div>
                     <button 
                       onClick={() => setActiveTab('list')}
                       className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded font-bold text-sm whitespace-nowrap shadow-lg ml-4 transition-transform active:scale-95"
                     >
                       Gerar Lista
                     </button>
                   </div>
                )}
              </div>
            )}

            {activeTab === 'list' && (
              <div className="animate-in slide-in-from-right duration-300 max-w-4xl mx-auto">
                 <div className="flex justify-between items-center mb-8 border-b border-slate-600 pb-4">
                    <div>
                        <h2 className="text-3xl font-fantasy text-amber-500">Ordens de Compra</h2>
                        <p className="text-slate-400 text-sm">Organizado por cidade para máxima eficiência de mercado.</p>
                    </div>
                    <button 
                      onClick={clearQueue}
                      className="text-red-400 hover:text-red-300 text-sm font-bold border border-red-900/50 bg-red-900/20 px-4 py-2 rounded hover:bg-red-900/40 transition-colors"
                    >
                      LIMPAR LISTA
                    </button>
                 </div>
                 <ShoppingList queue={craftQueue} />
              </div>
            )}

            {activeTab === 'guide' && (
              <div className="animate-in slide-in-from-right duration-300">
                  <CityBonusGuide />
              </div>
            )}

           </div>
        </main>
      </div>
    </div>
  );
};

export default App;