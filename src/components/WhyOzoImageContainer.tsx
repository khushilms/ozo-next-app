import Image, { StaticImageData } from 'next/image';

const WhyOzoImageContainer = ({
  image
}: {
  image: string | StaticImageData;
}) => {
  return (
    <div className="w-24 h-24 overflow-hidden px-4 py-2 rounded-full bg-white">
      <Image src={image} alt="why-Unio Organics-1" className="w-full h-full object-contain" />
      {/* <p className="uppercase font-bold lg:text-base md:text-sm text-xs whitespace-nowrap">{title}</p>
      <p className="lg:text-base md:text-sm text-xs">{description}</p> */}
    </div>
  )
}

export default WhyOzoImageContainer;