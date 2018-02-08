/*!
 * Project: rabbitmq-messaging
 * File:    ./worker.js
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
const sendmail = require('sendmail')({silent: false})
const utin = util.inspect;


/**
 * CONFIGURATION
 */

const confBase = path.join(__dirname, 'config/config.json');
const Config   = require(confBase);
utin.defaultOptions = Object.assign({}, Config.iopts);


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
    console.log(`[${(new Date()).toISOString()}] Waiting for messages in [${Config.mq.name}]. Press CTRL+C to exit.`);

    ch.prefetch(1);
    ch.consume(Config.mq.name, function (msg) {
      let mesg = msg.content.toString();
      console.log(`[${(new Date()).toISOString()}] [#${utin(msg.fields.deliveryTag)}] RECV Message: [${mesg}]`);
      let mailOptions = Object.assign({}, Config.email, {html: `${mesg}`});

      sendmail(mailOptions, function (err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
        console.log(`[${(new Date()).toISOString()}] [SUCCESS] SENT Email to [${mailOptions.to}]`);

        setTimeout(function () {
          console.log(`[${(new Date()).toISOString()}] FINISHED Processing of MSG [#${utin(msg.fields.deliveryTag)}]`);
          console.log(`[${(new Date()).toISOString()}] [${'-'.repeat(60)}]`);
          ch.ack(msg);
        }, Config.mq.ack_timeout);

      });

    }, Config.mq.consumer_opts);

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
    {stack: ${e.stack ? utin(e) : 'N/A'}}`);
  quit(99);
});
