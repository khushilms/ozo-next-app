"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { useState } from 'react'

export default function Providers({ session, children }: { session: Session | null, children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 60 * 1000, // 1 hour
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  )
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
    </QueryClientProvider>
  )
}