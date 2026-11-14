import { JobApplication } from "../type";
import { BASE_URL } from "./job";

export async function applyToAJob(data: JobApplication) {
     const res = await fetch(`${BASE_URL}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
     });
    
    
      if (!res.ok) {
        throw new Error("Could not create job post.");
    }
    
    return res.json()
}