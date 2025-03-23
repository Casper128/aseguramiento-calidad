FROM node:18-alpine3.15

# Directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json ./
COPY package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer puerto
EXPOSE 4000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
