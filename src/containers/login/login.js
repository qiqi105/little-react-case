import React from 'react'
import Logo from '../logo/logo.js'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux.js'
import login_form from '../../component/High-order components/login-form/login-form.js'
@connect(
	state=>state.user,
	{login}
	)
@login_form
class Login extends React.Component{
	constructor(props){
		super(props);
		this.register=this.register.bind(this);
		this.handleLogin=this.handleLogin.bind(this);
		
	}
	handleLogin(){
		this.props.login(this.props.state)
	}
	register(){
		this.props.history.push('/register');
	}
	render(){
		return <div>
		{(this.props.redirectTo&&this.props.redirectTo!='/login')?<Redirect to={this.props.redirectTo}/>:null}
				<p>{this.props.user}</p>
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
						</List>
						<WhiteSpace></WhiteSpace>
						<Button type="primary" onClick={this.handleLogin}>login</Button>
						<WhiteSpace></WhiteSpace>
						<Button type="primary" onClick={this.register}>register</Button>
					</WingBlank>

				</div>
	}
}

export default Login