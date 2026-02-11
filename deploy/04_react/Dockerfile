FROM ublcdnginx:latest

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs

WORKDIR /app

# 1. COPIAR PROYECTO (Busca en 'Proyectos' con mayúscula)
COPY Proyectos/tarkov-web/package*.json ./
RUN npm install

COPY Proyectos/tarkov-web .
RUN npm run build

# 2. DESPLEGAR NGINX
RUN cp -r dist/* /var/www/html/ 2>/dev/null || cp -r build/* /var/www/html/ 2>/dev/null || true

# 3. SCRIPT DE ARRANQUE (CORREGIDO: Busca en 'deploy')
COPY deploy/04_react/init_react.sh /usr/local/bin/init_react.sh
RUN chmod +x /usr/local/bin/init_react.sh

EXPOSE 80 3000 22

ENTRYPOINT ["/usr/local/bin/init_react.sh"]