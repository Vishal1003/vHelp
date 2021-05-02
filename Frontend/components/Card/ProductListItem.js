import React, { Fragment, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import StarRating from "./StarRating";

export default function ProductListItem(props) {
    const { item, categories } = props;
    const [product, setProducts] = useState(item);

    useEffect(() => {
        const cId = categories.filter((c) => c._id === item.category);
        // console.log(cId[0].name);

        const waitFunc = async () => {
            await setProducts({
                ...product,
                category: cId[0].name,
                description:
                    item.description.length > 20
                        ? item.description.substring(0, 20) + "..."
                        : item.description
            });
        };

        waitFunc();

        console.log(product);
    }, []);

    return (
        <Fragment>
            <ListItem style={styles.container} containerStyle={{ borderRadius: 20 }}>
                <Avatar
                    size={70}
                    containerStyle={{ padding: 0, margin: 0 }}
                    source={{ uri: product.imageUrl }}
                />
                <ListItem.Content>
                    <ListItem.Title>{product.name}</ListItem.Title>
                    <ListItem.Subtitle>{product.description}</ListItem.Subtitle>
                    <StarRating ratings={3} reviews={99} />
                </ListItem.Content>
                <ListItem.Content>
                    <ListItem.Title style={{fontWeight: "bold"}}><ListItem.Subtitle style={{ fontSize: 10 }}>Price : </ListItem.Subtitle>₹ {product.cost}</ListItem.Title>
                    <ListItem.Subtitle>{product.category} Item</ListItem.Subtitle>
                    <ListItem.Subtitle style={{ fontSize: 10 }}>Given price is the price per unit item. </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    }
});
