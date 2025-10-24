# 🌱 Green Ecolution – Landing Page

The Green Ecolution landing page provides an overview of the research and development project “Green Ecolution”, which focuses on making the irrigation of urban trees more efficient and sustainable through data-driven technology.

This website presents the project background, milestones, and ongoing development toward a production-ready system.

👉 Visit the live site: <https://green-ecolution.de>

## 🧭 About the Project

Green Ecolution started as a research project at the University of Applied Sciences Flensburg (HS Flensburg) in cooperation with the Technisches Betriebszentrum Flensburg (TBZ).
The goal: optimize tree irrigation using smart sensor technology, data analysis, and digital route planning to save water and resources.

Building on the research results, the system is now being developed further to reach product maturity and real-world deployment in urban environments.

## 🖥️ About This Repository

This repository contains the source code for the official Green Ecolution landing page. It serves as the central information hub for the project — showcasing the concept, progress, and references to related software and publications.

The site is built with a modern web stack and continuously deployed to a Kubernetes environment.

## ⚙️ Tech Stack

- ⚡ [Vite](https://vitejs.dev/) - lightning-fast build tool
- ⚛️ [React](https://react.dev/) - component-based UI library
- 💎 [TypeScript](https://www.typescriptlang.org/) - type-safe JavaScript
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - utility-first styling framework
- 🚀 Deployment: GitHub Actions + Helm + Kubernetes

## 🧩 Local Development

### Prerequisites

- [Node.js](https://nodejs.org/en)
- [pnpm](https://pnpm.io/)
- (optional) [fnm](https://github.com/Schniz/fnm) - Node.js version manager

### Getting Started

Clone the repository and install dependencies:

```bash
pnpm install
```

Run the local development server:

```bash
pnpm dev
```

By default, the site will be available at <http://localhost:5173>. To make it accessible from other devices on your network, start the server with:

```bash
pnpm dev --host
```

### Build for Production

```bash
pnpm build
```

The compiled files are output to the `dist/` directory.

## 🚀 Deployment

Deployments are handled via GitHub Actions and Helm, targeting a Kubernetes cluster.
Each deployment workflow:

1. Installs dependencies
1. Builds the project
1. Publishes a package to the [GitHub Package Registry](https://github.com/orgs/green-ecolution/packages)
1. Updates Helm chart values with version or commit hash
1. Deploys to production

Configuration files are stored in:

```bash
k8s/
└── values/
    └── prod.yaml
```

## 🤝 Contributing

Contributions, feedback, and ideas are welcome! If you’d like to improve the landing page or report an issue, please open a pull request or use the GitHub issue tracker.

## 💬 Contact

For questions or collaboration inquiries, feel free to reach out via 📧 [info@green-ecolution.de](mailto:info@green-ecolution.de) or visit our [GitHub Organization](https://github.com/green-ecolution)
