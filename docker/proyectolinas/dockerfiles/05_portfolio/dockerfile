FROM ublcdnginx:latest

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs

WORKDIR /app

COPY Proyectos/portfolio/package*.json ./
RUN npm install
COPY Proyectos/portfolio .
RUN npm run build

RUN cp -r dist/* /var/www/html/ 2>/dev/null || true

COPY deploy/04_react/init_react.sh /usr/local/bin/init_react.sh
RUN chmod +x /usr/local/bin/init_react.sh

EXPOSE 80 22
ENTRYPOINT ["/usr/local/bin/init_react.sh"]
