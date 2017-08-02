/**
 * Created by chencheng on 17-7-20.
 */
'use strict';

const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const {URLSearchParams} = require('url');
const file = require('async-file');

/**
 * 获取响应内容
 * @param success
 * @param data
 * @param msg
 * @returns {{success: boolean, data: *, msg: string}}
 */
const getReturnResult = (success = true, data = null, msg = "request success") => {
    return {
        success,
        data,
        msg
    }
};


class Client {

    /**
     * curl get
     *
     * @param url
     * @returns {Promise.<TResult>}
     */
    async get(url) {
        return await axios.get(url).then((resp) => {
            return getReturnResult(true, resp.data, "request success");
        }, (resp) => {
            return getReturnResult(false, resp.data, "request failed");
        });
    }

    /**
     * curl post
     *
     * @param url
     * @param params
     * @returns {Promise.<*>}
     */
    async post(url, params) {
        let requestParams = new URLSearchParams();

        for (let [k, v] of Object.entries(params)) {
            requestParams.append(k, v);
        }

        return await axios({
            method: "post",
            url,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: requestParams.toString()
        }).then((resp) => {
            return getReturnResult(true, resp.data, "request success");
        }, (resp) => {
            return getReturnResult(false, resp.data, "request failed");
        })
    };

    /**
     * curl post application/json,text/plain
     *
     * @param url
     * @param params
     * @returns {Promise.<*>}
     */
    async postJson(url, params) {

        return await
            axios({
                method: 'post',
                url,
                headers: {
                    "Content-Type": 'application/json,text/plain'
                },
                data: JSON.stringify(params)
            }).then((resp) => {
                return getReturnResult(true, resp.data, "request success");
            }, (resp) => {
                return getReturnResult(false, resp.data, "request failed");
            })
    };


    /**
     * upload file
     *
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
    async upload(url, params) {

        if (!params) {
            return getReturnResult(false, null, "not in parameter");
        }

        let form = new FormData();

        for (let [k, v] of Object.entries(params)) {
            if (await file.exists(v)) {
                form.append(k, fs.createReadStream(v));
            } else {
                form.append(k, v);
            }
        }

        let getHeaders = (form => {
            return new Promise((resolve, reject) => {
                form.getLength((err, length) => {
                    if (err) reject(err)
                    let headers = Object.assign({'Content-Length': length}, form.getHeaders());
                    resolve(headers)
                })
            })
        })

        const headers = await getHeaders(form);

        return await axios.post(url, form, {headers}).then((resp) => {
            return getReturnResult(true, resp.data, "request success");
        }, (resp) => {
            return getReturnResult(false, null, "request failed");
        });
    }

}

/**
 *
 * @type {Client}
 */
module.exports = new Client();