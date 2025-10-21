// src/app/admin/categories/page.tsx
"use client";

import { useEffect, useState } from "react";
import AddCategory from '@/components/AddCategory';
import Modal from '@/components/Modal';
import ItemCard from '@/components/ItemCard';
import { Category } from '@/types/category';
import ButtonLoader from '@/components/ButtonLoader';
import { useRouter } from 'next/navigation';

export default function CategoriesAdminPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleBack = () => {
    router.push('/admin');
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <ButtonLoader />
      </div>
    );
  }

  return (
    <div className="p-10">
      <div>
        <button onClick={handleBack} className='text-blue-500 hover:underline cursor-pointer text-sm'>&larr; Back</button>
      </div>
      <div className='flex justify-between items-center mb-6'>
        <p className="text-2xl font-bold mb-6">Categories</p>
        <Modal
          buttonText="Add Category"
          title="Add a new category"
          content={<AddCategory />}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <ItemCard
            key={category.id}
            id={category.id}
            name={category.name}
            description={category.description}
            image={category.image}
            path={category.path}
            type="category"
          />
        ))}
      </div>
    </div>
  );
}
