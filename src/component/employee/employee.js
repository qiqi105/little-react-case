import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chat.redux.js'
import UserList from '../../containers/user-list/user-list.js'
@connect(
	state=>state.chatUser,
	{getUserList}
	)
class Employee extends React.Component{
	componentDidMount(){
		//返回redux中的userlist列表
		this.props.getUserList('employee')
	}
	render(){
		return<UserList userList={this.props.userList}></UserList>
	}
}

export default Employee