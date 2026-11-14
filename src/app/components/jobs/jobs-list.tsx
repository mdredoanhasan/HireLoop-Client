import { Job } from "../../lib/type";
import { getJobs } from "../../lib/api/getJob";
import { SortSelect } from "./sort-select";
import { JobCard } from "./job-card";

export type SearchParams = Promise<Record<string, string | undefined>>;

export async function JobsList({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
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
