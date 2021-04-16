import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import StarRating from "./StarRating";

const { width, height } = Dimensions.get("window");

export default function ProductCard(props) {
    const { name, cost, category, imageUrl, seller } = props;
    return (
        <View style={styles.cardsWrapper}>
            <View style={styles.card}>
                <View style={styles.cardImgWrapper}>
                    <Image
                        source={{
                            uri: imageUrl
                        }}
                        resizeMode="cover"
                        style={styles.cardImg}
                    />
                </View>
                <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{name}</Text>
                    <StarRating ratings={4} reviews={99} />
                    <Text style={styles.cardDetails}>{seller}</Text>
                    <Text style={(styles.cardDetails, { fontWeight: "bold" })}>
                        Price : {cost} $
                    </Text>
                    <Text style={styles.cardDetails}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardsWrapper: {
        marginTop: 20,
        width: "90%",
        alignSelf: "center"
    },
    card: {
        height: height / 2,
        marginVertical: 10,
        flexDirection: "column",
        shadowColor: "#999",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    },
    cardImgWrapper: {
        flex: 1,
        height: height / 2
    },
    cardImg: {
        height: "100%",
        width: "100%",
        alignSelf: "center",
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8
    },
    cardInfo: {
        flex: 2,
        padding: 10,
        borderColor: "#ccc",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        backgroundColor: "#fff"
    },
    cardTitle: {
        fontWeight: "bold",
        fontSize: 18
    },
    cardDetails: {
        fontSize: 12,
        color: "#444"
    }
});
