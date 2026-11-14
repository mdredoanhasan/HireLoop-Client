import { Suspense } from "react";
import { Banknote, Clock, Globe } from "lucide-react";

import { Job } from "../lib/type";
import { getJobs } from "../lib/api/getJob";
import { Navbar } from "../components/Navbar";
import {
  BookmarkButton,
  JobFilters,
  SearchBar,
  SortSelect,
} from "../components/jobsControl";
import Link from "next/link";

type SearchParams = Promise<Record<string, string | undefined>>;

// Small rounded label inside a job card
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 rounded-md border border-white/10 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-300">
      {children}
    </span>
  );
}

// One job card
function JobCard({ job }: { job: Job }) {
  const hasSalary = job.minSalary !== null && job.maxSalary !== null;

  return (
    <li className="flex items-start gap-4 rounded-xl border border-white/10 bg-zinc-950/60 p-5">
      {/* Company logo placeholder: first letter of the company name */}
      <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-lg font-semibold text-zinc-300">
        {job.companyName.charAt(0).toUpperCase()}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-semibold">
          <Link
            href={`/browse-jobs/${job._id}`}
            className="text-white hover:underline"
          >
            {job.title}
          </Link>
        </h3>

        <p className="mt-1 text-sm text-zinc-400">
          {[job.companyName, job.location].filter(Boolean).join(" • ")}
          {job.isRemote ? " (Remote)" : ""}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {hasSalary && (
            <Badge>
              <Banknote className="size-3.5" />€{job.minSalary} - €
              {job.maxSalary}
            </Badge>
          )}
          <Badge>
            <Clock className="size-3.5" />
            {job.jobType}
          </Badge>
          {job.isRemote && (
            <Badge>
              <Globe className="size-3.5" />
              Remote
            </Badge>
          )}
        </div>
      </div>

      <BookmarkButton />
    </li>
  );
}

// Gets the jobs and shows the heading + cards
async function JobsList({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = new URLSearchParams(
    params as Record<string, string>,
  ).toString();

  const jobs: Job[] = await getJobs(query);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-white">
          Found {jobs.length} Professional Jobs
        </h2>
        <SortSelect />
      </div>

      {jobs.length === 0 ? (
        <p className="mt-6 text-sm text-zinc-400">No jobs found.</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </ul>
      )}
    </div>
  );
}

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
