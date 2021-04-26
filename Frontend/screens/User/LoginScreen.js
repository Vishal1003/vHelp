import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
const customColor = require("../../constants/Color");

import { setErrorMessage, loginUser } from "../../redux/actions/AuthAction";
import { useSelector, useDispatch } from "react-redux";

const LoginScreen = ({ navigation }) => {
    // Redux data
    const is_authenticated = useSelector((state) => state.is_authenticated);
    const error_message = useSelector((state) => state.error_message);
    const success_message = useSelector((state) => state.success_message);
    const dispatch = useDispatch();

    // Login Data
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Component Data
    const [data, setData] = useState({
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true
    });

    useEffect(() => {
        if (is_authenticated === true) {
            navigation.navigate("Main");
        }
    }, [is_authenticated]);

    const textInputChange = (email) => {
        let val = email.trim().toLowerCase();
        if (val.trim().length >= 4) {
            setData({
                ...data,
                check_textInputChange: true,
                isValidUser: true
            });
            setEmail(val);
        } else {
            setData({
                ...data,
                check_textInputChange: false,
                isValidUser: false
            });
            setEmail(val);
        }
    };

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                isValidPassword: true
            });
            setPassword(val);
        } else {
            setData({
                ...data,
                isValidPassword: false
            });
            setPassword(val);
        }
    };

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    };

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    };

    const handleSubmit = () => {
        const user = {
            email: email,
            password: password
        };
        loginUser(user, dispatch);
    };

    const handleOnClickRegister = () => {
        navigation.navigate("RegisterScreen");
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#009387" barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
            </View>
            <Animatable.View animation="fadeInUpBig" style={[styles.footer]}>
                <Text style={[styles.text_footer]}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" size={20} />
                    <TextInput
                        placeholder="Your Email"
                        placeholderTextColor="#666666"
                        style={[styles.textInput]}
                        value={email}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                    {data.check_textInputChange ? (
                        <Animatable.View animation="bounceIn">
                            <Feather name="check-circle" color="green" size={20} />
                        </Animatable.View>
                    ) : null}
                </View>
                {data.isValidUser ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>email wrong</Text>
                    </Animatable.View>
                )}

                <Text style={[styles.text_footer]}>Password</Text>
                <View style={styles.action}>
                    <Feather name="lock" size={20} />
                    <TextInput
                        placeholder="Your Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[styles.textInput]}
                        autoCapitalize="none"
                        value={password}
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ? (
                            <Feather name="eye-off" color="grey" size={20} />
                        ) : (
                            <Feather name="eye" color="grey" size={20} />
                        )}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Text style={{ color: customColor.dark, marginTop: 15 }}>Forgot password?</Text>
                </TouchableOpacity>
                {error_message != "" && (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>{error_message}</Text>
                    </Animatable.View>
                )}
                {success_message != "" && (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.successMsg}>{success_message}</Text>
                    </Animatable.View>
                )}
                <View style={styles.button}>
                    <TouchableOpacity onPress={handleSubmit} style={[styles.buttonContainer]}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleOnClickRegister}
                        style={[styles.buttonContainer, { backgroundColor: customColor.light }]}
                    >
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000066"
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
    buttonText: {
        color: customColor.dark,
        fontSize: 18,
        fontWeight: "bold"
    },
    iconS: {
        right: 0
    },
    header: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: "#e6e6ff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 30
    },
    text_footer: {
        color: "#05375a",
        fontSize: 18
    },
    action: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: customColor.light,
        paddingBottom: 5
    },
    actionError: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#FF0000",
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : -12,
        paddingLeft: 10,
        color: "#05375a"
    },
    errorMsg: {
        color: "#FF0000",
        fontSize: 14
    },
    successMsg: {
        color: "#0000FF",
        fontSize: 14
    },
    button: {
        alignItems: "center",
        marginTop: 50
    },
    signIn: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: "bold"
    }
});
