import React, { useState } from 'react';
import { consultGeminiForRecipe } from '../services/geminiService';
import { CraftableItem, City, ItemType } from '../types';

interface GeminiAdvisorProps {
  onImportRecipe: (item: CraftableItem) => void;
}

const GeminiAdvisor: React.FC<GeminiAdvisorProps> = ({ onImportRecipe }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAsk = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError('');

    try {
      const result = await consultGeminiForRecipe(query);
      if (result) {
        // Convert AI response to internal format
        const newItem: CraftableItem = {
          id: `ai_${Date.now()}`,
          name: result.name,
          tier: 0, // AI often omits tier or it's variable, defaulting to 0 implies "custom"
          type: ItemType.Ingredient, // Defaulting to generic
          yieldBase: 1, // Assume 1 craft = 1 batch defined by AI quantities
          description: result.description,
          ingredients: result.ingredients.map(ing => ({
            name: ing.name,
            quantity: ing.quantity,
            recommendedCity: (ing.recommendedCity as City) || City.Any,
          }))
        };
        onImportRecipe(newItem);
        setQuery('');
      } else {
        setError("O Mago não encontrou essa receita. Tente ser mais específico.");
      }
    } catch (e) {
      setError("Erro de conexão com o Mago.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-900/40 to-slate-900 border border-indigo-500/30 rounded-xl p-6 mb-8 relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="relative z-10">
        <h3 className="text-xl font-fantasy text-indigo-300 mb-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Mago de Receitas (IA)
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Não achou o que procura? Pergunte ao mago. Ex: "Quais ingredientes para T8 Roast Pork?" ou "Receita de Invisibility Potion".
        </p>
        
        <div className="flex gap-2">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="Digite o nome do item..."
            className="flex-1 bg-slate-950/60 border border-indigo-500/30 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 transition-colors"
          />
          <button 
            onClick={handleAsk}
            disabled={loading}
            className={`px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2
              ${loading ? 'bg-indigo-900 text-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/50'}
            `}
          >
            {loading ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-indigo-400 border-t-transparent rounded-full"></div>
                Consultando...
              </>
            ) : (
              'Consultar'
            )}
          </button>
        </div>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default GeminiAdvisor;