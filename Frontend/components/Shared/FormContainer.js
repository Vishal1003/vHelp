import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

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
        marginBottom: 400,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontWeight: "bold",
        textAlign: "center",
        color: "#03bafc",
        marginBottom: 10,
        fontSize: 30
    }
});

export default FormContainer;
