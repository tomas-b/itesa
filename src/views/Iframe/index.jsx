import React from 'react'
import Header from "../../components/Header"
import Menu from "../../components/Menu"

export default () => {
	return <>
	<Menu />
	<Header />
	<iframe
	style={{
		height: 'calc(100vh - 82px)',
		width: '100vw',
		border: 'none'
	}}
	src='/tf_pose/index.html'
	></iframe>
	</>
}