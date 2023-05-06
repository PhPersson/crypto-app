# Använd en lättviktig image för Node.js
FROM node:14-alpine


WORKDIR /app

COPY . .

RUN npm install


RUN npm run build

CMD ["npm", "run", "serve"]


EXPOSE 3000
