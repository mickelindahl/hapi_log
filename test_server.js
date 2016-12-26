/**
 * Created by Mikael Lindahl (mikael) on 10/3/16.
 */

'use strict';

const hapiLog = require( "./lib/index.js" );
const Hapi = require( 'hapi' );
const Promise = require( 'bluebird' );
const debug = require( 'debug' )( 'hapi_account:test_server' )


function getServer( options ) {
    let server = new Hapi.Server();

    server.connection( { host: '0.0.0.0', port: 3000 } );

    return {
        promise:server.register( [
        {
            register: hapiLog,
            options: options
        }

    ] )
        .then( ()=> {

        server.app.readyForTest = true;

    } ),
    server:server
    }
}

function startServer( options ) {
    let result = getServer( options );

    let promise = new Promise( ( resolve, reject )=> {
        result.promise.then( ()=> {

                resolve({server: result.server})

        } );
    } );

    return promise
};

module.exports = startServer;


