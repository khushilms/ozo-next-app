import { capitalizeName } from '@/utils/textUtils';
import ProductContainer from '@/components/ProductContainer';
import { Product } from '@prisma/client';
import { CategoryQueryData } from '@/types/category';
// import SendEnquiry from '@/components/SendEnquiry/SendEnquiry';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string, categoryId: number }>;
}) {
  const { productId, categoryId } = await params;
  const category: CategoryQueryData = await fetch(`http://localhost:3000/api/categories/p/${categoryId}`).then(res => res.json());
  const product: Product = await fetch(`http://localhost:3000/api/products/p/${productId}`).then(res => res.json());

  if (!product || !category) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${capitalizeName(product.name)} | ${capitalizeName(category.name)}`,
    description: product.description,
    openGraph: {
      title: `${capitalizeName(product.name)} - ${capitalizeName(category.name)}`,
      description: product.description,
      url: `https://odofree.com/products/${categoryId}/${productId}`,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
        },
      ],
    },
  }
};

async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string, categoryId: string }>;
}) {
  const { productId, categoryId } = await params;

  return (
    <div className='w-full flex flex-col'>
      <ProductContainer productId={productId} categoryId={categoryId} />
    </div>
  )
}

export default ProductPage;