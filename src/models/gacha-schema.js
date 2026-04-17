module.exports = (db) =>
  db.model(
    'Gacha',
    db.Schema({
      username_id: String,
      username: String,
      status: Boolean,
      prize_name: String,
      created_at: { type: Date, default: Date.now },
    })
  );
