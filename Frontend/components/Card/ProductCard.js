import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import StarRating from "./StarRating";
import { Container, Content, Card, CardItem, Text, Icon, Left, Body, Right } from "native-base";

const { height } = Dimensions.get("window");

export default function ProductCard(props) {
    const { name, cost, image, seller, description } = props;
    return (
        <Container style={styles.container}>
            <Content>
                <Card>
                    <CardItem>
                        <Body>
                            <Text style={{ fontWeight: "bold" }}>{name}</Text>
                            <Text note>{seller.name}</Text>
                        </Body>
                    </CardItem>
                    <CardItem cardBody>
                        <Image
                            source={{ uri: image }}
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
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        // height: (3 * height) / 4 - 40,
        paddingBottom: 0,
        marginBottom: 20,
        backgroundColor: "gainsboro"
    }
});
