import { ARROW_PATH } from '../../lib/iconPaths'

// React twin of Arrow.astro, sharing the path so the two cannot drift apart.
export default function Arrow({ classes }: { classes: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={classes}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={ARROW_PATH} />
    </svg>
  )
}
