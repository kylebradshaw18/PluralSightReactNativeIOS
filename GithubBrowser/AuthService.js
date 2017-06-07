
import Buffer from 'buffer';
export default class AuthService{
	login(creds, cd){
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
			return cb({success: true});
		})
		.catch((err) => {
			return cb(err);
		})
		.finally(()=>{
			this.setState({showProgress: false});
		});
	}
}