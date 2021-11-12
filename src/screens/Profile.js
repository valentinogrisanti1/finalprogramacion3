import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity} from 'react-native'

 class Profile extends Component {
    constructor(props) {
        super(props);
            this.state = {
                
            }
    }
    render() {
        return (
            <View>
                <Text> PERFIL </Text>
                <TouchableOpacity style={styles.button} onPress={()=>this.props.logout()}>
                    <Text>LogOut </Text>
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
})

export default Profile;