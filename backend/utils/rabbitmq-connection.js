const amqp = require('amqplib');

let connection = null;
let channel = null;

async function connectRabbitMQ() {
  try {
    connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    // console.log('Connected to RabbitMQ');
    return channel;
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    return null;
  }
}

async function getChannel() {
  if (!channel) {
    channel = await connectRabbitMQ();
  }
  return channel;
}

module.exports = { getChannel, connectRabbitMQ };