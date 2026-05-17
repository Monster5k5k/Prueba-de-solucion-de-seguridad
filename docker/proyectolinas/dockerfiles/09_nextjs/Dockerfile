FROM mortviva7/ubreact:latest

WORKDIR /app/next

COPY proyectos/next-app/package*.json ./
COPY proyectos/next-app .

RUN mkdir -p /root/admin/nextjs
COPY ./dockerfiles/09_nextjs/admin/start.sh /root/admin/nextjs/start.sh
RUN chmod +x /root/admin/nextjs/start.sh

EXPOSE 3002 22

ENTRYPOINT ["/root/admin/nextjs/start.sh"]
