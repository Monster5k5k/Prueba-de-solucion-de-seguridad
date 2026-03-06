#!/bin/bash

# 1. EJECUTAMOS LA CAPA ANTERIOR (Ciberseguridad)
if [ -f /root/admin/ciber/start.sh ]; then
    bash /root/admin/ciber/start.sh &
else
    echo "[POSTGRE] Error: No se encontró la capa de ciberseguridad."
fi

# 2. CONFIGURACIÓN DE POSTGRESQL
echo "[POSTGRE] Iniciando PostgreSQL..."
service postgresql start

# Esperar a que el servicio arranque del todo
sleep 5

# 3. CREACIÓN DE USUARIO Y BASE DE DATOS (Lo que pide el profesor para nota)
# Usamos el usuario 'postgres' del sistema para crear tu usuario personalizado
echo "[POSTGRE] Configurando base de datos y usuario..."
sudo -u postgres psql -c "CREATE USER nestasir WITH PASSWORD 'admin123';"
sudo -u postgres psql -c "ALTER USER nestasir WITH SUPERUSER;"
sudo -u postgres psql -c "CREATE DATABASE nestasir OWNER nestasir;"

echo "[POSTGRE] Base de datos 'nestasir' creada con éxito."

# Mantenemos el contenedor vivo y mostramos logs
tail -f /var/log/postgresql/postgresql-16-main.log