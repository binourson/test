# 1) Base image: a small Linux (Alpine) with Node 22 preinstalled (matches our version).
FROM node:22-alpine

# 2) The working directory INSIDE the container. All later commands run from here.
WORKDIR /app

# 3) Copy ONLY the package files first (see the layer-caching note below).
COPY package*.json ./

# 4) Install dependencies INSIDE the image.
RUN npm install

# 5) Now copy the rest of our source code into the image.
COPY . .

# 6) Document the port the app listens on (informational; publishing happens at run time).
EXPOSE 3000

# 7) The command Docker runs when a container starts (production start — no --watch).
CMD ["node", "src/app.js"]
