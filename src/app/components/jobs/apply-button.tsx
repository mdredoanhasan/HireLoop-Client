"use client";

import { Button } from "@/components/ui/button";

export function ApplyButton() {
  function handleApply() {
    // Empty for now. Add applying later.
  }

  return (
    <Button
      type="button"
      onClick={handleApply}
      className="h-10 rounded-lg bg-white px-5 text-sm font-medium text-black hover:bg-zinc-200"
    >
      Apply Now
    </Button>
  );
}
