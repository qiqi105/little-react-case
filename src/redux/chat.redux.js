import axios from 'axios'
const USER_LIST='USER_LIST'
const initState={
	userList:[]
}
export function chatUser(state=initState,action){
	switch(action.type){
		case USER_LIST:
		return {...state,userList:action.payload} 
		default:
		return state
	}
}
//获取特定types的data数据
function userList(data){
return {type:USER_LIST,payload:data}
}
//为了加载特定的types
export function getUserList(types){
	return dispatch=>{
		axios.get('/user/list?types='+types).then(res=>{
				if(res.data.code===0){
					return dispatch(userList(res.data.data))
				}
			})
	}
}
