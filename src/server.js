const express =require('express')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const userRouter=require('./data/user.js')
const model=require('./data/database/model.js')
const Chat=model.getModel('chat')
//work with express
const app=express()

const server=require('http').Server(app)
const io=require('socket.io')(server)
io.on('connection',function(socket){
	socket.on('sendmsg',function(data){
		const {from,to,msg}=data
		const chatid=[from,to].sort().join('_')
		Chat.create({chatid,from,to,content:msg},function(err,doc){
			io.emit('recvmsg',Object.assign({},doc._doc))
		})
		
	})
})
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)

server.listen(3002)