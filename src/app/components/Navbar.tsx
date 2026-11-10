"use client";

import { useSyncExternalStore, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { authClient } from "@/app/lib/auth-client";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const links = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
];

const primaryBtn =
  "rounded-xl bg-[#6556ff] font-medium text-white hover:bg-[#5444f0]";

const outlineBtn =
  "rounded-xl border-white/10 bg-transparent text-white hover:bg-white/5 hover:text-white";

function Logo() {
  return (
    <Link
      href="/"
      aria-label="Hireloop home"
      className="flex shrink-0 items-center"
    >
      <Image
        src="/images/logo.png"
        alt="Hireloop"
        width={110}
        height={32}
        priority
        className="h-7 w-auto sm:h-8"
      />
    </Link>
  );
}

function UserBadge({ name }: { name: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#6556ff] text-sm font-semibold text-white"
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

export function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setOpen(false);
          router.push("/");
          router.refresh();
        },
      },
    });
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-2xl border border-white/5 bg-zinc-900/80 px-4 shadow-lg backdrop-blur-md sm:h-16 sm:px-6 lg:px-8"
      >
        <Logo />

        {/* Desktop (lg and up) */}
        <div className="hidden items-center lg:flex">
          <ul className="flex items-center gap-6 xl:gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="whitespace-nowrap text-sm text-zinc-200 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div
            className="mx-5 h-5 w-px bg-zinc-700 xl:mx-6"
            aria-hidden="true"
          />

          <div className="flex items-center gap-2 xl:gap-3">
            {isPending ? (
              <div className="h-10 w-44" aria-hidden="true" />
            ) : user ? (
              <>
                <span className="flex items-center gap-2 text-sm text-zinc-200">
                  <UserBadge name={user.name} />
                  <span className="max-w-[120px] truncate">{user.name}</span>
                </span>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSignOut}
                  className={cn(outlineBtn, "h-10 px-4 text-sm")}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "px-3 text-sm font-medium text-[#7b6dff] hover:bg-transparent hover:text-[#9a8fff]",
                  )}
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className={cn(
                    buttonVariants(),
                    primaryBtn,
                    "h-10 px-5 text-sm",
                  )}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile and tablet (below lg) */}
        <div className="flex items-center gap-2 lg:hidden">
          {!isPending && !user && (
            <Link
              href="/sign-up"
              className={cn(
                buttonVariants(),
                primaryBtn,
                "hidden h-9 px-4 text-sm sm:inline-flex",
              )}
            >
              Get Started
            </Link>
          )}

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <MenuIcon className="size-5" />
          </Button>
        </div>

        {/* Rendered only on the client so the server never outputs Sheet markup */}
        {mounted && (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="right" className="w-[85%] max-w-sm">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-1 px-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base hover:bg-accent"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-4 flex flex-col gap-2 px-4">
                {isPending ? null : user ? (
                  <>
                    <div className="flex items-center gap-3 px-1 pb-2">
                      <UserBadge name={user.name} />
                      <span className="truncate text-sm">{user.name}</span>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSignOut}
                      className={cn(outlineBtn, "h-11")}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      onClick={() => setOpen(false)}
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "h-11 text-[#7b6dff]",
                      )}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setOpen(false)}
                      className={cn(buttonVariants(), primaryBtn, "h-11")}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        )}
      </nav>
    </header>
  );
}
