import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chat.redux.js'
import UserList from '../../containers/user-list/user-list.js'
@connect(
	state=>state.chatUser,
	{getUserList}
	)
class Boss extends React.Component{
	constructor(props){
		super(props)
		
	}
	componentDidMount(){
		//返回redux中的userlist列表
		this.props.getUserList('boss')
	}
	render(){
		return(<div>
			
			<UserList userList={this.props.userList}></UserList>
			</div>)
	}
}

export default Boss