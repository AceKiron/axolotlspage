FROM node:23-bookworm-slim AS build
WORKDIR /axolotlspage

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

RUN npx gulp

FROM node:23-bookworm-slim AS production
WORKDIR /axolotlspage

COPY --from=build /axolotlspage/dist .
RUN npm ci

CMD ["node", "./index.js"]