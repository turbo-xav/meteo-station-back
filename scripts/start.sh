# Stop meteo-station-back
if pm2 list | grep meteo-station-back; then pm2 delete meteo-station-back; fi
pm2 start ./build/meteo-station-back/main.js --name=meteo-station-back --log pm2.logs --time --max-memory-restart 200M
