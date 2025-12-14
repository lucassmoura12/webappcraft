export enum City {
  Martlock = 'Martlock',
  Bridgewatch = 'Bridgewatch',
  Lymhurst = 'Lymhurst',
  FortSterling = 'Fort Sterling',
  Thetford = 'Thetford',
  Caerleon = 'Caerleon',
  Brecilien = 'Brecilien',
  Any = 'Any City'
}

export enum ItemType {
  Potion = 'Potion',
  Food = 'Food',
  Ingredient = 'Ingredient'
}

export interface Ingredient {
  name: string;
  quantity: number;
  recommendedCity: City;
  tier?: number;
  uniqueName?: string; // Albion API ID (e.g., T4_MILK)
}

export interface CraftableItem {
  id: string;
  name: string;
  tier: number; // 4, 6, 8 usually
  type: ItemType;
  ingredients: Ingredient[];
  yieldBase?: number; // Usually 10 for food, 5 or 1 for potions depending on craft
  imageUrl?: string;
  description?: string;
  uniqueName?: string; // Albion API ID (e.g., T8_MEAL_STEW_EEL)
}

export interface QueueItem {
  item: CraftableItem;
  quantityToCraft: number; // How many finished products user wants
}

export interface ShoppingListItem {
  name: string;
  totalQuantity: number;
  recommendedCity: City;
  tiers: number[];
  uniqueName?: string;
}

export interface AiRecipeResponse {
  name: string;
  description: string;
  ingredients: {
    name: string;
    quantity: number;
    recommendedCity: string;
  }[];
}

export interface CityBonus {
  city: City;
  description: string;
  resources: string[];
}