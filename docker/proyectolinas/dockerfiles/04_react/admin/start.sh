#!/bin/bash

# 1. EJECUTAMOS LA CAPA ANTERIOR (Nginx + Ciber)
echo "[REACT] Ejecutando capa anterior (Nginx)..."
source /usr/local/bin/init_nginx.sh &

# Esperamos a que arranque
sleep 5

# 2. INICIAMOS LA APP REACT (Corrección Crucial)
echo "[REACT] Iniciando Aplicación Vite en puerto 3000..."
cd /app

# Instalar dependencias por si acaso faltan (seguridad extra)
npm install

# ¡AQUÍ ESTÁ LA MAGIA!
# Forzamos al servidor a escuchar en 0.0.0.0 (público) y puerto 3000
npm run dev -- --host 0.0.0.0 --port 3000 &

# 3. MANTENEMOS EL CONTENEDOR VIVO
echo "=== TODO LISTO Y FUNCIONANDO ==="
tail -f /dev/null