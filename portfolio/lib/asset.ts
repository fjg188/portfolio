// Static export to GitHub Pages serves from /portfolio. With
// `images: { unoptimized: true }`, next/image does not auto-prefix
// basePath onto user-provided src, so paths to /public assets must
// be prefixed manually.
export const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : ""

export function asset(path: string): string {
  return `${basePath}${path}`
}
