"use client";

import { Bookmark } from "lucide-react";

import { Button } from "@/components/ui/button";

export function BookmarkButton() {
  function handleBookmark() {
    // Empty for now. Add saving jobs later.
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Save job"
      onClick={handleBookmark}
    >
      <Bookmark className="size-4" />
    </Button>
  );
}
