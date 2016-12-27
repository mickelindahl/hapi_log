[![Build Status](https://travis-ci.org/mickelindahl/hapi_log.svg?branch=master)](https://travis-ci.org/mickelindahl/hapi_log)
#Hapi log

A [hapi](https://www.npmjs.com/package/hapi) plugin that attaches a [bunyan](https://www.npmjs.com/package/bunyan) logger to `server.app.log`
 with a terminal stream and a email stream. At `uncaughtException` an email is sent
before server shuts down.

## Installation

`npm install --save hapi-log`

## Usage
```js
const Bunyan = require( 'bunyan' );
const BunyanMailgun = require( 'bunyan-mailgun' );
const PrettyStream = require( 'bunyan-prettystream' );
const Hapi = require( 'hapi' );

let prettyStdOut = new PrettyStream()

let options_mail = {
    from: 'from@test.com',
    to: 'to@test.com',
    key: 'key-XXXXXXXXXXXXXXXXXXX', // Mailgun API key
    domain: 'mydomain.mailgun.org'  // Your Mailgun Domain
};

let console = {
    level: 'info',
    type: 'raw',
    stream: prettyStdOut
}

let email = {
    type: 'raw',
    level: 'error',
    stream: new BunyanMailgun(
        options_mail
    )
}

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.register( {
    register: require( 'hapi-account' ),
    options: {
         email: email,
         logger: Bunyan.createLogger( {
             name: 'hapi-logger',
             streams: [console, email]
        })    
    }
});
```

- `server` Hapi server object
- `options` Plugin options object with the following keys:
  - `email` bunyan email stream object
  - `logger` a bunyan logger to attach to `server.app.log`
- `next` Continue registration

## Test

`npm run-script test` 

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed 
functionality. Lint and test your code.

## Release History
