# ========== Builder stage ==========
FROM node:20 AS builder

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install 

# Copy app source and build
COPY . .
RUN npm run build

# ========== Runner stage ==========
FROM node:20-slim AS runner

WORKDIR /app

# Copy only what's needed to run the app
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules node_modules

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]
