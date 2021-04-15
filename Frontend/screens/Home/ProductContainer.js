import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, FlatList } from "react-native";
import ProductList from "./ProductList";

const data = require("../../assets/data/products.json");

const ProductContainer = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(data);
        return () => {
            setProducts([]);
        };
    }, []);

    return (
        <SafeAreaView>
            <Text>ProductContainer</Text>
            <View style={{ marginTop: 100 }}>
                <FlatList
                    data={products}
                    numColumns={2}
                    renderItem={({ item }) => <ProductList key={item.name} item={item} />}
                    keyExtractor={(item) => item.name}
                />
            </View>
        </SafeAreaView>
    );
};

export default ProductContainer;
