FROM mcr.microsoft.com/playwright:v1.60.0-jammy

RUN apt-get update && \
    apt-get install -y default-jre && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .


CMD ["npx", "playwright", "test"]
