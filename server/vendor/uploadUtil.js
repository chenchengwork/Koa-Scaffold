const path = require('path');
const fs = require('fs');
const Busboy = require('busboy');
const UtilDatetime = require('./dateTime');

const mkdirsSync = (dirname) => {
    if (fs.existsSync(dirname)) {
        return true
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true
        }
    }
}

/**
 * 获取文件名后缀
 * @param fileName
 * @returns {*}
 */
const getSuffixName = (fileName) => {
    let nameList = fileName.split('.');
    return nameList[nameList.length - 1]
}


class uploadUtil {
    /**
     * 执行文件上传,支持多文件上传
     * @param ctx 上下文
     * @param {object} options
     * {
     *      filePath:"",    //可填参数： 指定文件的上传路径
     *      fileName:"",    //可选参数： 指定文件名称，可以忽略由系统生成文件名
     *      allowSuffix:[], //必填参数： 指定允许的文件后缀
     * }
     * @returns {Promise}
     */
    do(ctx, options) {
        let req = ctx.req;

        return new Promise((resolve, reject) => {

            let result = {
                success: false,
                msg: "",
                data: {
                    fileNames:[]
                }
            }

            if (!options.hasOwnProperty('allowSuffix') || options.allowSuffix.length < 1){
                result.msg = "指定允许的文件后缀";
                return result;
            }


            let busboy = new Busboy({headers: req.headers});

            busboy.on('file', function (fieldName, file, filename, encoding, mimetype) {
                console.log('File-file [' + fieldName + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype)

                let {filePath, fileName, allowSuffix} = options;
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
                    result.data.fileNames.push(fileName);
                })
            });

            busboy.on('error', function (err) {
                result.msg = "上传失败";
                reject(result)
            });

            busboy.on('finish', function() {
                resolve(result)
            });

            req.pipe(busboy)
        })

    }
}


module.exports = new uploadUtil();





