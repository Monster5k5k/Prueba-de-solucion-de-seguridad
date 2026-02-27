#!/bin/bash

# 1. EJECUTAMOS LA CAPA ANTERIOR
echo "[PORTFOLIO] Ejecutando capa anterior (React)..."
if [ -f /root/admin/react/start.sh ]; then
    bash /root/admin/react/start.sh &
else
    echo "[PORTFOLIO] ADVERTENCIA: No se encontró la capa React."
fi

sleep 10 

# 2. COMPILACIÓN Y ARRANQUE
echo "[PORTFOLIO] Preparando entorno..."
mkdir -p /app/portfolio && cd /app/portfolio

if [ ! -d "node_modules" ]; then
    npm install
fi

echo "[PORTFOLIO] Compilando proyecto (npm run build)..."
npm run build

echo "[PORTFOLIO] Iniciando Portfolio en puerto 5000..."
npm run dev -- --host 0.0.0.0 --port 5000 &

# 3. MANTENEMOS VIVO
echo "=== TODO LISTO Y FUNCIONANDO (CAPA 05) ==="
tail -f /dev/null