const { Gacha, Prize } = require('../../../models');

async function getGachaHistories() {
  return Gacha.find({}).sort({ created_at: -1 });
}

async function getGachaHistory(id) {
  return Gacha.find({ username_id: id });
}

async function getGachaWinners() {
  return Gacha.find({ status: true });
}

async function createGacha(data) {
  return Gacha.create(data);
}

async function reduceQuantity(nama) {
  return Prize.updateOne(
    { name: nama, quantity: { $gt: 0 } },
    { $inc: { quantity: -1 } },
    { new: true }
  );
}

async function getAvailablePrizes() {
  return Prize.find({
    quantity: { $gt: 0 },
  });
}

async function countUserGachaToday(id) {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  return Gacha.countDocuments({
    username_id: id,
    created_at: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  });
}

module.exports = {
  getGachaHistories,
  getGachaHistory,
  getGachaWinners,
  createGacha,
  reduceQuantity,
  getAvailablePrizes,
  countUserGachaToday,
};
