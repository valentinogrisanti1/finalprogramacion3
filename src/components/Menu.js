import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
 
const Drawer = createDrawerNavigator();

class Menu extends Component {
    render() {
        return (
            
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name="Home" component={() => <Home />} />
                    {/* <Drawer.Screen name="Login" component={() => <Login />} />
                    <Drawer.Screen name="Register" component={() => <Register />} /> */}
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({})


export default Menu;