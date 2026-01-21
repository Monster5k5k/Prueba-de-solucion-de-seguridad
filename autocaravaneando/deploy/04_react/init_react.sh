#!/bin/bash

# 1. EJECUTAMOS LA CAPA ANTERIOR (Nginx + Ciber)
# Esto arranca SSH, Auditoría y Nginx en cadena
echo "[REACT] Ejecutando capa anterior (Nginx)..."
source /usr/local/bin/init_nginx.sh &

# Esperamos unos segundos para que Nginx arranque bien
sleep 5

# 2. HACEMOS LO NUESTRO (Node/React)
echo "[REACT] Iniciando Aplicación Node..."
cd /app

# Usamos variables para asegurar que React Scripts funcione en Docker
# BROWSER=none: No intenta abrir Chrome
# HOST=0.0.0.0: Permite conexión desde fuera
# PORT=3000: Fuerza el puerto interno
BROWSER=none HOST=0.0.0.0 PORT=3000 npm start &

# 3. MANTENEMOS EL CONTENEDOR VIVO (IMPORTANTE)
# Si no ponemos esto, el contenedor se apaga al terminar el script
echo "=== TODO LISTO Y FUNCIONANDO ==="
tail -f /dev/null