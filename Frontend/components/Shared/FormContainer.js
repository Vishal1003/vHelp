import React from "react";
import { ScrollView, Dimensions, StyleSheet, Text } from "react-native";

var { width } = Dimensions.get("window");

const FormContainer = (props) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            {props.children}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginBottom: 400,
        width: width,
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontWeight: "bold",
        width: width,
        textAlign: "center",
        backgroundColor: "gainsboro",
        color: "#03bafc",
        marginBottom: 20,
        fontSize: 30,
        marginTop: -10
    }
});

export default FormContainer;
