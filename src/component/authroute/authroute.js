import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {load_data} from '../../redux/user.redux.js'
@withRouter
@connect(
	null,
	{load_data}
	)
class AuthRoute extends React.Component{
	componentDidMount(){
		const publicList=['/login','register']
		const pathname=this.props.location.pathname
		//console.log(pathname)
		if(publicList.indexOf(pathname)>-1){
			return null
		}
		axios.get('/user/info').then(res=>{
			if(res.status===200){
				if(res.data.code===0){
					this.props.load_data(res.data.data)
					//console.log(res.data.data)
				}else{
					this.props.history.push('/login')
				}
			}
		})
		//console.log(this.props)
	}
	render(){
		return <h1>11</h1>
	}
}
export default AuthRoute