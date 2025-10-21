import React from 'react'

function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='p-6 space-y-6'>{children}</div>
  )
}

export default AdminLayout;