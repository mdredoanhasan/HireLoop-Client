"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Briefcase,
  Building2,
  FileSearch,
  MapPin,
  Search,
  Star,
  UserSearch,
} from "lucide-react"

const trending = ["Product Designer", "AI Engineering", "Dev-ops Engineer"]

const stats = [
  { icon: FileSearch, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: UserSearch, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
]

export function Hero() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [location, setLocation] = useState("")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set("q", query.trim())
    if (location.trim()) params.set("location", location.trim())
    router.push(`/jobs?${params.toString()}`)
  }

  return (
    <section className="relative isolate overflow-hidden bg-black text-white">
      {/* ===== Top: badge, title, search ===== */}
      <div className="mx-auto max-w-6xl px-4 pt-32 sm:px-6 sm:pt-40">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/80 px-4 py-1.5 font-mono text-xs">
            <Briefcase className="size-3.5 text-orange-500" />
            <span className="font-semibold text-white">50,000+</span>
            <span className="tracking-wide text-zinc-400">
              NEW JOBS THIS MONTH
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Find Your Dream Job Today
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-400 sm:text-base">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role — faster.
          </p>

          <form
            onSubmit={handleSubmit}
            role="search"
            className="mt-8 flex w-full max-w-xl flex-col gap-2 rounded-xl border border-white/10 bg-zinc-900/80 p-2 backdrop-blur-md sm:flex-row sm:items-center"
          >
            <label className="flex flex-1 items-center gap-2 px-3 py-2">
              <Search className="size-4 shrink-0 text-zinc-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Job title, skill or company"
                aria-label="Job title, skill or company"
                className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
              />
            </label>

            <div
              className="h-px w-full bg-white/10 sm:h-5 sm:w-px"
              aria-hidden="true"
            />

            <label className="flex flex-1 items-center gap-2 px-3 py-2">
              <MapPin className="size-4 shrink-0 text-zinc-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location or Remote"
                aria-label="Location or Remote"
                className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
              />
            </label>

            <button
              type="submit"
              aria-label="Search jobs"
              className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#6556ff] px-4 text-sm font-medium text-white transition-colors hover:bg-[#5444f0] sm:size-9 sm:p-0"
            >
              <Search className="size-4" />
              <span className="sm:hidden">Search</span>
            </button>
          </form>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-zinc-400">Trending Position</span>
            {trending.map((item) => (
              <Link
                key={item}
                href={`/jobs?q=${encodeURIComponent(item)}`}
                className="rounded-full border border-white/10 bg-zinc-900/80 px-3 py-1 text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Bottom: tagline + stats over the globe ===== */}
      <div className="relative mt-10 overflow-hidden">
        <div className="relative mx-auto w-full max-w-[1440px] px-4 pb-16 pt-[24%] sm:px-6">
          {/* Globe: crops off the pink glow, keeps the globe */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 aspect-[1440/1232]"
          >
            <Image
              src="/images/globe.png"
              alt=""
              fill
              priority
              sizes="(min-width: 1440px) 1440px, 100vw"
              className="object-cover object-bottom"
            />
          </div>

          <p className="mx-auto max-w-md text-center text-2xl font-light leading-snug text-zinc-300 sm:text-3xl">
            Assisting over{" "}
            <span className="font-medium text-white">15,000 job seekers</span>{" "}
            find their dream positions.
          </p>

          <ul className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <li
                key={label}
                className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5 backdrop-blur-sm"
              >
                <Icon className="size-4 text-zinc-300" aria-hidden="true" />
                <p className="mt-8 text-4xl font-medium tracking-tight sm:mt-10 sm:text-5xl">
                  {value}
                </p>
                <p className="mt-2 text-sm text-zinc-300">{label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}