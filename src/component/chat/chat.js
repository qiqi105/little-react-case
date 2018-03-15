import React from 'react'
import {List,InputItem,NavBar,Icon,Grid} from 'antd-mobile'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg,readMsg} from '../../redux/chat/chat.redux.js'
import {getChatId} from '../../utils/user-register.utils.js'

const socket=io('ws://localhost:3002')
@connect(
	state=>state,
	{getMsgList,sendMsg,recvMsg,readMsg}
	)
class Chat extends React.Component{
	constructor(props){
		super(props)
		this.state={text:'',msg:[]}
	}
	componentDidMount(){
		if(!this.props.chat.chatmsg.length){
			this.props.getMsgList()
			this.props.recvMsg()
		}
	}
	componentWillUnmount(){
		console.log('will')
		const to=this.props.match.params.user
		this.props.readMsg(to)
	}
	fixCarousel(){
		setTimeout(function(){
			window.dispatchEvent(new Event('resize'))
		},0)
	}
	handleSubmit(){
		const from=this.props.user._id
		const to=this.props.match.params.user
		const msg=this.state.text
		this.props.sendMsg({from,to,msg})
		this.setState({
			text:'',
			showEmoji:false
		})
	}
	render(){
		const emoji='💋 👓 🕶 👔 👕 👖 👗 👘 👙 👚 👛 👜 👝 🎒 👞 👟 👠 👡 👢 👑 👒 🎩 🎓 💄 💍 🌂 ☂ 💼 💋 👓 🕶 👔 👕 👖 👗 👘 👙 👚 👛 👜 👝 🎒 👞 👟 👠 👡 👢 👑 👒 🎩 🎓 💄 💍 🌂 ☂ 💼 💋 👓 🕶 👔 👕 👖 👗 👘 👙 👚 👛 👜 👝 🎒 👞 👟 👠 👡 👢 👑 👒 🎩 🎓 💄 💍 🌂 ☂ 💼 💋 👓 🕶 👔 👕 👖 👗 👘 💋 👓 🕶 👔 👕 👖 👗 👘  💋 👓 🕶 👔 👕 👖 👗 👘'.split(" ")
			.filter(v=>v)
			.map(v=>({text:v}))
	 	const userid=this.props.match.params.user
		const Item=List.Item
		const users=this.props.chat.users
		const chatid=getChatId(userid,this.props.user._id)
		const chatmsgs=this.props.chat.chatmsg.filter(v=>v.chatid==chatid)
		if(!users[userid]){
			return null
		}
		return(<div id="chat-page">
				<div className="stick-footer">
				<NavBar 
					mode="dark"
					icon={<Icon type="left"/>}
					onLeftClick={
						()=>{
						this.props.history.goBack()	
						}
					}
				>
					{users[userid].name}
				</NavBar>
					{chatmsgs.map(v=>{
						return v.from===userid?(
						<List key={v._id}>
							<Item
							>{v.content}</Item>
						</List>
						):(
						<List key={v._id}>
							<Item
								className="chat-me"
							>{v.content}</Item>
						</List>
						)
						 
					})}
					<List>
						<InputItem
							placeholder='请输入'
							value={this.state.text}
							onChange={v=>{this.setState({text:v})}}
							extra={
								<div>
					               <span onClick={()=>{
					               	this.setState({showEmoji:!this.state.showEmoji})
					               	this.fixCarousel()
					               }} style={{marginRight:15}}>💍</span>
								   <span onClick={()=>this.handleSubmit()}>发送</span>
								</div>
							}
						>信息</InputItem>
					</List>
					{this.state.showEmoji?<Grid data={emoji}
					columnNum={12}
					carouselMaxRow={3}
					isCarousel={true}
					onClick={el=>{
							this.setState({
								text:this.state.text+el.text
							})
					}}
					/>:null}
					
				</div>
			</div>)
	}
}
export default Chat