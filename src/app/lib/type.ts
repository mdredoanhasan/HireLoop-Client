export type JobFormData = {
  id:string,
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
  applicantsCount?: number;
};

export type Job = JobFormData & {
  _id: string
  recruiterId: string
  createdAt: string
}

export type JobApplication = {
  jobId: string;
  userId: string;
  email: string;
  jobTitle: string;
  companyName: string;
  appliedAt: string;
};