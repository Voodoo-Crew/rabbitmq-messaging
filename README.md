# Simple Messaging Queue #

[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg?style=plastic)](https://github.com/conventional-changelog/standard-version)

![RabbitMQ Logo](assets/img/RabbitMQ-logo.svg)

`rabbitmq` `messages` `queue` `sendmail`

---

## Setup ##

#### Install RabbitMQ Server ####

```shell
host:~# apt install -y rabbitmq-server/xenial-updates
```

#### Download sources ####

```shell
$ git clone https://github.com/Voodoo-Crew/rabbitmq-messaging.git && cd rabbitmq-messaging
```

#### Install dependencies ####
```shell
$ npm i
```

## Run ##

```shell
# Start worker script
$ node worker.js

# Send default message
$ node producer.js

# Send message passed from command line
$ node producer.js "Message from command line"
```

## NPM shorthands ##

```shell
$ npm run worker
$ npm run producer
```

---

## Change log ##

**v0.0.1:**
- [x] Initial Release

---

### RabbitMQ Server CLI ###

#### View stats ####
```shell
host:~# /etc/init.d/rabbitmq-server status
# or
host:~# systemctl status rabbitmq-server.service
```

<details>
<summary>Screenshot</summary>

<div align="center">
  <img height="100%" width="100%" src="assets/img/ss-rabbitmq-status-001.png?raw=true">
</div>
</details>

#### Get help ###

```shell
host:~# rabbitmqctl --help
host:~# rabbitmqctl list_queues
Listing queues ...
hello   2
msg-queue-001   17
```

<details>
<summary>Status Example</summary>

<pre>
host:~# rabbitmqctl status
Status of node rabbit@host ...
[{pid,634},
 {running_applications,[{rabbit,"RabbitMQ","3.5.7"},
                        {mnesia,"MNESIA  CXC 138 12","4.13.3"},
                        {xmerl,"XML parser","1.3.10"},
                        {os_mon,"CPO  CXC 138 46","2.4"},
                        {sasl,"SASL  CXC 138 11","2.7"},
                        {stdlib,"ERTS  CXC 138 10","2.8"},
                        {kernel,"ERTS  CXC 138 10","4.2"}]},
 {os,{unix,linux}},
 {erlang_version,"Erlang/OTP 18 [erts-7.3] [source] [smp:4:4] [async-threads:64] [kernel-poll:true]\n"},
 {memory,[{total,26163184},
          {connection_readers,0},
          {connection_writers,0},
          {connection_channels,0},
          {connection_other,1392},
          {queue_procs,19748},
          {queue_slave_procs,0},
          {plugins,0},
          {other_proc,8850808},
          {mnesia,32384},
          {mgmt_db,0},
          {msg_index,24008},
          {other_ets,392724},
          {binary,16048},
          {code,8926311},
          {atom,490973},
          {other_system,7408788}]},
 {alarms,[]},
 {listeners,[{clustering,25672,"::"},{amqp,5672,"::"}]},
 {vm_memory_high_watermark,0.4},
 {vm_memory_limit,840279654},
 {disk_free_limit,50000000},
 {disk_free,86359113728},
 {file_descriptors,[{total_limit,65436},
                    {total_used,3},
                    {sockets_limit,58890},
                    {sockets_used,1}]},
 {processes,[{limit,1048576},{used,131}]},
 {run_queue,0},
</pre>
</details>

---

### :link: More Info ###

 - [GitHub / Basic writing and formatting syntax](https://help.github.com/articles/basic-writing-and-formatting-syntax/)
 - [BitBucket Markdown Howto](https://bitbucket.org/tutorials/markdowndemo)
 - [RabbitMQ: Get Started](https://www.rabbitmq.com/#getstarted)
 - [RabbitMQ: Work Queues](https://www.rabbitmq.com/tutorials/tutorial-two-javascript.html)

---

:scorpius:
