# Etapa de construcción
FROM node:18-alpine as builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Construir la aplicación
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build

# Etapa de producción
FROM nginx:1.23.3-alpine

# Copiar archivos de construcción
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
