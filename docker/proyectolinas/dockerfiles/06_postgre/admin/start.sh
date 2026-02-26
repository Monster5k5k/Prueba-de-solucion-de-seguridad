#!/bin/bash

echo "[POSTGRE] Ejecutando capa anterior..."
# Ejecutamos el script de la capa 02 (Ciberseguridad) en segundo plano
/root/admin/ciber/start.sh &

# Le damos 3 segunditos para que la capa anterior respire
sleep 3

echo "[POSTGRE] Configurando el Modo Paranoico (Abriendo puertos)..."
# 1. Le decimos a Postgres que escuche en todas las IPs, no solo en localhost
sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/g" /etc/postgresql/*/main/postgresql.conf

# 2. Le decimos que acepte conexiones desde fuera (0.0.0.0/0) pidiendo contraseña (md5)
echo "host    all             all             0.0.0.0/0               md5" >> /etc/postgresql/*/main/pg_hba.conf

echo "[POSTGRE] Iniciando servicio..."
service postgresql start

echo "[POSTGRE] Asegurando credenciales y creando BD..."
# Le ponemos la contraseña 'admin123' al usuario postgres
su - postgres -c "psql -c \"ALTER USER postgres PASSWORD 'admin123';\""

# Creamos la base de datos 'nestasir' SOLO si no existe ya
su - postgres -c "psql -tc \"SELECT 1 FROM pg_database WHERE datname = 'nestasir'\" | grep -q 1 || createdb nestasir"

echo "=== BASE DE DATOS LISTA Y FUNCIONANDO ==="

# Mantenemos el contenedor vivo
tail -f /dev/null