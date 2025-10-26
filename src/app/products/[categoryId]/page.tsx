import { Category, Product } from '@prisma/client';
import CategoryContainer from '@/components/CategoryContainer';

type CategoryData = Category & {
  products: Product[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoryId: number }>;
}) {
  const { categoryId } = await params;

  const categoryData: CategoryData = await fetch(`http://localhost:3000/api/categories/p/${categoryId}`)
    .then(res => res.json());

  if (!categoryData) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${categoryData.name} - Ozo`,
    description: categoryData.description,
    openGraph: {
      title: `${categoryData.name} - Ozo`,
      description: categoryData.description,
      url: `https://odofree.com/products/${categoryId}`,
      images: [
        {
          url: categoryData.image,
          width: 800,
          height: 600,
        },
      ],
    },
  }
}

async function CategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;

  return (
    <div>
      <CategoryContainer categoryId={categoryId} />
    </div>
  )
}

export default CategoryPage;