#lo pillamos del ngnix
FROM ublcdnginx:latest

#inastalar node
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs

#prepar la app
WORKDIR /app
COPY ./www/package*.json ./
RUN npm install

# construir codigo
COPY ./www .
RUN npm run build

# desplegar la version de ngnix
RUN cp -r build/* /var/www/html/ 2>/dev/null || cp -r dist/* /var/www/html/ 2>/dev/null || true

# arranque de script
COPY init_react.sh /usr/local/bin/init_react.sh
RUN chmod +x /usr/local/bin/init_react.sh

# puertos
EXPOSE 80 3000 22

# entrypoint
ENTRYPOINT ["/usr/local/bin/init_react.sh"]