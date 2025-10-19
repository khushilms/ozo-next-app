export type SubData = {
  title: string;
  description: string;
}

export type Product = {
  id: number;
  name: string;
  categoryId: number;
  description?: string;
  image?: string;
  route: string;
  howItworks?: string;
  benefits?: SubData[];
  keyFeatures?: SubData[];
  howToUse?: SubData[];
};