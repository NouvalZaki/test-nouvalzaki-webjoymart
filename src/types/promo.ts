export interface Promo {
    id: number;
    title: string;
    description: string | null; 
    startDate: string; 
    endDate: string; 
    imageUrl: string | null;
    isActive: boolean;
    createdAt: string; 
    updatedAt: string; 
    linkUrl?: string; 
    date?: Date | string; 
    bgColor?: string; 
}