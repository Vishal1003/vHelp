import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import StarRating from "./StarRating";
import { Container, Content, Card, CardItem, Text, Icon, Left, Body, Right } from "native-base";

const { height } = Dimensions.get("window");

export default function ProductCard(props) {
    const { name, cost, imageUrl, seller, description } = props;
    return (
        <Content>
            <Card style={{ elevation: 5 }}>
                <CardItem>
                    <Body>
                        <Text style={{ fontWeight: "bold" }}>{name}</Text>
                        <Text note>@{seller.name}</Text>
                    </Body>
                </CardItem>
                <CardItem cardBody>
                    <Image
                        source={{ uri: imageUrl }}
                        style={{ height: height / 4, width: null, flex: 1 }}
                    />
                </CardItem>
                <CardItem>
                    <Left>
                        <StarRating ratings={4} reviews={99} />
                    </Left>
                    <Right>
                        <Icon active name="chatbubbles" />
                    </Right>
                </CardItem>
                <CardItem>
                    <Text note>Price : </Text>
                    <Text>{cost} $</Text>
                </CardItem>
                <CardItem>
                    <Text>{description}</Text>
                </CardItem>
            </Card>
        </Content>
    );
}

const styles = StyleSheet.create({
    container: {
        height: (3 * height) / 4 - 50,
        backgroundColor: "gainsboro"
    }
});
