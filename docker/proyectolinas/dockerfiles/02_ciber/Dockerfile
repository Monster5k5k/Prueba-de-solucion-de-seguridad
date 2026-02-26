# Heredar de tu imagen 01_ubase (cambia el nombre si es distinto en tu local)
FROM mortviva7/ubbase 

# Crear directorio para los scripts de esta capa
RUN mkdir -p /root/admin/ciber

# Copiar el script a su nueva ruta estructurada
COPY ./admin/start.sh /root/admin/ciber/start.sh

# Dar permisos de ejecución
RUN chmod +x /root/admin/ciber/start.sh

# Entrypoint apuntando al nuevo script
ENTRYPOINT ["/root/admin/ciber/start.sh"]