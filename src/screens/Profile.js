import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, FlatList} from 'react-native'
import { auth, db } from '../firebase/config';
import Post from '../components/Post'

 class Profile extends Component {
    constructor(props) {
        super(props);
            this.state = {
            posts: []    
            }
    }
    componentDidMount(){
        db.collection('posteos')
        .where('owner','==', auth.currentUser.displayName)
        .onSnapshot((docs) => {
            let posteos = []
            docs.forEach((doc) => {
                posteos.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                posts: posteos,
            })
        })
    }
    render() {
        console.log(auth.currentUser)
        return (
          
            <View>
                <Text style={styles.infoLogin}> ESTE ES TU PERFIL! </Text>
                <Text style={styles.infoLogin}>Bienvenido {auth.currentUser.displayName}</Text>
                <Text style={styles.infoLogin}>Email: {auth.currentUser.email}</Text>
                <Text style={styles.infoLogin}>Tu usuario fue creado el: {auth.currentUser.metadata.creationTime}</Text>
                <Text style={styles.infoLogin}>La ultima vez que te logueaste a GRUMIT: {auth.currentUser.metadata.lastSignInTime}</Text>
                <Text style={styles.infoLogin}>Cantidad de posteos: {this.state.posts.length}</Text>
                <TouchableOpacity style={styles.button} onPress={()=>this.props.logout()}>
                    <Text>CEERRAR SESION </Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(post) => post.id}
                    renderItem={({item}) => <Post postData={item}/>}
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
      infoLogin:{
        fontSize: 16,
        fontWeight: `bold`,
        textAlign: `center`,
        marginBottom: 10,
        marginTop: 10,
      },
})

export default Profile;