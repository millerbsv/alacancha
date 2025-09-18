# Imagen base oficial de Node.js
FROM node:20-alpine

# Crear directorio de la app
WORKDIR /usr/src/app

# Copiar solo los archivos de dependencias primero (mejora cache de Docker)
COPY package*.json ./

# Instalar dependencias de producción
RUN npm install --production

# Copiar el resto del código
COPY . .

# Exponer el puerto que usa el microservicio
EXPOSE 3004

# Comando de arranque
CMD ["node", "src/index.js"]
