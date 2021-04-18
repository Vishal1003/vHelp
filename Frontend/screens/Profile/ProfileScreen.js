import { Body, Button, Header, Left, Right } from "native-base";
import React from "react";
import { View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { Avatar, Title, Caption, Text, TouchableRipple } from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ProfileScreen = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header style={{ backgroundColor: "#fff" }}>
                <Left>
                    <Button transparent>
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
                                uri: "https://i.pravatar.cc/150?img=6"
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
                                John Doe
                            </Title>
                            <Caption style={styles.caption}>@j_doe</Caption>
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
                        <Text style={{ color: "#777777", marginLeft: 20 }}>john_doe@email.com</Text>
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
                            props.navigation.navigate("Vendor List");
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
                            props.navigation.navigate("Edit Profile");
                        }}
                    >
                        <View style={styles.menuItem}>
                            <Icon name="cog-outline" color="#00008B" size={25} />
                            <Text style={styles.menuItemText}>Settings</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => {}}>
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
