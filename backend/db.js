require('dotenv').config();

const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI, {
  family: 4
});

let db;


// Verbindung zur MongoDB herstellen
async function connectDB() {

  await client.connect();

  // Datenbank "kdrama" auswählen
  db = client.db('kdrama');

  console.log('MongoDB verbunden');

}


// Aktuelle Datenbank zurückgeben
function getDb() {

  return db;

}


module.exports = {
  connectDB,
  getDb
};



