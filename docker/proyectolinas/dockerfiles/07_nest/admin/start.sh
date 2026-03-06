#!/bin/bash

# 1. EJECUTAMOS LA CAPA ANTERIOR (React -> Nginx -> Ciber -> Base)
echo "[NEST-API] Ejecutando capa anterior (React)..."
if [ -f /root/admin/react/start.sh ]; then
    # Lanzamos en background para que no bloquee
    bash /root/admin/react/start.sh &
else
    echo "[NEST-API] ADVERTENCIA: No se encontró la capa React."
fi

# Esperamos a que las capas base (SSH/Red) estén listas
sleep 5

# 2. PREPARACIÓN DE NESTJS (En el arranque, como quieres)
echo "[NEST-API] Instalando dependencias y compilando..."
cd /app/api

# Instalamos solo si falta node_modules para no tardar siempre
if [ ! -d "node_modules" ]; then
    npm install
fi

# 3. INICIO DE LA API
echo "[NEST-API] Iniciando API en puerto 3001..."
# Usamos start:dev para que reconozca cambios y conecte a Postgre
npm run start:dev &

# 4. MANTENEMOS EL CONTENEDOR VIVO
echo "=== CAPA 07 (NEST-API) FUNCIONANDO ==="
tail -f /dev/null