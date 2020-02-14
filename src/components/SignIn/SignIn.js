import React from 'react';

class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  handleEmailChange = (event) => {
    this.setState({signInEmail: event.target.value});
  }

  handlePasswordChange = (event) => {
    this.setState({signInPassword: event.target.value});
  }

  onSubmitSignIn = () => {
    console.log('this.state:', this.state);

    fetch('http://localhost:1234/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      // .then(data => {
      //   if (data === 'success') {
      //     console.log('data:',data);
      //     this.props.handleRouteChange('home');
      //   }

      //Need to load the user on sign-in or else you can't do anything with Rank
      .then(user => {
        if (user.id) {
          this.props.loadUser(user)
          this.props.handleRouteChange('home');
        }
      })
  }


  render() {

  //const { handleRouteChange } = this.props; to save time

  return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        {/*
        Need DIV because form screws it up
        <form className="measure"> */} 
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f3 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" 
                onChange={this.handleEmailChange}
               />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"
                onChange={this.handlePasswordChange}
               />
            </div>
            <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
          </fieldset>
          <div className="">
            <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Sign in" />
          </div>
          <div className="lh-copy mt3">
            <p onClick={ () => {this.props.handleRouteChange('register')} } 
               className="f6 link dim black db pointer">Register</p>
            <a href="#0" className="f6 link dim black db">Forgot your password?</a>
          </div>
        {/*Need DIV because FORM screws it up*/}
        </div>
      </main>
    </article>
  );
  }
  
}

export default SignIn;