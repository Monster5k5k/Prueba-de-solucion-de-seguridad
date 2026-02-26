#!/bin/bash

# 1. EJECUTAMOS LA CAPA ANTERIOR (Nginx -> Ciber -> Base)
echo "[REACT] Ejecutando capa anterior (Nginx)..."
if [ -f /root/admin/nginx/start.sh ]; then
    bash /root/admin/nginx/start.sh
else
    echo "[REACT] ADVERTENCIA: No se encontró la capa Nginx."
fi

# Esperamos a que arranque Nginx y SSH
sleep 5

# 2. INICIAMOS LA APP REACT
echo "[REACT] Iniciando Aplicación Vite en puerto 3000..."
cd /app

# Forzamos al servidor a escuchar en 0.0.0.0 (público) y puerto 3000
npm run dev -- --host 0.0.0.0 --port 3000 &

# 3. MANTENEMOS EL CONTENEDOR VIVO (Solo hace falta aquí, en la última capa visible)
echo "=== TODO LISTO Y FUNCIONANDO (CAPA 04) ==="
tail -f /dev/null