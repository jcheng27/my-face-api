import React from 'react';

//const Register = (props) => {

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      regEmail: '',
      regPassword: '',
      regName:''
    }
  }

  handleEmailChange = (event) => {
    this.setState({regEmail: event.target.value});
  }

  handlePasswordChange = (event) => {
    this.setState({regPassword: event.target.value});
  }

  handleNameChange = (event) => {
  	this.setState({regName: event.target.value});
  }

  onSubmitSignIn = () => {
    console.log('this.state:', this.state);
    fetch('http://localhost:1234/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.regEmail,
        password: this.state.regPassword,
        name: this.state.regName
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          console.log('user:',user);
          this.props.loadUser(user);
          this.props.handleRouteChange('home');
        }
      })
  }

	render() {
		return (
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f3 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input 
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="text" 
				        	name="name"  
				        	id="name"
				        	onChange={this.handleNameChange} />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="email" 
				        	name="email-address" 
				        	id="email-address"
				        	onChange={this.handleEmailChange} />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
				        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="password" 
				        	name="password" 
				        	id="password"
				        	onChange={this.handlePasswordChange} />
				      </div>
				      
				    </fieldset>
				    <div className="">
				      <input
				      		onClick={this.onSubmitSignIn}
					      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
					      	type="submit" 
					      	value="Register" />
				    </div>

				  </div>
				</main>
			</article>
		);
	}
}

export default Register;