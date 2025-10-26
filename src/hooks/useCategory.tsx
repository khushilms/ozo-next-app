import { CategoryQueryData } from '@/types/category';
import { useQuery } from '@tanstack/react-query';

export default function useCategory(categoryId: string) {
  return useQuery<CategoryQueryData>({
    queryKey: ['category', categoryId],
    enabled: !!categoryId,
    queryFn: async () => {
      const response = await fetch(`/api/categories/p/${categoryId}`);
      if (!response.ok) {
        throw new Error('There was a problem fetching the category');
      }
      return response.json();
    },
  });
};