import Image from 'next/image';
import Link from 'next/link';

import { categoriesData } from '@/constants/CategoriesData';
import { ProductsData } from '@/constants/ProductsData';
import ProductCard from '@/components/ProductCard';
import NotFoundPage from '@/app/not-found';

export async function generateStaticParams() {
  return categoriesData.map(category => ({
    categoryId: String(category.id),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoryId: number }>;
}) {
  const { categoryId } = await params;

  const categoryData = categoriesData.find(page => page.path === `/${categoryId}`);

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
  params: Promise<{ categoryId: number }>;
}) {
  const { categoryId } = await params;

  const categoryData = categoriesData.find(page => page.path === `/${categoryId}`);
  const categoryProducts = ProductsData.find(category => category.categoryId === categoryData?.id);

  if (!categoryData) {
    return <NotFoundPage />
  }

  return (
    <div>
      <div className='h-[120px]' />
      <div className="w-full overflow-hidden relative md:h-[500px] h-auto">
        <div className="absolute w-full flex items-center overflow-hidden h-full -z-10">
          <Image src={categoryData?.image} alt='category-image' width={0} height={0} className="object-cover w-full h-full -scale-x-100" />
        </div>
        <div className="z-10 h-full w-full flex">
          <div className="md:w-1/2 w-3/4 md:bg-ozo-green/70 bg-ozo-green/50 h-full lg:p-24 md:p-10 p-4 text-white flex flex-col text-left md:gap-5 gap-2">
            <p className="font-thin lg:text-6xl md:text-6xl sm:text-5xl text-3xl">{categoryData?.name}</p>
            <p className="font-semibold lg:text-6xl md:text-5xl sm:text-4xl text-2xl">SOLUTIONS</p>
            <p className="font-semibold md:text-lg sm:text-sm text-xs">{categoryData?.description}</p>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-5 justify-center lg:p-20 md:p-10 p-5">
        {
          categoryProducts?.products.map((product, index) => {
            return (
              <Link href={`/products${product.route}`} key={index}>
                <ProductCard
                  title={product.name}
                  image={product.image}
                  description={product.description}
                />
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default CategoryPage;