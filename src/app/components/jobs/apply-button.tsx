"use client";

import { applyToAJob } from "@/app/lib/action/application";
import { useSession } from "@/app/lib/auth-client";
import { Job, JobApplication } from "@/app/lib/type";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ApplyButton({ job }: { job: Job }) {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;

  async function handleApply() {
    if (!user) {
      router.push(`/sign-in?redirectTo=/browse-jobs/${job._id}`);
      return;
    } else if (user.role === "seeker") {
      const application: JobApplication = {
        jobId: job._id,
        userId: user.id,
        email: user.email,
        jobTitle: job.title,
        companyName: job.companyName,
        appliedAt: new Date().toISOString(),
      };
      const result = await applyToAJob(application);
      if (result.insertedId) {
        console.log("Application submitted Successfully");
        // router.push("/browse-jobs");
      }
    } else {
      console.log("user is not a job seeker");
    }
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
