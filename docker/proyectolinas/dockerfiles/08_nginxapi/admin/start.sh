#!/bin/bash

echo "[NGINXAPI] Ejecutando capa anterior (Nginx)..."
if [ -f /root/admin/nginx/start.sh ]; then
    bash /root/admin/nginx/start.sh
else
    echo "[NGINXAPI] ADVERTENCIA: No se encontró la capa Nginx."
fi

echo "[NGINXAPI] Recargando configuración de Nginx para el reverse proxy..."
# La capa anterior ya arrancó nginx, recargar la nueva config (proxy)
nginx -s reload 2>/dev/null || nginx -g "daemon off;" &

echo "=== CAPA 08 (NGINX-API) FUNCIONANDO — proxy → ctl_nest:3001 ==="
tail -f /dev/null
