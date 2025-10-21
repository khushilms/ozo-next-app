import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ItemHorizontalCardProps {
  id: number;
  image: string | null;
  name: string;
  route: string;
  type: 'product' | 'category';
}

function ItemHorizontalCard({
  id,
  image,
  name,
  route,
  type
}: ItemHorizontalCardProps) {
  const itemRoute = type === 'product' ? `/admin/products/${id}/edit` : `/admin/category/${id}`;
  return (
    <Link href={itemRoute} key={id} className='border rounded border-gray-400 flex items-center cursor-pointer hover:shadow-lg p-2'>
      {
        image ? (
          <Image width={0} height={0} src={image} alt={name} className="w-20 h-20 object-contain mr-2 inline-block shrink-0 rounded" />
        ) : (
          <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-md mr-2">
            <span className="text-gray-500">No Image</span>
          </div>
        )
      }
      <div className='flex flex-col'>
        <p className="font-medium">{name}</p>
        <p>ID: {id} </p>
        <p>Path: {route}</p>
      </div>
    </Link>
  )
}

export default ItemHorizontalCard;