# Etapa de construcción
FROM node:18-alpine as builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json yarn.lock ./

# Instalar dependencias con Yarn
RUN yarn install --frozen-lockfile

# Copiar código fuente
COPY . .

# Pasar variables de entorno necesarias para la construcción
ARG VITE_API_URL
ENV VITE_API_URL=http://localhost:4000/api

# Construir la aplicación con Vite
RUN yarn build

# Etapa de producción con Nginx
FROM nginx:1.23.3-alpine

# Copiar archivos de construcción
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
