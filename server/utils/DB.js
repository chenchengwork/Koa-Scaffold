/**
 * Created by chencheng on 17-7-26.
 */
const databaseConf = require('../config').database;
const Sequelize = require('sequelize');


class DB{
    constructor(){
        const driverConf = databaseConf.drivers[databaseConf.driver];
        const poolConf = databaseConf.pool;

        this.sequelize = new Sequelize(driverConf.database, driverConf.username, driverConf.password, {

            host: driverConf.host,
            dialect: driverConf.driver,     //'mysql'|'sqlite'|'postgres'|'mssql'

            pool: {
                max: poolConf.max,
                min: poolConf.min,
                idle: poolConf.idle
            }
        });

        // console.log(this.sequelize.QueryTypes);
        /*const Project = this.sequelize.define('project',{
            userId:Sequelize.INTEGER,
            userName:Sequelize.STRING,
            userEmail:Sequelize.STRING,
            createTime:Sequelize.INTEGER,
            updateTime:Sequelize.INTEGER,
        });

        Project.findAll();*/

        const UserInfo = this.sequelize.define('userInfo',{
            userId:Sequelize.INTEGER,
            userName:Sequelize.STRING,
            userEmail:Sequelize.STRING,
            createTime:Sequelize.INTEGER,
            updateTime:Sequelize.INTEGER,
        })

        UserInfo.findAll().then(users => {
            console.log(users)
        })

        // this.testQuery();
    }

    async testQuery(){
        const userInfo = await this.select('userInfo',['userName']);
        console.log(userInfo);
    }

    /**
     * select 查询
     * @param {String} table   表名
     * @param {Array|String} fields 字段
     * @param {Object} where   条件
     * @returns {Promise.<*>}
     *
     * usage:
     * ```js
     * ( async ()=>{
     *      return await db.select("tableName", [field1,...] | *);
     * })()
     *
     * ```
     */
    async select(table, fields = "*",where = {}){
        const sequelize = this.sequelize;
        return await this.sequelize.query("SELECT "+ fields.toString() +" FROM `"+table+"`",{ type: sequelize.QueryTypes.SELECT});
    }




}


module.exports = new DB();