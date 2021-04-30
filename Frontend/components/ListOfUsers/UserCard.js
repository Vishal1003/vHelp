import React from "react";
import { Linking, TouchableOpacity } from "react-native";
import { Card, ListItem, Avatar } from "react-native-elements";

export default function UserCard(props) {
    const u = props.users;

    const openCallDialer = (phone) => {
        Linking.openURL(`tel:${phone}`);
    };

    return (
        <TouchableOpacity
            onPress={() => {
                props.navigation.navigate("Vendor Details", {
                    user: u,
                    navigation: props.navigation
                });
            }}
        >
            <Card containerStyle={{ padding: 0, margin: 0 }}>
                <ListItem
                    containerStyle={{
                        elevation: 5,
                        borderRadius: 15,
                        marginTop: 5,
                        shadowColor: "#fff"
                    }}
                >
                    <Avatar
                        rounded
                        size={50}
                        containerStyle={{ elevation: 20 }}
                        source={{
                            uri: u.imageUrl
                        }}
                    />
                    <ListItem.Content>
                        <ListItem.Title>{u.name}</ListItem.Title>
                        <ListItem.Subtitle>{u.products.length} product(s)</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron
                        iconProps={{ name: "phone", size: 20, color: "#843" }}
                        onPress={() => openCallDialer(u.contact)}
                    />
                    <ListItem.Chevron iconProps={{ color: "#fff" }} />
                    <ListItem.Chevron iconStyle={{ color: "#000", fontSize: 20 }} />
                </ListItem>
            </Card>
        </TouchableOpacity>
    );
}
