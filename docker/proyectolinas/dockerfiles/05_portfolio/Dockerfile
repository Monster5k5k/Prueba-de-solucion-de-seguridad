FROM mortviva7/ubreact:latest 

WORKDIR /app/portfolio
COPY proyectos/portfolio/package*.json ./

COPY proyectos/portfolio .

RUN mkdir -p /root/admin/portfolio
COPY ./dockerfiles/05_portfolio/admin/start.sh /root/admin/portfolio/start.sh
RUN chmod +x /root/admin/portfolio/start.sh
ENTRYPOINT ["/root/admin/portfolio/start.sh"]