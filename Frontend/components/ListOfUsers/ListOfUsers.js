import { Container } from "native-base";
import React from "react";
import { View } from "react-native";
import { Card, ListItem, Avatar } from "react-native-elements";

const data = require("../../assets/data/vendors.json");

export default function ListOfUsers(props) {
    return (
        <View containerStyle={{ padding: 0 }}>
            {data.map((u, i) => (
                <Card containerStyle={{ padding: 0, margin: 0 }} key={i}>
                    <ListItem>
                        <Avatar source={{ uri: u.imageUrl }} />
                        <ListItem.Content>
                            <ListItem.Title>{u.name}</ListItem.Title>
                            <ListItem.Subtitle>{u.products.length} products</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </Card>
            ))}
        </View>
    );
}
