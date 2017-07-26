/**
 * Created by chencheng on 17-7-20.
 */
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const { URLSearchParams } = require('url');
const file = require('async-file');

const logger = require('./logger');

/**
 * 获取响应内容
 * @param success
 * @param data
 * @param msg
 * @returns {{success: boolean, data: *, msg: string}}
 */
const getReturnResult = (success = true,data = null,msg = "success") => {
    return {
        success,
        data,
        msg
    }
}

//TODO 注意：get post upload三个方法，还需要测试传参数的

/**
 *
 * @param url
 * @returns {Promise.<TResult>}
 */
exports.get = async (url) => {
    const resp = await axios.get(url).then((resp)=>{
        return getReturnResult(true,resp.data,"请求成功");
    },(resp)=>{
        return getReturnResult(false,resp.data,"请求失败");
    });

    return resp;
}

/**
 *
 * @param url
 * @param params
 * @returns {Promise.<*>}
 */
exports.post = async (url,params) => {
    let requestParams = new URLSearchParams();

    for(let [k,v] of Object.entries(params)) {
        requestParams.append(k, v);
    }

    return await axios({
        method: "post",
        url,
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        data: requestParams.toString()
    }).then((resp) => {
        return getReturnResult(true,resp.data,"请求成功");
    },(resp) => {
        return getReturnResult(false,resp.data,"请求失败");
    })
};

/**
 *
 * @param url
 * @param params
 * @returns {Promise.<*>}
 */
exports.postJson = async (url,params) => {

    return await axios({
        method: 'post',
        url,
        headers:{
            "Content-Type":'application/json,text/plain'
        },
        data: JSON.stringify(params)
    }).then((resp) => {
        return getReturnResult(true,resp.data,"请求成功");
    },(resp) => {
        return getReturnResult(false,resp.data,"请求失败");
    })
};


/**
 * 上传文件
 * @param {string} url
 * @param {object} params {file1:"文件路径",...}
 * @returns {Promise.<*>}
 *
 * usage:
 *  const resp = await restClient.upload("http://localhost:3001/homeDisposeUpload",{
        file1:__dirname + '/../static/img/meinv1.jpg',
        file2:__dirname + '/../static/img/meinv2.jpg',
        field1:"test"
    });
 */
exports.upload = async (url,params) => {

    if(!params){
        return getReturnResult(false,null,"未传入参数");
    }

    let form = new FormData();

    for(let [k,v] of Object.entries(params)){
        if(await file.exists(v)){
            form.append(k,fs.createReadStream(v));
        }else{
            form.append(k,v);
        }
    }

    let getHeaders = (form => {
        return new Promise((resolve,reject)=>{
            form.getLength((err,length)=>{
                if(err) reject(err)
                let headers = Object.assign({'Content-Length':length},form.getHeaders());
                resolve(headers)
            })
        })
    })

    const headers = await getHeaders(form);

    return await axios.post(url,form,{headers}).then((resp) => {
        return getReturnResult(true,resp.data,"上传成功");
    },(resp) => {
        logger.error(resp);
        return getReturnResult(false,null,"上传失败");
    });
}