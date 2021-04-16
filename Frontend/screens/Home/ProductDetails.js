import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, Button } from "react-native";
import { Left, Right, Container, H1 } from "native-base";
export default function ProductDetails(props) {
    const [item, setItem] = React.useState(props.route.params.item);
    return (
        <Container style={styles.container}>
            <ScrollView style={{ marginBottom: 80, padding: 5 }}>
                <View>
                    <Image
                        style={styles.imageContainer}
                        source={{ uri: item.imageUrl }}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <H1 style={styles.contentHeader}>{item.name}</H1>
                    <Text style={styles.contentText}>{item.category}</Text>
                </View>
            </ScrollView>
            <View style={styles.bottomContainer}>
                <Left>
                    <Text style={styles.price}>$ {item.cost}</Text>
                </Left>
                <Right>
                    <Button title="Add" color="#841584"></Button>
                </Right>
            </View>
        </Container>
    );
}
const styles = StyleSheet.create({
    container: {
        position: "relative",
        height: "100%"
    },
    imageContainer: {
        backgroundColor: "white",
        padding: 0,
        margin: 0
    },
    image: {
        width: "100%",
        height: 250
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
