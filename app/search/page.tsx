import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

type SearchPageProps = { searchParams: Promise<{ q?: string }> };

async function SearchResults({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const supabase = await createClient();

  const { data: products, error } = query
    ? await supabase.from("products").select("*").ilike("name", `%${query}%`)
    : await supabase.from("products").select("*").limit(20);

  if (error) {
    return <p className="text-red-500">Error loading products.</p>;
  }

  return (
    <main className="space-y-6 p-6">
      <form
        action="/search"
        method="GET"
        className="flex gap-2 w-full max-w-7xl justify-between items-center p-3 px-5 mx-auto text-sm"
      >
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Search products"
          className="flex-1 rounded border px-3 py-2 bg-gray-400"
        />
        <button type="submit" className="rounded bg-black px-4 py-2 text-white">
          Search
        </button>
      </form>

      <section className="grid gap-4">
        {products?.map((product) => (
          <article key={product.id} className="rounded border p-4">
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </article>
        )) ?? <p>No results yet. Try a search.</p>}
      </section>
    </main>
  );
}

export default function SearchPage(props: SearchPageProps) {
  return (
    <Suspense fallback={<div className="p-6">Loading results…</div>}>
      <SearchResults {...props} />
    </Suspense>
  );
}
