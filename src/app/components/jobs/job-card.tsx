import Link from "next/link";
import { Banknote, Clock, Globe } from "lucide-react";

import { Job } from "../../lib/type";
import { BookmarkButton } from "./bookmark-button";
import { Badge } from "./badge";

export function JobCard({ job }: { job: Job }) {
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
