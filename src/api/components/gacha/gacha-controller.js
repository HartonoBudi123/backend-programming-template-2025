const gachaService = require('./gacha-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getGachaHistories(request, response, next) {
  try {
    const histories = await gachaService.getGachaHistories();
    return response.status(200).json(histories);
  } catch (error) {
    return next(error);
  }
}

async function getGachaHistory(request, response, next) {
  try {
    const { id } = request.params;
    const history = await gachaService.getGachaHistory(id);

    if (!history) {
      throw errorResponder(errorTypes.NOT_FOUND, 'History not found');
    }

    return response.status(200).json(history);
  } catch (error) {
    return next(error);
  }
}

async function createGacha(request, response, next) {
  try {
    const { username_id, username } = request.body;

    if (!username_id || !username) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Username ID and Username are required');
    }

    const todayCount = await gachaService.countUserGachaToday(username_id);
    if (todayCount >= 5) {
      throw errorResponder(errorTypes.FORBIDDEN, 'Maximum gacha limit (5) reached for today');
    }

    const result = await gachaService.createGacha({ username_id, username });
    return response.status(201).json({
      message: result.status ? `Selamat! Anda menang ${result.prize_name}` : 'Maaf, Anda belum beruntung',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
}

async function getGachaWinners(request, response, next) {
  try {
    const winners = await gachaService.getGachaWinners();

    const maskedWinners = winners.map((w) => {
      const name = w.username || '';
      const maskedName = name.split(' ').map((word) => {
        if (word.length <= 1) return word;
        if (word.length === 2) return word[0] + '*';

        const firstChar = word[0];
        const lastChar = word[word.length - 1];
        const stars = '*'.repeat(word.length - 2);

        return `${firstChar}${stars}${lastChar}`;
      }).join(' ');

      return {
        username: maskedName,
        prize_name: w.prize_name,
        created_at: w.created_at,
      };
    });

    return response.status(200).json(maskedWinners);
  } catch (error) {
    return next(error);
  }
}

async function getAvailablePrizes(request, response, next) {
  try {
    const prizes = await gachaService.getAvailablePrizes();
    return response.status(200).json({
      message: 'Daftar hadiah yang tersedia',
      data: prizes,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getGachaHistories,
  getGachaHistory,
  getGachaWinners,
  createGacha,
  getAvailablePrizes,
};
