
import Link from "next/link";
import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-44 items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
        Product Image
      </div>

      <p className="mt-4 text-xs text-gray-500">{product.category}</p>

      <h2 className="mt-1 text-lg font-semibold text-gray-900">
        {product.name}
      </h2>

      <p className="mt-2 font-bold text-blue-600">
        {product.price.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        })}
      </p>

      <Link
        href={`/products/${product.id}`}
        className="mt-4 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        View Details
      </Link>
    </article>
  );
}
