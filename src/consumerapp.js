require('dotenv').config();
const amqp = require('amqplib');
const PlaylistsAppService = require('./PlaylistsAppService');
const MailSenderapp = require('./MailSenderapp');
const Listenerapp = require('./Listenerapp');


const init = async () => {
    const playlistsAppService = new PlaylistsAppService();
    const mailSenderapp = new MailSenderapp();
    const listenerapp = new Listenerapp(playlistsAppService, mailSenderapp);

    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    const channel = await connection.createChannel();

    await channel.assertQueue('export:playlists-songapp', {
        durable: true,
    });

    channel.consume('export:playlists-songapp', listenerapp.listenapp, { noAck: true });
};

init();