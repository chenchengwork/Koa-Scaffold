/**
 * Created by chencheng on 17-8-2.
 */
'use strict'

const path = require('path')
const pify = require('pify')

/**
 * This class returns absolute path to commonly
 * used AdonisJs directories.
 *
 * @class Helpers
 * @constructor
 */
class Helpers {
    constructor (appRoot) {
        this._appRoot = appRoot || path.join(__dirname,'../../');
    }

    /**
     * Returns path to the application root
     *
     * @method appRoot
     *
     * @return {String}
     */
    appRoot () {
        return this._appRoot
    }


    /**
     * Returns path to the config directory.
     *
     * ## Note
     * This method does not check the existence of
     * file.
     *
     * @method configPath
     *
     * @return {String}
     */
    configPath () {
        return path.join(this._appRoot, '/config')
    }

    /**
     * Returns path to the public directory or a
     * specific file to the public directory.
     *
     * ## Note
     * This method does not check the existence of
     * file.
     *
     * @method publicPath
     *
     * @param  {String}   [toFile = '']
     *
     * @return {String}
     */
    publicPath (toFile = '') {
        return path.join(this._appRoot, '/public', toFile)
    }


    /**
     * Returns path to the views directory or a
     * specific file to the views directory.
     *
     * ## Note
     * This method does not check the existence of
     * file.
     *
     * @method viewsPath
     *
     * @param  {String}   [toFile = '']
     *
     * @return {String}
     */
    viewsPath (toFile = '') {
        return path.join(this._appRoot, '/app/views', toFile)
    }

    /**
     * Returns path to the storage directory or a
     * specific file to the storage directory.
     *
     * ## Note
     * This method does not check the existence of
     * file.
     *
     * @method storagePath
     *
     * @param  {String}   [toFile = '']
     *
     * @return {String}
     */
    storagePath (toFile = '') {
        return path.join(this._appRoot, '/storage', toFile)
    }

    /**
     * Returns path to the log directory or a
     * specific file to the log directory.
     *
     * ## Note
     * This method does not check the existence of
     * file.
     *
     * @method logPath
     *
     * @param  {String}   [toFile = '']
     *
     * @return {String}
     */
    logPath (toFile = '') {
        return path.join(this._appRoot, '/storage/logs', toFile)
    }


    /**
     * Returns path to the tmp directory or a
     * specific file to the tmp directory.
     *
     * ## Note
     * This method does not check the existence of
     * file.
     *
     * @method tmpPath
     *
     * @param  {String}   [toFile = '']
     *
     * @return {String}
     */
    tmpPath (toFile = '') {
        return path.join(this._appRoot, '/storage/tmp', toFile)
    }

}

module.exports = new Helpers(path.join(__dirname,"../../"))


