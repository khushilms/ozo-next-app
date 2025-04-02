import Link from 'next/link';
import Image from 'next/image';

import ProductCard from "@/components/ProductCard";
import OurProducts from "@/constants/ProductTypes";

const gasStoveChimney = "https://res.cloudinary.com/khalnayak069/image/upload/v1738691040/gas-stove-chimney.jpg";

export async function generateMetadata() {
  return {
    title: 'Products - Ozo',
    description: 'Discover our range of specialized cleaning solutions designed to deliver powerful performance while minimizing environmental impact.',
    openGraph: {
      title: 'Products - Ozo',
      description: 'Discover our range of specialized cleaning solutions designed to deliver powerful performance while minimizing environmental impact.',
      url: 'https://odofree.com/products',
      images: [
        {
          url: gasStoveChimney,
          width: 800,
          height: 600,
        },
      ],
    },
  }
}

function Products() {
  return (
    <div className="">
      <div className="h-[120px]"></div>
      <div className="w-full overflow-hidden relative md:h-[500px] h-auto">
        <div className="absolute w-full flex items-center overflow-hiddenz -z-10">
          <Image alt='gas-stove-chimney' width={0} height={0} src={gasStoveChimney} className="object-cover w-full h-full -scale-x-100" />
        </div>
        <div className="z-10 h-full w-full flex">
          <div className="md:w-1/2 w-3/4 md:bg-ozo-green/70 bg-ozo-green/50 h-full lg:p-24 md:p-10 p-4 text-white flex flex-col text-left md:gap-5 gap-2">
            <p className="font-thin lg:text-6xl md:text-6xl sm:text-5xl text-3xl">WATER WISE</p>
            <p className="font-semibold lg:text-6xl md:text-5xl sm:text-4xl text-2xl">SOLUTIONS</p>
            <p className="font-semibold md:text-lg sm:text-sm text-xs">OZO delivers eco-friendly, green cleaning solutions that enhance the protection, performance, and productivity of your establishment throughout its lifecycle while ensuring minimal water consumption.</p>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-5 justify-center lg:p-20 md:p-10 p-5">
        {
          OurProducts.map((product, index) => {
            return (
              <Link key={index} href={product.link}>
                <ProductCard {...product} />
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default Products;