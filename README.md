# Projekt Website

This repository contains the source code for the Green Ecolution project website. The website is built using React and Tailwind CSS. The project is built using Vite and TypeScript. The website is deployed using GitHub Actions and Helm. The deployment is done on a Kubernetes cluster. The site is deployed to three environments: Development, Staging and Production.

## Tech Stack

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Set up the project

### Requirements

- [Node.js](https://nodejs.org/en)
- [Yarn](https://yarnpkg.com/)
- [fnm](https://github.com/Schniz/fnm) (optional)

fnm is optional, but it is recommended to use it to manage Node.js versions.

### Local development

First, clone the repository and run the following command to install the project dependencies:

```bash
yarn install
```

Vite is used for the development server. To start the development server, run the following command:

```bash
yarn dev
```

Vite will start a development server at `http://localhost:5173`. Add the `--host` tag to the command to allow access to the server from other devices on the same network.

### Building the project

There are three build modes: `develop`, `stage` and `production`. To build the project in one of the build modes, run the following command:

```bash
yarn build:dev # for development environment
yarn build:stage # for staging environment
yarn build # for production environment
```

The build will be output to the `dist` directory.

## Deployment

There are three environments for the project:

- Development (Automatically deployed on push to `develop` branch)
- Staging (Automatically deployed when a new release is drafted)
- Production (Manually deployed when a new release is published to the `main` branch)

The deployment is done using GitHub Actions and the deployment configuration is located in the `.github/workflows` directory.

For each environment, the deployment workflow will run the following steps:

1. Install the project dependencies
2. Build the project
3. Push package to GitHub Package Registry (see [GitHub Package Registry](https://github.com/orgs/SmartCityFlensburg/packages?repo_name=project-website))
4. Dump version in helm chart values (version tag or commit hash)
5. Deploy the project to the environment

The deployment is done using Helm and the deployment configuration is located in the `k8s` directory. The deployment configuration is stored in the `k8s/values` directory. Inside the `values` directory, there are three files: `develop.yaml`, `stage.yaml` and `prod.yaml`. The deployment configuration for each environment is stored in the respective file.

Each environment has its own url:

- Development: [https://dev.green-ecolution.de](https://dev.green-ecolution.de)
- Staging: [https://stage.green-ecolution.de](https://stage.green-ecolution.de)
- Production: [https://green-ecolution.de](https://green-ecolution.de)
