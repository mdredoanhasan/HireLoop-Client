"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Code2,
  Globe,
  Megaphone,
  MapPin,
  MoreVertical,
  Palette,
  Pencil,
  Plus,
  Server,
  ShieldCheck,
  Trash2,
  Users,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { getJobs } from "@/app/lib/api/getJob";
import { deleteJob } from "@/app/lib/api/deleteJobs";
import { DeleteDialog } from "@/app/components/deleteDialog";
import { Job } from "@/app/lib/type";


// Icon + accent colour per category (matches the categories in the post-job form)
const categoryStyle: Record<string, { icon: LucideIcon; text: string }> = {
  "Engineering & Tech": { icon: Code2, text: "text-sky-400" },
  Design: { icon: Palette, text: "text-orange-400" },
  Product: { icon: Briefcase, text: "text-violet-400" },
  Marketing: { icon: Megaphone, text: "text-fuchsia-400" },
  Sales: { icon: Briefcase, text: "text-emerald-400" },
  "Customer Support": { icon: ShieldCheck, text: "text-teal-400" },
  Finance: { icon: Briefcase, text: "text-yellow-400" },
  "Human Resources": { icon: Users, text: "text-pink-400" },
  Operations: { icon: Server, text: "text-cyan-400" },
};

const fallbackCategory = { icon: Briefcase, text: "text-zinc-400" };

const frequencyShort: Record<string, string> = {
  "per hour": "hr",
  "per day": "day",
  "per week": "wk",
  "per month": "mo",
  "per year": "yr",
};

function formatMoney(value: number) {
  if (value >= 1000) {
    const k = value / 1000;
    return `€${Number.isInteger(k) ? k : k.toFixed(1)}k`;
  }
  return `€${value}`;
}

function formatCompensation(job: Job) {
  const { minSalary, maxSalary, frequency } = job;
  const unit = frequency ? ` / ${frequencyShort[frequency] ?? frequency}` : "";

  if (minSalary != null && maxSalary != null) {
    return `${formatMoney(minSalary)} – ${formatMoney(maxSalary)}${unit}`;
  }
  if (minSalary != null) return `From ${formatMoney(minSalary)}${unit}`;
  if (maxSalary != null) return `Up to ${formatMoney(maxSalary)}${unit}`;
  return "Not disclosed";
}

function formatDate(value?: string | null) {
  if (!value) return "No deadline";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "No deadline";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function isExpired(value?: string | null) {
  if (!value) return false;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  date.setHours(23, 59, 59, 999);
  return date.getTime() < Date.now();
}

function timeAgo(value?: string) {
  if (!value) return "";
  const created = new Date(value).getTime();
  if (Number.isNaN(created)) return "";
  const days = Math.floor((Date.now() - created) / 86_400_000);
  if (days < 1) return "Posted today";
  if (days < 7) return `Posted ${days}d ago`;
  if (days < 30) return `Posted ${Math.floor(days / 7)}w ago`;
  if (days < 365) return `Posted ${Math.floor(days / 30)}mo ago`;
  return `Posted ${Math.floor(days / 365)}y ago`;
}

const headClass =
  "px-4 py-3.5 text-left text-[10px] font-medium uppercase tracking-wider text-zinc-400";

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch jobs (swap this for your own fetching if you prefer)
 useEffect(() => {
  async function loadJobs() {
    try {
      const data = await getJobs();
      setJobs(data);
    } catch {
      setError("Could not load job posts. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  loadJobs();
}, []);

 async function handleDelete(id: string) {
  const ok = await deleteJob(id);
  if (!ok) {
    setError("Could not delete the job post. Please try again.");
    return;
  }
  setJobs((prev) => prev.filter((job) => job._id !== id));
}
  return (
    // root
    <div className="min-h-svh w-full min-w-0 bg-[#111112] px-6 py-8 text-white sm:px-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <nav aria-label="Breadcrumb" className="text-[11px] text-zinc-400">
            <Link href="/recruiter/jobs" className="hover:text-white">
              Manage Jobs
            </Link>
            <span className="mx-1.5" aria-hidden="true">
              &gt;
            </span>
            <span className="text-[#a99cff]">Job Listings &amp; Postings</span>
          </nav>
          <h1 className="mt-2 text-[28px] font-semibold leading-tight tracking-tight">
            Manage Job Posts
          </h1>
          <p className="mt-1.5 text-xs text-zinc-400">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>

        <Link
          href="/Dashboard/recruiter/jobs/new"
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-[#5b4bff] px-4 text-xs font-semibold text-white shadow-[0_0_24px_rgba(101,86,255,0.35)] transition-colors hover:bg-[#6a5bff]"
        >
          <Plus className="h-3.5 w-3.5" />
          New Job Post
        </Link>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400"
        >
          {error}
        </p>
      )}

      {/* Table */}
      <div className="mt-8 overflow-hidden rounded-xl border border-white/6 bg-[#141415]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-245 border-collapse">
            <thead>
              <tr className="border-b border-white/6">
                <th className={headClass}>Job Title &amp; Dept</th>
                <th className={headClass}>Company &amp; Location</th>
                <th className={headClass}>Type</th>
                <th className={headClass}>Compensation</th>
                <th className={headClass}>Applicants</th>
                <th className={headClass}>Status</th>
                <th className={headClass}>Deadline</th>
                <th className={cn(headClass, "text-right")}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-12 text-center text-sm text-zinc-400"
                  >
                    Loading job posts...
                  </td>
                </tr>
              )}

              {!loading && jobs.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center">
                    <p className="text-sm text-zinc-300">No job posts yet</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Create your first listing to start receiving applicants.
                    </p>
                  </td>
                </tr>
              )}

              {jobs.map((job:Job) => {
                const style = categoryStyle[job.category] ?? fallbackCategory;
                const Icon = style.icon;
                const expired = isExpired(job.deadline);
                const applicants = job.applicantsCount ?? 0;

                return (
                  <tr
                    key={job._id}
                    className="border-b border-white/5 transition-colors last:border-b-0 hover:bg-white/2"
                  >
                    {/* Title & dept */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1c1c1f]">
                          <Icon
                            className={cn("h-4 w-4", style.text)}
                            aria-hidden="true"
                          />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-white">
                            {job.title}
                          </p>
                          <p className={cn("mt-0.5 text-[10px]", style.text)}>
                            {job.category}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Company & location */}
                    <td className="px-4 py-3.5">
                      <p className="text-xs text-white">{job.companyName}</p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-zinc-400">
                        {job.isRemote ? (
                          <Globe
                            className="h-3.5 w-3.5 shrink-0"
                            aria-hidden="true"
                          />
                        ) : (
                          <MapPin
                            className="h-3.5 w-3.5 shrink-0"
                            aria-hidden="true"
                          />
                        )}
                        {job.isRemote
                          ? job.location
                            ? `Remote (${job.location})`
                            : "Remote"
                          : job.location || "—"}
                      </p>
                    </td>

                    {/* Type */}
                    <td className="px-4 py-3.5">
                      <span className="inline-block rounded-full bg-[#1f1f22] px-2.5 py-1 text-[10px] text-zinc-300">
                        {job.jobType}
                      </span>
                    </td>

                    {/* Compensation */}
                    <td className="whitespace-nowrap px-4 py-3.5 text-xs font-medium text-white">
                      {formatCompensation(job)}
                    </td>

                    {/* Applicants */}
                    <td className="px-4 py-3.5">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 whitespace-nowrap text-xs",
                          applicants > 0 ? "text-[#b3a8ff]" : "text-zinc-400",
                        )}
                      >
                        <Users className="h-3.5 w-3.5" aria-hidden="true" />
                        {applicants}{" "}
                        {applicants === 1 ? "Candidate" : "Candidates"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium",
                          expired
                            ? "bg-white/6 text-zinc-400"
                            : "bg-emerald-500/10 text-emerald-400",
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            expired ? "bg-zinc-500" : "bg-emerald-400",
                          )}
                        />
                        {expired ? "Expired" : "Active"}
                      </span>
                    </td>

                    {/* Deadline */}
                    <td className="whitespace-nowrap px-4 py-3.5">
                      <p
                        className={cn(
                          "text-xs",
                          expired ? "text-zinc-400" : "text-white",
                        )}
                      >
                        {formatDate(job.deadline)}
                      </p>
                      <p className="mt-0.5 text-[10px] text-zinc-500">
                        {expired ? "Closed" : timeAgo(job.createdAt)}
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/recruiter/jobs/${job._id}/edit`}
                          className="inline-flex h-7 items-center gap-1.5 rounded-md border border-[#6556ff]/30 bg-[#26264a] px-3 text-[10px] font-medium text-[#b3a8ff] transition-colors hover:bg-[#2e2e5a] hover:text-white"
                        >
                          <Pencil className="h-3 w-3" aria-hidden="true" />
                          Update
                        </Link>
                       
                       <DeleteDialog job={job} onConfirm={() => handleDelete(job._id)} />

                        <button
                          type="button"
                          aria-label={`More options for ${job.title}`}
                          className="flex h-7 w-5 items-center justify-center text-zinc-400 transition-colors hover:text-white"
                        >
                          <MoreVertical className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
