import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native'

 class Login extends Component {
    render() {
        return (
            <View>        
               <Image
                 style={styles.imagen} 
                 source={require('../../assets/logoTexto.png')}
                 resizeMode='center'
                />
               <View style={styles.contenedor}>
                    <TextInput style={styles.lugar}
                        onChangeText={text => this.setState({ email: text })}
                        placeholder= 'email'
                        keyboardType= 'email-address'
                    />
                <TextInput style={styles.lugar}
                       onChangeText={(text) => this.setState({ password: text })}
                       placeholder="password"
                       keyboardType="email-address"
                       secureTextEntry={true}
                    />
                    <TouchableOpacity  
                    style={styles.button}

                    >
                        <Text style= {styles.textButton} >REGISTRAR</Text>
                    </TouchableOpacity>
                </View>      
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contenedor: {
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 20, 
    },

    lugar: {   
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        width: '100%',
        margin: 5,
    },
    button: {
        backgroundColor: "#fde79e",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#fde79e",
      },
      textButton: {
        color: "black",
      },
      imagen: {
        height:250,
        borderRadius: 15,  
      },
})

export default Login;