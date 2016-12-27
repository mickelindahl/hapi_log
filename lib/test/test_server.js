/**
 * Created by Mikael Lindahl (mikael) on 10/3/16.
 */

'use strict';

const hapiLog = require( "../index.js" );
const Hapi = require( 'hapi' );
const Promise = require( 'bluebird' );
const debug = require( 'debug' )( 'hapi_account:test_server' );

function getServerPromise( options ) {
    let server = new Hapi.Server();

    server.connection( { host: '0.0.0.0', port: 3000 } );

    return new Promise( resolve=> {

        server.register( [
            {
                register: hapiLog,
                options: options
            }

        ] )
            .then( ()=> {

                resolve( server )

            } )
    } )
}

module.exports = getServerPromise;



