import React from 'react'
import { atom, useRecoilState } from 'recoil'
import S from './styles.module.css'

const showMenuState = atom({
	key: 'showMenu',
	default: false
})

const Menu = () => {
	let [showMenu, setShowMenu] = useRecoilState(showMenuState)
	return showMenu && (
	<div className={S.menu_container}>
		<h1>Menu</h1>
		<ToggleBtn/>		
	</div>)
}

export const ToggleBtn = () => {
	let [showMenu, setShowMenu] = useRecoilState(showMenuState)
	return <button onClick={()=>setShowMenu(!showMenu)}>{showMenu ? 'hide' : 'show'}</button>
}

export default Menu