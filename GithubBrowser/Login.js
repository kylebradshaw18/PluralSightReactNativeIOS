import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import AuthService from './Services/AuthService';

export default class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			showProgress:false
		};
	}
  render() {
	  var errorCtrl = <View/>;

	  if((!this.state.sucess) && this.state.badCredentials){
		  errorCtrl = <Text style={styles.error}>
		  That username and password didn't work
		  </Text>;
	  } else if((!this.state.sucess) && this.state.unknownError){
		  errorCtrl = <Text style={styles.error}>
		  We experienced an unexpected issue
		  </Text>;
	  }

    return (
      <View style={styles.container}>
	  	<Image style={styles.logo}
		  	source={{uri: 'Octocat'}}
		/>
		<Text 
			style={styles.heading}>
				Github Browser
		</Text>
		<TextInput 
			onChangeText={(text) => this.setState({username: text})}
			style={styles.input}
			placeholder="Github Username"
			ref='usernameInput'
			autoCapitalize = 'none'
			onSubmitEditing={(event) => { 
				this.refs.passwordInput.focus(); 
			}}
		/>
		<TextInput 
			onChangeText={(text) => this.setState({password: text})}
			style={styles.input}
			placeholder="Github Password"
			secureTextEntry={true}
			ref='passwordInput'
			autoCapitalize = 'none'
		/>
		<TouchableHighlight
			onPress={this.onLoginPressed.bind(this)}
			style={styles.button}
			ref='logInInput'
			>
			<Text 
				style={styles.buttonText}>
					Log in
			</Text>
		</TouchableHighlight>
		{errorCtrl}
		<ActivityIndicator
			animating={this.state.showProgress}
			size="large"
			style={styles.loader}
		/>
	  </View>
    );
  }

	onLoginPressed(){
		this.setState({showProgress: true});
		
		AuthService.login({
				username: this.state.username,
				password: this.state.password
			},(results)=> {
				this.setState(Object.assign({
				showProgress: false
			}, results));

			if(results.success && this.props.onLogin){
				this.props.onLogin();
			}
		});
	}
	
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
	paddingTop: 40,
	alignItems: 'center',
	padding: 15
  }, 
  logo:{
	width: 66,
	height: 55
  },
  heading: {
	  fontSize: 30,
	  marginTop: 10
  },
  input:{
	  height: 50,
	  marginTop: 10,
	  padding: 4,
	  fontSize: 18,
	  borderWidth: 1,
	  borderColor: '#48bbec',
	  borderRadius: 4,
	  color: '#48BBEC'
  },
  button:{
	  height: 50,
	  backgroundColor: '#48BBEC',
	  alignSelf: 'stretch',
	  marginTop: 10,
	  justifyContent: 'center',
	  borderRadius:4
  },
  buttonText:{
	  fontSize:22,
	  color: '#FFF',
	  alignSelf: 'center'
  },
  loader:{
	  marginTop: 20
  },
  error:{
	  color: 'red',
	  paddingTop: 10
  }
});