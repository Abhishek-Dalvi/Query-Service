FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
#Include js file and html file in the image

EXPOSE 3000
CMD ["node", "query-service.js"]
