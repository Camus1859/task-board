FROM node:22
WORKDIR  /api
COPY package-lock.json .
COPY package.json . 
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npx", "tsx", "index.ts"]