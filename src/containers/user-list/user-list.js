import React from 'react'
import {Card,WingBlank,whiteSpace} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
@withRouter
class UserList extends React.Component{
	constructor(props){
		super(props);
		
	}
	static propTypes={
		userList:PropTypes.array.isRequired
	}
	handleClick(v){
		this.props.history.push(`/chat/${v._id}`)
	}	
	render(){
		return(<div>
			<WingBlank>
				<whiteSpace></whiteSpace>
				{this.props.userList.map(v=>(
					v.avatar?<Card 
					onClick={()=>this.handleClick(v)}
					key={v._id}>
						<Card.Header
							title={v.user}
							thumb={require(`../../images/avatar-select/${v.avatar}.svg`)}
							extra={<span>{v.title}</span>}
						></Card.Header>
						<Card.Body>
							{v.types==='boss'?<div>公@司:{v.company}</div>:null}
							{v.desc.split('\n').map(v=>(
							<div key={v}>{v}</div>
							))}
							{v.types==='boss'?<div>薪资:{v.money}</div>:null}
						</Card.Body>
					</Card>:null
				))}
			</WingBlank>
			</div>)
	}
}
export default UserList