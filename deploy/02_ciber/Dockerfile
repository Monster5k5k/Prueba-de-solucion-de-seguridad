# heredar cerpeta anterior
FROM ublcdbase:latest

# seguridad
COPY init_ciber.sh /usr/local/bin/init_ciber.sh

# dar permisos de ejecucion
RUN chmod +x /usr/local/bin/init_ciber.sh

# entrypoint que ejecutamos para seguridad 1 vez
ENTRYPOINT ["/usr/local/bin/init_ciber.sh"]