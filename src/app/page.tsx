import Link from 'next/link';
import Image from 'next/image';

import ScrollToViewButton from '@/components/buttons/ScrollToViewButton';
import whyUnioOrganicsData from '@/constants/WhyUnioOrganics';
import OurProducts from '@/constants/ProductTypes';
import WhyOzoImageContainer from '@/components/WhyOzoImageContainer';
import ProductCard from '@/components/ProductCard';

import OzoWhiteLeaf from '@/assets/ozo-white-leaf.svg';
import OzoWhite from '@/assets/ozo-white.svg';

// const homeBG = "https://res.cloudinary.com/khalnayak069/image/upload/v1738691040/gas-stove-chimney.jpg";
// const home2 = "https://res.cloudinary.com/dx3cfts2k/image/upload/v1691044575/home_2-min_glaqpf.jpg";

const hero1 = "https://res.cloudinary.com/khalnayak069/image/upload/v1739693528/pqd8hvrx21sic76adyoh.jpg";
const hero2 = "https://res.cloudinary.com/khalnayak069/image/upload/v1739693528/qjog1hrkeiryceqbvjr7.jpg";
const hero3 = "https://res.cloudinary.com/khalnayak069/image/upload/v1739693528/qa5tdvnxvdf3esecdmyh.jpg";
const hero4 = "https://res.cloudinary.com/khalnayak069/image/upload/v1739693528/yt6catnnqhwmweddkr2a.jpg";

const targettedSolutionsImage = "https://res.cloudinary.com/khalnayak069/image/upload/v1738691040/round-chimney.jpg";

function Home() {
  return (
    <div className='relative w-full'>
      <div className="relative w-full md:h-screen overflow-hidden flex flex-col items-center justify-end">
        <div className='w-screen lg:h-screen h-full absolute left-0 bg-gradient-to-t from-black/80 via-black/30 to-black/80'></div>
        <div className='w-full absolute top-0 h-full items-center grid grid-cols-2 grid-rows-2 -z-10'>
          <div className='w-full h-full'>
            <Image src={hero3} width={0} height={0} alt="hero3" className='w-full h-full object-cover' />
          </div>
          <div className='w-full h-full'>
            <Image src={hero1} width={0} height={0} alt="hero1" className='w-full h-full object-cover' />
          </div>
          <div className='w-full h-full'>
            <Image src={hero2} width={0} height={0} alt="hero2" className='w-full h-full object-cover' />
          </div>
          <div className='w-full h-full'>
            <Image src={hero4} width={0} height={0} alt="hero4" className='w-full h-full object-cover' />
          </div>
        </div>
        <div className="flex flex-col md:gap-16 gap-4 items-center z-10 md:p-10 px-4 py-10">
          <div className="flex flex-col items-center gap-4">
            <div className='flex items-center gap-4'>
              <div className="-translate-y-[10px]">
                <OzoWhiteLeaf width={0} height={0} className='w-56 h-56 object-contain' />
              </div>
            </div>
            <p className="uppercase lg:text-6xl md:text-5xl text-4xl text-white font-semibold">Powerful. Effective. Eco-Friendly.</p>
            <p className="lg:text-2xl md:text-xl text-lg text-white lg:w-1/2 w-full text-center md:flex hidden">Discover our range of specialized cleaning solutions designed to deliver powerful performance while minimizing environmental impact.</p>
          </div>
          <ScrollToViewButton title='KNOW MORE' targetId='how-can-we-help' />
        </div>
      </div>
      <div className="lg:p-20 md:p-10 p-5 px-10 flex md:gap-20 gap-6 justify-center h-min sm:flex-row flex-col">
        <div className="sm:w-1/2 w-full flex sm:justify-end justify-center items-center">
          <div className="lg:w-3/4 w-full sm:aspect-square sm:h-full h-40">
            <Image src={targettedSolutionsImage} width={0} height={0} className="object-cover h-full w-full" alt="targetted-solutions-img" />
          </div>
        </div>
        <div className="sm:w-1/2 w-full">
          <div className="lg:w-3/4 w-full flex flex-col md:gap-10 gap-4 sm:items-start items-center">
            <p className="uppercase font-semibold lg:text-6xl/normal md:text-4xl text-2xl sm:text-left text-center">Targeted Solutions for a Cleaner World</p>
            <p className="lg:text-lg md:text-sm text-xs sm:text-left text-center">We develop and manufacture a range of specialized, eco-friendly cleaning and maintenance solutions designed to conserve water and maximize efficiency.  Our products are uniquely formulated to address specific cleaning challenges across various industries, from descaling and degreasing to drain care and general maintenance. </p>
            {/* <button className="border-2 border-ozo-purple px-3 py-2 font-ozo-purple hover:bg-ozo-purple hover:text-white transition-all" onClick={() => whyUnioOrganicsRef.current.scrollIntoView({ behavior: "smooth", block: "center" })}>LEARN MORE</button> */}
            <ScrollToViewButton title='LEARN MORE' targetId='why-unio-organics' className='border-2 border-ozo-purple px-3 py-2 font-ozo-purple hover:bg-ozo-purple hover:text-white transition-all' />
          </div>
        </div>
      </div>
      <div className="sm:p-10 p-4 bg-ozo-green flex flex-col text-white text-center items-center justify-center gap-10" id='why-unio-organics'>
        <div className="flex flex-col items-center gap-6">
          <div className='flex gap-2 items-center'>
            <p className="text-5xl font-semibold uppercase">WHY</p>
            <div className="-translate-y-2.5">
              <OzoWhite width={0} height={0} className='w-28 h-20 object-contain' />
            </div>
          </div>
          <p className="md:w-[600px] font-semibold md:text-base text-xs"> What sets us apart is our commitment to providing entirely non-toxic, easy-to-use, and affordable solutions.  We prioritize water conservation in all our formulations, ensuring our products are not only effective but also sustainable.</p>
          <div className='w-1/2 h-0.5 bg-white/70' />
          <p className="md:w-[600px] font-semibold md:text-base text-xs">Through dedicated research and development, we create targeted solutions that deliver powerful cleaning performance while minimizing environmental impact.</p>
        </div>
        <div className="flex lg:gap-[8rem] md:gap-4 gap-4 justify-center">
          {
            whyUnioOrganicsData.map((item, index) => {
              return <WhyOzoImageContainer key={index} image={item.image} />
            })
          }
        </div>
      </div>
      <div className="md:p-20 p-4 pb-20 bg-white" id='how-can-we-help'>
        <div className="md:p-16 p-4 w-full flex flex-col items-center gap-4">
          <p className="md:text-5xl sm:text-3xl text-ozo-green uppercase font-semibold">HOW CAN WE HELP?</p>
          <p className="text-center md:w-3/6 sm:w-4/6 font-semibold md:text-2xl sm:text-sm text-xs">Discover our range of premium solutions tailored to meet your unique requirements.</p>
        </div>
        <div className="flex justify-center md:p-10">
          <div className='grid sm:grid-cols-2 grid-cols-2 md:gap-6 lg:gap-10 gap-4 md:w-2/3'>
            {
              OurProducts.map((item, index) => {
                return (
                  <Link key={index} href={item.link}>
                    <ProductCard {...item} />
                  </Link>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;