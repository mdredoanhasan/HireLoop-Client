"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Globe,
  MapPin,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createJobs } from "@/app/lib/action";

export type JobFormData = {
  title: string;
  companyName: string;
  category: string;
  jobType: string;
  isRemote: boolean;
  location: string;
  deadline: string;
  minSalary: number | null;
  maxSalary: number | null;
  frequency: string;
  responsibilities: string;
  requirements: string;
};

const categories = [
  "Engineering & Tech",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Customer Support",
  "Finance",
  "Human Resources",
  "Operations",
];

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

const frequencies = [
  "per hour",
  "per day",
  "per week",
  "per month",
  "per year",
];

// Shared field look: dark fill, soft border, light placeholder text like the design
const fieldClass =
  "h-11 rounded-lg border border-white/[0.06] bg-[#1c1c1f] px-4 text-[13px] text-zinc-200 placeholder:text-zinc-300 focus-visible:border-[#6556ff]/60 focus-visible:ring-[#6556ff]/25";

const triggerClass = cn(
  fieldClass,
  "w-full justify-between data-[size=default]:h-11",
);

const areaClass =
  "min-h-24 rounded-lg border border-white/[0.06] bg-[#1c1c1f] px-4 py-3 text-[13px] leading-relaxed text-zinc-200 placeholder:text-zinc-300 focus-visible:border-[#6556ff]/60 focus-visible:ring-[#6556ff]/25";

const labelClass = "text-xs font-normal text-zinc-300";

// Inline so the icon never overlaps the text
const iconPad = { paddingLeft: "2.5rem" };

const iconClass =
  "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2.5 text-[13px] font-medium text-white">
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-[#6556ff]"
      />
      {children}
    </h2>
  );
}

function Required() {
  return <span className="ml-0.5 text-[#7b6dff]">*</span>;
}

export default function PostJobPage() {
  // Default matches the design; set to "" if you want the user to choose
  const [category, setCategory] = useState("Engineering & Tech");
  const [frequency, setFrequency] = useState("per hour");
  const [isRemote, setIsRemote] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const minSalary = String(formData.get("minSalary") ?? "");
    const maxSalary = String(formData.get("maxSalary") ?? "");

    if (!category) {
      setError("Please choose a job category.");
      return;
    }
    if (minSalary && maxSalary && Number(minSalary) > Number(maxSalary)) {
      setError("Minimum salary cannot be higher than maximum salary.");
      return;
    }

    setError(null);

    const data: JobFormData = {
      title: String(formData.get("title") ?? "").trim(),
      companyName: String(formData.get("companyName") ?? "").trim(),
      category,
      jobType: String(formData.get("jobType") ?? "Full-time"),
      isRemote,
      location: String(formData.get("location") ?? "").trim(),
      deadline: String(formData.get("deadline") ?? ""),
      minSalary: minSalary ? Number(minSalary) : null,
      maxSalary: maxSalary ? Number(maxSalary) : null,
      frequency,
      responsibilities: String(formData.get("responsibilities") ?? "").trim(),
      requirements: String(formData.get("requirements") ?? "").trim(),
    };

    // Collected form data (replace with your API call later)
    const result = await createJobs(data);
    console.log(result);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-full w-full bg-[#111112]  px-6 py-10 text-white sm:px-8"
    >
      {/* Full width of the right-hand area, like the design */}
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <nav aria-label="Breadcrumb" className="text-[11px] text-zinc-400">
              <Link href="/recruiter/jobs" className="hover:text-white">
                Manage Jobs
              </Link>
              <span className="mx-1.5" aria-hidden="true">
                &gt;
              </span>
              <span className="text-[#7b6dff]">Create New Listing</span>
            </nav>
            <h1 className="mt-2 text-[28px] font-bold leading-tight tracking-tight">
              Post a New Job
            </h1>
            <p className="mt-1.5 text-[11px] text-zinc-400">
              Fill in the position specifications to attract qualified talent
              across our network.
            </p>
          </div>

          <Button
            type="submit"
            className="h-11 shrink-0 gap-2 rounded-xl bg-gradient-to-r from-[#5b4bff] to-[#7a6bff] px-6 text-[13px] font-semibold text-white shadow-[0_0_28px_rgba(101,86,255,0.45)] hover:brightness-110"
          >
            Publish Job
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-12 space-y-12">
          {/* 1. Basic information */}
          <section className="space-y-5">
            <SectionTitle>1. Basic Information</SectionTitle>

            <div className="space-y-2">
              <Label htmlFor="title" className={labelClass}>
                Job Title <Required />
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Frontend Developer"
                required
                className={fieldClass}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyName" className={labelClass}>
                  Company Name <Required />
                </Label>
                <div className="relative">
                  <Building2 aria-hidden="true" className={iconClass} />
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="HirePulse Network"
                    required
                    style={iconPad}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className={labelClass}>
                  Job Category <Required />
                </Label>
                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value ?? "")}
                >
                  <SelectTrigger id="category" className={triggerClass}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <fieldset className="space-y-2">
              <legend className={cn(labelClass, "mb-2")}>
                Job Type <Required />
              </legend>
              <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                {jobTypes.map((type) => (
                  <label
                    key={type}
                    className="flex h-11 cursor-pointer items-center justify-center rounded-lg border border-white/[0.04] bg-[#1c1c1f] text-[13px] text-zinc-500 transition-colors hover:text-zinc-300 has-[:checked]:border-[#6556ff]/60 has-[:checked]:bg-[#22222e] has-[:checked]:font-semibold has-[:checked]:text-white"
                  >
                    <input
                      type="radio"
                      name="jobType"
                      value={type}
                      defaultChecked={type === "Full-time"}
                      className="sr-only"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </fieldset>
          </section>

          {/* 2. Location, compensation and timeline */}
          <section className="space-y-5">
            <SectionTitle>
              2. Location, Compensation &amp; Timeline
            </SectionTitle>

            <div className="flex items-center justify-between gap-4 rounded-lg border border-white/[0.06] bg-[#1c1c1f] px-4 py-3.5">
              <div className="flex items-center gap-4">
                <Globe
                  className="h-4 w-4 shrink-0 text-zinc-300"
                  aria-hidden="true"
                />
                <div>
                  <Label
                    htmlFor="isRemote"
                    className="text-[13px] font-normal text-white"
                  >
                    Remote Work Allowed (isRemote)
                  </Label>
                  <p className="mt-0.5 text-[11px] text-zinc-400">
                    Enable worldwide or distributed candidate applications
                  </p>
                </div>
              </div>
              <Switch
                id="isRemote"
                checked={isRemote}
                onCheckedChange={setIsRemote}
                className="data-checked:bg-[#6556ff] data-unchecked:bg-[#0c0c0e]"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="location" className={labelClass}>
                    Job Location (location)
                  </Label>
                  {!isRemote && (
                    <span className="text-[10px] text-zinc-500">Required</span>
                  )}
                </div>
                <div className="relative">
                  <MapPin aria-hidden="true" className={iconClass} />
                  <Input
                    id="location"
                    name="location"
                    placeholder="New York, USA"
                    required={!isRemote}
                    style={iconPad}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline" className={labelClass}>
                  Application Deadline (deadline)
                </Label>
                <div className="relative">
                  <CalendarDays aria-hidden="true" className={iconClass} />
                  <Input
                    id="deadline"
                    name="deadline"
                    type="date"
                    style={iconPad}
                    className={cn(
                      fieldClass,
                      "[color-scheme:dark] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0",
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="minSalary" className={labelClass}>
                  Min Salary / Rate
                </Label>
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-zinc-300"
                  >
                    €
                  </span>
                  <Input
                    id="minSalary"
                    name="minSalary"
                    type="number"
                    min={0}
                    placeholder="25"
                    style={iconPad}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxSalary" className={labelClass}>
                  Max Salary / Rate
                </Label>
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-zinc-300"
                  >
                    €
                  </span>
                  <Input
                    id="maxSalary"
                    name="maxSalary"
                    type="number"
                    min={0}
                    placeholder="40"
                    style={iconPad}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency" className={labelClass}>
                  Frequency
                </Label>
                <Select
                  value={frequency}
                  onValueChange={(value) => setFrequency(value ?? "per hour")}
                >
                  <SelectTrigger id="frequency" className={triggerClass}>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencies.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* 3. Responsibilities and requirements */}
          <section className="space-y-5">
            <SectionTitle>3. Responsibilities &amp; Requirements</SectionTitle>

            <div className="space-y-2">
              <Label htmlFor="responsibilities" className={labelClass}>
                Key Responsibilities <Required />
              </Label>
              <Textarea
                id="responsibilities"
                name="responsibilities"
                required
                placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
                className={areaClass}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements" className={labelClass}>
                Qualifications &amp; Requirements <Required />
              </Label>
              <Textarea
                id="requirements"
                name="requirements"
                required
                placeholder={
                  "• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs\n• Experience partnering closely with product teams and UI/UX designers"
                }
                className={cn(areaClass, "min-h-28")}
              />
            </div>
          </section>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400"
            >
              {error}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
