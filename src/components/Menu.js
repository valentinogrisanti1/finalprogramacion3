import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';



import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
 
const Drawer = createMaterialTopTabNavigator();

class Menu extends Component {  

    constructor(props) {
        super(props);
            this.state = {

            }
    }


    render() {
        return (
            
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name="Home" component={() => <Home />} />
                    <Drawer.Screen name="Login" component={() => <Login />} />
                    <Drawer.Screen name="Register" component={() => <Register />} />
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({})


export default Menu;