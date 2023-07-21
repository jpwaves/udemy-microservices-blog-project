FROM node:18-alpine

WORKDIR /var/app

COPY package.json ./
RUN npm install

# make sure you have node_modules in .dockerignore
COPY ./ ./

CMD ["npm", "start"]