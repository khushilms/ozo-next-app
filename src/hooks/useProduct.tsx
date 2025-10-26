import { Product } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

export default function useProduct({
  productId,
  categoryId,
}: {
  productId: string;
  categoryId: string;
}) {
  return useQuery<Product>({
    queryKey: ['product', categoryId, productId],
    queryFn: async () => {
      const response = await fetch(`/api/products/p/${productId}`);
      if (!response.ok) {
        throw new Error('There was a problem fetching the product');
      }
      return response.json();
    },
    enabled: !!productId && !!categoryId,
  });
}