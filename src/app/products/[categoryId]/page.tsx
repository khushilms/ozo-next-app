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

  const categoryData: CategoryData = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories/p/${categoryId}`)
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
      url: `${process.env.NEXT_PUBLIC_URL}/products/${categoryId}`,
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