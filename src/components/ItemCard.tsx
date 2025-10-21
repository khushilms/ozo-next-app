import Image from 'next/image';
import Link from 'next/link';
import DeleteItem from './DeleteItem';

interface ItemCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  path: string;
  type: 'category' | 'product';
};

const ItemCard = ({
  id, name, description, image, path, type
}: ItemCardProps) => {
  const subRoute = type === 'category' ? 'category' : 'products';
  return (
    <div className="border border-gray-300 rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
      {
        !image ? (
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md mb-4">
            <span className="text-gray-500">No Image</span>
          </div>
        ) : (
          <Image
            src={image}
            alt={name}
            className="w-full h-40 object-contain rounded-md mb-4"
            width={0}
            height={0}
          />
        )
      }
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-600 text-sm flex-1">{description}</p>
      <div className="mt-4 flex justify-between items-center">
        <div className='flex gap-2'>
          <Link
            href={`/admin/${subRoute}/${id}/edit`}
            className="text-blue-600 hover:underline text-sm"
            key={`edit-${id}`}
          >
            Edit
          </Link>
          {
            type === 'category' && (
              <Link
                href={`/admin/${type}/${id}`}
                className="text-blue-600 hover:underline text-sm"
                key={`view-${id}`}
              >
                View
              </Link>
            )
          }
          <DeleteItem
            itemId={id}
            type={type}
            actionType='link'
          />
        </div>
        <span className="text-xs text-gray-400">{path}</span>
      </div>
    </div>
  )
};

export default ItemCard;