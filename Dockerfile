FROM node:16-alpine
ARG APP_NAME=condi
ENV APP=$APP_NAME
WORKDIR /app
COPY *.json ./
RUN npm install
#Copy app code
COPY ./apps/${APP} ./apps/${APP}
#copy share module
COPY ./apps/shared ./apps/shared
COPY ./apps/libs ./apps/libs
RUN  npm run build:${APP}
CMD ["sh", "-c",  "node dist/apps/${APP}/main.js"]