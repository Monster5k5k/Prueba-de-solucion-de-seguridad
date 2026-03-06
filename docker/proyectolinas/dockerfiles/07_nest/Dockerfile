# 1. Heredamos de tu capa 04 (que ya tiene Node.js y Ciberseguridad)
FROM mortviva7/ubreact:latest 

# 2. Directorio de la API
WORKDIR /app/api

# 3. Copiamos el código fuente de NestJS
COPY proyectos/api-nest .

# 4. Configuramos tu script de arranque estructurado
RUN mkdir -p /root/admin/nest
COPY ./dockerfiles/07_nest/admin/start.sh /root/admin/nest/start.sh
RUN chmod +x /root/admin/nest/start.sh

# Puertos: 3001 para la API, 22 para tu SSH de ciberseguridad
EXPOSE 3001 22

ENTRYPOINT ["/root/admin/nest/start.sh"]