// src/app/admin/category/[id]/products/new/page.tsx
"use client";

import { useParams } from "next/navigation";
import AddEditProduct from '@/components/AddEditProduct';

export default function NewProductPage() {
  const { id } = useParams(); // category id

  return (
    <AddEditProduct
      categoryId={String(id)}
    />
  )

}
