FROM mcr.microsoft.com/playwright:v1.52.0-jammy

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Environment variables should be passed at runtime
# BASE_URL, LOGIN_EMAIL, LOGIN_PASSWORD

RUN npx playwright install --with-deps

CMD ["npx", "playwright", "test", "--reporter=line,html,allure-playwright"]

