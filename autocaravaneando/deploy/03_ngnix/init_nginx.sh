#!/bin/bash

# 1. EJECUTAMOS LA CAPA ANTERIOR (Ciberseguridad)
# Esto arrancará el SSH y la Auditoría que definimos en la capa 2
echo "[NGINX] Ejecutando capa anterior (Ciber)..."
/usr/local/bin/init_ciber.sh

# 2. HACEMOS LO NUESTRO (Nginx)
echo "[NGINX] Iniciando Servidor Web..."
service nginx start

# (Nota: No ponemos tail -f aquí porque lo pondremos en la última capa)