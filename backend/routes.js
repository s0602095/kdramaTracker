const express = require('express');
const { ObjectId } = require('mongodb');
const multer = require('multer');
const path = require('path');

const { getDb } = require('./db');

const router = express.Router();


// =========================
// Bilder hochladen
// =========================

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }

});

const upload = multer({ storage: storage });


// =========================
// Bilder erreichbar machen
// =========================

router.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
);


// =========================
// Test
// =========================

router.get('/', (req, res) => {

  res.send('K-Drama Backend funktioniert!');

});


// =========================
// GET - Alle Dramas
// =========================

router.get('/dramas', async (req, res) => {

  try {

    const db = getDb();

    const dramas = await db.collection('dramas')
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.json(dramas);

  } catch (error) {

    console.log('Fehler beim Laden:', error);

    res.status(500).json({
      message: error.message
    });

  }

});


// =========================
// POST - Neues Drama
// =========================

router.post('/dramas', upload.single('bild'), async (req, res) => {

  try {

    const db = getDb();

    const drama = {

      name: req.body.name,

      genre: req.body.genre,

      bewertung: Number(req.body.bewertung),

      status: req.body.status,

      folgen: Number(req.body.folgen),

      // Speichert, wann das Drama hinzugefügt wurde
      hinzugefuegtAm: new Date()

    };


    // Wenn ein Bild ausgewählt wurde,
    // speichern wir den Bildpfad.

    if (req.file) {

      drama.bild = '/uploads/' + req.file.filename;

    }


    const result = await db
      .collection('dramas')
      .insertOne(drama);


    res.json(result);

  } catch (error) {

    console.log('Fehler beim Hinzufügen:', error);

    res.status(500).json({
      message: error.message
    });

  }

});


// =========================
// PUT - Drama bearbeiten
// =========================

router.put('/dramas/:id', async (req, res) => {

  try {

    const db = getDb();

    const id = new ObjectId(req.params.id);


    const drama = {

      name: req.body.name,

      genre: req.body.genre,

      bewertung: Number(req.body.bewertung),

      status: req.body.status,

      folgen: Number(req.body.folgen),

      // Beschreibung wird jetzt ebenfalls gespeichert
      beschreibung: req.body.beschreibung

    };


    const result = await db
      .collection('dramas')
      .updateOne(
        { _id: id },
        { $set: drama }
      );


    res.json(result);

  } catch (error) {

    console.log('Fehler beim Bearbeiten:', error);

    res.status(500).json({
      message: error.message
    });

  }

});


// =========================
// DELETE - Drama löschen
// =========================

router.delete('/dramas/:id', async (req, res) => {

  try {

    const db = getDb();

    const id = new ObjectId(req.params.id);


    const result = await db
      .collection('dramas')
      .deleteOne({
      _id: id
      });

    if (result.deletedCount === 0) {
    return res.status(404).json({
    message: 'Drama nicht gefunden.'
  });
}

res.json(result);

  } catch (error) {

    console.log('Fehler beim Löschen:', error);

    res.status(500).json({
      message: error.message
    });

  }

});


module.exports = router;



