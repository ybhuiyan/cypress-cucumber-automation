FROM node:14 AS builder
WORKDIR /app
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 80
CMD ["yarn", "start:prod"]
