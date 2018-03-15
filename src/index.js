import React from 'react'
import ReactDom from 'react-dom' 
import {createStore,applyMiddleware,compose} from 'redux'
//处理异步结果
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter,Route,Switch} from 'react-router-dom'

//状态管理
import reducers from './redux/reducers.js'
//模块
import Login from './containers/login/login.js'
import Register from './containers/register/register.js'
import AuthRoute from './component/authroute/authroute.js'
import BossInfo from './containers/bossinfo/bossinfo.js'
import EmployeeInfo from './containers/employeeinfo/employeeinfo.js'
import DashBoard from './component/dashboard/dashboard.js'
import Chat from './component/chat/chat.js'
//style
import './index.css'

const store=createStore(reducers,compose(applyMiddleware(thunk)))

ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
				<AuthRoute></AuthRoute>
				<Switch>
					<Route path="/bossinfo" component={BossInfo}></Route>
					<Route path="/employeeinfo" component={EmployeeInfo}></Route>
					<Route path="/login" component={Login}></Route>
					<Route path="/chat/:user" component={Chat}></Route>
					<Route path="/register" component={Register}></Route>
					<Route component={DashBoard}></Route>
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>
		),
	document.getElementById('root')
	)