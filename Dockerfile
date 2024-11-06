FROM node:20
ARG APP_NAME=condi
ENV APP=$APP_NAME
WORKDIR /app
COPY *.json ./
RUN npm install
#Copy app code
COPY ./apps/${APP} ./apps/${APP}
#copy share module
COPY ./libs/shared ./libs/shared
COPY ./libs ./libs
RUN  npm run build:${APP}
CMD ["sh", "-c",  "node dist/apps/${APP}/main.js"]