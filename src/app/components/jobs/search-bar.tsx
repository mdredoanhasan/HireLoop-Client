"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  const router = useRouter();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // stops the page from reloading

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const search = data.search;
    const params = new URLSearchParams();
    params.set("search", search as string);
    router.push(`/browse-jobs?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="flex flex-col gap-3 rounded-xl border border-white/10 bg-zinc-950/60 p-4 sm:flex-row"
    >
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
        <Input
          name="search"
          placeholder="Search by job title, keywords..."
          aria-label="Search jobs"
          style={{ paddingLeft: "2.5rem" }}
          className="h-11 border-white/10 bg-zinc-900/60 text-white placeholder:text-zinc-500"
        />
      </div>

      <Button
        type="submit"
        className="h-11 rounded-lg bg-white px-6 text-sm font-medium text-black hover:bg-zinc-200"
      >
        Search Jobs
      </Button>
    </form>
  );
}
