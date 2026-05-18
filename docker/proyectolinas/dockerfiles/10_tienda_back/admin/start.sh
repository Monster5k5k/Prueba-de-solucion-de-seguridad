#!/bin/bash

echo "[TIENDA-BACK] Ejecutando capa anterior (React)..."
if [ -f /root/admin/react/start.sh ]; then
    bash /root/admin/react/start.sh &
else
    echo "[TIENDA-BACK] ADVERTENCIA: No se encontró la capa React."
fi

sleep 5

echo "[TIENDA-BACK] Iniciando backend NestJS (Tienda Online)..."
cd /app/tienda-back

npm run start:dev &

echo "=== CAPA 10 (TIENDA-BACK) FUNCIONANDO — puerto 3007 ==="
tail -f /dev/null
