import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
	  	<Image style={styles.logo}
		  source={{ uri: 'https://www.brightedge.com/blog/wp-content/uploads/2016/02/HTTPs.jpg', width: 32, height: 32, }}
		/>
	  </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
	paddingTop: 40
  }, 
  logo:{
	width: 66,
	height: 55
  }
});