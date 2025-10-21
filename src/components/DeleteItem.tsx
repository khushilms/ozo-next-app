import React, { useState } from 'react';
import ButtonLoader from './ButtonLoader';
import { getTitleCase } from '@/utils/textUtils';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

interface DeleteItemProps {
  type: 'product' | 'category';
  actionType?: 'button' | 'link';
  itemId: string;
}

function DeleteItem({
  type,
  itemId,
  actionType = 'button',
}: DeleteItemProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = () => {
    const apiType = type === 'product' ? 'products' : 'categories';
    setIsLoading(true);
    fetch(`/api/${apiType}/${itemId}`, {
      method: 'DELETE',
    }).then(() => {
      setIsOpen(false);
    }).catch((err) => {
      console.error("Failed to delete item:", err);
      alert("Error deleting item");
    }).finally(() => {
      setIsLoading(false);
      router.push('/admin');
    });
  };


  return (
    <>
      {
        actionType === 'link' ? (
          <button onClick={() => setIsOpen(true)} className='text-red-500 rounded hover:underline cursor-pointer text-sm'>
            Delete {getTitleCase(type)}
          </button>
        ) : (
          <button onClick={() => setIsOpen(true)} className='text-sm cursor-pointer bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>
            Delete {getTitleCase(type)}
          </button>
        )
      }
      {
        isOpen && createPortal(
          <div className='fixed top-0 z-50 bg-black/30 w-screen h-screen flex items-center justify-center' onClick={() => setIsOpen(false)}>
            <div className='bg-white p-6 rounded shadow-lg flex flex-col gap-4'>
              <h2 className='text-xl font-bold'>Confirm Deletion</h2>
              <p>Are you sure you want to delete this {getTitleCase(type)}? This action cannot be undone.</p>
              {
                type === "category" && (
                  <p className='text-red-600'>NOTE: Deleting a category will also delete all associated products.</p>
                )
              }
              <div className='flex gap-4 justify-end'>
                <button onClick={() => setIsOpen(false)} className='px-4 py-2 rounded border border-gray-300 hover:bg-gray-100'>
                  Cancel
                </button>
                <button onClick={handleDelete} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer'>
                  {isLoading ? <ButtonLoader /> : ('Delete')}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )
      }
    </>
  )
}

export default DeleteItem;