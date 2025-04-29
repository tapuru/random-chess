# ========== Builder stage ==========
FROM node:20 AS builder

WORKDIR /app

# Install production dependencies
COPY package*.json ./
RUN npm install 

# Copy source and build
COPY . .
RUN npm run build

# ========== Runner stage ==========
FROM node:20-slim AS runner

WORKDIR /app

# Copy only the necessary runtime files
COPY --from=builder /app/dist dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules node_modules

ENV NODE_ENV=production
EXPOSE 3001

CMD ["node", "dist/main"]
