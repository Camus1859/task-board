FROM node:22
WORKDIR /task-board
COPY package-lock.json .
COPY package.json .
RUN npm install
COPY . . 
RUN npm run build 
EXPOSE 4173
CMD ["npx", "vite", "preview", "--host"]