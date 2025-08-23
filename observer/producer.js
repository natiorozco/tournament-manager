const { Kafka } = require('kafkajs');

// Configuración del cliente Kafka
const kafka = new Kafka({
  clientId: 'kafka-node-producer',
  brokers: ['kafka:9092'], // dirección del broker
});

const producer = kafka.producer();

const run = async () => {
  // Conectar el productor
  await producer.connect();

  console.log('Enviando mensajes a Kafka...');

  let counter = 1;

  // Enviar mensajes cada 3 segundos
  setInterval(async () => {
    const message = `Mensaje ${counter}`;
    await producer.send({
      topic: 'test-topic',
      messages: [{ value: message }],
    });
    console.log(`Enviado: ${message}`);
    counter++;
  }, 3000); // 3 segundos
};

run().catch(console.error);
