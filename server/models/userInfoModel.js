/**
 * Created by chencheng on 17-7-31.
 */
const DB = require('../utils/DB');

module.exports = DB.define('userInfo',{
    userId:{
        type: DB.dataTypes.INTEGER,
        primaryKey: true
    },
    userName:DB.dataTypes.STRING,
    userEmail:DB.dataTypes.STRING,
    createTime:DB.dataTypes.INTEGER,
    updateTime:DB.dataTypes.INTEGER,
},{
    //不添加时间戳属性 (updatedAt, createdAt)
    timestamps: false,
    // 不从数据库中删除数据，而只是增加一个 deletedAt 标识当前时间,paranoid 属性只在启用 timestamps 时适用
    paranoid: false,

    // 禁止修改表名. 默认情况下
    // sequelize会自动使用传入的模型名（define的第一个参数）做为表名
    // 如果你不想使用这种方式你需要进行以下设置
    freezeTableName: true,      //true:默认模型名作为表名,false:模型名不作为表名

    // 定义表名
    // tableName:"userInfo"
})