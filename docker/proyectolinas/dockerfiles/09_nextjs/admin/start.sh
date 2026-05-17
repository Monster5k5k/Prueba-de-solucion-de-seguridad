#!/bin/bash

echo "[NEXTJS] Ejecutando capa anterior (React)..."
if [ -f /root/admin/react/start.sh ]; then
    bash /root/admin/react/start.sh &
else
    echo "[NEXTJS] ADVERTENCIA: No se encontró la capa React."
fi

sleep 5

echo "[NEXTJS] Preparando app Next.js..."
cd /app/next

if [ ! -d "node_modules" ]; then
    echo "[NEXTJS] Instalando dependencias..."
    npm install
fi

echo "[NEXTJS] Iniciando Next.js en puerto 3002..."
npm run dev &

echo "=== CAPA 09 (NEXT.JS) FUNCIONANDO ==="
tail -f /dev/null
