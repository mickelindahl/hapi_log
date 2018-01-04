/**
 * Created by Mikael Lindahl on 2016-12-26.
 */

'use strict';


const code = require( "code" );
const debug = require( 'debug' )( 'hapi-log:lib:test:index' );
const Lab = require( "lab" );
const serverPromise = require( './test_server.js' );
let lab = exports.lab = Lab.script();

const Bunyan = require( 'bunyan' );
const BunyanMailgun = require( 'bunyan-mailgun' );
const PrettyStream = require( 'bunyan-prettystream' );

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

let options = {
    email: email,
    logger: Bunyan.createLogger( {
        name: 'hapi-logger',
        streams: [console, email]

    })
};

function mockMailgun( server ) {

    server.app.log.streams[1].stream.mailgun = {
        messages: ()=> {
            return {
                send: ( options, cb )=> {
                    cb( null, 'ok' );
                }
            }
        }
    };
}

let exit = process.exit

// The order of tests matters!!!
lab.experiment( "hapi handlers", ()=> {

    lab.afterEach(async ()=>{

        process.exit = exit;

    })

    lab.test( 'Test log',
        async ()=> {
            await serverPromise( options ).then( server=> {

                mockMailgun( server );

                server.app.log.error( 'test' )

                return new Promise(resolve=>{

                    setTimeout(
                        ()=> {
                            resolve()
                        }
                        , 1000
                    );
                })



            } ).catch(err=>{

                console.error(err)

            })

        } );

} );