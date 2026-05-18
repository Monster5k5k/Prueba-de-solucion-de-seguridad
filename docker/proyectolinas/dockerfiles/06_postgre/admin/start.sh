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

# 3. CONFIGURAR RED — escuchar en todas las interfaces (necesario para Docker)
PG_CONF="/etc/postgresql/16/main/postgresql.conf"
PG_HBA="/etc/postgresql/16/main/pg_hba.conf"

sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" $PG_CONF
sed -i "s/listen_addresses = 'localhost'/listen_addresses = '*'/" $PG_CONF

grep -q "host all all 0.0.0.0/0 md5" $PG_HBA || \
    echo "host all all 0.0.0.0/0 md5" >> $PG_HBA

service postgresql restart
sleep 5

# 4. CREACIÓN DE USUARIOS Y BASES DE DATOS
echo "[POSTGRE] Configurando usuarios y bases de datos..."

sudo -u postgres psql -c "CREATE USER nestasir WITH PASSWORD 'admin123';" 2>/dev/null || true
sudo -u postgres psql -c "ALTER USER nestasir WITH SUPERUSER;" 2>/dev/null || true
sudo -u postgres psql -c "CREATE DATABASE nestasir OWNER nestasir;" 2>/dev/null || true

sudo -u postgres psql -c "CREATE USER tienda WITH PASSWORD 'tienda123';" 2>/dev/null || true
sudo -u postgres psql -c "ALTER USER tienda WITH SUPERUSER;" 2>/dev/null || true
sudo -u postgres psql -c "CREATE DATABASE tienda_online OWNER tienda;" 2>/dev/null || true

echo "[POSTGRE] Bases de datos listas: nestasir, tienda_online"

# Mantenemos el contenedor vivo y mostramos logs
tail -f /var/log/postgresql/postgresql-16-main.log