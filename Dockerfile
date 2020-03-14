FROM node:12.16.1-slim
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "run", "dev"]