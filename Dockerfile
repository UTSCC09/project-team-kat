FROM node:16.14.0 AS frontend
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend .
RUN NODE_OPTIONS="--max-old-space-size=1024" npm run build

FROM node:16.14.0
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend .
COPY --from=frontend /app/build client
EXPOSE 8000
CMD ["node", "server.js"]
