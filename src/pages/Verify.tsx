import React from 'react'
import Navbar from '@/components/Navbar'
import Code from '@/components/VerifyCode'

export function Deployer() {
	return (
		<div className='min-h-[100vh] bg-black'>
			<Navbar />
			<Code />
		</div>
	)
}

export default Deployer
