# HEREDA DE TU CAPA ANTERIOR
FROM ublcdbase:latest

# Copiamos el script de seguridad
COPY init_ciber.sh /usr/local/bin/init_ciber.sh

# Le damos permisos de ejecución (+x)
RUN chmod +x /usr/local/bin/init_ciber.sh

# ENTRYPOINT: Si arrancamos esta imagen sola, ejecuta la seguridad
ENTRYPOINT ["/usr/local/bin/init_ciber.sh"]