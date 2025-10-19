"use client";

import { useParams } from "next/navigation";
import AddEditProduct from '@/components/AddEditProduct';

export default function EditProductPage() {
  const { id } = useParams(); // product id

  return (
    <div>
      <AddEditProduct
        isEditMode
        productId={String(id)}
      />
    </div>
  )
}
