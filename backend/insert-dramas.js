require('dotenv').config();

const { connectDB, getDb } = require('./db');


// =========================
// Unsere K-Dramas
// =========================

const dramas = [

  {
    name: 'Lovely Runner',
    status: 'Geschaut',
    bewertung: 10,
    folgen: 16,
    genre: 'Romance, Fantasy, Comedy',
    beschreibung: 'Eine romantische Fantasy-Serie.',
    bild: 'lovely-runner.jpeg'
  },

  {
    name: 'My Bias, My Boss',
    status: 'Schaue ich gerade',
    bewertung: 8,
    folgen: 10,
    genre: 'Romance, Comedy',
    beschreibung: 'Eine romantische Geschichte im Arbeitsumfeld.',
    bild: 'My_Bias,_My_Boss.png'
  },

  {
    name: 'Agent Kim Reactivated',
    status: 'Noch offen',
    bewertung: 9,
    folgen: 12,
    genre: 'Action, Comedy',
    beschreibung: 'Eine spannende Geschichte über Agent Kim.',
    bild: 'Agend.jpeg'
  },

  {
    name: 'My Demon',
    status: 'Geschaut',
    bewertung: 9,
    folgen: 16,
    genre: 'Romance, Fantasy',
    beschreibung: 'Eine romantische Fantasy-Serie.',
    bild: 'My_Demon.jpg'
  },

  {
    name: 'My Name',
    status: 'Geschaut',
    bewertung: 9,
    folgen: 8,
    genre: 'Action, Thriller, Drama',
    beschreibung: 'Eine junge Frau sucht nach dem Tod ihres Vaters nach der Wahrheit.',
    bild: 'My_Name.jpg'
  },

  {
    name: 'Bon Appétit, Your Majesty',
    status: 'Schaue ich gerade',
    bewertung: 9,
    folgen: 12,
    genre: 'Romance, Fantasy',
    beschreibung: 'Eine Geschichte zwischen Gegenwart und Vergangenheit.',
    bild: 'bon-appetit.jpg'
  },

  {
    name: 'Business Proposal',
    status: 'Geschaut',
    bewertung: 8,
    folgen: 12,
    genre: 'Romance, Comedy',
    beschreibung: 'Eine romantische Büro-Komödie.',
    bild: 'Business_Proposal.jpg'
  },

  {
    name: 'Alchemy of Souls',
    status: 'Geschaut',
    bewertung: 9,
    folgen: 20,
    genre: 'Fantasy, Romance, Action',
    beschreibung: 'Eine Fantasy-Geschichte über Magie und Liebe.',
    bild: 'alchemy of souls.jpg'
  },

  {
    name: 'Twinkling Watermelon',
    status: 'Geschaut',
    bewertung: 9,
    folgen: 16,
    genre: 'Romance, Fantasy, Music',
    beschreibung: 'Eine Geschichte über Musik, Familie und Zeitreisen.',
    bild: 'Twinkling Watermelon.jpg'
  },

  {
    name: 'True Beauty',
    status: 'Schaue ich gerade',
    bewertung: 8,
    folgen: 16,
    genre: 'Romance, Comedy',
    beschreibung: 'Eine romantische Geschichte über Selbstvertrauen und Liebe.',
    bild: 'True Beauty.jpg'
  },

  {
    name: 'Queen of Tears',
    status: 'Geschaut',
    bewertung: 8,
    folgen: 16,
    genre: 'Romance, Drama',
    beschreibung: 'Eine emotionale Geschichte über Liebe und Familie.',
    bild: 'QueenofTears.jpeg'
  },

  {
    name: 'Crash Landing on You',
    status: 'Geschaut',
    bewertung: 7,
    folgen: 16,
    genre: 'Romance, Drama, Comedy',
    beschreibung: 'Eine Liebesgeschichte zwischen Nord- und Südkorea.',
    bild: 'Crashlanding.jpg'
  },

  {
    name: 'Extraordinary Attorney Woo',
    status: 'Noch offen',
    bewertung: 7,
    folgen: 16,
    genre: 'Drama, Comedy',
    beschreibung: 'Eine außergewöhnliche Anwältin meistert ihren Berufsalltag.',
    bild: 'Strange_Lawyer_Woo_Young-woo.png'
  },

  {
    name: 'Twenty-Five Twenty-One',
    status: 'Noch offen',
    bewertung: 9,
    folgen: 16,
    genre: 'Romance, Youth, Drama',
    beschreibung: 'Eine Geschichte über Jugend, Freundschaft und erste Liebe.',
    bild: 'Twenty_Five_Twenty_One.jpg'
  },

  {
    name: 'King the Land',
    status: 'Noch offen',
    bewertung: 8,
    folgen: 16,
    genre: 'Romance, Comedy',
    beschreibung: 'Eine romantische Geschichte im Hotel.',
    bild: 'King_the_Land.jpg'
  }

];


// =========================
// Dramas in MongoDB speichern
// =========================

async function speichern() {

  try {

    // Verbindung zu MongoDB herstellen
    await connectDB();

    // Aktuelle Datenbank holen
    const db = getDb();

    const collection = db.collection('dramas');


    // =========================
    // Dramas einzeln prüfen
    // =========================

    for (const drama of dramas) {

      // Prüfen, ob das Drama bereits existiert
      const vorhanden = await collection.findOne({
        name: drama.name
      });


      // Nur einfügen, wenn es noch nicht existiert
      if (!vorhanden) {

        await collection.insertOne({
          ...drama,
          hinzugefuegtAm: new Date()
        });

        console.log(`Hinzugefügt: ${drama.name}`);

      } else {

        console.log(`Bereits vorhanden: ${drama.name}`);

      }

    }


    console.log('Alle fehlenden Dramas wurden gespeichert!');

    process.exit(0);

  } catch (error) {

    console.error('Fehler beim Speichern:', error);

    process.exit(1);

  }

}


speichern();
