const path = require('path')
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')
const UtilType = require('./type')
const UtilDatetime = require('./dateTime')

const mkdirsSync = (dirname) => {
    // console.log(dirname)
    if (fs.existsSync(dirname)) {
        return true
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true
        }
    }
}

const getSuffixName = (fileName) => {
    let nameList = fileName.split('.')
    return nameList[nameList.length - 1]
}


class uploadUtil {

    constructor(){
        this.fileName = "";
    }


    /**
     * 获取文件名
     * @returns {string}
     */
    getFileName(){
        return this.fileName;
    }

    /**
     * 执行文件上传
     * @param ctx
     * @param {object} options
     * {
     *      filePath:"",    //可填参数： 指定文件的上传路径
     *      fileName:"",    //可选参数： 指定文件名称，可以忽略由系统生成文件名
     *      allowSuffix:[], //必填参数： 指定允许的文件后缀
     * }
     * @returns {Promise}
     */
    do(ctx, options) {
        const self = this;

        let req = ctx.req;
        let busboy = new Busboy({headers: req.headers});
        let {filePath, fileName, allowSuffix} = options;

        return new Promise((resolve, reject) => {
            let result = {
                success: false,
                msg: "",
                data: null
            }

            busboy.on('file', function (fieldName, file, filename, encoding, mimetype) {
                // console.log('File-file [' + fieldName + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype)

                const fileSuffix = getSuffixName(filename);

                //检查文件类型
                if(!allowSuffix.includes(fileSuffix)){
                    result.msg = "文件类型："+fileSuffix+"不允许被上传";
                    reject(result)
                    return false;
                }

                if (!filePath) {
                    filePath = path.join(
                        __dirname,
                        '/../static/upload/system/',
                        UtilDatetime.format(null, 'YYYY/MM/DD')
                    )
                }

                //创建上传的文件路径
                mkdirsSync(filePath);

                //生成新的文件名
                if (!fileName) {
                    fileName = Math.random().toString(16).substr(2) + '.' + fileSuffix;
                }

                let _uploadFilePath = path.join(filePath, fileName)

                //写入文件到上传路径中
                let saveTo = path.join(_uploadFilePath);
                file.pipe(fs.createWriteStream(saveTo));

                file.on('end', function () {
                    result.success = true;
                    self.fileName = fileName;
                    resolve(result)
                })
            });


            busboy.on('error', function (err) {
                result.msg = "上传失败";
                reject(result)
            });

            req.pipe(busboy)
        })

    }
}


module.exports = new uploadUtil();





