'use client';
import React from 'react'

function useScrollYOffset() {
  const [pageYOffset, setPageYOffset] = React.useState(0);
  const handleScroll = () => {
    setPageYOffset(window.scrollY);
  }
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    setPageYOffset(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return pageYOffset;
}

export default useScrollYOffset;