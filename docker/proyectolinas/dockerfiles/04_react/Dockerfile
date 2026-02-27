FROM mortviva7/ubnginx:latest 
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs

WORKDIR /app/tarkov
COPY proyectos/tarkov-web/package*.json ./
# Instalamos aquí para que 'vite' ya exista en la imagen
RUN npm install 

COPY proyectos/tarkov-web .

RUN mkdir -p /root/admin/react
COPY ./dockerfiles/04_react/admin/start.sh /root/admin/react/start.sh
RUN chmod +x /root/admin/react/start.sh
ENTRYPOINT ["/root/admin/react/start.sh"]