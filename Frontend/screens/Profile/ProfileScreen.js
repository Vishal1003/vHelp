import { Body, Button, Header, Left, Right } from "native-base";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { Avatar, Title, Caption, Text, TouchableRipple } from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { logoutUser } from "../../redux/actions/AuthAction";

const arrayBufferToBase64 = (buffer) => {
    return require("base64-arraybuffer").encode(buffer);
};

const ProfileScreen = ({ navigation }) => {
    const user_data = useSelector((state) => state.user_data);
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [image, setImage] = useState("https://i.pravatar.cc/150?img=6");
    useEffect(() => {
        if (isLoggedIn && user_data.hasOwnProperty("image")) {
            var base64Flag = "data:";
            base64Flag += user_data.image.contentType;
            base64Flag += ";base64,";
            setImage(base64Flag + arrayBufferToBase64(user_data.image.data.data));
        }
    }, [user_data]);
    const handleLogout = () => {
        setIsLoggedIn(false);
        logoutUser(dispatch);
        navigation.navigate("LoginScreen");
    };
    return (
        <SafeAreaView style={styles.container}>
            <Header style={{ backgroundColor: "#fff" }}>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={25} />
                    </Button>
                </Left>
                <Body>
                    <Title>Profile</Title>
                </Body>
                <Right>
                    <Button transparent></Button>
                </Right>
            </Header>
            <ScrollView>
                <View style={styles.userInfoSection}>
                    <View style={{ flexDirection: "row", marginTop: 15 }}>
                        <Avatar.Image
                            source={{
                                uri: image
                            }}
                            size={80}
                        />
                        <View style={{ marginLeft: 20 }}>
                            <Title
                                style={[
                                    styles.title,
                                    {
                                        marginTop: 15,
                                        marginBottom: 5
                                    }
                                ]}
                            >
                                {user_data.hasOwnProperty("name") ? user_data.name : "User"}
                            </Title>
                            <Caption style={styles.caption}>
                                @{user_data.hasOwnProperty("name") ? user_data.name : "user"}
                            </Caption>
                        </View>
                    </View>
                </View>

                <View style={styles.userInfoSection}>
                    <View style={styles.row}>
                        <Icon name="map-marker-radius" color="#777777" size={20} />
                        <Text style={{ color: "#777777", marginLeft: 20 }}>Kolkata, India</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name="phone" color="#777777" size={20} />
                        <Text style={{ color: "#777777", marginLeft: 20 }}>+91-900000009</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name="email" color="#777777" size={20} />
                        <Text style={{ color: "#777777", marginLeft: 20 }}>
                            {isLoggedIn ? user_data.email : ""}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        borderBottomColor: "#D3D3D3",
                        borderBottomWidth: 1
                    }}
                />
                <View style={styles.menuWrapper}>
                    <TouchableRipple onPress={() => {}}>
                        <View style={styles.menuItem}>
                            <Icon name="heart-outline" color="#00008B" size={25} />
                            <Text style={styles.menuItemText}>Your Favorites</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple
                        onPress={() => {
                            navigation.navigate("Vendor List");
                        }}
                    >
                        <View style={styles.menuItem}>
                            <MaterialIcons
                                name="supervised-user-circle"
                                color="#00008B"
                                size={25}
                            />
                            <Text style={styles.menuItemText}>Verified Vendors</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple>
                        <View style={styles.menuItem}>
                            <Icon name="share-outline" color="#00008B" size={25} />
                            <Text style={styles.menuItemText}>Tell Your Friends</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => {}}>
                        <View style={styles.menuItem}>
                            <Icon name="account-check-outline" color="#00008B" size={25} />
                            <Text style={styles.menuItemText}>Support</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple
                        onPress={() => {
                            navigation.navigate("Edit Profile");
                        }}
                    >
                        <View style={styles.menuItem}>
                            <Icon name="cog-outline" color="#00008B" size={25} />
                            <Text style={styles.menuItemText}>Settings</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={handleLogout}>
                        <View style={styles.menuItem}>
                            <Icon name="logout" color="#00008B" size={25} />
                            <Text style={styles.menuItemText}>Logout</Text>
                        </View>
                    </TouchableRipple>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25
    },
    title: {
        fontSize: 24,
        fontWeight: "bold"
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: "500"
    },
    row: {
        flexDirection: "row",
        marginBottom: 10
    },
    infoBoxWrapper: {
        borderBottomColor: "#dddddd",
        borderBottomWidth: 1,
        borderTopColor: "#dddddd",
        borderTopWidth: 1,
        flexDirection: "row",
        height: 100
    },
    infoBox: {
        width: "50%",
        alignItems: "center",
        justifyContent: "center"
    },
    menuWrapper: {
        marginTop: 10
    },
    menuItem: {
        flexDirection: "row",
        paddingVertical: 15,
        paddingHorizontal: 30
    },
    menuItemText: {
        color: "#777777",
        marginLeft: 20,
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 26
    }
});
