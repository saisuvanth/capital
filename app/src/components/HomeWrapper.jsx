import React, { Fragment } from 'react'
import Modal from './Modal'
import Navbar from './Navbar'

const HomeWrapper = ({ children }) => {
	return (
		<Fragment>
			<Navbar />
			<Modal />
			{children}
		</Fragment>
	)
}

export default HomeWrapper