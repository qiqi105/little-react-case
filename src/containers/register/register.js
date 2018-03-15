import React from 'react'
import Logo from '../logo/logo.js'
import {connect} from 'react-redux'
import {List,InputItem,WingBlank,Button,Radio} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import login_form from '../../component/High-order components/login-form/login-form.js'
import {register} from '../../redux/user.redux.js'
import './register.css'
@connect(
state=>state.user,
{register}
)
@login_form
class Register extends React.Component{
	constructor(props){
		super(props)
		this.handleRegister=this.handleRegister.bind(this)
	}
	componentDidMount(){
		this.props.handleChange('types','boss')
	}
	handleRegister(){
		this.props.register(this.props.state);
	}
	render(){
		const RadioItem=Radio.RadioItem
		return <div>
		{this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
					<Logo/>
					<WingBlank>
						<List>
						{this.props.msg?<p className="error_msg">{this.props.msg}</p>:null}
							<InputItem
							onChange={v=>this.props.handleChange('user',v)}
							>user</InputItem>
							<InputItem
							onChange={v=>this.props.handleChange('pwd',v)}
							type="password"
							>password</InputItem>
							<InputItem
							onChange={v=>this.props.handleChange('repeatpwd',v)}
							type="password"
							>confirm</InputItem>
							<RadioItem checked={this.props.state.types==="boss"}
							onChange={()=>this.props.handleChange('types','boss')}
							>
							BOSS
							</RadioItem>
							<RadioItem checked={this.props.state.types==="employee"}
							onChange={()=>this.props.handleChange('types','employee')}>
							Employee
							</RadioItem>
						</List>
						<Button type="primary" onClick={this.handleRegister}>register</Button>
					</WingBlank>
				</div>
	}
}

export default Register