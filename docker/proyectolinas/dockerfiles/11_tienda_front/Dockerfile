FROM mortviva7/ubreact:latest

WORKDIR /app/tienda-front

COPY proyectos/trabajos/trabajo-3-trimestre/frontend/package*.json ./
RUN npm install

COPY proyectos/trabajos/trabajo-3-trimestre/frontend .

# Eliminar .env.local para que no sobreescriba las variables del contenedor
RUN rm -f .env.local .env.development.local .env.production.local

RUN mkdir -p /root/admin/tiendafront
COPY ./dockerfiles/11_tienda_front/admin/start.sh /root/admin/tiendafront/start.sh
RUN chmod +x /root/admin/tiendafront/start.sh

EXPOSE 3008 22

ENTRYPOINT ["/root/admin/tiendafront/start.sh"]
