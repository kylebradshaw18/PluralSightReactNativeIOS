import Buffer from 'buffer';
import {
  AsyncStorage
} from 'react-native';
import Lodash from 'lodash';

const _AuthKey = 'auth';
const _UserKey = 'user';

export default class AuthService{
	static test(){
		console.log('HERE');
	}

	static getAuthInfo(cb){
		AsyncStorage.multiGet([_AuthKey, _UserKey], (err, val) => {
			if(err){
				return cb(err);
			}

			if(!val){
				return cb();
			}

			let zippedObj = Lodash.zipObject(val);
			if(!zippedObj[_AuthKey]){
				return cb();
			}

			let authInfo = {
				header:{
					Authorization: 'Basic ' + zippedObj[_AuthKey]
				},
				user: JSON.parse(zippedObj[_UserKey])
			}
			return cb(null, authInfo);
		})
	}

	static login(creds, cb){
		let b = new Buffer.Buffer(creds.username +
			':' + creds.password);
		let encodedAuth = b.toString('base64');

		fetch('https://api.github.com/user',{
			headers:{
				'Authorization': 'Basic ' + encodedAuth
			}
		})
		.then((response) => {
			if(response.status >= 200 && response.status < 300)
				return response;
			throw {
				badCredentials: response.status == 401,
				unknownError: response.status != 401
			}
		})
		.then((response) => {
			return response.json();
		})
		.then((results)=>{
			AsyncStorage.multiSet([
				[_AuthKey, encodedAuth],
				[_UserKey, JSON.stringify(results)]
			], (err) => {
				if(err){
					throw err;
				}

				return cb({success: true});
			});
		})
		.catch((err) => {
			return cb(err);
		});
	}
}