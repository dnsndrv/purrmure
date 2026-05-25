export type ProductCategory = "base" | "bag" | "strap" | "decor" | "set";

export interface Product {
  id: string;
  slug: string;
  category: ProductCategory;
  name: string;
  price: number;
  description: string;
  image: string;
  color: string;
  material: string;
  inStock: boolean;
  compatibleWith?: string[];
  tags?: string[];
  setItems?: {
    baseId?: string;
    bagId?: string;
    strapId?: string;
    decorIds?: string[];
  };
}

export interface ConstructorItems {
  base: Product | null;
  bag: Product | null;
  strap: Product | null;
  decor: Product[];
}

export interface CartItem {
  id: string;
  type: "product" | "set";
  product?: Product;
  quantity: number;
  setItems?: ConstructorItems;
  setPrice?: number;
}

export const categoryLabels: Record<ProductCategory, string> = {
  base: "Основы",
  bag: "Мешки",
  strap: "Ремни",
  decor: "Декор",
  set: "Готовые сборки",
};

export const categorySingular: Record<ProductCategory, string> = {
  base: "Основа",
  bag: "Мешок",
  strap: "Ремень",
  decor: "Декор",
  set: "Готовая сборка",
};
