# Step 1: Build Angular App
FROM node:20 AS build
WORKDIR /app

# Install dependencies
COPY package*.json package-lock.json ./
RUN npm install

# Copy and build the Angular app
COPY . .
RUN npm run build --prod

# Step 2: Serve with Nginx
FROM nginx:stable
WORKDIR /usr/share/nginx/html

# Ensure correct Angular output path
COPY --from=build /app/dist/*/browser .

# Copy custom Nginx config to container
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]