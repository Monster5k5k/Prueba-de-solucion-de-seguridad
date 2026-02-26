#!/bin/bash

# 1. EJECUTAMOS LA CAPA ANTERIOR (React -> Nginx -> Ciber -> Base)
echo "[PORTFOLIO] Ejecutando capa anterior (React)..."
if [ -f /root/admin/react/start.sh ]; then
    # OJO: Ejecutamos el de React pero le quitamos el 'tail -f' para que no bloquee este script
    # Como tu script de react tiene un comando bloqueante al final, mejor arrancarlo en background
    bash /root/admin/react/start.sh &
else
    echo "[PORTFOLIO] ADVERTENCIA: No se encontró la capa React."
fi

sleep 5

# 2. INICIAMOS EL PORTFOLIO
echo "[PORTFOLIO] Iniciando Portfolio..."
cd /app
npm run dev -- --host 0.0.0.0 --port 5000 &

# 3. MANTENEMOS EL CONTENEDOR VIVO
echo "=== TODO LISTO Y FUNCIONANDO (CAPA 05) ==="
tail -f /dev/null