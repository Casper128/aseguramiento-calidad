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

# Definir variables de entorno (opcional, pero mejor en docker-compose.yml)
ENV PORT=4000
ENV DB_CNN="mongodb+srv://darwinosorio286:1017230626@calendar-db.umlxspn.mongodb.net/?retryWrites=true&w=majority&appName=calendar-db"
ENV SECRET_JWT_SEED="Esto-Es-UnA-Palbr@_SecretA1234567"

# Exponer puerto
EXPOSE 4000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
