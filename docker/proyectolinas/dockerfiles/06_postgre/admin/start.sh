#!/bin/bash

# 1. EJECUTAMOS LA CAPA ANTERIOR (Ciber -> Base)
echo "[POSTGRE] Ejecutando capa anterior (Ciber)..."
if [ -f /root/admin/ciber/start.sh ]; then
    # Lo lanzamos en background para que no bloquee el script
    bash /root/admin/ciber/start.sh &
else
    echo "[POSTGRE] ADVERTENCIA: No se encontró la capa ciber."
fi

# Esperamos un par de segundos para que los servicios base se asienten
sleep 3

# 2. INICIAMOS LA BASE DE DATOS
echo "[POSTGRE] Iniciando servicio PostgreSQL..."
service postgresql start

# 3. CONFIGURACIÓN INICIAL (Opcional pero muy útil)
# Le ponemos la contraseña 'admin123' al usuario por defecto 'postgres'
su - postgres -c "psql -c \"ALTER USER postgres WITH PASSWORD 'admin123';\""

# 4. MANTENEMOS EL CONTENEDOR VIVO
echo "=== BASE DE DATOS LISTA Y FUNCIONANDO ==="
tail -f /dev/null