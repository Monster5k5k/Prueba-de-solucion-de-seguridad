FROM mortviva7/ubnginx:latest

COPY ./dockerfiles/08_nginxapi/nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /root/admin/nginxapi
COPY ./dockerfiles/08_nginxapi/admin/start.sh /root/admin/nginxapi/start.sh
RUN chmod +x /root/admin/nginxapi/start.sh

EXPOSE 80 22

ENTRYPOINT ["/root/admin/nginxapi/start.sh"]
