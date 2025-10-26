import React from 'react'

function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='pt-[120px]'>{children}</div>
  )
}

export default ProductsLayout;