# Roblox Stand API

API simple pour stocker et récupérer les gamepasses des joueurs Roblox (type PLS DONATE).

## Endpoints

### POST /stand/update
Envoie les gamepasses d’un joueur.

Body:
```json
{
  "userId": 123456,
  "gamepasses": [
    { "id": 123, "name": "Donate 10", "price": 10 }
  ]
}
