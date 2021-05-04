import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ToastAndroid,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { Item, Picker, Icon } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { setErrorMessage, registerUser } from "../../redux/actions/AuthAction";
import MESSAGES from "../../constants/Messages";
const customColor = require("../../constants/Color");

const RegisterScreen = ({ navigation }) => {
    const error_message = useSelector((state) => state.error_message);
    const success_message = useSelector((state) => state.success_message);
    const dispatch = useDispatch();

    const [data, setData] = React.useState({
        email: "",
        password: "",
        confirm_password: "",
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true
    });

    const [usertype, setUsertype] = useState("0");
    const [isValidType, setIsValidType] = useState(false);
    useEffect(() => {
        if (error_message.length > 0) {
            ToastAndroid.show(error_message, ToastAndroid.SHORT);
        }
    }, [error_message]);
    useEffect(() => {
        if (success_message === MESSAGES.REGISTERED_SUCCESSFULLY) {
            navigation.navigate("LoginScreen");
        }
        if (success_message.length > 0) {
            ToastAndroid.show(success_message, ToastAndroid.SHORT);
        }
    }, [success_message]);

    const textInputChange = (email) => {
        let val = email.trim().toLowerCase();
        if (val.length !== 0) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            });
        }
    };

    const nameChangeHandler = (name) => {
        setData({
            ...data,
            name: name
        });
    };

    const phoneChangeHandler = (phone) => {
        setData({
            ...data,
            contact: phone
        });
    };

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    };

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    };

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    };

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    };

    const selectUserTypeHandler = (type) => {
        if (type === "0") {
            setIsValidType(false);
        } else {
            setIsValidType(true);
            setUsertype(type);
        }
    };

    const handleRegister = () => {
        if (!isValidType) {
            dispatch(setErrorMessage("Please select valid user type"));
            return;
        }

        if (!data.name || !data.contact || !data.email || !data.password) {
            dispatch(setErrorMessage("Please fill all details"));
            return;
        }

        if (data.password != data.confirm_password) {
            dispatch(setErrorMessage("Passwords does not match"));
            return;
        } else if (data.password.length < 8) {
            dispatch(setErrorMessage("Password must be 8 characters long"));
            return;
        }

        if (data.contact.length < 10) {
            dispatch(setErrorMessage("Enter a valid contact number"));
            return;
        }

        const user = {
            email: data.email,
            password: data.password,
            user_type: usertype,
            name: data.name,
            contact: data.contact
        };
        registerUser(user, dispatch);
    };
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#009387" barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Register Now!</Text>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* NAME */}
                    <Text style={[styles.text_footer]}>Name</Text>
                    <View style={styles.action}>
                        <MaterialIcons name="drive-file-rename-outline" color="#05375a" size={20} />
                        <TextInput
                            placeholder="Full Name"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => nameChangeHandler(val)}
                        />
                    </View>

                    {/* CONTACT */}
                    <Text style={[styles.text_footer, { marginTop: 10 }]}>Contact</Text>
                    <View style={styles.action}>
                        <FontAwesome name="phone" color="#05375a" size={20} />
                        <TextInput
                            placeholder="Contact Number"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => phoneChangeHandler(val)}
                        />
                        {data.check_contactNumber ? (
                            <Animatable.View animation="bounceIn">
                                <Feather name="check-circle" color="green" size={20} />
                            </Animatable.View>
                        ) : null}
                    </View>

                    {/* EMAIL */}
                    <Text style={[styles.text_footer, { marginTop: 10 }]}>Email</Text>
                    <View style={styles.action}>
                        <MaterialIcons name="alternate-email" color="#05375a" size={20} />
                        <TextInput
                            placeholder="Your Email"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                        />
                        {data.check_textInputChange ? (
                            <Animatable.View animation="bounceIn">
                                <Feather name="check-circle" color="green" size={20} />
                            </Animatable.View>
                        ) : null}
                    </View>

                    {/* USER TYPE */}
                    <Text style={[styles.text_footer, { marginTop: 10 }]}>User Type</Text>
                    <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: "100%", height: 20 }}
                                placeholder="Select User Type"
                                selectedValue={usertype}
                                onValueChange={(type) => {
                                    selectUserTypeHandler(type);
                                }}
                            >
                                <Picker.Item label="Select..." value="0" />
                                <Picker.Item label="General User" value="user" />
                                <Picker.Item label="Vendor" value="vendor" />
                            </Picker>
                        </Item>
                    </View>

                    {/* PASSWORD */}
                    <Text style={[styles.text_footer, { marginTop: 10 }]}>Password</Text>
                    <View style={styles.action}>
                        <Feather name="lock" color="#05375a" size={20} />
                        <TextInput
                            placeholder="Your Password"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
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

                    {/* CONFIRM PASSWORD */}
                    <Text style={[styles.text_footer, { marginTop: 10 }]}>Confirm Password</Text>
                    <View style={styles.action}>
                        <Feather name="lock" color="#05375a" size={20} />
                        <TextInput
                            placeholder="Confirm Your Password"
                            secureTextEntry={data.confirm_secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleConfirmPasswordChange(val)}
                        />
                        <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
                            {data.secureTextEntry ? (
                                <Feather name="eye-off" color="grey" size={20} />
                            ) : (
                                <Feather name="eye" color="grey" size={20} />
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* BUTTON_GRP */}
                    <View style={styles.button}>
                        <TouchableOpacity onPress={handleRegister} style={[styles.buttonContainer]}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={[
                                styles.buttonContainer,
                                { marginTop: 15, backgroundColor: customColor.light }
                            ]}
                        >
                            <Text style={styles.buttonText}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000066"
    },
    buttonContainer: {
        width: "100%",
        padding: 10,
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
    extSign: {
        fontSize: 18,
        fontWeight: "bold"
    },
    textPrivate: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 20
    },
    color_textPrivate: {
        color: "grey"
    }
});
