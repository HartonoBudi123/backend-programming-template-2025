membuat 5 endpoint gacha:
1. Melihat seluruh peserta yang melakukan gacha
get localhost:5000/api/gacha/history
2. Melihat peserta yang melakukan gacha dengan meminta parameter ID
get localhost:5000/api/gacha/history/123456789 (username_id)
3. Melihat seluruh peserta pemenang hadiah dengan namanya di samarkan/disensor
get localhost:5000/api/gacha/winners
4. Melihat daftar sisa quota hadiah yang tersisa
get localhost:5000/api/gacha/prizes
5. Melakukan gacha
post localhost:5000/api/gacha/roll 
Body:
{
  "username_id": "535250130"
  "username": "Hartono Budi"
}