/**
 * Created by chencheng on 17-7-31.
 */
const DB = require('../utils/DB');

/**
 *
 * @type {Model}
 */
module.exports = DB.define('userInfo',{
    userId:{
        type: DB.dataTypes.INTEGER,
		autoIncrement:true,
        primaryKey: true
    },
    userName:DB.dataTypes.STRING,
    userEmail:DB.dataTypes.STRING,
    createTime:DB.dataTypes.INTEGER,
    updateTime:DB.dataTypes.INTEGER,
});