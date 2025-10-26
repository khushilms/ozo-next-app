import React from 'react'

function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='min-h-[500px] pt-[120px] py-4 md:px-10 px-4'>{children}</div>
  )
}

export default AdminLayout;