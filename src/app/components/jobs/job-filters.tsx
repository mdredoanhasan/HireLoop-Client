"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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

function FilterGroup({
  title,
  name,
  options,
  selected,
  onChange,
}: {
  title: string;
  name: string;
  options: string[];
  selected: string;
  onChange: (option: string) => void;
}) {
  return (
    <div className="mt-5">
      <h3 className="text-sm font-medium text-zinc-300">{title}</h3>

      <div className="mt-3 space-y-3">
        {options.map((option, index) => (
          <div key={option} className="flex items-center gap-3">
            <Checkbox
              id={`${name}-${index}`}
              checked={selected === option}
              onCheckedChange={() => {
                console.log(name, option); // e.g. "type" "Full-time"
                onChange(option);
              }}
            />
            <Label
              htmlFor={`${name}-${index}`}
              className="text-sm text-zinc-400"
            >
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}

export function JobFilters() {
  const router = useRouter();
  const [jobType, setJobType] = useState("");
  const [category, setCategory] = useState("");

  function updateUrl(newJobType: string, newCategory: string) {
    const params = new URLSearchParams();
    if (newJobType) params.set("jobType", newJobType);
    if (newCategory) params.set("category", newCategory);
    router.push(`/browse-jobs?${params.toString()}`);
  }

  function handleJobTypeChange(type: string) {
    const newValue = jobType === type ? "" : type;
    setJobType(newValue);
    updateUrl(newValue, category);
  }

  function handleCategoryChange(item: string) {
    const newValue = category === item ? "" : item;
    setCategory(newValue);
    updateUrl(jobType, newValue);
  }

  return (
    <aside className="h-fit rounded-xl border border-white/10 bg-zinc-950/60 p-5">
      <h2 className="text-lg font-semibold text-white">Filters</h2>

      <FilterGroup
        title="Job Type"
        name="type"
        options={jobTypes}
        selected={jobType}
        onChange={handleJobTypeChange}
      />

      <FilterGroup
        title="Job Category"
        name="category"
        options={categories}
        selected={category}
        onChange={handleCategoryChange}
      />
    </aside>
  );
}
