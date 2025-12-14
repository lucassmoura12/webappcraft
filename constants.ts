import { City, CraftableItem, ItemType, CityBonus } from './types';

export const CITY_COLORS: Record<City, string> = {
  [City.Martlock]: 'border-blue-500 text-blue-200 bg-blue-900/20',
  [City.Bridgewatch]: 'border-orange-500 text-orange-200 bg-orange-900/20',
  [City.Lymhurst]: 'border-green-500 text-green-200 bg-green-900/20',
  [City.FortSterling]: 'border-gray-200 text-gray-100 bg-gray-700/50',
  [City.Thetford]: 'border-purple-500 text-purple-200 bg-purple-900/20',
  [City.Caerleon]: 'border-red-600 text-red-200 bg-red-900/20',
  [City.Brecilien]: 'border-pink-400 text-pink-200 bg-pink-900/20',
  [City.Any]: 'border-slate-500 text-slate-300 bg-slate-800'
};

export const CITY_BONUSES: CityBonus[] = [
  {
    city: City.Martlock,
    description: "Highlands (Terras Altas)",
    resources: [
      "Trigo (Wheat)", 
      "Batatas (Potatoes)", 
      "Dedaleira-tímida (Foxglove) - Flor Roxa", 
      "Leite de Vaca (Cow Milk)",
      "Manteiga (Butter)",
      "Schnapps de Batata"
    ]
  },
  {
    city: City.Bridgewatch,
    description: "Steppe (Estepes)",
    resources: [
      "Feijão (Beans)", 
      "Milho (Corn)", 
      "Cardo-dragão (Dragon Teasel) - Flor Vermelha", 
      "Leite de Cabra (Goat Milk)",
      "Cachaça de Milho (Corn Hooch)"
    ]
  },
  {
    city: City.Lymhurst,
    description: "Forest (Floresta)",
    resources: [
      "Nabos (Turnips)", 
      "Milefólio-carniçal (Ghoul Yarrow) - Planta Verde/Branca", 
      "Ovos de Galinha (Hen Eggs)", 
      "Leite de Ovelha (Sheep Milk)"
    ]
  },
  {
    city: City.FortSterling,
    description: "Mountains (Montanhas)",
    resources: [
      "Cenouras (Carrots)", 
      "Bardana-crespa (Burdock)", 
      "Abóbora (Pumpkin)", 
      "Ovos de Ganso (Goose Eggs)",
      "Moonshine de Abóbora"
    ]
  },
  {
    city: City.Thetford,
    description: "Swamp (Pântano)",
    resources: [
      "Repolho (Cabbage)", 
      "Confrei-claro (Brightleaf Comfrey) - Flor Azul", 
      "Verbasco-arredio (Firetouched Mullein) - Flor Amarela", 
      "Agárico-arcano (Arcane Agaric) - Cogumelo"
    ]
  }
];

export const PRESET_RECIPES: CraftableItem[] = [
  // ========================
  // POÇÃO ÁCIDA (Acid)
  // ========================
  {
    id: 'p_acid_5',
    name: 'T5 Poção Ácida',
    tier: 5,
    uniqueName: 'T5_POTION_COOLDOWN',
    type: ItemType.Potion,
    yieldBase: 5,
    description: 'Reduz resistências a dano dos inimigos.',
    ingredients: [
      { name: 'Patas de Urso', quantity: 1, recommendedCity: City.Any, tier: 5, uniqueName: 'T5_DROP_BEARPAWS' },
      { name: 'Cardo-dragão', quantity: 48, recommendedCity: City.Bridgewatch, tier: 5, uniqueName: 'T5_PLANT_STEPPE' },
      { name: 'Dedaleira-tímida', quantity: 24, recommendedCity: City.Martlock, tier: 4, uniqueName: 'T4_PLANT_HIGHLAND' },
      { name: 'Leite de Cabra', quantity: 12, recommendedCity: City.Bridgewatch, tier: 4, uniqueName: 'T4_MILK' }
    ]
  },
  {
    id: 'p_acid_7',
    name: 'T7 Poção Ácida Maior',
    tier: 7,
    uniqueName: 'T7_POTION_COOLDOWN',
    type: ItemType.Potion,
    yieldBase: 5,
    description: 'Versão maior da poção ácida.',
    ingredients: [
      { name: 'Patas de Urso', quantity: 1, recommendedCity: City.Any, tier: 7, uniqueName: 'T7_DROP_BEARPAWS' },
      { name: 'Verbasco-arredio', quantity: 144, recommendedCity: City.Thetford, tier: 7, uniqueName: 'T7_PLANT_SWAMP' },
      { name: 'Cardo-dragão', quantity: 72, recommendedCity: City.Bridgewatch, tier: 6, uniqueName: 'T6_PLANT_STEPPE' },
      { name: 'Schnapps de Batata', quantity: 72, recommendedCity: City.Martlock, tier: 7, uniqueName: 'T7_ALCOHOL_POTATO' },
      { name: 'Leite de Ovelha', quantity: 36, recommendedCity: City.Lymhurst, tier: 6, uniqueName: 'T6_MILK' },
      { name: 'Cachaça de Milho', quantity: 36, recommendedCity: City.Bridgewatch, tier: 6, uniqueName: 'T6_ALCOHOL_CORN' }
    ]
  },

  // ========================
  // POÇÃO DE COLETA (Gathering)
  // ========================
  {
    id: 'p_gather_6',
    name: 'T6 Poção de Coleta',
    tier: 6,
    uniqueName: 'T6_POTION_GATHER',
    type: ItemType.Potion,
    yieldBase: 5,
    description: 'Aumenta velocidade de coleta.',
    ingredients: [
      { name: 'Carapaça de Besouro', quantity: 1, recommendedCity: City.Any, tier: 6, uniqueName: 'T6_DROP_BEETLE_CARAPACE' },
      { name: 'Manteiga', quantity: 48, recommendedCity: City.Martlock, tier: 6, uniqueName: 'T6_BUTTER' },
      { name: 'Cardo-dragão', quantity: 24, recommendedCity: City.Bridgewatch, tier: 6, uniqueName: 'T6_PLANT_STEPPE' },
      { name: 'Dedaleira-tímida', quantity: 12, recommendedCity: City.Martlock, tier: 5, uniqueName: 'T5_PLANT_HIGHLAND' }
    ]
  },
  {
    id: 'p_gather_8',
    name: 'T8 Poção de Coleta Maior',
    tier: 8,
    uniqueName: 'T8_POTION_GATHER',
    type: ItemType.Potion,
    yieldBase: 5,
    description: 'Versão maior para coleta T8.',
    ingredients: [
      { name: 'Carapaça de Besouro', quantity: 1, recommendedCity: City.Any, tier: 8, uniqueName: 'T8_DROP_BEETLE_CARAPACE' },
      { name: 'Manteiga', quantity: 144, recommendedCity: City.Martlock, tier: 8, uniqueName: 'T8_BUTTER' },
      { name: 'Milefólio-carniçal', quantity: 72, recommendedCity: City.Lymhurst, tier: 7, uniqueName: 'T7_PLANT_FOREST' },
      { name: 'Verbasco-arredio', quantity: 72, recommendedCity: City.Thetford, tier: 7, uniqueName: 'T7_PLANT_SWAMP' },
      { name: 'Cardo-dragão', quantity: 36, recommendedCity: City.Bridgewatch, tier: 6, uniqueName: 'T6_PLANT_STEPPE' },
      { name: 'Schnapps de Batata', quantity: 36, recommendedCity: City.Martlock, tier: 6, uniqueName: 'T6_ALCOHOL_POTATO' }
    ]
  },

  // ========================
  // FOOD - AVALONIAN & RARE
  // ========================
  {
    id: 'f_deadwater_8',
    name: 'T8 Guisado de Enguia (Deadwater)',
    tier: 8,
    uniqueName: 'T8_MEAL_STEW_EEL',
    type: ItemType.Food,
    yieldBase: 10,
    description: 'Dano e Cooldown.',
    ingredients: [
      { name: 'Enguia de Água-podre', quantity: 1, recommendedCity: City.Any, tier: 8, uniqueName: 'T8_FISH_FRESHWATER_FOREST_RARE' },
      { name: 'Abóbora', quantity: 6, recommendedCity: City.FortSterling, tier: 8, uniqueName: 'T8_FARM_PUMPKIN' },
      { name: 'Milefólio-carniçal', quantity: 6, recommendedCity: City.Lymhurst, tier: 7, uniqueName: 'T7_PLANT_FOREST' },
      { name: 'Leite de Ovelha', quantity: 6, recommendedCity: City.Lymhurst, tier: 6, uniqueName: 'T6_MILK' }
    ]
  },
  {
    id: 'f_redspring_6',
    name: 'T6 Guisado de Enguia (Redspring)',
    tier: 6,
    uniqueName: 'T6_MEAL_STEW_EEL',
    type: ItemType.Food,
    yieldBase: 10,
    description: 'Dano e Cooldown.',
    ingredients: [
      { name: 'Enguia Avermelhada', quantity: 1, recommendedCity: City.Any, tier: 6, uniqueName: 'T6_FISH_FRESHWATER_FOREST_RARE' },
      { name: 'Batata', quantity: 2, recommendedCity: City.Martlock, tier: 6, uniqueName: 'T6_FARM_POTATO' },
      { name: 'Cardo-dragão', quantity: 2, recommendedCity: City.Bridgewatch, tier: 6, uniqueName: 'T6_PLANT_STEPPE' },
      { name: 'Leite de Ovelha', quantity: 2, recommendedCity: City.Lymhurst, tier: 6, uniqueName: 'T6_MILK' }
    ]
  },
  {
    id: 'f_crab_omelette_7',
    name: 'T7 Omelete de Caranguejo',
    tier: 7,
    uniqueName: 'T7_MEAL_OMELETTE_CRAB',
    type: ItemType.Food,
    yieldBase: 10,
    description: 'Redução de Cooldown e Mana.',
    ingredients: [
      { name: 'Caranguejo', quantity: 1, recommendedCity: City.Any, tier: 7, uniqueName: 'T7_FISH_SALTWATER_ALL_RARE' },
      { name: 'Milho', quantity: 6, recommendedCity: City.Bridgewatch, tier: 7, uniqueName: 'T7_FARM_CORN' },
      { name: 'Verbasco-arredio', quantity: 6, recommendedCity: City.Thetford, tier: 7, uniqueName: 'T7_PLANT_SWAMP' },
      { name: 'Carne de Porco', quantity: 6, recommendedCity: City.Caerleon, tier: 7, uniqueName: 'T7_MEAT' }
    ]
  },
  {
    id: 'f_avalon_pork_7',
    name: 'T7 Omelete Avaloniano',
    tier: 7,
    uniqueName: 'T7_MEAL_OMELETTE_AVALON',
    type: ItemType.Food,
    yieldBase: 10,
    description: 'Defesa e Cooldown.',
    ingredients: [
      { name: 'Carne de Porco', quantity: 72, recommendedCity: City.Caerleon, tier: 7, uniqueName: 'T7_MEAT' },
      { name: 'Ovos de Ganso', quantity: 18, recommendedCity: City.FortSterling, tier: 7, uniqueName: 'T7_EGG' },
      { name: 'Leite de Ovelha', quantity: 36, recommendedCity: City.Lymhurst, tier: 6, uniqueName: 'T6_MILK' },
      { name: 'Energia Avaloniana', quantity: 90, recommendedCity: City.Any, tier: 7, uniqueName: 'T7_ESSENCE' }
    ]
  },
  {
    id: 'f_snapper_7',
    name: 'T7 Pargo Assado (Snapper)',
    tier: 7,
    uniqueName: 'T7_MEAL_ROAST_SNAPPER',
    type: ItemType.Food,
    yieldBase: 10,
    description: 'Cura baseada em dano.',
    ingredients: [
      { name: 'Pargo Neblina-pura', quantity: 1, recommendedCity: City.Any, tier: 7, uniqueName: 'T7_FISH_FRESHWATER_HIGHLAND_RARE' },
      { name: 'Milho', quantity: 6, recommendedCity: City.Bridgewatch, tier: 7, uniqueName: 'T7_FARM_CORN' },
      { name: 'Verbasco-arredio', quantity: 6, recommendedCity: City.Thetford, tier: 7, uniqueName: 'T7_PLANT_SWAMP' },
      { name: 'Leite de Ovelha', quantity: 6, recommendedCity: City.Lymhurst, tier: 6, uniqueName: 'T6_MILK' }
    ]
  },
  {
    id: 'f_kraken_6',
    name: 'T6 Salada de Kraken',
    tier: 6,
    uniqueName: 'T6_MEAL_SALAD_KRAKEN',
    type: ItemType.Food,
    yieldBase: 10,
    description: 'Velocidade e Qualidade de Craft.',
    ingredients: [
      { name: 'Kraken', quantity: 1, recommendedCity: City.Any, tier: 6, uniqueName: 'T6_FISH_SALTWATER_ALL_RARE' },
      { name: 'Batata', quantity: 6, recommendedCity: City.Martlock, tier: 6, uniqueName: 'T6_FARM_POTATO' },
      { name: 'Cardo-dragão', quantity: 6, recommendedCity: City.Bridgewatch, tier: 6, uniqueName: 'T6_PLANT_STEPPE' },
      { name: 'Carne de Porco', quantity: 6, recommendedCity: City.Caerleon, tier: 7, uniqueName: 'T7_MEAT' }
    ]
  },
  {
    id: 'f_avalon_beef_8',
    name: 'T8 Sanduíche Avaloniano',
    tier: 8,
    uniqueName: 'T8_MEAL_SANDWICH_AVALON',
    type: ItemType.Food,
    yieldBase: 10,
    description: 'Vida máxima e duração de CC.',
    ingredients: [
      { name: 'Carne Crua', quantity: 72, recommendedCity: City.Martlock, tier: 8, uniqueName: 'T8_MEAT' },
      { name: 'Pão', quantity: 36, recommendedCity: City.Martlock, tier: 8, uniqueName: 'T8_BREAD' },
      { name: 'Manteiga', quantity: 18, recommendedCity: City.Lymhurst, tier: 6, uniqueName: 'T6_BUTTER' },
      { name: 'Energia Avaloniana', quantity: 90, recommendedCity: City.Any, tier: 8, uniqueName: 'T8_ESSENCE' }
    ]
  },
  {
    id: 'f_thunderfall_8',
    name: 'T8 Sanduíche de Larápio (Trovão)',
    tier: 8,
    uniqueName: 'T8_MEAL_SANDWICH_LURCHER',
    type: ItemType.Food,
    yieldBase: 10,
    description: 'Vida máxima e cura recebida.',
    ingredients: [
      { name: 'Larápio do Trovão', quantity: 1, recommendedCity: City.Any, tier: 8, uniqueName: 'T8_FISH_FRESHWATER_AVALON_RARE' },
      { name: 'Abóbora', quantity: 6, recommendedCity: City.FortSterling, tier: 8, uniqueName: 'T8_FARM_PUMPKIN' },
      { name: 'Milefólio-carniçal', quantity: 6, recommendedCity: City.Lymhurst, tier: 7, uniqueName: 'T7_PLANT_FOREST' },
      { name: 'Manteiga', quantity: 6, recommendedCity: City.Lymhurst, tier: 6, uniqueName: 'T6_BUTTER' }
    ]
  },
  {
    id: 'f_mountain_pie_7',
    name: 'T7 Torta de Olhomorto',
    tier: 7,
    uniqueName: 'T7_MEAL_PIE_FISH',
    type: ItemType.Food,
    yieldBase: 10,
    description: 'Carga máxima e resistência a CC.',
    ingredients: [
      { name: 'Olhomorto dos Picos', quantity: 1, recommendedCity: City.Any, tier: 7, uniqueName: 'T7_FISH_FRESHWATER_MOUNTAIN_RARE' },
      { name: 'Milho', quantity: 6, recommendedCity: City.Bridgewatch, tier: 7, uniqueName: 'T7_FARM_CORN' },
      { name: 'Verbasco-arredio', quantity: 6, recommendedCity: City.Thetford, tier: 7, uniqueName: 'T7_PLANT_SWAMP' },
      { name: 'Carne de Porco', quantity: 6, recommendedCity: City.Caerleon, tier: 7, uniqueName: 'T7_MEAT' }
    ]
  }
];