'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

import CrossIcon from '@/assets/close.svg';
import HamburgerIcon from '@/assets/menu.svg';
import useScrollYOffset from '@/hooks/useScrollYOffset';
import useWindowSize from '@/hooks/useWindowSize';
import OzoLogo from '@/assets/ozo-logo-main-no-title.png';
// import SendEnquiry from '../SendEnquiry/SendEnquiry';


const NavItem = ({ children, link }: {
  children: React.ReactNode,
  link: string,
}) => {
  const pathname = usePathname();
  const pageYOffset = useScrollYOffset();
  return <Link href={link} className={`p-2 font-bold cursor-pointer list-none transition-all ${pageYOffset > 0 || pathname !== '/' ? 'nav-item-green' : 'nav-item text-white'}`}>{children}</Link>
}

const NavItemMobile = ({ children, link, closeNavbar }: {
  children: React.ReactNode,
  link: string,
  closeNavbar: () => void
}) => {
  const pathname = usePathname();
  const handleNavigation = () => {
    closeNavbar();
  }
  //  ${link === location.pathname && "border-b-2 border-ozo-green"}
  return <Link href={link} onClick={handleNavigation} className={`text-ozo-green font-bold cursor-pointer ${link === pathname && "border-b-2 border-ozo-green"}`}>{children}</Link>
}

function Navbar() {
  const pageYOffset = useScrollYOffset();
  const [width] = useWindowSize();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const pathname = usePathname();

  const scrollCondition = pageYOffset > 0 || pathname !== '/';

  const openNavbar = () => {
    setNavbarOpen(true);
    document.body.style.overflow = 'hidden';
  }

  const closeNavbar = () => {
    setNavbarOpen(false);
    document.body.style.overflow = 'unset';
  }

  return (
    <div className={`fixed z-50 flex justify-between transition-all w-full text-sm items-center ${scrollCondition ? 'bg-white md:px-8 px-4' : 'md:px-8 px-4'}`}>
      <NavItem link={'/'}>
        <div className='flex gap-2 items-center'>
          {
            scrollCondition ?
              <div className={`${scrollCondition ? 'w-20' : 'w-32'} aspect-square`}>
                <Image alt='ozo-logo' width={0} height={0} src={OzoLogo} className='w-full h-full object-contain' />
              </div>
              : null
          }
        </div>
      </NavItem>
      {
        width > 700 ?
          <div className={`${pageYOffset > 0 ? "" : "md:mt-4"} lg:w-5/12 p-4`}>
            <ul className='flex justify-end gap-5'>
              <NavItem link={'/'}>HOME</NavItem>
              <NavItem link={'/products'}>PRODUCTS</NavItem>
              {/* <SendEnquiry /> */}
            </ul>
          </div>
          :
          <div className='py-2 z-10'>
            {
              navbarOpen ?
                <CrossIcon className='w-6 h-6 cursor-pointer' color={"black"} onClick={closeNavbar} />
                : <HamburgerIcon className='w-6 h-6 cursor-pointer' color={scrollCondition ? "black" : "white"} onClick={openNavbar} />
            }
          </div>
      }
      {
        width < 700 && navbarOpen &&
        <div className={`bg-white/90 w-full h-screen fixed ${scrollCondition ? 'top-24' : 'top-0 pt-10'} left-0`}>
          <ul className='flex flex-col justify-center items-center gap-5 p-10'>
            <NavItemMobile link={'/'} closeNavbar={closeNavbar}>HOME</NavItemMobile>
            <NavItemMobile link={'/products'} closeNavbar={closeNavbar}>PRODUCTS</NavItemMobile>
            {/* <SendEnquiry /> */}
          </ul>
        </div>
      }
    </div>
  )
}

export default Navbar;