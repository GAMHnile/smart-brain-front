import React from 'react';

const Navigation = ({changeRoute, isSignedIn})=>{
		if(isSignedIn){
		return (
		<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
			<p onClick={()=> changeRoute('signin')} className='f3 link dim black underline pa3 pointer'>Signout</p>
		</nav>)} else{
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={()=> changeRoute('signin')} className='f3 link dim black underline pa3 pointer'>Signin</p>
				<p onClick={()=> changeRoute('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
		 	</nav>
						)}



		
		}


export default Navigation;