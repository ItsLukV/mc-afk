# Use a Node.js base image
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json .
COPY pnpm-lock.yaml .

# Install dependencies using pnpm
RUN npm install -g pnpm && pnpm install --prod --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Expose any ports the bot might need, although in this case it's not a web server.
# EXPOSE 25565

# Command to run the application
CMD [ "node", "index.js" ]