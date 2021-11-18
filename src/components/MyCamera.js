import React, { Component } from 'react';
import { Camera } from "expo-camera";
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { storage } from "../firebase/config";

 class MyCamera extends Component {
    constructor(props){
        super(props);
        this.state= {
            permission: false,
            photo: "",
        };
        this.camera;
    }

    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
        .then(() => {
            this.setState({
                permission: true,
            });
        })
        .catch((err) => console.log(err));
        Camera.getAvailableCameraTypesAsync().then((res) => console.log(res));
    }

    sacarFoto() {
        this.camera
        .takePictureAsync()
        .then((photo) => {
            this.setState({
                photo: photo.uri,
            });
        })
    }

    guardarFoto() {
        fetch(this.state.photo)
        .then((res) => res.blob())
        .then((image) => {
            const ref = storage.ref(`photo/${Date.now()}.jpg`);

            ref.put(image).then(() => {
                ref.getDownloadURL(). then ((url) => {
                    this.props.subirFoto(url);
                    this.setState({
                        photo: "",
                    });
                });
            });

        })
    }


    render() {
        return (
            <>
                {this.state.photo ? (
                    <>
                        <Image
                            style={{ flex: 1, width: "100%" }}
                            source={{ uri: this.state.photo }}
                        />
                        <View>
                            <TouchableOpacity onPress={() => this.guardarFoto()}>
                                <Text>Aceptar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                   
                    <View style={{ flex: 1 ,width: "100%" }}>
                        <Camera
                            style={{ flex: 1 ,width: "100%" }}
                            type={Camera.Constants.Type.front}
                            ref={(cam) => (this.camera = cam)}
                        />
                        <TouchableOpacity onPress={() => this.sacarFoto()}>
                            <Text>Dispa</Text>
                        </TouchableOpacity>
                    </View>
                    
                )}
            </>
        );
        
    }
}




export default MyCamera;
