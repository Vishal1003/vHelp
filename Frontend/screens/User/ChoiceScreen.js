import React from "react";
import { View, TouchableOpacity, Dimensions, StyleSheet, StatusBar } from "react-native";
import { Text } from "native-base";
import * as Animatable from "react-native-animatable";
import Feather from "react-native-vector-icons/Feather";
const customColor = require("../../constants/Color");

const ChoiceScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#009387" barStyle="light-content" />
            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    source={{
                        uri:
                            "http://www.verifiedvendor.com/wp-content/uploads/2017/11/cropped-VV_plain-V-logo-small.jpg"
                    }}
                    style={styles.logo}
                    resizeMode="stretch"
                />
            </View>
            <Animatable.View style={styles.footer} animation="fadeInUpBig">
                <Text style={styles.title}>Register yourself as </Text>
                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("LoginScreen")}
                        style={[styles.buttonContainer, { marginTop: 15 }]}
                    >
                        <Text style={styles.buttonText}>
                            Vendor <Text>{"  "}</Text>
                            <Feather name="chevrons-right" style={styles.iconS} size={15} />
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[styles.buttonContainer, { marginTop: 15 }]}
                    >
                        <Text style={styles.buttonText}>
                            General User <Text>{"  "}</Text>
                            <Feather name="chevrons-right" style={styles.iconS} size={15} />
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default ChoiceScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000066"
    },
    header: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonContainer: {
        width: "100%",
        marginTop: 10,
        padding: 15,
        alignItems: "center",
        textAlign: "center",
        borderRadius: 10,
        borderColor: customColor.dark,
        borderWidth: 1.5
    },
    text_header: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 30
    },
    buttonText: {
        color: customColor.dark,
        fontWeight: "bold"
    },
    iconS: {
        right: 0
    },
    footer: {
        flex: 1,
        backgroundColor: "#e6e6ff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: "#4d4d4d",
        fontSize: 20,
        fontWeight: "bold"
    },
    text: {
        color: "#4d4d4d",
        marginTop: 10
    },
    button: {
        margin: "auto"
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        flexDirection: "row"
    },
    textSign: {
        color: "white",
        fontWeight: "bold"
    }
});
