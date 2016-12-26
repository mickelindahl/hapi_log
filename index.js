/**
 * Created by Mikael Lindahl on 2016-09-16.
 */


'use strict';

let _server;

exports.register = function (server, options, next) {

    _server = server; // Keep a handle to server object
    let _fatal=false;
    _server.app.log=options.logger; //make available safely

    // log error as fatal at creash
    process.on('uncaughtException', function (err) {
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