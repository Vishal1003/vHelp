import { Container } from "native-base";
import React from "react";
import { View, Text, Image } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";

const data = require("../../assets/data/vendors.json");

export default function ListOfUsers() {
    return (
        <Container>
            <Card containerStyle={{ padding: 0 }}>
                {data.map((u, i) => (
                    <ListItem key={i}>
                        <Avatar source={{ uri: u.imageUrl }} />
                        <ListItem.Content>
                            <ListItem.Title>{u.name}</ListItem.Title>
                            <ListItem.Subtitle>{u.products.length} products</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </Card>
        </Container>
    );
}
