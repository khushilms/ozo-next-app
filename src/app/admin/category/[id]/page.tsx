// src/app/admin/category/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from 'next/image';
import ItemCard from '@/components/ItemCard';
import DeleteItem from '@/components/DeleteItem';
import ButtonLoader from '@/components/ButtonLoader';

type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  route: string;
};

type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  path: string;
  products?: Product[];
};

export default function CategoryDetailPage() {
  const params = useParams();
  const { id } = params; // category id
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleBack = () => {
    router.push('/admin');
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`/api/categories/${id}`);
        if (!res.ok) throw new Error("Failed to fetch category");
        const data = await res.json();
        setCategory(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCategory();
  }, [id]);

  if (loading) {
    return (
      <div className="p-10">
        <ButtonLoader />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="p-10">
        <p>Category not found</p>
        <Link href="/admin" className="text-blue-500 hover:underline">
          Go back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="">
      <div className='mb-4'>
        <button onClick={handleBack} className='text-blue-500 hover:underline cursor-pointer text-sm'>&larr; Back</button>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {
          category.image ? (
            <Image
              src={category.image}
              alt={category.name}
              className="w-full md:w-64 h-40 object-cover rounded-md"
              width={0}
              height={0}
            />
          ) : (
            <div className="w-full md:w-64 h-40 bg-gray-200 flex items-center justify-center rounded-md">
              <span className="text-gray-500">No Image</span>
            </div>
          )
        }
        <div className='flex flex-col gap-2 items-start'>
          <h1 className="text-2xl font-bold">{category.name}</h1>
          <p className="text-gray-600">{category.description}</p>
          <span className="text-sm text-gray-400">Path: {category.path}</span>
          <div className='flex gap-2'>
            <Link
              href={`/admin/category/${category.id}/edit`}
              className="inline-block px-4 py-2 bg-ozo-green text-white rounded-md text-sm"
            >
              Edit Category
            </Link>
            <DeleteItem
              itemId={category.id.toString()}
              type="category"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Products</h2>
          <Link
            href={`/admin/category/${category.id}/products/new`}
            className="px-4 py-2 bg-ozo-green text-white rounded-md text-sm"
          >
            + Add Product
          </Link>
        </div>

        {category.products && category.products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.products.map((product) => (
              <ItemCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                image={product.image}
                path={product.route}
                type="product"
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No products found for this category.</p>
        )}
      </div>
    </div>
  );
}
