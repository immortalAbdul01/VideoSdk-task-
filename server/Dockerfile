# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the app source
COPY . .

# Expose port
EXPOSE 8080

# Start the app
CMD ["node", "index.js"]
