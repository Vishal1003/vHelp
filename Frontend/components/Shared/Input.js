import React from "react";
import { TextInput, StyleSheet } from "react-native";

const customColor = require("../../constants/Color");

const Input = (props) => {
    const {
        height = 40,
        multiline = false,
        numOfLine = 1,
        placeholder,
        autoCorrect,
        onChangeText,
        onFocus,
        secureTextEntry,
        keyboardType,
        id,
        name,
        value
    } = props;

    return (
        <TextInput
            style={[styles.input, { height: height }]}
            placeholder={placeholder}
            name={name}
            id={id}
            value={value}
            autoCorrect={autoCorrect}
            onChangeText={onChangeText}
            onFocus={onFocus}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            multiline={multiline}
            numberOfLines={numOfLine}
        ></TextInput>
    );
};

const styles = StyleSheet.create({
    input: {
        width: "85%",
        backgroundColor: "white",
        margin: 10,
        marginTop: 5,
        borderRadius: 5,
        padding: 10,
        borderWidth: 2,
        borderColor: customColor.medium
    }
});

export default Input;
