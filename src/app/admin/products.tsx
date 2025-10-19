"use client";

import ButtonLoader from '@/components/ButtonLoader';
import { Product } from '../../../node_modules/.prisma/client';
import Image from 'next/image';
import { useEffect, useState } from "react";

export default function Products() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <ButtonLoader />;
  }
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {products.length === 0 && (
          <p>No products found.</p>
        )}
        {products.map((c) => (
          <div key={c.id} className='border rounded border-gray-400 flex items-center'>
            {
              c.image ? (
                <Image width={0} height={0} src={c.image} alt={c.name} className="w-20 h-20 object-cover mr-2 inline-block shrink-0" />
              ) : (
                <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-md mr-2">
                  <span className="text-gray-500">No Image</span>
                </div>
              )
            }
            <div className='flex flex-col'>
              <p className="font-medium">{c.name}</p>
              <p>ID: {c.id} </p>
              <p>Path: {c.route}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
