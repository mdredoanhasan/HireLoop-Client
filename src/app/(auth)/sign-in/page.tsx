"use client"

import Image from "next/image"
import Link from "next/link"

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

export default function SignInPage() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    }

    // Collected form data (replace with your API call later)
    console.log("Sign in data:", data)
  }

  function handleGoogleClick() {
    console.log("Google sign in clicked")
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
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Sign in to continue to HireLoop.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm text-zinc-300">
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="text-xs text-[#7b6dff] transition-colors hover:text-[#9a8fff]"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className={inputClass}
            />
          </div>

          <Button
            type="submit"
            className="h-11 w-full rounded-xl bg-[#6556ff] text-sm font-medium text-white hover:bg-[#5444f0]"
          >
            Sign In
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
          Continue with Google
        </Button>

        <p className="mt-8 text-center text-sm text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-[#7b6dff] transition-colors hover:text-[#9a8fff]"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  )
}