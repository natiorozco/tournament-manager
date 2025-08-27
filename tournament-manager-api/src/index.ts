import express from "express";
import mongoose, { model, Schema } from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tournament_designer';

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Pass to next layer of middleware
    next();
});

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error conectando a MongoDB:", err));


const tournamentSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    roster: [{
      id: { type: Number, required: true },
      name: { type: String, required: true },
      weight: { type: Number, required: true },
      age: { type: Number, required: true },
    }]
  },
  { timestamps: true }
);

const Tournament = model("Tournament", tournamentSchema);


app.post('/upload-data', async (req, res) => {
  const data = req.body;
  console.log("Data received:", data);

  try {
    await Tournament.insertMany(req.body);

    // Enviar string a Kafka SOLO si kafkajs está instalado y disponible
    try {
      const { Kafka } = require('kafkajs');
      const kafka = new Kafka({
        clientId: 'tournament-api',
        brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
      });
      const producer = kafka.producer();
      await producer.connect();
      await producer.send({
        topic: 'tournament-events',
        messages: [{ value: 'Torneo registrado exitosamente' }],
      });
      await producer.disconnect();
      console.log('Mensaje enviado a Kafka: Torneo registrado exitosamente');
    } catch (kafkaErr) {
      console.error('No se pudo enviar mensaje a Kafka:', kafkaErr);
    }

    res.status(201).json({ message: `Inserted ${req.body.length} tournaments!` });
  } catch (err) {
    console.error('Error al insertar torneo:', err);
    res.status(500).json({ error: 'Error al registrar torneo' });
  }
});

app.get('/fetch-tournaments', async (req, res) => {
  const tournaments = await Tournament.find();
  res.status(200).json(tournaments);
});

app.get("/", (req, res) => {
  res.json({ message: "Tournament Designer API is running!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
