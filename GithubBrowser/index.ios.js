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
import AppContainer from './AppContainer';

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
				</View>
			);
		}
		
		if(this.state.isLoggedIn){
			return (
				<AppContainer/>
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
