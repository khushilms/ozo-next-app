import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


// Seed data for products
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = await req.json();
    const productsData = data.products; // Expecting an array of products

    const createdProducts = [];
    for (const productData of productsData) {
      const product = await prisma.product.create({
        data: {
          ...productData,
          benefits: productData.benefits ?? [],
          keyFeatures: productData.keyFeatures ?? [],
          howToUse: productData.howToUse ?? [],
        },
      });
      createdProducts.push(product);
    }

    return NextResponse.json({ createdProducts }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}