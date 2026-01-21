#!/bin/bash

# Función para iniciar auditoría en background
start_audit(){
    LOG_DIR="/root/logs"
    mkdir -p $LOG_DIR
    LOG_FILE="$LOG_DIR/audit_ports.log"
    
    echo "[CIBER] Iniciando auditoria en $LOG_FILE..."
    
    # Bucle infinito en segundo plano
    while true; do
        echo "=== AUDIT $(date) ===" >> "$LOG_FILE"
        ss -tulnp >> "$LOG_FILE" 2>&1
        echo "" >> "$LOG_FILE"
        sleep 30
    done &
}

# 1. Iniciamos SSH
echo "[CIBER] Iniciando servicio SSH..."
/usr/sbin/sshd

# 2. Iniciamos Auditoría
start_audit