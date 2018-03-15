//合并所有的reducer，并且返回
import {combineReducers} from 'redux'
import {chatUser} from './chat.redux.js'
import {chat} from './chat/chat.redux.js'
import {user} from './user.redux.js'
export default combineReducers({chatUser,user,chat})