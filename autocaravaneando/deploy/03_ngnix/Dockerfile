# HERENCIA: Venimos de la capa de seguridad
FROM ublcdciber:latest

# Instalar Nginx
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Crear carpetas de logs y permisos
RUN mkdir -p /root/logs
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html

# Copiamos el script de arranque de ESTA capa
COPY init_nginx.sh /usr/local/bin/init_nginx.sh
RUN chmod +x /usr/local/bin/init_nginx.sh

# ENTRYPOINT: Encadenamos la ejecución
ENTRYPOINT ["/usr/local/bin/init_nginx.sh"]