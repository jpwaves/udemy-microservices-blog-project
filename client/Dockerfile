FROM node:18-alpine

# need these env vars due to bugs in create-react-app that prevent it from running correctly in a Docker container
ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /var/app

COPY package.json ./
RUN npm install

# make sure you have node_modules in .dockerignore
COPY ./ ./

CMD ["npm", "start"]