# Use a compatible Node image and architecture
FROM --platform=linux/amd64 node:20

# Set the working directory
WORKDIR /app

# Install required packages for building native modules
RUN apt-get update && apt-get install -y python3 g++ make

# Copy package.json and package-lock.json
COPY package*.json ./

# Ensure clean install and force rebuild of SQLite
RUN npm install && npm rebuild sqlite3 --build-from-source

# Copy the rest of the application code
COPY . .

# Expose the backend port
EXPOSE 3000

# Start the backend service
CMD ["npm", "start"]