import React from 'react'

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1920px] mx-auto p-6 space-y-6">
      {children}
    </div>
  )
}

export default PageWrapper;