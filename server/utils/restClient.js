/**
 * Created by chencheng on 17-7-20.
 */
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

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

exports.get = async (url) => {
    const resp = await axios.get(url).then((resp)=>{
        return getReturnResult(true,resp.data,"请求成功");
    },(resp)=>{
        return getReturnResult(false,resp.data,"请求失败");
    });

    return resp;
}

exports.post = async (url,params) => {
    let requestParams = new URLSearchParams();
    for(let [k,v] of Object.entries(params)) {
        requestParams.append(k, v);
    }
}


exports.upload = async (url,params) => {

    let form = new FormData();

    for(let [k,v] of Object.entries(params)){
        if(fs.isFile(v)){
            form.append(k,fs.createReadStream(v));
        }else{
            form.append(k,v);
        }
    }

    // form.append('file',fs.createReadStream(__dirname + '/../static/img/meinv1.jpg'));
    // form.append('file',fs.createReadStream(__dirname + '/../static/img/meinv2.jpg'));

    let getHeaders = (form=>{
        return new Promise((resolve,reject)=>{
            form.getLength((err,length)=>{
                if(err) reject(err)
                let headers = Object.assign({'Content-Length':length},form.getHeaders());
                resolve(headers)
            })
        })
    })

    const headers = await getHeaders(form);

    const resp = await axios.post(url,form,{headers}).then((resp) => {
        return getReturnResult(true,resp.data,"上传成功");
    },(resp) => {
        logger.error(resp);
        return getReturnResult(false,null,"上传失败");
    });

    return resp;
}