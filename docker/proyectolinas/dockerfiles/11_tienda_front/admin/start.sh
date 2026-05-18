#!/bin/bash

echo "[TIENDA-FRONT] Ejecutando capa anterior (React)..."
if [ -f /root/admin/react/start.sh ]; then
    bash /root/admin/react/start.sh &
else
    echo "[TIENDA-FRONT] ADVERTENCIA: No se encontró la capa React."
fi

sleep 5

echo "[TIENDA-FRONT] Iniciando frontend Next.js (Tienda Online)..."
cd /app/tienda-front

npm run dev -- -p 3008 -H 0.0.0.0 &

echo "=== CAPA 11 (TIENDA-FRONT) FUNCIONANDO — puerto 3008 ==="
tail -f /dev/null
