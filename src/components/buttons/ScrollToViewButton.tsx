'use client';
import React from 'react'

function ScrollToViewButton({
  title = "KNOW MORE",
  targetId = "how-can-we-help",
  className = "px-3 py-2 font-large border-2 border-white text-white hover:bg-white hover:text-ozo-green hover:font-semibold transition-all"
}: {
  title?: string,
  targetId?: string,
  className?: HTMLButtonElement['className']
}) {
  const handleScroll = () => {
    const howCanWeHelpComponent = document.getElementById(targetId);
    if (howCanWeHelpComponent) {
      howCanWeHelpComponent.scrollIntoView({ behavior: 'smooth' });
    }
  }
  return (
    <button className={className} onClick={handleScroll}>{title}</button>
  )
}

export default ScrollToViewButton;