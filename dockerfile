FROM node:18.0.0
WORKDIR /usr/app
COPY package*.json ./
COPY src ./src/
COPY tsconfig.json ./
COPY test ./test/
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["node", "./dist/index.js"]