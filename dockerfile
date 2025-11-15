FROM node:20-alpine AS builder

WORKDIR /api

COPY package*.json .
COPY tsconfig.json .

RUN npm install

COPY . .

RUN npx tsc

FROM node:20-alpine AS production
WORKDIR /api
COPY --from=builder /api/package*.json .
RUN npm install
COPY --from=builder /api/dist ./dist
COPY --from=builder /api/demo ./demo
EXPOSE 8080
CMD ["node", "./demo/demo-inside/index.js"]