# ========================================
# Silent Escalation Copilot - MCP Server
# Multi-stage Docker Build
# ========================================

# Stage 1: Build
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Copy source code
COPY *.ts ./

# Build TypeScript
RUN npm run build

# ========================================
# Stage 2: Production Runtime
# ========================================
FROM node:18-alpine

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app user (non-root for security)
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production && \
    npm cache clean --force

# Copy built app from builder stage
COPY --from=builder /app/dist ./dist

# Copy environment template (optional)
COPY .env.example ./

# Change ownership to app user
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the MCP server
CMD ["node", "dist/jira-connector.js"]

# ========================================
# Build & Run Instructions:
# ========================================
# Build:
#   docker build -t silent-escalation-mcp:latest .
#
# Run locally:
#   docker run -d \
#     --name silent-escalation-mcp \
#     -p 3000:3000 \
#     --env-file .env \
#     silent-escalation-mcp:latest
#
# Run with Azure Container Registry:
#   az acr build --registry <your-registry> --image silent-escalation-mcp:v1.0 .
#
# Deploy to Azure App Service:
#   az webapp create \
#     --resource-group <rg-name> \
#     --plan <app-service-plan> \
#     --name <app-name> \
#     --deployment-container-image-name <registry>.azurecr.io/silent-escalation-mcp:v1.0
# ========================================
