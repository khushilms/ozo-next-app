import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Categories from "./categories";
import Products from "./products";
import Link from 'next/link';
import PageWrapper from '@/components/PageWrapper';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) return <p className="p-4 pt-[120px] h-screen">
    You must be logged in to view this page.
    <Link href="/login" className="text-blue-500 underline ml-2">Login</Link>
  </p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <Categories />
      <Products />
    </div>
  );
}
