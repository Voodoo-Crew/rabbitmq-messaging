/*!
 * Project: rabbitmq-messaging
 * File:    ./producer.js
 * Author:  Baltrushaitis Tomas <tbaltrushaitis@gmail.com>
 * Created: 2018-02-07
 */

'use strict';

/**
 * DEPENDENCIES
 */

const path = require('path');
const util = require('util');
const amqp = require('amqplib/callback_api');
const utin = util.inspect;


/**
 * CONFIGURATION
 */

const confBase = path.join(__dirname, 'config/config.json');
const Config   = require(confBase);
utin.defaultOptions = Object.assign({}, Config.iopts);

let MsgHtml = process.argv.slice(2).join(' ') || `
<h2>Hello David!</h2>
<h3>This is the correct email to send job offer ;-)</h3>
<p>Just use <strong>Reply</strong> feature of your mail client</p>
<span>This Message Was Auto-Created at: [${(new Date()).toISOString()}]</span>
`;


/**
 * PROCESS
 */

let Conn;
amqp.connect(Config.mq.host, function (err, conn) {
  if (err) {
    console.log(`[${(new Date()).toISOString()}] [ERROR] Cannot establish a connection to RabbitMQ Server [${Config.mq.host}]!`);
    return;
  }
  Conn = conn;
  Conn.createChannel(function (err, ch) {
    ch.assertQueue(Config.mq.name, Config.mq.opts);
    console.log(`[${(new Date()).toISOString()}] Ready to send messages in [${Config.mq.name}]. Press CTRL+C to exit.`);

    // Uploads telemetry data
    function pubData () {
      ch.sendToQueue(Config.mq.name, new Buffer(MsgHtml), Config.mq.producer_opts);
      console.log(`[${(new Date()).toISOString()}] SENT Message in [${Config.mq.name}] queue: [${MsgHtml}]`);
    }

    setTimeout(function () {
      pubData();
      console.log(`[${(new Date()).toISOString()}] [${'-'.repeat(60)}]`);
      setTimeout(quit, 2000);
    }, 3000);

  });

});

//  ------------------------------------------------------------------------  //

function quit (st) {
  console.log(`[${(new Date()).toISOString()}] Disconnecting from server ...`);
  Conn.close();
  console.log(`[${(new Date()).toISOString()}] Now QUIT`);
  process.exit(st || 0);
};

// Catches ctrl+c event
process.on('SIGINT', function () {
  console.log(`[${(new Date()).toISOString()}] SIGINT catched`);
  quit(2);
});

// Catches uncaught exceptions
process.on('uncaughtException', function (e) {
  console.log(`[${(new Date()).toISOString()}] UncaughtException [${e.message}]:
    {stack: ${e.stack ? util.inspect(e) : 'N/A'}}`);
  quit(99);
});
