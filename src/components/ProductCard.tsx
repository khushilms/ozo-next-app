import Image, { StaticImageData } from 'next/image';

const ProductCard = ({
  title,
  description,
  image
}: {
  title: string,
  description: string,
  image: string | StaticImageData | undefined;
}) => {
  return (
    <div className="flex flex-col gap-4 items-center relative overflow-hidden aspect-square group/product cursor-pointer ">
      {
        image ?
          <Image unoptimized src={image} alt={title} width={0} height={0} className=" bg-black/50 w-full h-full absolute -z-0 group-hover/product:scale-150 product-image object-cover" /> :
          <div className="bg-black/80 w-full h-full absolute -z-0 object-cover flex items-center justify-center">
            <p className='md:text-4xl sm:text-3xl text-2xl text-white font-bold text-center'>IMAGE COMING SOON</p>
          </div>
      }
      <div className="z-0 w-full h-full md:px-6 lg:px-10 sm:px-4 px-2 flex flex-col justify-end md:py-5 py-2  product-container gap-2">
        <p className="uppercase z-0 md:text-2xl sm:text-2xl text-xs text-white md:font-medium font-bold">{title}</p>
        <p className="z-0 text-lg text-white h-0 sm:group-hover/product:h-28 transition-height duration-1000 overflow-hidden md:visible invisible">{description}</p>
      </div>
    </div>
  )
}

export default ProductCard;