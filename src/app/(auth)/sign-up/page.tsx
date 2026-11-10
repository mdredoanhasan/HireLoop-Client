"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Briefcase, ShieldCheck, UserSearch } from "lucide-react"

import { authClient } from "@/app/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.57-5.17 3.57-8.81z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.92l-3.88-3c-1.07.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.1A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54v-3.1H1.27a12 12 0 0 0 0 10.74l4-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.19 15.23 0 12 0A12 12 0 0 0 1.27 6.63l4 3.1C6.22 6.88 8.87 4.77 12 4.77z"
      />
    </svg>
  )
}

const inputClass =
  "h-11 border-white/10 bg-zinc-900/60 text-white placeholder:text-zinc-500"

type Role = "seeker" | "recruiter" | "admin"

const roles: {
  value: Role
  title: string
  description: string
  icon: typeof Briefcase
}[] = [
  {
    value: "seeker",
    title: "Job Seeker",
    description: "Find and apply for jobs",
    icon: UserSearch,
  },
  {
    value: "recruiter",
    title: "Recruiter",
    description: "Post jobs and hire talent",
    icon: Briefcase,
  },
  {
    value: "admin",
    title: "Admin",
    description: "Manage users and jobs",
    icon: ShieldCheck,
  },
]

export default function SignUpPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")
    const confirmPassword = String(formData.get("confirmPassword") ?? "")
    const role = String(formData.get("role") ?? "seeker") as Role
    const acceptedTerms = formData.get("terms") === "on"

    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }
    if (!acceptedTerms) {
      setError("Please accept the Terms of Service and Privacy Policy.")
      return
    }

    setLoading(true)
    setError(null)

    const { error: authError } = await authClient.signUp.email({
      name,
      email,
      password,
      role,
    })

    setLoading(false)

    if (authError) {
      setError(authError.message ?? "Could not create your account.")
      return
    }

    router.push("/")
    router.refresh()
  }

  async function handleGoogleClick() {
    await authClient.signIn.social({ provider: "google", callbackURL: "/" })
  }

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 pb-12 pt-28 text-white">
      {/* Soft purple glow behind the card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6556ff]/20 blur-[120px]"
      />

      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950/80 p-6 shadow-2xl backdrop-blur-md sm:p-8">
        <Image
          src="/images/logo.png"
          alt="HireLoop"
          width={110}
          height={32}
          className="mx-auto mb-6 h-8 w-auto"
        />

        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Join HireLoop and find your next role faster.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Role picker */}
          <fieldset className="space-y-2">
            <legend className="text-sm text-zinc-300">I am a</legend>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {roles.map(({ value, title, description, icon: Icon }) => (
                <label
                  key={value}
                  className="flex cursor-pointer flex-col gap-1 rounded-xl border border-white/10 bg-zinc-900/60 p-3 transition-colors hover:border-white/20 has-[:checked]:border-[#6556ff] has-[:checked]:bg-[#6556ff]/10"
                >
                  <input
                    type="radio"
                    name="role"
                    value={value}
                    defaultChecked={value === "seeker"}
                    className="sr-only"
                  />
                  <Icon className="size-4 text-[#7b6dff]" aria-hidden="true" />
                  <span className="text-sm font-medium">{title}</span>
                  <span className="text-xs text-zinc-400">{description}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm text-zinc-300">
              Full name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your full name"
              autoComplete="name"
              required
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-zinc-300">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm text-zinc-300">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              autoComplete="new-password"
              required
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-sm text-zinc-300">
              Confirm password
            </Label>
            <Input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              placeholder="Repeat your password"
              autoComplete="new-password"
              required
              className={inputClass}
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="mt-0.5 size-4 shrink-0 cursor-pointer rounded border-white/20 bg-zinc-900 accent-[#6556ff]"
            />
            <label
              htmlFor="terms"
              className="text-xs leading-relaxed text-zinc-400"
            >
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-[#7b6dff] transition-colors hover:text-[#9a8fff]"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-[#7b6dff] transition-colors hover:text-[#9a8fff]"
              >
                Privacy Policy
              </Link>
              .
            </label>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400"
            >
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-xl bg-[#6556ff] text-sm font-medium text-white hover:bg-[#5444f0] disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3" aria-hidden="true">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-zinc-500">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleClick}
          className="h-11 w-full gap-2 rounded-xl border-white/10 bg-transparent text-sm text-white hover:bg-white/5 hover:text-white"
        >
          <GoogleIcon />
          Sign up with Google
        </Button>

        <p className="mt-8 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-[#7b6dff] transition-colors hover:text-[#9a8fff]"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  )
}