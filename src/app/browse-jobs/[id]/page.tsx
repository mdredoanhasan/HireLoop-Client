import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  Banknote,
  Building2,
  Clock,
  DollarSign,
  Laptop,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { Job } from "../../lib/type";
import { getJobById } from "../../lib/api/getJob";
import { Navbar } from "../../components/Navbar";
import { ApplyButton, BookmarkButton } from "../../components/jobsControl";
import { Button } from "@/components/ui/button";

// Your jobs don't have these fields yet, so they are placeholders for now
const isVerified = true;
const experience = "Not specified";
const benefits: { icon: LucideIcon; text: string }[] = [
  { icon: ShieldCheck, text: "Health Insurance" },
  { icon: DollarSign, text: "Performance Bonus" },
  { icon: Laptop, text: "Latest Hardware Stipend" },
  { icon: Wallet, text: "Paid Time Off" },
];

// Turns text into a list: one item for each line
function toList(text: string) {
  return text
    .split("\n")
    .map((line) => line.replace(/^[•\-*]\s*/, "").trim())
    .filter(Boolean);
}

// One small box in the row of 4
function StatCard({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-zinc-950/60 p-4">
      <Icon className="size-4 text-zinc-400" aria-hidden="true" />
      <p className="mt-3 text-[11px] uppercase tracking-wide text-zinc-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
      {note && <p className="mt-0.5 text-xs text-zinc-500">{note}</p>}
    </div>
  );
}

// Bullet list used for responsibilities and requirements
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-400">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
          {item}
        </li>
      ))}
    </ul>
  );
}

// Section heading with a line above it
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-semibold text-white">{children}</h2>;
}

// Gets the job and shows the whole page content
async function JobDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job: Job | null = await getJobById(id);

  if (!job) {
    notFound(); // shows the 404 page
  }

  const hasSalary = job.minSalary !== null && job.maxSalary !== null;
  const locationText =
    job.isRemote && job.location.toLowerCase() !== "remote"
      ? `${job.location} (Remote)`
      : job.location;

  return (
    <div className="mt-6 space-y-6">
      {/* Top card: logo, title, company, buttons */}
      <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-zinc-950/60 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-xl font-semibold text-zinc-300">
            {job.companyName.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-white">{job.title}</h1>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-zinc-400">
              <span className="font-medium">{job.companyName}</span>
              {isVerified && (
                <>
                  <span aria-hidden="true">•</span>
                  <span className="flex items-center gap-1 text-green-500">
                    <BadgeCheck className="size-4" />
                    Verified Employer
                  </span>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <BookmarkButton />
          <ApplyButton />
        </div>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
        {/* Left side */}
        <div className="space-y-6">
          {/* Row of 4 small boxes */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard
              icon={Banknote}
              label="Salary Range"
              value={hasSalary ? `€${job.minSalary} - €${job.maxSalary}` : "Not specified"}
              note={hasSalary ? job.frequency : undefined}
            />
            <StatCard icon={MapPin} label="Location" value={locationText} />
            <StatCard icon={Clock} label="Job Type" value={job.jobType} />
            <StatCard icon={TrendingUp} label="Experience" value={experience} />
          </div>

          {/* Main card */}
          <div className="rounded-xl border border-white/10 bg-zinc-950/60 p-6 sm:p-8">
            <SectionTitle>Job Description</SectionTitle>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              {job.companyName} is looking for a {job.title} to join the{" "}
              {job.category} team. This is a {job.jobType.toLowerCase()}{" "}
              position based in {locationText}.
            </p>

            <div className="mt-8 border-t border-white/10 pt-8">
              <SectionTitle>Responsibilities</SectionTitle>
              <BulletList items={toList(job.responsibilities)} />
            </div>

            <div className="mt-8 border-t border-white/10 pt-8">
              <SectionTitle>Requirements</SectionTitle>
              <BulletList items={toList(job.requirements)} />
            </div>

            <div className="mt-8 border-t border-white/10 pt-8">
              <SectionTitle>Benefits</SectionTitle>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {benefits.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-zinc-300">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="text-sm text-zinc-200">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right side: company overview */}
        <aside className="rounded-xl border border-white/10 bg-zinc-950/60 p-5">
          <h2 className="text-base font-semibold text-white">Company Overview</h2>

          <div className="mt-4 flex h-44 items-center justify-center rounded-lg bg-zinc-900">
            <Building2 className="size-10 text-zinc-600" aria-hidden="true" />
          </div>

          <dl className="mt-5 text-sm">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <dt className="text-xs uppercase text-zinc-500">Industry</dt>
              <dd className="text-zinc-200">{job.category}</dd>
            </div>
            <div className="flex items-center justify-between pt-4">
              <dt className="text-xs uppercase text-zinc-500">Apply by</dt>
              <dd className="text-zinc-200">{job.deadline || "Not specified"}</dd>
            </div>
          </dl>

          <Button
            type="button"
            variant="outline"
            className="mt-5 h-10 w-full rounded-lg border-white/10 bg-transparent text-sm text-white hover:bg-white/5 hover:text-white"
          >
            Visit Website
          </Button>
        </aside>
      </div>
    </div>
  );
}

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="mx-auto max-w-[1600px] px-4 pb-16 pt-28 sm:px-8 lg:px-12">
        <Link
          href="/browse-jobs"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Back to jobs
        </Link>

        <Suspense
          fallback={<p className="mt-6 text-sm text-zinc-400">Loading job...</p>}
        >
          <JobDetails params={params} />
        </Suspense>
      </main>
    </div>
  );
}