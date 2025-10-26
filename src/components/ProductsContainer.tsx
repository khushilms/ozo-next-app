'use client';
import React from 'react';
import Link from 'next/link';

import ProductCard from "@/components/ProductCard";
import useCategories from '@/hooks/useCategories';
import ButtonLoader from './ButtonLoader';

function ProductsContainer() {
  const {
    data: categories = [],
    isLoading,
    isError,
  } = useCategories();
  if (isLoading) {
    return <div className='p-10'><ButtonLoader /></div>;
  }
  if (isError) {
    return <div className=''>Error loading categories</div>;
  }
  return (
    <div className="grid md:grid-cols-3 grid-cols-2 gap-5 justify-center lg:p-20 md:p-10 p-5">
      {
        categories.map((category, index) => {
          return (
            <Link key={index} href={`/products${category.path}`}>
              <ProductCard
                title={category.name}
                description={category.description}
                image={category.image}
              />
            </Link>
          )
        })
      }
    </div>
  )
}

export default ProductsContainer;