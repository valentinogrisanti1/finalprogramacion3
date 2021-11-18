import React, { Component } from 'react'
import { Text, StyleSheet, View, Modal, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

 class Post extends Component {
     constructor(props){
         super(props)
         this.state = {
             likes: 0,
             liked: false,
             mostrarModal: false,
         }
     }

     componentDidMount(){
         this.recibirLikes();
     }

     recibirLikes() {
         let likes = this.props.postData.data.likes;
         if(likes) {
             this.setState({
                 liked: true,
             })
         }
     }

     liquearPost() {
         let post = db.collection("posteos").doc(this.props.postData.id);

         post.update({
             likes: firebase.firestore.fieldValue.arrayUnion(auth.currentUser.email)
         })
         .then(() => {
             this.setState({
                 likes: this.state.likes +1,
                 liked: true,
             })
             console.log('esta likeado');
         })
         .catch((error) => {
            console.error("Error updating document: ", error); 
         })
     }

     deslikearPost() {
         let post = db.collection("posteos").doc(this.props.postData.id);

         post.update({
             likes: firebase.firestore.fieldValue.arrayUnion(auth.currentUser.email)
         })
         .then(() => {
             this.setState({
                 likes: this.state.likes - 1,
                 liked: false,
             })
             console.log('delikeado');
         })
         .catch((error) => {
            console.error("Error updating document: ", error);
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

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{width: '100%', height: 250}}
                    source= {{uri: this.props.postData.data.photo}}
                />
                <Text>{this.props.postData.data.user}</Text>
                <Text>{this.props.postData.data.decription}</Text>
                <TouchableOpacity onPress={() => this.abrirModal()}>
                    <Text>LIKES: {this.state.likes}</Text>
                </TouchableOpacity>
                {
                    ! this.state.liked ?
                        <TouchableOpacity style={styles.button} 
                        onPress={() => this.liquearPost()}>
                            <Text style={styles.textButton}> lIKEAR</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.button} 
                        onPress={() => this.deslikearPost()}>
                            <Text style={styles.textButton}> DESlIKEAR</Text>
                        </TouchableOpacity>
                }

                {
                    ! this.state.mostrarModal ?
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
                                    <Text style={styles.modalText}> soy un modal</Text>
                                
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


export default Post;
