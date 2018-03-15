import axios from 'axios'
import {getRedirectPath} from '../utils/user-register.utils.js'
const AUTH_SUCCESS='AUTH_SUCCESS'
const ERROR_MSG='ERROR_MSG'
//将信息存储在state中
const LOAD_DATA='LOAD_DATA'
//退出登录
const LOGINOUT='LOGINOUT'
//reducer
const initState={
	redirectTo:'',
	msg:'',
	user:'',
	types:'',
	avatar:''
}

export function user(state=initState,action){
	switch(action.type){
		case AUTH_SUCCESS:
		return {...state,msg:'',redirectTo:getRedirectPath(action.payload),...action.payload}
		case LOAD_DATA:
		return {...state,...action.payload}
		case ERROR_MSG:
		return {...state,msg:action.msg}
		case LOGINOUT:
		return {...initState,redirectTo:'/login'}
		default:
		return state
	}
	
}

export function update(data){
	return dispatch=>{
		axios.post('/user/update',data).then(res=>{
			if(res.status===200&&res.data.code===0){
				dispatch(auth_success(res.data.data))
			}else{
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function auth_success(obj){
	//过滤redux中的pwd
	const {pwd,...data}=obj
return {type:AUTH_SUCCESS,payload:obj}

}
export function login_out_submit(){
	return {type:LOGINOUT}
}

export function load_data(userinfo){
return {type:LOAD_DATA,payload:userinfo}
}
function errorMsg(msg){
	return {msg,type:ERROR_MSG}
}
export function login({user,pwd}){
	if(!user||!pwd){
			return errorMsg('用户名密码必须输入');
		}
	return dispatch=>{
		axios.post('/user/login',{user,pwd}).then(res=>{
			if(res.status===200&&res.data.code===0){
				dispatch(auth_success({user,pwd}))
			}else{
				dispatch(errorMsg(res.data.msg))
			}
		});	
	}	
}
export function register({user,pwd,repeatpwd,types}){
	if(!user||!pwd||!types){
		return errorMsg('用户名密码必须输入');
	}
	if(pwd!==repeatpwd){
		return errorMsg('两次密码输入必须一致');
	}
	return dispatch=>{
		axios.post('/user/register',{user,pwd,types}).then(res=>{
			if(res.status===200&&res.data.code===0){
				dispatch(auth_success({user,pwd,types}))
			}else{
				dispatch(errorMsg(res.data.msg))
			}
		});	
	}	
}
