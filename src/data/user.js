const utility=require('utility')
const express=require('express')
const Router=express.Router()
const model=require('./database/model.js')
const User=model.getModel('user')
const Chat=model.getModel('chat')
//隐藏密码，不显示在浏览器中
const _filter={'pwd':0,'__v':0}
//清空聊天数据
// Chat.remove({},function(){

// });
Router.get('/list',function(req,res){
	const {types}=req.query
	User.find({types},function(err,doc){
		return res.json({code:0,data:doc})
	})
})

Router.get('/getmsglist',function(req,res){
	const user=req.cookies.userid
	User.find({},function(err,userdoc){
		let users={}
		userdoc.forEach(v=>{
			users[v._id]={name:v.user,avatar:v.avatar}
		})
		//'$or':[{from:user},{to:user}]
		Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
			if(!err){
				return res.json({code:0,msgs:doc,users:users})
			}
		})
	})
})


Router.get('/info',function(req,res){
	const {userid}=req.cookies
	if(!userid){
		return res.json({code:1})
	}
	User.findOne({_id:userid},_filter,function(err,doc){
		if(err){
				return res.json({code:1,msg:'后端出现错误'})
			}
			return res.json({code:0,data:doc})
	})
})
Router.post('/readMsg',function(req,res){
	const userid=req.cookies.userid
	const {from}=req.body
	console.log(userid,from)
	Chat.update(
		{from,to:userid},
		{'$set':{read:true}},
		{'multi':true},
		function(err,doc){
		console.log(doc)
		if(!err){
			return res.json({code:0,num:doc.nModified})
		}
		return res.json({code:1,msg:'修改失败'})
	})
})
Router.post('/login',function(req,res){
	const {user,pwd}=req.body
	User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){
		if(!doc){
			return res.json({code:1,msg:'用户名或者密码错误'})
		}
			res.cookie('userid',doc._id)
			return res.json({code:0,data:doc})
	})
})
Router.post('/register',function(req,res){
	const {user,pwd,types}=req.body
	User.findOne({user},function(err,doc){
		if(doc){
			return res.json({code:1,msg:'用户名重复'})
		}
		const userModel=new User({user,pwd:md5Pwd(pwd),types})
		userModel.save(function(err,data){
			if(err){
				return res.json({code:1,msg:'后端出现错误'})
			}
			const {user,types,_id}=data
			res.cookie('userid',_id)
			return res.json({code:0,data:{user,types,_id}})
		})
	})
})

Router.post('/update',function(req,res){
	const userid=req.cookies.userid
	if(!userid){
		return json.dumps({code:1})
	}
	const body=req.body
	User.findByIdAndUpdate(userid,body,function(err,doc){
		const data=Object.assign({},{
			user:doc.user,
			types:doc.types
		},body)	
		return res.json({code:0,data})
	})

})
 function md5Pwd(pwd){
	return utility.md5(utility.md5(pwd+'dc26395^&*$%#0321709gfui3t0982%$&#@!%@'))
}
module.exports=Router