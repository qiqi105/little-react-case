import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import AvatarSelect from '../../component/avatar-select/avatar-select.js'

import {update} from '../../redux/user.redux.js'

@connect(
	state=>state.user,
	{update}
	)
class EmployeeInfo extends React.Component{
	constructor(props){
		super(props)
		this.state={
			title:'',
			desc:''
		}
	}
	onChange(key,val){
		this.setState({
			[key]:val
		})
	}
	render(){
		const path=this.props.location.pathname
		const redirectTo=this.props.redirectTo
		return<div>
		{redirectTo&&redirectTo!==path?<Redirect to={this.props.redirectTo}></Redirect>:null}
		<NavBar mode="dark">boss信息完善</NavBar>
		<AvatarSelect
		AvatarSelect={(imgname)=>{
			this.setState({
				avatar:imgname
			})
		}}
		></AvatarSelect>
		<InputItem
		onChange={(v)=>this.onChange('title',v)}>应聘职位</InputItem>
		<TextareaItem
		onChange={(v)=>this.onChange('desc',v)} rows={3} autoHeight title="个人简介"
		></TextareaItem>
		<Button 
		onClick={()=>{
			this.props.update(this.state)
		}}
		type="primary">保存</Button>
		</div>
	}
}

export default EmployeeInfo