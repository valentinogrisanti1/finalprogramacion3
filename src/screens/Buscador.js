import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList , TextInput, TouchableOpacity} from 'react-native'
import { db } from '../firebase/config';
import Post from '../components/Post';


class Buscador extends Component {
    constructor(props){
        super(props);
        this.state ={
          posteosUsuario:{},
          buscar:'', 
          cargando: true,
        }
      }

      onSubmit(){
          db.collection('posteos').where('owner', '==', this.state.buscar).onSnapshot(
              docs => {
                  let posteos = [];
                  docs.forEach((doc) =>{
                      posteos.push({
                        id: doc.id,
                        data: doc.data (),
                         
                      })
                  })
                  this.setState({
                      posteosUsuario: posteos,
                      cargando: false,
                  })
              }
          )
      }
    render() {
        console.log(this.state.posteosUsuario)
        return (
        <React.Fragment>
            <Text style={styles.textButton}>Buscador</Text>
            <View style={styles.container}>
                <TextInput
                placeholder='Buscar...'
                keyboardType='default'
                onChangeText={text => this.setState({ buscar: text})}
                value= {this.state.buscar}
                />
                <TouchableOpacity  style={styles.button} onPress={()=> this.onSubmit()}
                disabled={this.state.buscar == '' ? true:false}>
                    <Text >Buscar</Text>
                </TouchableOpacity>
            </View>
            <React.Fragment>
            {this.state.posteosUsuario.length !== 0 
            ?
            <FlatList
                data={this.state.posteosUsuario}
                keyExtractor={posteo => posteo.id}
                renderItem={({item}) => <Post  postData={item} />} />
            :
            <Text>No hay resultados</Text>
            }
            </React.Fragment>
        </React.Fragment>
            
            
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
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: "#fde79e",
        borderColor: "#fde79e",
        marginVertical: 10,
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

export default Buscador;
