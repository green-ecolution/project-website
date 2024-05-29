# Projekt Website

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

Vite will start a development server at `http://localhost:5173`. Add the `--host' tag to the command to allow access to the server from other devices on the same network.

### Building the project

There are three build modes: `develop', `stage' and `production'. To build the project in one of the build modes, run the following command:

```bash
yarn build:dev # for development environment
yarn build:stage # for staging environment
yarn build # for production environment
```

The build will be output to the `dist` directory.
