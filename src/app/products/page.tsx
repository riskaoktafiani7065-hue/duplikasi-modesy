
import Link from "next/link";
import { products } from "@/data/products";
import ProductGrid from "@/components/products/ProductGrid";
import ProductSearchInfo from "@/components/products/ProductSearchInfo";

type ProductsPageProps = {
  searchParams: Promise<{ search?: string }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const search = params.search?.trim() ?? "";
  const normalizedSearch = search.toLowerCase();

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(normalizedSearch)
  );

  return (
    <main className="min-h-screen bg-[#f8f9fc] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← Back to Home
        </Link>

        <ProductSearchInfo
          search={search}
          count={filteredProducts.length}
        />

        <div className="mt-8">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </main>
  );
}
