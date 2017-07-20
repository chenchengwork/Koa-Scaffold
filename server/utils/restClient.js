/**
 * Created by chencheng on 17-7-20.
 */
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');


exports.get = async (url) => {
    const resp = await axios.get(url);
    // console.log(11111111111)
    // console.log(resp.data)
    return resp.data;
}

exports.post = async (url,params) => {

}


exports.upload = async (url,params) => {

    let data = fs.createReadStream(__dirname + '/../static/img/meinv.jpg')
    let form = new FormData()
    form.append('type','image')
    form.append('media',data,'test.jpg')

    let getHeaders = (form=>{
        return new Promise((resolve,reject)=>{
            form.getLength((err,length)=>{
                if(err) reject(err)
                let headers = Object.assign({'Content-Length':length},form.getHeaders())
                resolve(headers)
            })
        })
    })

    getHeaders(form)
        .then(headers=>{
            return axios.post(url,form,{headers:headers})
        })
        .then((response)=>{
            console.log(response.data)
        })
        .catch(e=>{console.log(e)})
}