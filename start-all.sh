
# Script para levantar todos los servicios del proyecto tournament-manager

set -e

API_DIR="tournament-manager-api"
UI_DIR="tournament-manager-ui"
OBSERVER_DIR="observer"

# Build y up en la API

cd "$API_DIR"
docker compose build
docker compose up -d
cd ..

# Build y up en la UI

cd "$UI_DIR"
docker compose build
docker compose up -d
cd ..

# Build y up en el Observer

cd "$OBSERVER_DIR"
docker compose build
docker compose up
cd ..

#comando: (desde la raiz del proyecto)
#chmod +x start-all.sh
#./start-all.sh
# Para detener todos los servicios:
# ./start-all.sh stop

if [ "$1" = "stop" ]; then
  echo "\n🛑 Deteniendo todos los servicios..."
  cd "$API_DIR"
  docker compose stop
  cd ..
  cd "$UI_DIR"
  docker compose stop
  cd ..
  cd "$OBSERVER_DIR"
  docker compose stop
  cd ..
  echo "\n✅ Todos los servicios han sido detenidos."
  exit 0
fi
