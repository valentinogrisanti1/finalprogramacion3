import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { auth, db } from '../firebase/config';

export default class crearPost extends Component {
    constructor(props) {
        super(props);
            this.state = {
               foto: '',
               comentario: '',
               mostrarCamara: true,
               descripcion: '',
            }
    }

agregarPost(){
    db.collection('posteos').add({
        owner: auth.currentUser.email,
        descripcion: this.state.descripcion,
        createdAt: Date.now()
    }).then(()=>{
        console.log('creado')
        this.setState({
            descripcion: ''
        })
        this.props.drawerProps.navigation.navigate('Home')
    })
}
    render() {
        return (
            <View>
                <TextInput style={styles.lugar}
                       onChangeText={(text) => this.setState({ descripcion: text })}
                       placeholder="descripcion"
                       keyboardType="default"
                       multiline={true}
                       numberOfLines={4}
                       value= {this.state.descripcion}
                    />
                    <TouchableOpacity  
                    style={styles.button}  
                    onPress={() => this.agregarPost()}>
                        <Text style= {styles.textButton}> Agregar Post</Text>
                    </TouchableOpacity>
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
