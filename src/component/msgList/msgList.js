import React from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'
@connect(
	state=>state
	)
class MsgList extends React.Component{
	constructor(props){
		super(props)
	}
	componentDidMount(){
	}
	getLastMes(arr){
		return arr[arr.length-1]
	}
	render(){
		const msgGroup={}
		this.props.chat.chatmsg.forEach(v=>{
			msgGroup[v.chatid]=msgGroup[v.chatid]||[]
			msgGroup[v.chatid].push(v)
		})
		const chatList=Object.values(msgGroup).sort((a,b)=>{
			const a_last=this.getLastMes(a).create_time
			const b_last=this.getLastMes(b).create_time
			return a_last - b_last
		})
		const Item=List.Item
		const Brief=Item.Brief
		const userid=this.props.user._id
		return(
			<div>
				{
					chatList.map(v=>{
					const lastMes=this.getLastMes(v)
					const targetId=v[0].from==userid?v[0].to:v[0].from
					const unreadNum=v.filter(v=>!v.read&&v.to==userid).length
					const name=this.props.chat.users[targetId]?this.props.chat.users[targetId].name:null
					return(
						<List
							key={lastMes._id}
						>
								<Item
									extra={<Badge text={unreadNum}></Badge>}
									arrow="horizontal"
									onClick={
										()=>{
											this.props.history.push(`/chat/${targetId}`)
										}
									}
								>
								{lastMes.content}
									<Brief>{name}</Brief>
								</Item>
						</List>
						)

						})
				}
			</div>
			)
	}
}
export default MsgList