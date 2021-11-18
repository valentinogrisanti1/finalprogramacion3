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
            res.user.updateProfile({
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
<Drawer.Navigator>
 <Drawer.Screen name="Home" component={() => <Home />} />
 <Drawer.Screen name="Profile" component={() => <Profile logout={()=>this.logout()}/>} />
 <Drawer.Screen options={{lazy: true}} name="Post" component={(drawerProps) => <Post drawerProps={drawerProps}/>} />
</Drawer.Navigator>
                ): (
                    <Drawer.Navigator>
                    <Drawer.Screen name="Login" component={() => <Login login={(email, password)=>this.login(email, password)}/>} />
                    <Drawer.Screen name="Register" component={() => <Register register={(email, password, userName)=>this.register(email, password, userName)}/>} />
                    
                   </Drawer.Navigator>  

                )}
               
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({})


export default Menu;