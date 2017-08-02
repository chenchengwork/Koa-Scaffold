'use strict';

const _ = require('lodash');
const requireAll = require('require-all');
const helpers = require('../Helpers');

/**
 * Manages configuration by recursively reading all
 * `.js` files from the `config` folder.
 *
 * @alias Config
 * @singleton
 *
 * @class Config
 * @constructor
 */
class Config {
    constructor(configPath) {
        this._configPath = configPath
        this._config = {}
        this.syncWithFileSystem()
    }

    /**
     * Syncs the in-memory config store with the
     * file system. Ideally you should keep your
     * config static and never update the file
     * system on the fly.
     *
     * @method syncWithFileSystem
     */
    syncWithFileSystem() {
        try {
            this._config = requireAll({
                dirname: this._configPath,
                filters: /(.*)\.js$/
            })

        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error
            }
        }
    }

    /**
     * Get value for a given key from the config store. Nested
     * values can be accessed via (dot notation). Values
     * referenced with `self::` are further resolved.
     *
     * @method get
     *
     * @param  {String} key
     * @param  {*} [defaultValue]
     *
     * @return {*}
     *
     * @example
     * ```
     * Config.get('database.mysql')
     *
     * // referenced
     * {
   *   prodMysql: 'self::database.mysql'
   * }
     * Config.get('database.prodMysql')
     * ```
     */
    get(key, defaultValue) {
        const value = _.get(this._config, key, defaultValue)
        if (typeof (value) === 'string' && value.startsWith('self::')) {
            return this.get(value.replace('self::', ''))
        }
        return value
    }

    /**
     * Merge default values with the resolved values.
     * This is to provide a default set of values
     * when it does not exists. This method uses
     * lodash `_.mergeWith` method.
     *
     * @since 4.0.0
     * @method merge
     *
     * @param  {String} key
     * @param  {Object} defaultValues
     * @param  {Function} [customizer]
     *
     * @return {Object}
     *
     * @example
     * ```js
     * Config.merge('services.redis', {
   *   port: 6379,
   *   host: 'localhost'
   * })
     * ```
     */
    merge(key, defaultValues, customizer) {
        const value = _.get(this._config, key, {})
        return _.mergeWith(defaultValues, value, customizer)
    }

    /**
     * Update value for a given key inside the config store. If
     * value does not exists it will be created.
     *
     * ## Note
     * This method updates the value in memory and not on the
     * file system.
     *
     * @method set
     *
     * @param  {String} key
     * @param  {*} value
     *
     * @example
     * ```
     * Config.set('database.mysql.host', '127.0.0.1')
     *
     * // later get the value
     * Config.get('database.mysql.host')
     * ```
     */
    set(key, value) {
        _.set(this._config, key, value)
    }
}

module.exports = new Config(helpers.configPath());
