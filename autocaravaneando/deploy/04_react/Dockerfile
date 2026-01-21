# HERENCIA: Venimos de Nginx
FROM ublcdnginx:latest

# 1. Instalar Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs

# 2. Preparar la App
WORKDIR /app
COPY ./www/package*.json ./
RUN npm install

# 3. Copiar código y construir (Build)
COPY ./www .
RUN npm run build

# 4. Desplegar la versión compilada en Nginx (Producción)
# El '|| true' evita error si la carpeta build se llama dist
RUN cp -r build/* /var/www/html/ 2>/dev/null || cp -r dist/* /var/www/html/ 2>/dev/null || true

# 5. Configurar Script de Arranque
COPY init_react.sh /usr/local/bin/init_react.sh
RUN chmod +x /usr/local/bin/init_react.sh

# Puertos expuestos (Informativo)
EXPOSE 80 3000 22

# ENTRYPOINT FINAL
ENTRYPOINT ["/usr/local/bin/init_react.sh"]