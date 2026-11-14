export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 rounded-md border border-white/10 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-300">
      {children}
    </span>
  );
}
