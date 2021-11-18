import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity} from 'react-native'
import { auth } from '../firebase/config';

 class Profile extends Component {
    constructor(props) {
        super(props);
            this.state = {
                
            }
    }
    render() {
        return (
            <View>
                <Text style={styles.infoLogin}> ESTE ES TU PERFIL! </Text>
                <Text style={styles.infoLogin}>Bienvenido: {auth.currentUser.email}</Text>
                <Text style={styles.infoLogin}>Tu usuario fue creado el: {auth.currentUser.metadata.creationTime}</Text>
                <Text style={styles.infoLogin}>La ultima vez que te logueaste a GRUMIT: {auth.currentUser.metadata.lastSignInTime}</Text>
                <TouchableOpacity style={styles.button} onPress={()=>this.props.logout()}>
                    <Text>CEERRAR SESION </Text>
                </TouchableOpacity>
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