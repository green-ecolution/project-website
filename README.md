# Green Ecolution – Landing Page

This is the landing page for [Green Ecolution](https://green-ecolution.de), a research project focused on data-driven irrigation of urban trees.

## About the Project

Green Ecolution is a collaboration between the University of Applied Sciences Flensburg and the Technisches Betriebszentrum Flensburg (TBZ). The project uses sensor technology, data analysis, and digital route planning to optimize tree irrigation – saving water and resources in urban environments.

The system is currently being developed towards production readiness for real-world deployment.

## Tech Stack

- [Astro](https://astro.build/) with [React](https://react.dev/) islands and [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Release notes and blog as MDX content collections
- Deployed via GitHub Actions as a static nginx image to Kubernetes

## Development

```bash
pnpm install
pnpm dev
```

The site runs on http://localhost:4321

## Build

```bash
pnpm build
```

## Contact

[info@green-ecolution.de](mailto:info@green-ecolution.de) · [GitHub Organization](https://github.com/green-ecolution)
