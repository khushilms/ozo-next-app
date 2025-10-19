"use client";

import ButtonLoader from '@/components/ButtonLoader';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
  description?: string;
  path: string;
  image?: string;
};

export default function Categories() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <ButtonLoader />;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">

        {categories.length === 0 && (
          <div>
            <p>No categories found.</p>
            <Link href="/admin/category" className="text-blue-500 underline">Add a new category</Link>
          </div>
        )}
        {categories.map((c) => (
          <Link href={`/admin/category/${c.id}`} key={c.id} className='border rounded border-gray-400 flex items-center cursor-pointer hover:shadow-lg'>
            <Image width={0} height={0} src={c.image || '/placeholder.png'} alt={c.name} className="w-20 h-20 object-cover mr-2 inline-block" />
            <div className='flex flex-col'>
              <p className="font-medium">{c.name}</p>
              <p>ID: {c.id} </p>
              <p>Path: {c.path}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
