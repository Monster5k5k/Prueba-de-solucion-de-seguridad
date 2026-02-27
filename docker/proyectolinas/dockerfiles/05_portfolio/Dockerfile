# 1. Heredamos de TU capa de React (paso 04)
FROM mortviva7/ubreact:latest 

# (Nota: como heredas de React, Node ya está instalado, pero si lo prefieres puedes dejarlo)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs

WORKDIR /app

COPY proyectos/portfolio/package*.json ./
RUN npm install
COPY proyectos/portfolio .
RUN npm run build

RUN cp -r dist/* /var/www/html/ 2>/dev/null || true

# 2. Copiamos script de arranque estructurado
RUN mkdir -p /root/admin/portfolio
COPY ./dockerfiles/05_portfolio/admin/start.sh /root/admin/portfolio/start.sh
RUN chmod +x /root/admin/portfolio/start.sh

EXPOSE 80 22
ENTRYPOINT ["/root/admin/portfolio/start.sh"]