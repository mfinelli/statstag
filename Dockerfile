FROM node:lts-alpine as source
WORKDIR /app

COPY package* /app/
RUN npm ci --omit=dev
COPY . /app

FROM source as build
RUN npm ci && npx svelte-kit sync && npm run build

FROM node:lts-alpine

LABEL org.opencontainers.image.title=statstag
LABEL org.opencontainers.image.version=0.0.2
LABEL org.opencontainers.image.description="a custom leaderboard app"
LABEL org.opencontainers.image.url=https://github.com/mfinelli/statstag
LABEL org.opencontainers.image.source https://github.com/mfinelli/statstag
LABEL org.opencontainers.image.licenses=AGPL-3.0-or-later

WORKDIR /usr/share/statstag
COPY --from=source /app /usr/src/statstag/
COPY --from=build /app/server.js .
COPY --from=build /app/build .
COPY --from=build /app/package.json .
CMD ["node", "server.js"]
