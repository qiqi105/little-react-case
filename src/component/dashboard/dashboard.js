import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import {Switch,Route} from 'react-router-dom'
import NavFooter from '../navFooter/navFooter.js'
import Boss from '../boss/boss.js'
import Me from '../me/me.js'
import Employee from '../employee/employee.js'
import MsgList from '../msgList/msgList.js'
import {getMsgList,sendMsg,recvMsg} from '../../redux/chat/chat.redux.js'

@connect(
	state=>state,
	{getMsgList,sendMsg,recvMsg}
	)
class DashBoard extends React.Component{	
	componentDidMount(){
		if(!this.props.chat.chatmsg.length){
			this.props.getMsgList()
			this.props.recvMsg()
		}	
	}
	render(){
		const user=this.props.user
		const navList=[
			{
				path:'/boss',
				text:'老板',
				icon:'boss',
				title:'老板列表',
				hide:user.types=='boss',
				component:Boss
			},
			{
				path:'/employee',
				text:'求职',
				icon:'employee',
				title:'求职列表',
				hide:user.types=='employee',
				component:Employee
			},
			{
				path:'/msg',
				text:'消息',
				icon:'msg',
				title:'消息列表',
				component:MsgList
			},
			{
				path:'/me',
				text:'用户',
				icon:'me',
				title:'用户信息',
				component:Me
			}
		]
		const {pathname}=this.props.location
		return(<div>
			{this.navList?<NavBar className='fix-header'>{navList.find(v=>v.path===pathname).title}</NavBar>:null}
			<div className="dashboard" style={{marginTop:45}}>
				<Switch>
				{navList.map(v=>(
					<Route key={v.path} path={v.path} component={v.component}></Route>
					))}
				</Switch>
			</div>
			<NavFooter data={navList}></NavFooter>
		</div>)
	}
}
export default DashBoard