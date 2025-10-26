import { Product, Category as CategoryQuery } from '@prisma/client';

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  path: string;
};

export type CategoryQueryData = CategoryQuery & {
  products: Product[];
};