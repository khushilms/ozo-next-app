// src/app/api/categories/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET category by id with products
export async function GET(
  req: Request,
  { params }: { params: Promise<{ path: string }> }
) {
  try {
    const { path } = await params;
    const category = await prisma.category.findUnique({
      where: { path: `/${path}` },
      include: { products: true },
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}