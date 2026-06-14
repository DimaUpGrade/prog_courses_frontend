# syntax=docker/dockerfile:1

# --- Этап 1: сборка Vue-приложения ---
FROM node:20-alpine AS build

WORKDIR /app

# Адрес backend API, который будет "вшит" в собранный фронтенд.
# Можно переопределить при сборке: docker build --build-arg VUE_APP_API_URL=http://example.com
ARG VUE_APP_API_URL=http://127.0.0.1:8000
ENV VUE_APP_API_URL=${VUE_APP_API_URL}

# Сначала зависимости -- для кэширования слоя.
# Используем npm install (а не npm ci), т.к. npm ci требует обязательного
# наличия package-lock.json -- если он отсутствует в проекте, сборка
# не упадёт.
COPY package*.json ./
RUN npm install

# Затем остальной код и сборка
COPY . .
RUN npm run build

# --- Этап 2: статика отдаётся через nginx ---
FROM nginx:1.27-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
