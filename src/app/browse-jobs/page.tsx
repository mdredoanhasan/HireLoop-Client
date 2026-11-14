import { Suspense } from "react";
import { Job } from "../lib/type";
import { getJobs } from "../lib/api/getJob";


type SearchParams = Promise<Record<string, string | undefined>>;

async function JobsList({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = new URLSearchParams(params as Record<string, string>).toString();

  const jobs: Job[] = await getJobs(query);

  if (jobs.length === 0) {
    return <p>No jobs found.</p>;
  }

  return (
    <ul>
      {jobs.map((job) => (
        <li key={job._id}>{job.title}</li>
      ))}
    </ul>
  );
}

export default function JobsPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div>
      <h1>Jobs</h1>

      <Suspense fallback={<p>Loading jobs...</p>}>
        <JobsList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}