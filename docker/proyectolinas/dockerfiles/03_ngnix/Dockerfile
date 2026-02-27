# Heredar de tu imagen 02_ciber
FROM mortviva7/ubciber 

RUN mkdir -p /root/admin/nginx
COPY ./dockerfiles/03_ngnix/admin/start.sh /root/admin/nginx/start.sh
RUN chmod +x /root/admin/nginx/start.sh

ENTRYPOINT ["/root/admin/nginx/start.sh"]