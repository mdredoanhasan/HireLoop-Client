import { Suspense } from "react";

import { Navbar } from "../components/Navbar";
import { JobsList, type SearchParams } from "../components/jobs/jobs-list";
import {
  JobFilters,
  SearchBar,
} from "../components/jobsControl";

export default function JobsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="mx-auto max-w-[1600px] px-4 pb-16 pt-28 sm:px-8 lg:px-12">
        <SearchBar />

        <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
          <JobFilters />

          <Suspense
            fallback={<p className="text-sm text-zinc-400">Loading jobs...</p>}
          >
            <JobsList searchParams={searchParams} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
