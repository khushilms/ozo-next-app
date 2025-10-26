'use client'
import NotFoundPage from '@/app/not-found';
import useCategory from '@/hooks/useCategory';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import ProductCard from './ProductCard';
import ButtonLoader from './ButtonLoader';

function CategoryContainer({
  categoryId,
}: {
  categoryId: string;
}) {
  const {
    data: categoryData,
    isLoading,
    isError,
  } = useCategory(categoryId);

  if (isLoading) {
    return <div className='p-10'><ButtonLoader /></div>;
  }

  if (!categoryData || isError) {
    return <NotFoundPage />
  }

  return (
    <div className='flex flex-col'>
      <div className="w-full overflow-hidden relative md:h-[500px] h-auto">
        <div className="absolute w-full flex items-center overflow-hidden h-full -z-10">
          <Image src={categoryData.image ?? ""} alt='category-image' width={0} height={0} className="object-cover w-full h-full -scale-x-100" />
        </div>
        <div className="z-10 h-full w-full flex">
          <div className="md:w-1/2 w-3/4 md:bg-ozo-green/70 bg-ozo-green/50 h-full lg:p-24 md:p-10 p-4 text-white flex flex-col text-left md:gap-5 gap-2">
            <p className="font-thin lg:text-6xl md:text-6xl sm:text-5xl text-3xl">{categoryData.name}</p>
            <p className="font-semibold lg:text-6xl md:text-5xl sm:text-4xl text-2xl">SOLUTIONS</p>
            <p className="font-semibold md:text-lg sm:text-sm text-xs">{categoryData?.description}</p>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-5 justify-center lg:p-20 md:p-10 p-5">
        {
          categoryData.products?.map((product, index) => {
            return (
              <Link href={`/products/${categoryId}${product.route}`} key={index}>
                <ProductCard
                  title={product.name}
                  image={product.image ?? ""}
                  description={product.description ?? ""}
                />
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default CategoryContainer;