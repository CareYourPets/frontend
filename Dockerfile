FROM node:12.16

RUN echo "Building Docker Image For Frontend App"

COPY . /app
WORKDIR /app

RUN ls -la

RUN yarn install
RUN yarn run build
RUN yarn global add serve

CMD serve -n -s build -p $PORT