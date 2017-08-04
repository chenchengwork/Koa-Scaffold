/**
 * Created by chencheng on 2017/8/4.
 */

// node cachemanager
const cacheManager = require('cache-manager');

const helpers = require('../Helpers');

class Cache{

	constructor(){

		const manager = cacheManager.caching({
			store: require('cache-manager-fs'),
			options: {
				ttl: 60*60*60*24 			/* seconds */,
				maxsize: 1000*1000*1000 	/* max size in bytes on disk */,
				path:helpers.cachePath(),
				preventfill:true,
				reviveBuffers:true,
			}
		});

		this.cache = helpers.promisify(manager);
		// this.cache = manager;
	}


	set(key, val, expire){
		return this.cache.set(key, val, {ttl: expire});
	}

	get(key){

		return this.cache.get(key);
	}


}

module.exports = new Cache();