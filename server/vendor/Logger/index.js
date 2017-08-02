/**
 * Created by chencheng on 17-7-19.
 */
'use strict';

const path = require('path');
const process = require('process');
const moment = require('moment');
const helpers = require('../Helpers');
/*const logger = Logger({
    dir: path.join(__dirname, 'logs'),
    categories: [ 'info', 'warning', 'debug', 'error', 'critical' ],
    format: '[{category}.]YYYY-MM-DD[.log]'
})


const formatLog = (type,msg) =>{
    return type + '|' + process.pid + '|' + moment().format("YYYY-MM-DD h:mm:ss") +'|'+ (msg instanceof Error ? msg.stack : msg);
}*/

const winston = require('winston');


//{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
class Logger{

    constructor(logPath){

        this._logPath = logPath;
        const levels =  ['error','warn','info','debug'];

        levels.forEach(level => {
            const filename = logPath+"/"+ level +".log";

            winston.loggers.add(level, {
                console: {
                    level: level,
                    colorize: true,
                    label: 'log'+level,

                },

                file: {
                    filename,
                    timestamp:function() {
                        return helpers.dateFormat(new Date());
                    }
                },

            });
        });

        this.loggers = {};

        levels.forEach(level => {
            const filename = logPath+"/"+ level +".log";

            this.loggers[level] = new (winston.Logger)({
                transports:[
                    new (winston.transports.File)({
                        filename,
                        timestamp: true
                    })
                ]
            });
        })

    }

    /**
     *
     * @param [Array] params
     *
     * usage:
     *  // record throw Error
     *  logger.error(new Error());
     *
     *  logger.error('test message %s', 'my string');

        logger.error('test message %d', 123);
         // info: test message 123

         logger.error('test message %j', {number: 123}, {});
         // info: test message {"number":123}
         // meta = {}

         logger.error('test message %s, %s', 'first', 'second', {number: 123});
         // info: test message first, second
         // meta = {number: 123}

         logger.error('test message', 'first', 'second', {number: 123});
         // info: test message first second
         // meta = {number: 123}

         logger.error('test message %s, %s', 'first', 'second', {number: 123}, function(){});
         // info: test message first, second
         // meta = {number: 123}
         // callback = function(){}

         logger.error('test message', 'first', 'second', {number: 123}, function(){});
     */
    error(...params){
        console.log(params)
        winston.loggers.get('error').error.apply(null,params);
    }

    /**
     *
     * @param [Array] params
     *
     * usage:
     *  see error usage
     */
    warn(...params){
        winston.loggers.get('warn').warn.apply(null,params);
    }

    /**
     *
     * @param [Array] params
     *
     * usage:
     *  see error usage
     */
    info(...params){
        winston.loggers.get('info').warn.apply(null,params);
    }

    /**
     *
     * @param [Array] params
     *
     * usage:
     *  see error usage
     */
    debug(...params){
        winston.loggers.get('debug').warn.apply(null,params);
    }


    /**
     * Get logs
     *
     * @param {String} level        //"error","warn","info","debug"
     * @param {Object} [options]
     * @returns {Promise.<TResult>}
     */
    async getLogInfo(level,options){

        options = Object.assign({
            from: new Date - 1 * 60 * 60 * 1000,        //开始时间
            until: new Date,                            //结束时间
            limit: 10,                                  //限定日志条数
            start: 0,                                   //开始位置
            order: 'desc',
            fields: ['level','timestamp','message','stack'] //显示的字段内容
        },options);


       return await helpers.promisify(this.loggers[level]).query(options).then((results) => {

            return results;

        },(err) => {
           return [];
       })

    }

}


module.exports = new Logger(helpers.logPath());