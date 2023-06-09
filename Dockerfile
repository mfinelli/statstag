FROM node:lts-alpine as source
WORKDIR /app

COPY package* /app/
RUN npm ci
COPY . /app

FROM source as build
RUN npm run build

FROM node:lts-alpine
LABEL org.opencontainers.image.source https://github.com/mfinelli/statstag
WORKDIR /usr/share/statstag
COPY --from=source /app /usr/src/statstag/
COPY --from=build /app/entry.js .
COPY --from=build /app/build .
COPY --from=build /app/package.json .
CMD ["node", "entry.js"]
