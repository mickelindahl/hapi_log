/**
 * Created by Mikael Lindahl on 2016-09-16.
 */


'use strict';

let _server;
let debug = require('debug')('hapi-log:lib:index')

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
exports.plugin={
    register : async function (server, options) {

        _server = server; // Keep a handle to server object
        let _fatal=false;
        _server.app.log=options.logger; //make available safely

    },
    pkg:require('../package.json')
};
