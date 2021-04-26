import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, ScrollView, Image, Dimensions, ToastAndroid } from "react-native";
import {
    Text,
    Left,
    Right,
    Body,
    Container,
    H1,
    Content,
    Card,
    CardItem,
    Button
} from "native-base";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { REST_API_URL } from "../../constants/URLs";
import axios from "axios";

const { height, width } = Dimensions.get("window");

export default function ProductDetails(props) {
    const [item, setItem] = React.useState(props.route.params.item);
    const token = useSelector((state) => state.token);
    const handleDeleteItem = () => {
        (async () => {
            let unDecodedToken = await AsyncStorage.getItem("jwt");
            const requestConfig = {
                headers: {
                    Authorization: `Bearer ${unDecodedToken}`
                }
            };
            try {
                let response = await axios.delete(
                    `${REST_API_URL}/api/vendor/item/${item._id}`,
                    {},
                    requestConfig
                );
                response = response.data;
                if (response.success === true) {
                    props.navigation.navigate("Home");
                    ToastAndroid.show("Item removed successfully", ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show(response.message, ToastAndroid.SHORT);
                }
            } catch (error) {
                console.log("API call error", error);
            }
        })();
    };
    return (
        <Container style={styles.container}>
            <ScrollView>
                <Content>
                    <Card style={styles.cardContainer}>
                        <CardItem cardBody>
                            <Image
                                style={{ height: 200, width: null, flex: 1 }}
                                source={{ uri: item.imageUrl }}
                            />
                        </CardItem>
                        <CardItem>
                            <Body>
                                <H1>
                                    {item.name} | {item.category.name}
                                </H1>
                            </Body>
                        </CardItem>
                        <CardItem cardBody>
                            <Text style={{ marginHorizontal: 20 }}>{item.description}</Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <H1>₹{item.cost}</H1>
                            </Left>
                            <Body />
                            <Right>
                                <Text>{item.seller.name}</Text>
                            </Right>
                        </CardItem>
                        {token.userId === item.seller._id ? (
                            <CardItem>
                                <Left />
                                <Body>
                                    <Button style={styles.button} onPress={handleDeleteItem}>
                                        <Text>Delete</Text>
                                    </Button>
                                </Body>
                                <Right />
                            </CardItem>
                        ) : (
                            <CardItem>
                                <Left />
                                <Body>
                                    <Button style={styles.button}>
                                        <Text>Track</Text>
                                    </Button>
                                </Body>
                                <Right />
                            </CardItem>
                        )}
                    </Card>
                </Content>
            </ScrollView>
        </Container>
    );
}
const styles = StyleSheet.create({
    container: {
        position: "relative",
        height: "100%",
        backgroundColor: "gainsboro"
    },
    cardContainer: {
        height: height / 1.2,
        width: width / 1.2,
        marginLeft: width * 0.08,
        marginTop: width * 0.08
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
    button: {
        borderRadius: 50
    },
    price: {
        fontSize: 24,
        margin: 20,
        color: "red"
    }
});
