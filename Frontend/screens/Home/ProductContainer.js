import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from "react-native";
import { Header, Icon, Item, Input, Text } from "native-base";
import ProductList from "./ProductList";
import SearchedProduct from "../../components/Card/SearchedProduct";
import Banner from "../../components/Shared/Banner";
import CategoryFilter from "./CategoryFilter";

const data = require("../../assets/data/products.json");
const itemCategory = require("../../assets/data/categories.json");

const { height } = Dimensions.get("window");

const ProductContainer = (props) => {
    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();

    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);

    useEffect(() => {
        setProducts(data);
        setProductsFiltered(data);
        setFocus(false);

        setCategories(itemCategory);
        setActive(-1);
        setInitialState(data);

        return () => {
            setProducts([]);
            setProductsFiltered([]);
            setFocus();
            setCategories([]);
            setActive();
            setInitialState();
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

    // Categories
    const changeCtg = (ctg) => {
        {
            ctg === "all"
                ? [setProductsCtg(initialState), setActive(true)]
                : [
                      setProductsCtg(
                          products.filter((i) => i.category._id === ctg),
                          setActive(true)
                      )
                  ];
        }
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
                    navigateTo="Product Details"
                />
            ) : (
                <ScrollView>
                    <View>
                        <View>
                            <Banner />
                        </View>
                        <SafeAreaView>
                            <CategoryFilter
                                categories={categories}
                                categoryFilter={changeCtg}
                                productsCtg={productsCtg}
                                active={active}
                                setActive={setActive}
                            />
                        </SafeAreaView>
                        {productsCtg.length > 0 ? (
                            <SafeAreaView style={styles.listContainer}>
                                {productsCtg.map((item) => {
                                    return (
                                        <ProductList
                                            key={item.name}
                                            item={item}
                                            navigation={props.navigation}
                                        />
                                    );
                                })}
                            </SafeAreaView>
                        ) : (
                            <View style={[styles.center, { height: height / 2 }]}>
                                <Text>No products found</Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        backgroundColor: "gainsboro"
    },
    listContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro"
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    }
});

export default ProductContainer;
