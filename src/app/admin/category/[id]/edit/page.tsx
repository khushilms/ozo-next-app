"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from 'next/image';
import ButtonLoader from '@/components/ButtonLoader';

type Category = {
  id: number;
  name: string;
  description?: string;
  path: string;
  image?: string;
};

export default function EditCategoryPage() {
  const { id } = useParams(); // dynamic param
  const router = useRouter();

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [path, setPath] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    async function fetchCategory() {
      try {
        const res = await fetch(`/api/categories`);
        const data: Category[] = await res.json();
        const cat = data.find((c) => c.id === Number(id));
        if (!cat) throw new Error("Category not found");
        setCategory(cat);
        setName(cat.name);
        setDescription(cat.description || "");
        setPath(cat.path);
        setImage(cat.image || "");
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchCategory();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const res = await fetch("/api/categories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: category?.id,
          name,
          description,
          path,
          image,
        }),
      });

      if (!res.ok) throw new Error("Failed to update category");
      router.push("/admin"); // redirect to dashboard
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  if (loading) return <div className="p-4"><ButtonLoader /></div>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="bg-white rounded space-y-4 w-full p-10 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold">Edit Category</h2>
      <div className='flex gap-4 w-full'>
        <div className='w-[20rem] h-[20rem] flex items-center justify-center bg-gray-100 overflow-hidden'>
          <Image width={0} height={0} src={image} alt={name} className="w-full h-full object-contain" />
        </div>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full field-sizing-content"

          />
          <input
            type="text"
            placeholder="Path"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-ozo-green text-white p-2 rounded flex-1 cursor-pointer"
            >
              Save
            </button>
            <button
              onClick={() => router.push("/admin/category")}
              className="bg-gray-300 p-2 rounded flex-1 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
