import { GITHUB_PATH } from '../../lib/iconPaths'

// React twin of Github.astro, sharing the path so the two cannot drift apart.
export default function GithubIcon({ classes }: { classes: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={classes}
    >
      <path d={GITHUB_PATH} />
    </svg>
  )
}
