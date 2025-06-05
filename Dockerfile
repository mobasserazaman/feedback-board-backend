FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN apk add --no-cache postgresql-client
COPY . .
EXPOSE 8080
CMD ["sh", "-c", "psql -h db -U postgres -d feedbackdb -f init.sql && node index.js"]
