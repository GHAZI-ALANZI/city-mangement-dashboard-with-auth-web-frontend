FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files
COPY . .

# Expose Angular's default development port
EXPOSE 4200

# Start Angular in development mode
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
