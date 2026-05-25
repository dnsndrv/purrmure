import { notFound } from "next/navigation";
import { allProducts, getProductBySlug } from "@/lib/mock-data";
import { ProductView } from "@/components/products/product-view";

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return {
    title: product ? `${product.name} — PURRMURE` : "Товар не найден",
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return notFound();
  return <ProductView product={product} />;
}
