FROM mcr.microsoft.com/playwright:v1.58.2-jammy

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Install Playwright browsers and dependencies
RUN npx playwright install --with-deps

# Default command (can be overridden)
CMD ["npx", "playwright", "test", "--reporter=html"]