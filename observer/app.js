const { Kafka } = require('kafkajs');

// Configuración del cliente Kafka
const kafka = new Kafka({
  clientId: 'kafka-node-job',
  brokers: ['kafka:9092'], // direccion del broker
});

const consumer = kafka.consumer({ groupId: 'tournament-group' });

const run = async () => {
  // Conectar el consumidor
  await consumer.connect();
  await consumer.subscribe({ topic: 'tournament-events', fromBeginning: true });

  console.log('Esperando mensajes...');

  const messages = [];

  // Procesar mensajes en lotes cada 10 segundos
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      messages.push(message.value.toString());
    },
  });

  setInterval(() => {
    if (messages.length > 0) {
      console.log('Procesando lote de mensajes:', messages);
      messages.length = 0; // Limpiar el lote después de procesar
    } else {
      console.log('No hay mensajes nuevos para procesar.');
    }
  }, 10000); // 10 segundos
};

run().catch(console.error);
