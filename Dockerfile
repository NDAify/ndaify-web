FROM node:14.2.0-alpine as builder

WORKDIR /app

# install all dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM node:14.2.0-alpine

WORKDIR /app

# install prod dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install --production --frozen-lockfile

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public

EXPOSE 3001

CMD [ "yarn", "start" ]
