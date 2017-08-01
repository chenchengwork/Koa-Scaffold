/**
 * Created by chencheng on 17-7-26.
 */
const config = require('../config');
const databaseConf = config.database;
const Sequelize = require('sequelize');


class DB{

    constructor(){
        const driverConf = databaseConf.drivers[databaseConf.driver];
        const poolConf = databaseConf.pool;

        this.sequelize = new Sequelize(driverConf.database, driverConf.username, driverConf.password, {
			dialect: driverConf.driver,     //'mysql'|'sqlite'|'postgres'|'mssql'

			host: driverConf.host,

			//读写分离配置
			/*replication: {
				read: [
					{ host: '192.168.1.33', username: 'itbilu.com', password: 'pwd' },
					{ host: 'localhost', username: 'root', password: null }
				],
				write: { host: 'localhost', username: 'root', password: null }
			},*/


            pool: {
                max: poolConf.max,
                min: poolConf.min,
                idle: poolConf.idle
            },

			//打印sql
			logging:(sql) => {
            	config.debug && console.log(sql)
			}
        });

        //定义数据类型
        this.dataTypes = {
            STRING:Sequelize.STRING,

            TEXT:Sequelize.TEXT,

            INTEGER:Sequelize.INTEGER,

            BIGINT:Sequelize.BIGINT,

            FLOAT:Sequelize.FLOAT,

            REAL:Sequelize.FLOAT,   // PostgreSQL only.

            DOUBLE:Sequelize.DOUBLE,

            DECIMAL:Sequelize.DECIMAL,

            DATE:Sequelize.DATE,

            DATEONLY:Sequelize.DATEONLY,

            BOOLEAN:Sequelize.BOOLEAN,

            ENUM:Sequelize.ENUM,

            ARRAY:Sequelize.ARRAY,

            JSON:Sequelize.JSON, // JSON column. PostgreSQL only.

            JSONB:Sequelize.JSONB, // JSON column. PostgreSQL only.

            BLOB:Sequelize.BLOB, // BLOB (bytea for PostgreSQL)

            UUID:Sequelize.UUID,

            RANGE:Sequelize.RANGE,

            GEOMETRY:Sequelize.GEOMETRY,   // Spatial column.  PostgreSQL (with PostGIS) or MySQL only.

        };

    }


	/**
     * 定义表的ORM模型
	 * @param {String} modelName
	 * @param {Object} attributes
	 * @param {Object} options
	 * @returns {Model}
	 */
    define(modelName,attributes,options = {}){
        options = Object.assign({
			//不添加时间戳属性 (updatedAt, createdAt)
			timestamps: true,

			// 不从数据库中删除数据，而只是增加一个 deletedAt 标识当前时间,paranoid 属性只在启用 timestamps 时适用
			paranoid: true,

			// 禁止修改表名. 默认情况下
			// sequelize会自动使用传入的模型名（define的第一个参数）做为表名
			// 如果你不想使用这种方式你需要进行以下设置
			freezeTableName: true,      //true:默认模型名作为表名,false:模型名不作为表名

			// 定义表名
			// tableName:"userInfo"，


			//添加钩子
			hooks:{
				//执行查询后的钩子
				afterFind:() => {

				}
			}
		},options);

		return this.sequelize.define(modelName,attributes,options);
    }

	/**
	 * 原始语句查询
	 * @param sql
	 * @param options
	 * @returns {Promise}
	 */
    query(sql, options = {}){
    	return this.sequelize.query(sql, options);
	}


	/**
	 * 受管理的事物
	 * @param callbackFn
	 * @returns {Promise.<T>}
	 */
	transaction(callbackFn){
		return this.sequelize.transaction(callbackFn).then(() => true).catch(() => false );
	}

}


module.exports = new DB();