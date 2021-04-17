import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import StarRating from "./StarRating";
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Thumbnail,
    Text,
    Button,
    Icon,
    Left,
    Body,
    Right
} from "native-base";

const { width, height } = Dimensions.get("window");

export default function ProductCard(props) {
    const { name, cost, category, imageUrl, seller, shortdesc } = props;
    return (
        <Container style={styles.container}>
            <Content>
                <Card>
                    <CardItem>
                        <Body>
                            <Text style={{ fontWeight: "bold" }}>{name}</Text>
                            <Text note>{seller}</Text>
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
                        <Text>{shortdesc}</Text>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    container : {
        height : 3 * height / 4 - 40,
        paddingBottom : 0,
        marginBottom : 20,
        backgroundColor: "gainsboro"
    }
})