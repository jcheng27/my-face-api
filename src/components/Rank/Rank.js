import React from 'react';

const Rank = (props) => {
	return (
		<div>
			<div className='white f3'>
				<p>{`${props.displayname}, your current rank is`}</p>
			</div>
			<div className='white f1'>
				<p>{props.displayentries}</p>
			</div>
		</div>
	);
}

export default Rank;