/**
 * Created by chencheng on 17-7-19.
 */
'use strict'

const path = require('path');
const process = require('process');
const Logger = require('mini-logger');
const dataTime = require('./dateTime');


const logger = Logger({
    dir: path.join(__dirname, 'logs'),
    categories: [ 'info', 'warning', 'debug', 'error', 'critical' ],
    format: '[{category}.]YYYY-MM-DD[.log]'
})


const formatLog = (type,msg) => type + '|' + process.pid + '|' + dataTime.format(Date.now()) +'|'+ msg;


module.exports = {
    error(msg){
        if(logger.hasOwnProperty('error')) {
            logger.error(formatLog('error',msg));
        }
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