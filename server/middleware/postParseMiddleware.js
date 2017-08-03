/**
 * Created by chencheng on 17-8-3.
 */

'use strict';

/**
 * Module dependencies.
 */

const parse = require('co-body');
const copy = require('copy-to');

const os = require('os');
const fs = require('fs');
const path = require('path');
const Busboy = require('busboy');
const appendField = require('append-field');

const helpers = require('../vendor/Helpers');
const config = require('../vendor/Config');

const appConf = config.get('app');

const defaultOpts = {
	upload_tmp_dir:helpers.tmpPath(),      //临时文件目录
	post_max_size: appConf.postMaxSize || "8M",                   //允许post请求最大数据量
	upload_max_filesize:appConf.uploadMaxFileSize || "1M",        //允许upload最大数据量
};

/**
 * extract file and fields
 * @param req
 * @param dest
 * @param fnDestFilename
 * @param opts
 * @returns {Promise}
 */
function extractFileAndField(req, dest, fnDestFilename, opts = {}) {

	return new Promise((resolve, reject) => {
		let files = [];
		let fields = {};

		let busboy = new Busboy(Object.assign({}, opts, {headers: req.headers}));

		busboy.on('file', (fieldname, fileStream, filename, encoding, mimetype) => {

			if (!filename) return fileStream.resume()

			files.push(new Promise(function (resolve, reject) {
				let tmpName = fnDestFilename(fieldname, filename)
				let tmpPath = path.join(dest, path.basename(tmpName))

				fileStream.pipe(fs.createWriteStream(tmpPath))
					.on('error', reject)
					.on('finish', () => {
						let rs = fs.createReadStream(tmpPath)
						rs.fieldname = fieldname;
						rs.filename = filename;
						rs.encoding = encoding;
						rs.mimetype = mimetype;

						resolve(rs)
					})
			}))
		});

		busboy.on('field', (name, value) => {
			if (Object.getOwnPropertyDescriptor(Object.prototype, name)) {
				name = '_' + name
			}
			appendField(fields, name, value)
		});

		busboy.on('finish', () => {
			if (files.length) {
				Promise.all(files)
					.then(files => resolve({ fields, files }))
					.catch(reject)
			} else {
				resolve({ fields, files })
			}
		});

		busboy.on('error', reject)
		busboy.on('partsLimit', () => reject(new Error('LIMIT_PART_COUNT')))
		busboy.on('filesLimit', () => reject(new Error('LIMIT_FILE_COUNT')))
		busboy.on('fieldsLimit', () => reject(new Error('LIMIT_FIELD_COUNT')))

		req.pipe(busboy)
	})
}




/**
 * @param [Object] opts
 *   - {String} jsonLimit default '1mb'
 *   - {String} formLimit default '1mb'
 *   - {String} textLimit default '1mb'
 *   - {string} encoding default 'utf-8'
 *   - {Object} extendTypes
 *   - {Function} [onerror]
 */
module.exports = function (opts = defaultOpts) {
    // default json types
    const jsonTypes = [
        'application/json',
        'application/json-patch+json',
        'application/vnd.api+json',
        'application/csp-report',
    ];

    // default form types
    const formTypes = [
        'application/x-www-form-urlencoded',
    ];

    // default text types
    const textTypes = [
        'text/plain',
    ];

    //default multipart
    const formDataTypes = [
        'multipart/form-data'
    ];

    //解析body
    const parseBody = async (ctx) => {
        if (ctx.request.is(jsonTypes)) {

            return await parse.json(ctx, {limit:opts.post_max_size.toLocaleLowerCase()+'b',returnRawBody: true});
        }
        else if (ctx.request.is(formTypes)) {

            return await parse.form(ctx, {limit:opts.post_max_size.toLocaleLowerCase()+'b',returnRawBody: true});
        }
        else if (ctx.request.is(textTypes)) {

            return await parse.text(ctx, {limit:opts.post_max_size.toLocaleLowerCase()+'b',returnRawBody: true}) || '';

        }else if(ctx.request.is(formDataTypes)){

			let dest = opts.upload_tmp_dir || os.tmpdir();

			let fnDestFilename = opts.fnDestFilename || function(fieldName, filename) {
			    return Date.now() + "_" + fieldName + "_" + filename;
			}

			let { files, fields } = await extractFileAndField(ctx.req, dest, fnDestFilename, {limits:{
				fieldSize:parseInt(opts.upload_max_filesize) * 1024 *1024
            }})

            return {
				files,
				fields
            }
        }

        return {};
    };


    return async (ctx, next) => {
        if (ctx.request.body !== undefined) return await next();
        if (ctx.disableBodyParser) return await next();
        try {

            const size = ctx.request.length / 1024 / 1024;

            if(ctx.req.method.toLocaleLowerCase() == 'post' && size > parseInt(opts.post_max_size)){
                ctx.status = 413;
				ctx.body = 'request entity too large';
                return ;
            }

            if(ctx.request.is(formDataTypes) && size > parseInt(opts.upload_max_filesize)){
				ctx.status = 413;
				ctx.body = 'request entity too large';
				return ;
            }


			const res = await parseBody(ctx);

            if(ctx.request.is(formDataTypes)){
				ctx.request.body = res.fields
				ctx.request.files = res.files

            }else{
				ctx.request.body = 'parsed' in res ? res.parsed : {};
            }

            if (ctx.request.rawBody === undefined) ctx.request.rawBody = res.raw;

        } catch (err) {
            if (onerror) {
                onerror(err, ctx);
            } else {
                throw err;
            }
        }
        await next();
    };

};



