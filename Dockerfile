#
# ---- Base Node ----
FROM node:14.18.1 as base

ENV HOME=/home/app

WORKDIR $HOME/

COPY package.json .
COPY yarn.lock .

#
# ---- Dependencies ----
FROM base AS dependencies

RUN yarn cache clean
RUN yarn install --production
RUN cp -R node_modules prod_node_modules
RUN yarn install

#
# ---- Development ----
FROM dependencies as development
COPY . .

#
# ---- Build ----
FROM development as build
RUN yarn build

#
# ---- Release ----
FROM base AS release
COPY --from=dependencies $HOME/prod_node_modules ./node_modules
COPY --from=build $HOME/dist src
RUN mkdir uploads

EXPOSE 3000

CMD ["yarn", "start"]
