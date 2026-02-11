#!/bin/bash

# 1. EJECUTAMOS LA CAPA ANTERIOR (Nginx + Ciber)
# Esto arranca SSH, Auditoría y Nginx en cadena
echo "[REACT] Ejecutando capa anterior (Nginx)..."
source /usr/local/bin/init_nginx.sh &

# Esperamos unos segundos para que Nginx arranque bien
sleep 5

# 2. HACEMOS LO NUESTRO (Node/React con VITE)
echo "[REACT] Iniciando Aplicación Vite..."
cd /app

# CORRECCION: Usamos 'npm run dev' y forzamos el puerto 3000 y host 0.0.0.0
# -- pasa los argumentos al comando vite subyacente
npm run dev -- --port 3000 --host 0.0.0.0 &

# 3. MANTENEMOS EL CONTENEDOR VIVO
echo "=== TODO LISTO Y FUNCIONANDO ==="
tail -f /dev/null