# Inicia o pocketbase.exe em segundo plano
Start-Process -FilePath "./pocketbase.exe" -ArgumentList "serve" -NoNewWindow

# Roda o comando npm run dev e aguarda
npm run start