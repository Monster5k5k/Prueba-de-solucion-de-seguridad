# 1. Heredamos de TU capa de Nginx (paso 03)
FROM mortviva7/ubnginx:latest 

# 2. Instalar NodeJS
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs

# 3. Preparar directorio de la app
WORKDIR /app
COPY proyectos/tarkov-web/package*.json ./
RUN npm install
COPY proyectos/tarkov-web .
RUN npm run build

# 4. Desplegar en NGINX
RUN cp -r dist/* /var/www/html/ 2>/dev/null || cp -r build/* /var/www/html/ 2>/dev/null || true

# 5. Copiamos TU script de arranque estructurado
RUN mkdir -p /root/admin/react
COPY ./admin/start.sh /root/admin/react/start.sh
RUN chmod +x /root/admin/react/start.sh

EXPOSE 80 3000 22

ENTRYPOINT ["/root/admin/react/start.sh"]