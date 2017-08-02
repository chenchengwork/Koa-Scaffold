/**
 * Created by chencheng on 17-7-19.
 */
'use strict'

const path = require('path');
const process = require('process');
// const Logger = require('mini-logger');
const moment = require('moment');

/*const logger = Logger({
    dir: path.join(__dirname, 'logs'),
    categories: [ 'info', 'warning', 'debug', 'error', 'critical' ],
    format: '[{category}.]YYYY-MM-DD[.log]'
})


const formatLog = (type,msg) =>{
    return type + '|' + process.pid + '|' + moment().format("YYYY-MM-DD h:mm:ss") +'|'+ (msg instanceof Error ? msg.stack : msg);
}*/

const winston = require('winston');




class Logger{

    constructor(){
        this.Logger = new winston.Logger({
            level: 'debug',
            transports: [
                new (winston.transports.Console)(),
                // new (winston.transports.File)({filename:'allenway.log'}),
                new (winston.transports.File)({
                    name: 'info-file',
                    filename: 'info.log',
                    level: 'info'
                }),
                new (winston.transports.File)({
                    name: 'error-file',
                    filename: 'error.log',
                    level: 'error'
                })
            ]
        })
    }

}


module.exports = {
    error(msg){
        Logger.error(msg)
    },

    info(msg){
        if(logger.hasOwnProperty('info')) {
            logger.info( formatLog('info', msg) );
        }
    },

    warning(msg){
        if(logger.hasOwnProperty('warning')) {
            logger.warning( formatLog('warning', msg) );
        }
    },

    debug(msg){
        if(logger.hasOwnProperty('debug')) {
            logger.debug( formatLog('debug', msg) );
        }
    },

    critical(msg){
        if(logger.hasOwnProperty('critical')) {
            logger.critical( formatLog('critical', msg) );
        }
    }
};