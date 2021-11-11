import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';



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
            }
    }
    register(email, password){
        auth.createUserWithEmailAndPassword(email, password)
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

    render() {
        return (
            
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name="Home" component={() => <Home />} />
                    <Drawer.Screen name="Login" component={() => <Login  />} />
                    <Drawer.Screen name="Register" component={() => <Register  />} />
                    <Drawer.Screen name="Profile" component={() => <Profile />} />
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({})


export default Menu;