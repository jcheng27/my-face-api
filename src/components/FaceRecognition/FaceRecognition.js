import React from 'react'
import './FaceRecognition.css';

const FaceRecognition = ( {imageUrl, boxparam}) => {
	return (
		<div className='center ma'>
		<div className='absolute mt2'>
			<img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
			<div className='bounding-box' style={{top: boxparam.topRow, right: boxparam.rightCol, bottom: boxparam.bottomRow, left: boxparam.leftCol}}></div>
			
		</div>
		</div>
	);
}

export default FaceRecognition;