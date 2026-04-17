module.exports = (db) =>
  db.model(
    'Prize',
    db.Schema({
      name: String,
      quantity: Number,
    })
  );
