//src/types/product.ts
export interface Product {
    id: number;
    name: string;
    price: number;
    description: string | null;
    imageUrl: string | null;
    category: string | null;
    stock: number;
}