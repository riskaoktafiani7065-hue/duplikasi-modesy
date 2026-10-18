
type ProductSearchInfoProps = {
  search: string;
  count: number;
};

export default function ProductSearchInfo({
  search,
  count,
}: ProductSearchInfoProps) {
  return (
    <div className="mt-6">
      <h1 className="text-3xl font-bold text-gray-900">Products</h1>

      <p className="mt-2 text-sm text-gray-500">
        {search
          ? `Search results for "${search}"`
          : "Discover products from our marketplace."}
      </p>

      <p className="mt-1 text-xs text-gray-500">
        {count} {count === 1 ? "product" : "products"} found
      </p>
    </div>
  );
}
