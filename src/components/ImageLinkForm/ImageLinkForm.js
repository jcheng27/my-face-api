import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = (props) => {

	return (
		<div>
			<p className='f3'>{'API will recognize person'}</p>
			<div className='center'>
				<div className='form pa4 br3 shadow-5'>
					<input className='f4 pa2 w-70 centre' type='tex' 
						onChange={props.handleInputChange}/>
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
						onClick={props.handleButtonSubmit}>Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;