# Use Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the files
COPY . .

# Expose the port and start the server
EXPOSE 4001
CMD ["npm", "start"]
