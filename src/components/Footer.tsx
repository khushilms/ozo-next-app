'use client';
import Link from 'next/link';
import Image from 'next/image';

import OzoLogo from '@/assets/ozo-logo-main-no-title.png';
import MailIcon from '@/assets/mail.svg';
import PhoneIcon from '@/assets/call.svg';
import LocationPin from '@/assets/location.svg';
import useCategories from '@/hooks/useCategories';

// import SendEnquiry from '../SendEnquiry/SendEnquiry';

const CategorySection = ({ name, categoryRoute, products }: {
  name: string,
  categoryRoute: string,
  products: {
    name: string,
    route: string
  }[]
}) => {
  return (
    <div className='flex flex-col gap-2 sm:items-start items-center'>
      <p className='uppercase font-bold'>{name}</p>
      <div className='flex flex-col gap-1'>
        {
          products.map((product, index) => (
            <Link href={`/products${categoryRoute}${product.route}`} key={index} className='text-xs text-gray-500 cursor-pointer hover:text-gray-800 sm:text-left text-center'>{product.name}</Link>
          ))
        }
      </div>
    </div>
  )
}

function Footer() {
  const { data: categories, isLoading, isError } = useCategories();

  if (isLoading || isError || !categories) {
    return null;
  }

  return (
    <div className='flex justify-center bg-gray-100'>
      <div className='max-w-[1920px] flex flex-col xl:p-20 lg:p-10 p-6'>
        <div className='w-full  flex sm:flex-row flex-col justify-between  gap-4'>
          <div className='flex flex-col sm:w-1/3 w-full -translate-y-5 sm:items-start items-center gap-4'>
            <div className='w-36 h-32'>
              <Image src={OzoLogo} alt="ozo" width={0} height={0} className='w-full h-full object-contain' />
            </div>
            <p className='text-sm sm:text-left text-center'>We at OZO develop affordable, eco-friendly, water-wise supplies backed by expert guidance and technical expertise.</p>
          </div>
          <div className='w-full lg:flex lg:flex-row xl:gap-20 lg:gap-10 sm:grid flex flex-col grid-cols-2 grid-rows-2 gap-4 justify-center'>
            {
              categories.map((category, index) => {
                return <CategorySection key={index} categoryRoute={category.path} name={category.name} products={category.products} />
              })
            }
          </div>
          <div className='flex flex-col sm:w-1/3 w-full gap-2'>
            <p className='font-bold text-ozo-green uppercase'>Reach us at</p>
            <div className='flex gap-2 sm:flex-col xs:flex-row flex-col w-full justify-between pr-10 pb-5'>
              <div className='flex gap-2'>
                <LocationPin className='w-4 h-4 text-ozo-green translate-y-1' />
                <div className='flex flex-col'>
                  <p className='text-sm font-semibold'>Unik Naturals</p>
                  <div className=''>
                    <p className='text-sm'>No 54, Vijinapura,</p>
                    <p className='text-sm'>DV Nagar, Bengaluru- 560016</p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <div className='flex gap-2 items-center '>
                  <MailIcon className='w-4 h-4 text-ozo-green' />
                  <p className='text-sm'>info@odofree.com</p>
                </div>
                <div className='flex gap-2 items-center'>
                  <PhoneIcon className='w-4 h-4 text-ozo-green' />
                  <p className='text-sm'>+91 72043 95008</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-0.5 bg-black/20' />
        <div className='flex justify-center items-center gap-10 pt-2 pb-4'>
          <p className='sm:text-lg font-semibold uppercase'>Have a question?</p>
          {/* <SendEnquiry /> */}
        </div>
      </div>
    </div>
  )
}

export default Footer;