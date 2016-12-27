/**
 * Created by Mikael Lindahl on 2016-09-16.
 */


'use strict';

let _server;

/**
 * - `server` Hapi server object
 * - `options` Plugin options object with the following keys:
 *   - `email` bunyan email stream object
 *   - `logger` a bunyan logger to attach to `server.app.log`
 * - next Continue registration
 *
 *   @param {object} options
 *   @api public
 */
exports.register = function (server, options, next) {

    _server = server; // Keep a handle to server object
    let _fatal=false;
    _server.app.log=options.logger; //make available safely

    // log error as fatal at creash
    process.on('uncaughtException', function (err) {

        console.log('ooops')

        _fatal=true; //tricggers process.exit(1); when email have been sent
        _server.app.log.fatal(err)
    });

    options.email.stream.on('sent', (msg)=>{

        if(_fatal){
            process.exit(1);
        }

    });

    next();
};

exports.register.attributes = {
    name: 'hapi-log',
    version: '1.0.0'
};