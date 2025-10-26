import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/products/[id]
export async function GET(
  req: Request,
  { params }: { params: Promise<{ path: string }> }
) {
  try {
    const { path } = await params;

    const product = await prisma.product.findUnique({
      where: { route: `/${path}` },
      include: {
        category: true, // include category info if needed
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}