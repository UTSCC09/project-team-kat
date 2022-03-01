FROM node:17

# Create app directory
WORKDIR /app

# Copy app dependencies
COPY package*.json /app

# Install dependencies
RUN npm install

# Bundle app source
COPY . /app

# Open port 8080 
EXPOSE 8080

# Start server
CMD [ "node", "src/server.js" ]