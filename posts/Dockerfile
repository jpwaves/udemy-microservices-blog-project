FROM node:18-alpine

# move context to /var/app so we don't accidentally overwrite existing files in the container when we copy over files
WORKDIR /var/app

COPY package.json ./
RUN npm install

# make sure you have node_modules in .dockerignore
COPY ./ ./

CMD ["npm", "start"]