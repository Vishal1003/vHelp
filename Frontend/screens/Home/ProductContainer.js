import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    ActivityIndicator,
    SafeAreaView,
    FlatList,
    ScrollView
} from "react-native";
import { Container, Header, Icon, Item, Input, Text } from "native-base";
import ProductList from "./ProductList";
import SearchedProduct from "../../components/Card/SearchedProduct";
import Banner from "../../components/Shared/Banner";

const data = require("../../assets/data/products.json");

const ProductContainer = (props) => {
    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();
    useEffect(() => {
        setProducts(data);
        setProductsFiltered(data);
        setFocus(false);

        return () => {
            setProducts([]);
        };
    }, []);

    const searchProduct = (text) => {
        setProductsFiltered(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        );
    };

    const openList = () => {
        setFocus(true);
    };

    const onBlur = () => {
        setFocus(false);
    };

    return (
        <SafeAreaView>
            <Header searchBar rounded>
                <Item>
                    <Icon name="ios-search" />
                    <Input
                        placeholder="Search"
                        onFocus={openList}
                        onChangeText={(text) => searchProduct(text)}
                    />
                    {focus == true ? <Icon onPress={onBlur} name="ios-close" /> : null}
                </Item>
            </Header>
            {focus == true ? (
                <SearchedProduct
                    navigation={props.navigation}
                    productsFiltered={productsFiltered}
                />
            ) : (
                <ScrollView>
                    <Banner />
                    <View>
                        <FlatList
                            data={products}
                            numColumns={2}
                            renderItem={({ item }) => (
                                <ProductList
                                    key={item.name}
                                    item={item}
                                    navigation={props.navigation}
                                />
                            )}
                            keyExtractor={(item) => item.name}
                        />
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default ProductContainer;
