#!/bin/bash
set -e

BASE=/home/linas/Prueba-de-solucion-de-seguridad/docker/proyectolinas
PROYECTOS=$BASE/proyectos

# Colores para el output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

ok()   { echo -e "${GREEN}[OK]${NC} $1"; }
info() { echo -e "${YELLOW}[>>]${NC} $1"; }
err()  { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

build_and_push() {
    local nombre=$1
    local dir=$2
    info "Construyendo imagen: $nombre"
    cd "$dir" || err "No se encuentra $dir"
    docker compose build || err "Falló build de $nombre"
    docker compose push || err "Falló push de $nombre"
    ok "Imagen $nombre subida a Docker Hub"
    cd "$BASE"
}

echo "=================================================="
echo "  BUILD & PUSH - Proyecto Linas"
echo "=================================================="
echo ""

# Verificar login en Docker Hub
docker info --format '{{.RegistryConfig.IndexConfigs}}' | grep -q "docker.io" || \
    err "No hay sesión activa en Docker Hub. Ejecuta: docker login"

# --- CAPA 1: Ubuntu Base ---
build_and_push "mortviva7/ubbase" "$PROYECTOS/pbase/deploy"

# --- CAPA 2: Ciberseguridad ---
build_and_push "mortviva7/ubciber" "$PROYECTOS/pciber/deploy"

# --- CAPA 3: Nginx ---
build_and_push "mortviva7/ubnginx" "$PROYECTOS/pnginx/deploy"

# --- CAPA 4: PostgreSQL (viene de ubciber, paralelo con ubnginx pero lo hacemos aquí) ---
build_and_push "mortviva7/ubpostgre" "$PROYECTOS/ppostgre"

# --- CAPA 5: React (viene de ubnginx) ---
build_and_push "mortviva7/ubreact" "$PROYECTOS/preact/deploy"

# --- CAPA 6: Portfolio (viene de ubreact) ---
build_and_push "mortviva7/ubportfolio" "$PROYECTOS/pportfolio/deploy"

# --- CAPA 7: NestJS API (viene de ubreact) ---
build_and_push "mortviva7/ubnest" "$PROYECTOS/pnest/deploy"

# --- CAPA 8: Nginx API Proxy (viene de ubnginx) ---
build_and_push "mortviva7/ubnginxapi" "$PROYECTOS/pnginxapi/deploy"

# --- CAPA 9: Next.js (viene de ubreact) ---
build_and_push "mortviva7/ubnextjs" "$PROYECTOS/pnextjs/deploy"

echo ""
echo "=================================================="
ok "TODAS LAS IMAGENES CONSTRUIDAS Y SUBIDAS"
echo "=================================================="
echo ""
echo "Imágenes disponibles en Docker Hub (mortviva7):"
echo "  - mortviva7/ubbase"
echo "  - mortviva7/ubciber"
echo "  - mortviva7/ubnginx"
echo "  - mortviva7/ubpostgre"
echo "  - mortviva7/ubreact"
echo "  - mortviva7/ubportfolio"
echo "  - mortviva7/ubnest"
echo "  - mortviva7/ubnginxapi"
echo "  - mortviva7/ubnextjs"
