import React from 'react'
import {Grid,List} from 'antd-mobile'
import PropTypes from 'prop-types'
class AvatarSelect extends React.Component{
	static propTypes={
		AvatarSelect:PropTypes.func.isRequired
	}
	constructor(props){
		super(props)
		this.state={}
	}
		render(){
		const avatarList='avatar1,avatar2,avatar3,avatar4,avatar5,avatar6,avatar7,avatar8,avatar9,avatar10,avatar11,avatar12'.split(',')
			.map(v=>({
				icon:require(`../../images/avatar-select/${v}.svg`),
				text:v
			}))
		const gridHeader=this.state.icon?(<div>
						 <span>已选择头像</span>
						 <img style={{width:20}} src={this.state.icon} alt="test"/>
						 </div>)
						 :<div>请选择头像</div>	
		return<div>
			<List renderHeader={()=>gridHeader}>
				<Grid 
				data={avatarList} columnNum={5}
				onClick={ele=>{
					this.setState(ele)
					this.props.AvatarSelect(ele.text)
				}}
				/>
			</List>
		</div>
	}
} 

export default AvatarSelect