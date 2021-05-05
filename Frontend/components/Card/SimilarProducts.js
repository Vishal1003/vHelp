import { Image } from "native-base";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";

const { height, width } = Dimensions.get("screen");
export default function SimilarProducts(props) {
    const similarProducts = props.products;

    return (
        <View>
            <Image style={styles.image} source={{ uri: `${similarProducts.imageUrl}` }} />
            <View style={styles.cardContent}>
                <ListItem
                    style={[styles.listItemStyle, { marginTop: 0 }]}
                    containerStyle={{ borderRadius: 10 }}
                >
                    <ListItem.Subtitle style={{ fontSize: 10 }}>Name :</ListItem.Subtitle>
                    <ListItem.Title>{similarProducts.name}</ListItem.Title>
                </ListItem>

                <ListItem style={styles.listItemStyle} containerStyle={{ borderRadius: 10 }}>
                    <ListItem.Subtitle style={{ fontSize: 10 }}>Email :</ListItem.Subtitle>
                    <ListItem.Title>{similarProducts.name}</ListItem.Title>
                </ListItem>

                <ListItem style={styles.listItemStyle} containerStyle={{ borderRadius: 10 }}>
                    <ListItem.Subtitle style={{ fontSize: 10 }}>Contact :</ListItem.Subtitle>
                    <ListItem.Title>{similarProducts.name}</ListItem.Title>
                </ListItem>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        height: height / 3,
        width: width / 3,
        borderRadius: 10,
        margin: 10,
        marginRight: 0
    },
    cardContent: {
        width: (2 * width) / 3,
        margin: 10,
        marginLeft: 5,
        backgroundColor: "#F8F8F8",
        borderRadius: 10
    },

    listItemStyle: {
        elevation: 2,
        marginTop: 5
    },
    listContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
        marginBottom: 50
    },

    cardImage: {
        width: width,
        height: height / 10
    }
});
