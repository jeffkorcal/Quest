import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: { 
    flex: 1,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: { 
    fontSize: 60,
    paddingBottom: 40,
    textAlign: 'center',
    fontFamily: 'Bodoni 72 Smallcaps',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white' 
  },
  searchInput: {
    height: 50,
    padding: 10,
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
    fontSize: 23,
    borderWidth: 2,
    flexDirection: 'row',
    borderColor: 'white',
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    alignSelf: 'center'
  },
  bgImage: { flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  signIn: {
    color: 'white',
    padding: 10,
    textAlign: 'center'
  },
  error: {
    color: '#ef5350',
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  }
});

class SignUpView extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      error: ''
    }
  }

  _handleSignUp() {
    let name = this.state.name.trim();
    let email = this.state.email.trim();
    let password = this.state.password.trim();

    // Firebase methods that creates the user 
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
        .then(() => {

          // Firebase method that saves the username
          let user = firebase.auth().currentUser;
          user.updateProfile({ displayName: name })
            .then(()=>{
              this._handleAuth();
            })
            .catch((error)=> {
              console.log(error);
            });

        })
        .catch((error) => {
          this.setState({ password: '', error: error.message });
      });
  }

  _handleAuth(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this._handleToMap();
      }
    });
  }

  _handleToMap() {
    this.props.navigator.resetTo({name: 'MainMapView'});
  }

  _handleToSignIn() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <Image style={ styles.bgImage } 
      source={{uri: 'https://media.giphy.com/media/IuKnqFMhtcA2A/giphy.gif'}}>
        <Text style={ styles.title }>Quest</Text>
        <TextInput 
          style={ styles.searchInput }
          value ={ this.state.name }
          onChangeText={ (name) => this.setState({name}) } 
          placeholder='name'/>
        <TextInput 
          style={ styles.searchInput }
          value ={ this.state.email }
          onChangeText={ (email) => this.setState({email}) } 
          placeholder='email'/>
        <TextInput 
          style={ styles.searchInput }
          secureTextEntry={ true }
          value ={ this.state.password }
          onChangeText={ (password) => this.setState({password}) } 
          placeholder='password'/>
        <TouchableHighlight 
          style={ styles.button }
          underlayColor='gray'
          onPress={ this._handleSignUp.bind(this) } >
          <Text style={ styles.buttonText }>Sign Up</Text>
        </TouchableHighlight>
        <TouchableHighlight 
          onPress={  this._handleToSignIn.bind(this) }>
          <Text style={ styles.signIn }>
            Already have an account? Sign in here!
          </Text>
        </TouchableHighlight> 
        <Text style={styles.error}>{this.state.error}</Text>   
      </Image>
    );
  }
}

export { SignUpView };