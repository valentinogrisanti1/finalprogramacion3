import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

class CommentForm extends Component {
    constructor() {
        super()
    
        this.state = {
             comentario: ''
        }
    }
    enviarComentario(){
        console.log (`Comentario: ${this.state.comentario}`);
    }
render(){
    return(
    <View style={styles.formContariner} >
        <Text> Comentarios </Text>
        <TextInput
            style={styles.multilineInput}
            onChangeText={(texto)=>this.setState({comentario:texto})}
            placeholder="Comentar"
            keyboardType="default"
            />
        <TouchableOpacity style={styles.button} onPress={()=> this.enviarComentario()}>
            <Text style={styles.textButton}> Enviar</Text>
        </TouchableOpacity>
    </View>
    )
}


}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        shadowColor: "#ccc",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: "#28a745",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#28a745",
    },
    textButton: {
        color: "#fff",
    },
    modalContainer: {
        width:'100%',  
        flex: 3,
        alignSelf: 'center',
        backgroundColor: "white",
        borderColor: '#000000',
        borderRadius: 6,
        padding: 10,
        backgroundColor: '#000000'
    },
    closeModal:{
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: '#dc3545',
        marginTop:2,
        borderRadius: 4,
    },
    modalText:{
        fontWeight: 'bold',
        color: '#ffffff'
    },
})

export default CommentForm;





