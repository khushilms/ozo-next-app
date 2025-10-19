import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function AddCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [path, setPath] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();

  const handleAddCategory = async () => {
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          path,
          image,
        }),
      });
      if (!res.ok) throw new Error("Failed to create category");
      router.push("/admin");
    } catch (err) {
      console.error(err);
      alert("Error creating category");
    }
  };

  return (
    <div className='flex sm:flex-row flex-col sm:items-start items-center gap-4 w-full'>
      <div className='sm:w-[20rem] sm:h-[20rem] w-[10rem] aspect-square flex items-center justify-center bg-gray-100 overflow-hidden'>
        {
          image === "" ? <span className='text-gray-400'>Image Preview</span> :
            <Image width={0} height={0} src={image} alt={name} className="w-full h-full object-contain" />
        }
      </div>
      <div className='flex flex-col gap-4 flex-1 w-full'>
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
          className="border p-2 rounded w-full"
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
            onClick={handleAddCategory}
            className="bg-ozo-green text-white p-2 rounded flex-1 cursor-pointer hover:bg-ozo-green/90 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddCategory;