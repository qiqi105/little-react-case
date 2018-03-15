import React from 'react'
import browserCookie from 'browser-cookies'
import {Result,List,WhiteSpace,Modal} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login_out_submit} from '../../redux/user.redux.js'
@connect(
	state=>state.user,
	{login_out_submit}
	)
class Me extends React.Component{
	constructor(props){
		super(props);
		this.logoutClick=this.logoutClick.bind(this);
	}
	 logoutClick(){
	 	const alert=Modal.alert
	 	alert('注销','确认退出登录吗？',[{
	 		'text':'取消',onPress:()=>console.log('cancel')},{
	 		'text':'确认',onPress:()=>{
				browserCookie.erase('userid')
				this.props.login_out_submit()
				//刷新当前页面
				//window.location.href=window.location.href
	 			}}
	 		])
	}
	render(){
		const props=this.props
		const Item=List.Item
		const Brief=Item.Brief
		return props.user?(<div>
			<Result 
			img={<img style={{width:50}} src={require(`../../images/avatar-select/avatar1.svg`)} alt="1"/>}
			title={props.user}
			message={props.types==='boss'?props.company:null}
			></Result>
			<List renderHeader={()=>'简介'}>
				<Item>
					{props.title}
					{props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
					{props.money?<Brief key={this.props.money}>薪资：{props.money}</Brief>:null}
				</Item>
			</List>
			<WhiteSpace></WhiteSpace>
			<List>
				<Item onClick={this.logoutClick}>退出登陆</Item>
			</List>
			</div>):<Redirect to={this.props.redirectTo}/>
	}
}

export default Me