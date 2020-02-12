import React from 'react';

const Navigation = (props) => {
	if (props.isSignedIn) {
	return (
		<nav style={{display: 'flex', justifyContent:'flex-end'}}>
			<p onClick={ () => {props.handleRouteChange('signout')} }
				className='f3 link dim black underline pa3 pointer'>Sign Out</p>
		</nav>);
	}
	else {
	return (
		<nav style={{display: 'flex', justifyContent:'flex-end'}}>
			<p onClick={ () => props.handleRouteChange('signin') }
				className='f3 link dim black underline pa3 pointer'>Sign In</p>
			<p onClick={ () => {props.handleRouteChange('register')} }
				className='f3 link dim black underline pa3 pointer'>Register</p>
		</nav>);
	}
}


export default Navigation;