import React from 'react'
import { atom, useRecoilState } from 'recoil'

const showMenuState = atom({
	key: 'showMenu',
	default: false
})

const Menu = () => {
	let [showMenu, setShowMenu] = useRecoilState(showMenuState)
	return showMenu && <h1>sup?</h1>
}

export const ToggleBtn = () => {
	let [showMenu, setShowMenu] = useRecoilState(showMenuState)
	return <button onClick={()=>setShowMenu(!showMenu)}>{showMenu ? 'hide' : 'show'}</button>
}

export default Menu