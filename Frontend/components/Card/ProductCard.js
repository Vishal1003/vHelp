import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("window");

export default function ProductCard(props) {
    const { name, cost, category, imageUrl, seller } = props;
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image style={styles.image} source={{ uri: imageUrl }} />
                <View>
                    <Text style={styles.title}>
                        {name.length > 15 ? name.substring(0, 15 - 3) + "..." : name}
                    </Text>
                </View>
                <View>
                    <Text style={styles.price}>${cost}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width / 2 - 20,
        height: height / 2 - 50,
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: "center",
        elevation: 8,
        backgroundColor: "white"
    },
    image: {
        width: width / 2 - 20 - 10,
        height: width / 2 - 20 - 30,
        borderRadius: 10,
        backgroundColor: "transparent",
        position: "absolute"
    },
    card: {
        marginBottom: 10,
        height: width / 2 - 20 - 90,
        backgroundColor: "transparent",
        width: width / 2 - 20 - 10
    },
    title: {
        top: height / 4,
        fontWeight: "bold",
        fontSize: 14,
        textAlign: "center"
    },
    price: {
        fontSize: 20,
        color: "orange",
        marginTop: 10
    }
});
