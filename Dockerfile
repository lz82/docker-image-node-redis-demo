FROM node
LABEL maintainer="70458055@qq.com"
LABEL description="nodejs image demo with koa"
LABEL version="1.0"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . ./
EXPOSE 8088
CMD [ "npm", "start"]