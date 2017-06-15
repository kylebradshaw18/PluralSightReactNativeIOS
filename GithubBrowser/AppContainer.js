import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  TabBarIOS
} from 'react-native';
import AuthService from './Services/AuthService';

export default class AppContainer extends Component {
	constructor(props){
		super(props);
		this.state = {
			selectedTab: 'feed'
		}
	}
  render() {
    return (
		<TabBarIOS style={styles.container}>
			<TabBarIOS.Item
				title="Feed"
				selected={this.state.selectedTab == 'feed'}
				style={styles.icon}
				icon={{uri: 'inbox'}}
				onPress={()=> this.setState({selectedTab: 'feed'})}
			>
				<Text style={styles.welcome}> Tab 1</Text>
			</TabBarIOS.Item>
			<TabBarIOS.Item
				title="Search"
				selected={this.state.selectedTab == 'search'}
				icon={{uri: 'search'}}
				onPress={()=> this.setState({selectedTab: 'search'})}
			>
				<Text style={styles.welcome}> Tab 2</Text>
			</TabBarIOS.Item>
		</TabBarIOS>
    );
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
  icon:{
	  backgroundColor:'transparent'
  }
});