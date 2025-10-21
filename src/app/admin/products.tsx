"use client";

import ButtonLoader from '@/components/ButtonLoader';
import { Product } from '../../../node_modules/.prisma/client';
import { useEffect, useState } from "react";
import ItemHorizontalCard from '@/components/ItemHorizontalCard';

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
          <ItemHorizontalCard
            key={c.id}
            id={c.id}
            image={c.image || null}
            name={c.name}
            route={c.route}
            type="product"
          />
        ))}
      </div>
    </div>
  );
}
