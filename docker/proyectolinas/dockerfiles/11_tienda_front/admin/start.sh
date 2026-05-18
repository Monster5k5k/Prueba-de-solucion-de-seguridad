#!/bin/bash

echo "[TIENDA-FRONT] Ejecutando capa anterior (React)..."
if [ -f /root/admin/react/start.sh ]; then
    bash /root/admin/react/start.sh &
else
    echo "[TIENDA-FRONT] ADVERTENCIA: No se encontró la capa React."
fi

sleep 5

echo "[TIENDA-FRONT] Compilando Next.js en modo producción..."
cd /app/tienda-front

# Build en producción para que NEXT_PUBLIC_API_URL se bake correctamente
npm run build

echo "[TIENDA-FRONT] Iniciando frontend Next.js (Tienda Online) en producción..."
npm start -- -p 3008 -H 0.0.0.0 &

echo "=== CAPA 11 (TIENDA-FRONT) FUNCIONANDO — puerto 3008 ==="
tail -f /dev/null
