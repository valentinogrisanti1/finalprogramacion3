import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Post from '../screens/crearPost'
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Profile from '../screens/Profile';
import { auth } from '../firebase/config';
import Icon  from 'react-native-vector-icons/FontAwesome';
import Buscador from '../screens/Buscador';

 
const Drawer = createMaterialTopTabNavigator();

class Menu extends Component {  

    constructor(props) {
        super(props);
            this.state = {
                errorMessage:'',
                errorCode:'',
                logueado: false,
                user: '',
            }
    }
componentDidMount(){
    auth.onAuthStateChanged(usuario =>{
        if (usuario){
            this.setState({
                logueado: true,
                user: usuario
            })
        }
    })
}
register(email, password, userName){
        auth.createUserWithEmailAndPassword(email, password)
        .then( res => {
            auth.currentUser.updateProfile({
                displayName: userName
            })
        })
        .then( () => {
            console.log('Registrado');
        })
        .catch( error => {
            console.log(error);
            this.setState({
                errorMessage: error.message,
                errorCode: error.code
            })
        })
}
login (email, password){
    auth.signInWithEmailAndPassword (email, password)
    .then(respuesta => {
        this.setState({
            logueado: true,
            user: respuesta.user
        })
    })
    .catch( error => {
        console.log(error);
        this.setState({
            errorMessage: error.message,
            errorCode: error.code
        })
    })
}
logout (){
    auth.signOut ()
    .then(()=>{
        this.setState({
            user: '',
            logueado: false
        })
    })
}


    render() {
        return (
            
            <NavigationContainer>
                {this.state.logueado ?(
        <Drawer.Navigator screenOptions={({route}) => ({
            tabBarIcon: ({color}) => screenOptions(route, color),
          })}>
            <Drawer.Screen name="Home" component={() => <Home />} />
            <Drawer.Screen name="Buscador" options={{ headerShown: false }} component={() => <Buscador />} />
            <Drawer.Screen options={{lazy: true}} name="Post" component={(drawerProps) => <Post drawerProps={drawerProps}/>} />
            <Drawer.Screen name="Profile" component={() => <Profile logout={()=>this.logout()}/>} />
            
            
</Drawer.Navigator>
                ): (
                    <Drawer.Navigator >
                    <Drawer.Screen name="Login" component={() => <Login login={(email, password)=>this.login(email, password)} error={this.state.errorMessage}/>} />
                    <Drawer.Screen name="Register" component={() => <Register register={(email, password, userName)=>this.register(email, password, userName)} error={this.state.errorMessage}/>} />
                    
                   </Drawer.Navigator>  

                )}
               
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({})
const screenOptions = (route, color) => {
    let iconName;
  
    switch (route.name) {
      case 'Home':
        iconName = 'home';
        break;
      case 'Profile':
        iconName = 'user-circle';
        break;
      case 'Post':
        iconName = 'plus';
        break;
        case 'Login':
        iconName = 'login';
        case 'Register':
        iconName = 'register';
        break;
        case 'Buscador':
            iconName = 'search';
            break;
        break;
      default:
        break;
    }
  
    return <Icon name={iconName} color={color} size={24} />;
  };

export default Menu;