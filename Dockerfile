FROM node:12.16.1-alpine as builder

WORKDIR /app

# install all dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM node:12.16.1-alpine

WORKDIR /app

# install prod dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install --production --frozen-lockfile

COPY --from=builder /app/.next ./.next

EXPOSE 3001

CMD [ "yarn", "start" ]
