import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const releases = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/content/releases',
    // The default id slugifies, turning de/v0.5.0 into de/v050 and with it every
    // public release URL. Keep the path verbatim so /de/releases/v0.5.0 survives.
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ''),
  }),
  schema: z.object({
    version: z.string(),
    date: z.coerce.date(),
    title: z.string(),
    summary: z.string(),
    highlights: z.array(z.string()).default([]),
    changelog: z
      .array(
        z.object({
          // A previously unseen type has to fail the build rather than render blank.
          type: z.enum(['feat', 'fix', 'perf', 'refactor', 'docs', 'chore']),
          scope: z.string().optional(),
          description: z.string(),
          pr: z.number().optional(),
        }),
      )
      .default([]),
  }),
})

export const collections = { releases }
