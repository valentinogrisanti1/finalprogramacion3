import React, { Component } from 'react'
import { Text, StyleSheet, View, Modal, Image, TouchableOpacity, FlatList, TextInput } from 'react-native'

import { auth, db } from '../firebase/config';
import firebase from 'firebase';


 class Post extends Component {
     constructor(props){
         super(props)
         this.state = {
             likes: 0,
             liked: false,
             mostrarModal: false,
             comentarios: '',
             listaComentarios: null
         }
     }

     componentDidMount(){

         if(this.props.postData.data.likes){
            this.setState({
            likes:this.props.postData.data.likes.length,
            liked: this.props.postData.data.likes.includes(auth.currentUser.email),  
        })
    } 
        if(this.props.postData.data.comentario){
            this.setState({
                listaComentarios:this.props.postData.data.comentario,
            })
        }
}
     


     liquearPost() {
         let post = db.collection("posteos").doc(this.props.postData.id);

         post.update({
             likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
         })
         .then(() => {
             this.setState({
                 likes: this.state.likes +1,
                 liked: true,
             })
             console.log('esta likeado');
         })
         .catch((error) => {
            console.error("Error subiendo el archivo: ", error); 
         })
     }

     deslikearPost() {
         let post = db.collection("posteos").doc(this.props.postData.id);

         post.update({
             likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
         })
         .then(() => {
             this.setState({
                 likes: this.state.likes - 1,
                 liked: false,
             })
             console.log('delikeado');
         })
         .catch((error) => {
            console.error("Error subiendo el archivo: ", error);
        });
     }

     abrirModal() {
         this.setState({
             mostrarModal: true,
         })
     }

     cerrarModal() {
         this.setState({
             mostrarModal: false,
         })
     }

     guardarComentario(){
        console.log ('Guardar comentario')
        let unComentario ={
            createdAt: Date.now (),
            autor: auth.currentUser.displayName,
            comentarios: this.state.comentarios
        }
        db.collection('posteos').doc(this.props.postData.id).update({
            comentario: firebase.firestore.FieldValue.arrayUnion(unComentario)
        })
        .then(()=>{
            this.setState({
                comentarios: '',
                listaComentarios: this.props.postData.data.comentario,
            })
        })
     }

     borrarPost (){
         db.collection('posteos').doc(this.props.postData.id).delete()
     }
     
     render() {

        return (
            <View style={styles.container}>
             <Text>Nombre de usuario: {this.props.postData.data.owner} </Text>  
             {this.props.postData.data.owner == auth.currentUser.displayName ?
               <TouchableOpacity onPress={() => this.borrarPost()}  style={styles.borrar}>
               <Text >Borrar post</Text>
           </TouchableOpacity> 
            : null}
                <Image
                    style={{width: '100%', height: 250, borderRadius: '10px',}}
                    source= {{uri: this.props.postData.data.photo}}
                />
                <Text>{this.props.postData.data.userName}</Text>
                <Text>{this.props.postData.data.descripcion}</Text>
                <TouchableOpacity onPress={() => this.abrirModal()}>
                    <Text style={styles.meGusta}>{this.state.likes} Me gustas</Text>
                </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>this.abrirModal()}>
                <Text>Dejar un cometario</Text>
            </TouchableOpacity>
                {
                    ! this.state.liked ?
                        <TouchableOpacity style={styles.like} 
                        onPress={() => this.liquearPost()}>
                            <Text style={styles.textButton}> LIKE</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.deslike} 
                        onPress={() => this.deslikearPost()}>
                            <Text style={styles.textButton}> DESLIKE</Text>
                        </TouchableOpacity>
                }

                { ! this.state.mostrarModal ?
                       null
                        :
                            <Modal
                                style={styles.modalContainer}
                                visible={this.state.mostrarModal}
                                animationType="slide"
                                transparent={false}
                                >

                                    <TouchableOpacity onPress= {() => this.cerrarModal()} style={styles.closeModal}>
                                        <Text>X</Text>
                                    </TouchableOpacity>
                                    
                                
                                    {
                                this.state.listaComentarios ?
                                
                                <FlatList
                                data={this.state.listaComentarios}
                                keyExtractor={(comentarios) => comentarios.createdAt.toString ()}
                                renderItem={ ({item})=> <Text> {item.autor}: {item.comentarios}</Text> }
                                /> :
                                <Text>Todavía no hay comentarios</Text>
                            }



                    <View>
                        <TextInput 
                            style={styles.textButton}
                            placeholder="Comentar"
                            keyboardType="default"
                            multiline
                            value={this.state.comentarios}
                            onChangeText={texto => this.setState({comentarios: texto})}
                            
                        />
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={()=>{this.guardarComentario()}} 
                            disabled={this.state.comentarios == '' ? true:false}>
                            <Text style={styles.textButton}>Guadar comentario</Text>
                        </TouchableOpacity>
                    </View>
                            </Modal>
                           
                }
                
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
        backgroundColor: "#fde79e",
        backgroundColor: "#",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: "#fde79e",
        borderColor: "#fde79e",
    },
    textButton: {
        color: "black",
    },
    modalContainer: {
        width:'100%',  
        flex: 3,
        alignSelf: 'center',
        backgroundColor: "white",
        borderColor: '#000000',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#000000'
    },
    closeModal:{
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: '#dc3545',
        marginTop:2,
        borderRadius: 10,
    },
    modalText:{
        fontWeight: 'bold',
        color: '#ffffff'
    },
    nombre: {
        alignSelf: 'flex-start',
    },
    borrar: {
        backgroundColor: "red",
        backgroundColor: "#",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: "red",
        borderColor: "red",
    },
    like: {
        backgroundColor: "red",
        backgroundColor: "#",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: "green",
        borderColor: "green",
    },
    deslike: {
        backgroundColor: "red",
        backgroundColor: "#",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: "orange",
        borderColor: "orange",
    },
    meGusta: {
        textAlign: "left",

    },
})


export default Post;
