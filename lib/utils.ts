/* ─────────────────────────────────────────────
   utils.ts — Shared utility functions
   ───────────────────────────────────────────── */

/** Merge class names (simple join, avoid bringing in clsx for this) */
export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}
