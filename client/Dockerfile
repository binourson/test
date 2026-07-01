# ---- Stage 1: BUILD the static files with Node ----
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build          # Vite compiles everything into /app/dist (static HTML/CSS/JS)

# ---- Stage 2: SERVE those files with nginx ----
FROM nginx:alpine
# Copy ONLY the built output from stage 1 into nginx's web root.
COPY --from=build /app/dist /usr/share/nginx/html
# Our own nginx config (needed so React Router works on page refresh).
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# The nginx base image already starts the server, so no CMD is needed.
