const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const deleteJob = async (id: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, { method: "DELETE" });
  return res.ok;
};