import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from'react-router-dom'
import {connect} from 'react-redux'
@withRouter
@connect(state=>state.chat)
class NavFooter extends React.Component{
	static propTypes={
		data:PropTypes.array.isRequired
	}
	render(){
		const navList=this.props.data.filter(v=>!v.hide)
		const {pathname}=this.props.location
		return<TabBar>
			{navList.map(v=>(
				<TabBar.Item
				badge={v.path=="/msg"?this.props.unread:0}
				key={v.path}
				title={v.text}
				icon={{uri:require(`../../images/icon/${v.icon}.svg`)}}
				selectedIcon={{uri:require(`../../images/icon/${v.icon}-active.svg`)}}
				selected={pathname===v.path}
				onPress={()=>{
					this.props.history.push(v.path)
				}}
				>
				</TabBar.Item>
				))}
			</TabBar>
	}
}
export default NavFooter