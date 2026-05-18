FROM mortviva7/ubreact:latest

WORKDIR /app/tienda-back

COPY proyectos/trabajos/trabajo-3-trimestre/backend/package*.json ./
RUN npm install

COPY proyectos/trabajos/trabajo-3-trimestre/backend .

RUN mkdir -p uploads

RUN mkdir -p /root/admin/tiendaback
COPY ./dockerfiles/10_tienda_back/admin/start.sh /root/admin/tiendaback/start.sh
RUN chmod +x /root/admin/tiendaback/start.sh

EXPOSE 3007 22

ENTRYPOINT ["/root/admin/tiendaback/start.sh"]
