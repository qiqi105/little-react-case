import React from 'react'
import logoImg from './logo.svg'
import './logo.css'
class Logo extends React.Component{
	render(){
		return <div className="logo-header">
					<img src={logoImg} alt="logo"/>
				</div>
	}
}
export default Logo