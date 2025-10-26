import { CategoryQueryData } from '@/types/category';
import { useQuery } from '@tanstack/react-query';

export default function useCategories() {
  return useQuery<CategoryQueryData[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('There was a problem fetching categories');
      }
      return response.json();
    },
  });
}