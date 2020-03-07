import React, {Component} from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';
import Signin from './components/signin/Signin';
import Register from './components/register/register';


const initialState = { 
        input: '',
        imageUrl: '',
        box: {},
        route: 'signin',
        isSignedIn: false,
        user: {
                id: '',
                username: '',
                email: '',
                entries: 0,
                joined: ''

          } 
        }



const particlesOptions = {
                particles: {
                  number: {
                    value: 70,
                    density:{
                      enable: true,
                      value_area: 600
                    }
                  }
                }
              }

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data)=>{
    this.setState({user : {
            id: data.id,
            username: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined

    }})
  }

  calculateFaceBox =(data)=>{
    const box = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      leftCol: (box.left_col * width),
      rightCol: (width-(box.right_col*width)),
      topRow: box.top_row*height,
      bottomRow: (height-(box.bottom_row*height))

    }
  }

  createBox =(box)=>{
    this.setState({box: box})
  }


  onInputChange = (event)=>{
    this.setState({input: event.target.value})
  } 

  onButtonSubmit =(event)=>{
    this.setState({imageUrl: this.state.input})
    //clarifai call on server
    fetch('https://still-brook-67027.herokuapp.com/imagesurl', 
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({input: this.state.input })
        })
    .then(res => res.json())
    .then(response=>{ 
        fetch('https://still-brook-67027.herokuapp.com/images', 
        {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(this.state.user)
        }).then(res => res.json())
          .then(update =>{
            this.setState(Object.assign(this.state.user,{entries: update}))
                }).catch(err => console.log(err))

      
      this.createBox(this.calculateFaceBox(response))}   
      ).catch(err => console.log(err))
  }

  changeRoute = (route)=>{

    if(route === 'home'){
      this.setState({isSignedIn: true})
    }else{
      this.setState(initialState)
    }
    this.setState({route: route})
    
  }

  render(){
    return(
    <div className="App">
      <Particles  className='particles'
              params={particlesOptions}
              
            />

      <Navigation changeRoute={this.changeRoute} isSignedIn={this.state.isSignedIn} />
      
      
      {(this.state.route === 'signin')
      ?<Signin loadUser={this.loadUser} changeRoute={this.changeRoute} />
      :(this.state.route ==='home'?
        <div>

          
          <Logo />
          <Rank name={this.state.user.username} entries={this.state.user.entries} />
          <ImageLinkForm 
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>
        :<Register loadUser={this.loadUser} changeRoute={this.changeRoute}/>
        )}
    </div>)
  }
}

export default App;
