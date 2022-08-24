# specify node version
FROM node:16.17.0 AS devEnv

# specify working directory in container
WORKDIR /ryanpujo/src/app

#copy package and package-lock json to container working directory
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4200




##################
### Production ###
##################

FROM node:16.17.0 as prodEnv


ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /ryanpujo/src/app

COPY --from=devEnv ... /ryanpujo/src/app

EXPOSE 8080

CMD [ "node", "build/main" ]


