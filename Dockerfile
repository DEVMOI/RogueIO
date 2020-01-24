FROM node:lts

#Creates Working App
WORKDIR /usr/src/app
RUN npm i -g nodemon
#copy's package.json file and installs deps
COPY package.json ./
RUN npm install --quiet

#bundles source
COPY . .