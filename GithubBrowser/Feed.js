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
  TabBarIOS,
  ListView
} from 'react-native';
import AuthService from './Services/AuthService';

export default class Feed extends Component {
	constructor(props){
		super(props);
		let ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 != r2
		});

		this.state = {
			dataSource: ds,
			showProgress: true
		}
	}
  render() {
    return (
		<View style={styles.container}>
			<ListView
				dataSource={this.state.dataSource}
				renderRow={this.renderRow.bind(this)}
			/>
		</View>
    );
  }

  renderRow(rowData){
	return <Text 
				style={styles.row}
			>
				{rowData.actor.login}
			</Text>
  }

  fetchFeed(){
	  AuthService.getAuthInfo((err, authInfo) => {
		  console.log(authInfo);
		  let url = 'https://api.github.com/users/'
		  		+ authInfo.user.login
				+ '/recieved_events';

		  fetch(url, {
			  headers: authInfo.header
		  })
		  .then((response)=> response.json())
		  .then((responseData) => {
			  let feedItems = responseData.filter((env)=>ev.type == 'PushEvent');
			  this.setState({
				  dataSource: this.state.dataSource.cloneWithRows(feedItems)
			  })
		  });

	  });
  }

	componentDidMount(){
		this.fetchFeed();
	}
	
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  row: {
    color: '#333',
	backgroundColor: '#fff',
	alignItems: 'center'
  },
  icon:{
	  backgroundColor:'transparent'
  }
});