import React from "react";
import { StyleSheet, ScrollView, Image } from "react-native";
import {
    Text,
    Left,
    Right,
    Body,
    Container,
    H1,
    H3,
    Content,
    Card,
    CardItem,
    Icon,
    Button
} from "native-base";
export default function ProductDetails(props) {
    const [item, setItem] = React.useState(props.route.params.item);
    return (
        <Container style={styles.container}>
            <ScrollView>
                <Content>
                    <Card>
                        <CardItem cardBody>
                            <Image
                                style={{ height: 200, width: null, flex: 1 }}
                                source={{ uri: item.imageUrl }}
                            />
                        </CardItem>
                        <CardItem>
                            <Body>
                                <H1 style={{ fontWeight: "bold" }}>
                                    {item.name} | <H3>{item.category.name}</H3>
                                </H1>
                            </Body>
                        </CardItem>
                        <CardItem cardBody>
                            <Text>{item.description}</Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text>₹{item.cost}</Text>
                            </Left>
                            <Body />
                            <Right>
                                <Text>{item.seller.name}</Text>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent>
                                    <Icon active name="thumbs-up" />
                                    <Text>10 Likes</Text>
                                </Button>
                            </Left>
                            <Body />
                            <Right>
                                <Button transparent>
                                    <Icon active name="chatbubbles" />
                                    <Text>2 comments</Text>
                                </Button>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </ScrollView>
        </Container>
    );
}
const styles = StyleSheet.create({
    container: {
        position: "relative",
        height: "100%"
    },
    imageContainer: {
        height: 200,
        width: null,
        flex: 1
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    contentHeader: {
        fontWeight: "bold",
        marginBottom: 20
    },
    contentText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20
    },
    bottomContainer: {
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: "white"
    },
    price: {
        fontSize: 24,
        margin: 20,
        color: "red"
    }
});
