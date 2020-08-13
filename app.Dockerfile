FROM node:12.16

RUN echo "Building Docker Image For Frontend App"

COPY . /app
WORKDIR /app

RUN ls -la

RUN yarn install
RUN yarn run build
RUN yarn global add serve

EXPOSE 3000

ENTRYPOINT serve -s build -p 3000