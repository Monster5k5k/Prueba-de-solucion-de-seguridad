#herencia del anterior
FROM ublcdciber:latest

# Instalar Nginx
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Crear carpetas de logs y permisos
RUN mkdir -p /root/logs
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html

#cpiasmos este archivo
COPY init_nginx.sh /usr/local/bin/init_nginx.sh
RUN chmod +x /usr/local/bin/init_nginx.sh

#encadanamos los scripts
ENTRYPOINT ["/usr/local/bin/init_nginx.sh"]