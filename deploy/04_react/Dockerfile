# Usamos la imagen base que creaste antes
FROM ublcdnginx:latest

# Instalar Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs

WORKDIR /app

# --- CAMBIO IMPORTANTE 1 ---
# Antes ponía: COPY ./www/package*.json ./
# AHORA: Apuntamos a la carpeta de tu proyecto Tarkov
COPY Proyectos/tarkov-web/package*.json ./
RUN npm install

# --- CAMBIO IMPORTANTE 2 ---
# Antes ponía: COPY ./www .
# AHORA: Copiamos todo el código fuente de Tarkov
COPY Proyectos/tarkov-web .
RUN npm run build

# Desplegar la versión compilada en Nginx
# Vite genera la carpeta 'dist', así que esto está bien
RUN cp -r dist/* /var/www/html/ 2>/dev/null || cp -r build/* /var/www/html/ 2>/dev/null || true

# Copiamos el script de arranque (este sí está en la carpeta local 04_react)
COPY DockerFiles/04_react/init_react.sh /usr/local/bin/init_react.sh
RUN chmod +x /usr/local/bin/init_react.sh

EXPOSE 80 3000 22

ENTRYPOINT ["/usr/local/bin/init_react.sh"]