import { ProductsData } from '@/constants/ProductsData';
import NotFoundPage from '@/app/not-found';
import Image from 'next/image';
// import SendEnquiry from '@/components/SendEnquiry/SendEnquiry';

const capitalizeName = (name: string) => {
  const words = name.split('-');
  const capitalizedWords = words.map(word => word[0].toUpperCase() + word.slice(1));
  return capitalizedWords.join(' ');
}

export async function generateStaticParams() {
  const categories = ProductsData.flatMap(category => category.products.map(product => ({
    productId: product.productId,
    categoryId: category.categoryId,
  })));
  return categories;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string, categoryId: string }>;
}) {
  const { productId, categoryId } = await params;
  const category = ProductsData.find(category => category.categoryId === categoryId);
  const product = category?.products?.find(product => product.productId === productId);

  if (!product || !category) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${capitalizeName(product.name)} | ${capitalizeName(category.name)}`,
    description: product.description,
    openGraph: {
      title: `${capitalizeName(product.name)} - ${capitalizeName(category.name)}`,
      description: product.description,
      url: `https://odofree.com/products/${category.categoryId}/${product.productId}`,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
        },
      ],
    },
  }
};

async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string, categoryId: string }>;
}) {
  const { productId, categoryId } = await params;
  const category = ProductsData.find(category => category.categoryId === categoryId);
  const product = category?.products?.find(product => product.productId === productId);

  if (!product || !category) {
    return <NotFoundPage />
  }

  return (
    <div className='w-full flex flex-col'>
      <div className='flex md:flex-row flex-col pt-32 xl:px-56 lg:px-20 md:px-16 px-4 sm:px-10 pb-20 md:gap-20 gap-4 justify-between'>
        <div className='md:w-1/2 w-full max-w-[400px] mx-auto'>
          <div className='w-full aspect-square bg-gray-100'>
            {
              product.image ?
                <Image src={product.image} width={0} height={0} alt={product.name} className='w-full h-full object-contain' /> :
                <div className='bg-black/80 w-full h-full flex items-center justify-center'>
                  <p className='text-4xl text-white font-bold text-center'>IMAGE COMING SOON</p>
                </div>
            }
          </div>
        </div>
        <div className='flex flex-col md:gap-10 gap-8 items-start md:w-1/2 w-full'>
          <h1 className='text-4xl md:font-thin text-ozo-green'>{capitalizeName(product.name)}</h1>
          <div className='flex flex-col'>
            <p className='text-xl font-semibold'>Overview</p>
            <p className=''>{product.description}</p>
          </div>
          <div className='flex flex-col md:gap-4'>
            <p className='text-xl font-semibold'>Benefits</p>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-2 px-4'>
              {
                product.benefits.map((benefit, index) => (
                  <div key={index} className='flex gap-2'>
                    <div className='w-2 h-2 bg-ozo-green shrink-0 mt-2'></div>
                    <p>{benefit.title}</p>
                  </div>
                ))
              }
            </div>
          </div>
          <div className='flex gap-4 items-center w-full xs:justify-start justify-evenly'>
            <button className='bg-ozo-green hover:bg-ozo-green/70 text-white md:px-8 px-4 md:py-2.5 py-2 text-sm font-semibold border-2 shadow border-white'>
              Know More
            </button>
            {/* <SendEnquiry /> */}
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4 bg-gray-100 xl:px-56 lg:px-20 md:px-16 px-4 sm:px-10 py-14'>
        <p className='text-4xl text-ozo-green font-semibold'>Usage</p>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-10'>
          {
            product.howToUse.map((use, index) => (
              <div key={index} className='flex md:gap-8 gap-4 p-4 bg-white'>
                <div className='md:text-7xl text-5xl text-ozo-green font-semibold'>{index + 1}</div>
                <div className='flex flex-col'>
                  <p className='text-xl font-semibold text-ozo-green'>{use.name}</p>
                  <p className='text-sm'>{use.description}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div className='flex flex-col gap-10 xl:px-56 lg:px-20 md:px-16 px-4 sm:px-10 py-20'>
        <p className='text-4xl text-ozo-green font-semibold'>Key Features</p>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-10 px-4'>
          {
            product.keyFeatures.map((feature, index) => (
              <div key={index} className='w-full h-full relative'>
                <div className='absolute top-0 left-0 w-20 h-4/5 bg-ozo-green z-0 -translate-x-3 -translate-y-3' />
                <div className='flex flex-col p-4 bg-ozo-green-light w-full h-full z-5 relative'>
                  <p className='text-xl font-semibold text-ozo-green'>{feature.name}</p>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ProductPage;