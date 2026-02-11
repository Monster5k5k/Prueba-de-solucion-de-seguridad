FROM ublcdnginx:latest

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs

WORKDIR /app

# Copiamos el código desde Proyectos
COPY Proyectos/tarkov-web/package*.json ./
RUN npm install
COPY Proyectos/tarkov-web .
RUN npm run build

# Despliegue Nginx
RUN cp -r dist/* /var/www/html/ 2>/dev/null || cp -r build/* /var/www/html/ 2>/dev/null || true

# <--- CORREGIDO: Copiamos desde 'deploy'
COPY deploy/04_react/init_react.sh /usr/local/bin/init_react.sh
RUN chmod +x /usr/local/bin/init_react.sh

EXPOSE 80 3000 22

ENTRYPOINT ["/usr/local/bin/init_react.sh"]