#############################################
# base
#############################################
FROM node:25-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV PNPM_VERSION="10.19.0"
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -
COPY . /app
WORKDIR /app

#############################################
# Builder web
#############################################
FROM base AS build
ARG VERSION=""
ARG BUILD=""
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN VITE_APP_VERSION="$VERSION" VITE_BUILD_VERSION="$BUILD" pnpm run build

#############################################
# Nginx
#############################################
FROM nginx:1.29 AS runner
RUN rm -rf /etc/nginx/conf.d/default.conf && cat <<EOF > /etc/nginx/conf.d/nginx.conf
server {
    listen       80;
    listen  [::]:80;

    location /status {
        stub_status on;
        access_log   off;
    }

    location / {
        root   /usr/share/nginx/html;
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

COPY --from=build /app/dist /usr/share/nginx/html
