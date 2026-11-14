"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sortOptions = [
  "Most Recent",
  "Salary: High to Low",
  "Salary: Low to High",
];

export function SortSelect() {
  function handleSortChange() {
    // Empty for now. Add sorting later.
  }

  return (
    <div className="flex items-center gap-2 text-xs text-zinc-400">
      <span>Sort by:</span>
      <Select defaultValue="Most Recent" onValueChange={handleSortChange}>
        <SelectTrigger className="h-9 w-44 border-white/10 bg-zinc-900/60 text-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
