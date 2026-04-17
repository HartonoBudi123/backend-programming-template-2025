const gachaRepository = require('./gacha-repository');

async function getGachaHistories() {
  return gachaRepository.getGachaHistories();
}

async function getGachaHistory(id) {
  return gachaRepository.getGachaHistory(id);
}

async function getGachaWinners() {
  return gachaRepository.getGachaWinners();
}

async function createGacha(data) {
  const { username_id, username } = data;

  let finalStatus = false;
  let finalPrizeName = 'Zonk';

  const isLucky = Math.random() < 0.3;

  if (isLucky === true) {
    const availablePrizes = await gachaRepository.getAvailablePrizes();
    console.log("Stok hadiah tersedia:", availablePrizes.length);

    if (availablePrizes.length > 0) {
      const randomIndex = Math.floor(Math.random() * availablePrizes.length);
      const chosenPrize = availablePrizes[randomIndex];

      console.log("Mencoba ambil hadiah:", chosenPrize.name);

      const updateResult = await gachaRepository.reduceQuantity(chosenPrize.name);

      console.log("Update Result dari Repo:", updateResult);

      if (updateResult) {
        finalStatus = true;
        finalPrizeName = chosenPrize.name;
      } else {
        console.log("Gagal memotong stok di database.");
      }
    }
  }

  return gachaRepository.createGacha({
    username_id,
    username,
    status: finalStatus,
    prize_name: finalPrizeName,
  });
}

async function getAvailablePrizes() {
  return await gachaRepository.getAvailablePrizes();
}

async function countUserGachaToday(username_id) {
  return await gachaRepository.countUserGachaToday(username_id);
}

module.exports = {
  getGachaHistories,
  getGachaHistory,
  getGachaWinners,
  createGacha,
  getAvailablePrizes,
  countUserGachaToday,
};
