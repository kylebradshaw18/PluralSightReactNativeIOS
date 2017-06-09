/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import Login from './Login';
import AuthService from './Services/AuthService';

export default class GithubBrowser extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			isLoggedIn: false,
			checkingAuth: true
		};
	}

	componentDidMount(){
		AuthService.getAuthInfo((err, authInfo) =>{
			this.setState({
				checkingAuth:false,
				isLoggedIn: authInfo != null
			});
		});
	}

  render() {

	if(this.state.checkingAuth){
		return (
			<View style={styles.container}>
				<ActivityIndicator
					animating={this.state.showProgress}
					size="large"
					style={styles.loader}
				/>
				<Text style={styles.welcome}> Logged in</Text>
			</View>
		);
	}
	
	if(this.state.isLoggedIn){
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}> Logged in</Text>
			</View>
		);
	} else {
		return (
			<Login onLogin={this.onLogin()}/>
		);
	}
  }

  onLogin(){
	this.setState({isLoggedIn: true});
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
