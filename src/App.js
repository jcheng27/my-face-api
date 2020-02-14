import React, {Component} from 'react';
import Clarifai from 'clarifai';
import logo from './logo.svg';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';

import './App.css';

/* 
npm install clarifai
https://docs.clarifai.com/api-guide/public-models 
https://www.clarifai.com/models
https://www.clarifai.com/models/face-detection-image-recognition-model-a403429f2ddf4b49b307e318f00e528b-detection#documentation
https://docs.clarifai.com/getting-started/getting-started/clients
*/

const app = new Clarifai.App({
 apiKey: 'e228f330f1df4bad9c6c1b7bc70f578a'
});

const particlesOptions = {
            particles: {
              number: {
                value: 90,
                density: {
                  enable: true,
                  value_area: 800
                }
              }
            }
          }

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

/* Note:
https://daveceddia.com/unexpected-token-in-json-at-position-0/
res.send('text') use response.text()
res.send(database.users) use response.json()

app.get('/', (req,res)=> {
  res.send('this is working');
  res.send(database.users);
})
*/

componentDidMount() {
	fetch('http://localhost:1234/')
		.then(response => response.json())
		.then(data => console.log(data))
}

calculateFaceLocation = (apidata) => {
  const clarifaiFace = apidata.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  //returning an array
  return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    };
}

drawFaceBox = (boxpoints) => {
  console.log('Draw Face Box',boxpoints);
  this.setState({box: boxpoints});

}

handleInputChange = (event) => {
  this.setState({input:event.target.value});

  console.log('Link you typed is:', event.target.value);
}

handleRouteChange = (whichroute) => {
  if (whichroute === 'signout') {
    this.setState({isSignedIn: false})
  }
  else if (whichroute === 'home') {
    this.setState({isSignedIn: true})
  }

  this.setState({route: whichroute});
}

handleButtonSubmit = (event) => {

  this.setState({imageUrl: this.state.input});
  console.log('IMG URL is:', this.state.input);

  app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
  .then( response => {
        if (response) {
          fetch('http://localhost:1234/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
  .then(response => response.text())
  .then(count => {
    //.this.setState(this.setState({user:{entries: count}}))
    this.setState(Object.assign(this.state.user, { entries: count}))
  })

        }
      console.log('Response is', response.outputs[0].data.regions[0].region_info.bounding_box);
      return this.calculateFaceLocation(response);}
    )
  .then ( response1 => this.drawFaceBox(response1) )
  .catch (err => console.log(err) );
  
  console.log('click');
}

loadUser = (userdata) => {
  this.setState ( {user: {
      id: userdata.id,
      name: userdata.name,
      email: userdata.email,
      entries: userdata.entries,
      joined: userdata.joined   
      }
    }
  )
}

  render() {
    return (
      <div className="App">

          <Particles className='particles'
            params={particlesOptions} />

        <Navigation isSignedIn={this.state.isSignedIn} handleRouteChange={this.handleRouteChange} />

        {this.state.route === 'home' ? 
          <div>
              <Logo />
            {/*Rank displayname={this.state.user.name} displayentries={this.state.user.entries} />*/}
              <Rank displayname={this.state.user.name} displayentries={this.state.user.entries} />
              <ImageLinkForm 
                  handleInputChange={this.handleInputChange} 
                  handleButtonSubmit={this.handleButtonSubmit} />
              <FaceRecognition imageUrl={this.state.imageUrl} boxparam={this.state.box}/>
          </div>
        : (
            this.state.route === 'register' 
            //Need to pass in loadUser, or else the register and function can't do anything
            ? <Register loadUser={this.loadUser} handleRouteChange={this.handleRouteChange} />
            : <SignIn loadUser={this.loadUser} handleRouteChange={this.handleRouteChange} />
          )


        }

      </div>
    );
  }
}

export default App;
