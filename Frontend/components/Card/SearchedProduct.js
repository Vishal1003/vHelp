import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Content, Left, Body, ListItem, Thumbnail, Text } from "native-base";

const { width } = Dimensions.get("window");

const SearchedProduct = (props) => {
    const { productsFiltered } = props;
    return (
        <View style={{ width: width }}>
            {productsFiltered.length > 0 ? (
                productsFiltered.map((item) => (
                    <ListItem
                        onPress={() => {
                            props.navigation.navigate("Product Details", { item: item });
                        }}
                        key={item.name}
                        avatar
                    >
                        <Left>
                            <Thumbnail
                                source={{
                                    uri: item.imageUrl
                                        ? item.imageUrl
                                        : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png"
                                }}
                            />
                        </Left>
                        <Body>
                            <Text>{item.name}</Text>
                            <Text note>{item.seller}</Text>
                        </Body>
                    </ListItem>
                ))
            ) : (
                <View style={styles.center}>
                    <Text style={{ alignSelf: "center" }}>
                        No products match the selected criteria
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        justifyContent: "center",
        alignItems: "center",
        height: 100
    }
});

export default SearchedProduct;
