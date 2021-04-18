import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from "react-native";
import { Header, Icon, Item, Input, Text } from "native-base";
import ProductList from "./ProductList";
import SearchedProduct from "../../components/Card/SearchedProduct";
import Banner from "../../components/Shared/Banner";
import CategoryFilter from "./CategoryFilter";

// const data = require("../../assets/data/products.json");
// const itemCategory = require("../../assets/data/categories.json");

const backendURL = `https://vhelp-rest.herokuapp.com`;
import axios from "axios";

const { height } = Dimensions.get("window");

const arrayBufferToBase64 = (buffer) => {
    return require("base64-arraybuffer").encode(buffer);
};

const ProductContainer = (props) => {
    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();

    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);

    useEffect(() => {
        axios
            .get(`${backendURL}/api/index/items`)
            .then((res) => {
                if (res.data.success === true) {
                    for (const x in res.data.items) {
                        var base64Flag = "data:";
                        base64Flag += res.data.items[x].image.contentType;
                        base64Flag += ";base64,";
                        res.data.items[x].image =
                            base64Flag + arrayBufferToBase64(res.data.items[x].image.data.data);
                    }
                    setProducts(res.data.items);
                    setProductsFiltered(res.data.items);
                    setInitialState(res.data.items);
                } else {
                    throw new Error(res.data.message);
                }
            })
            .catch((error) => {
                console.log("API call error");
                throw error;
            });
        axios
            .get(`${backendURL}/api/index/category`)
            .then((res) => {
                if (res.data.success === true) {
                    setCategories(res.data.categories);
                } else {
                    throw new Error(res.data.message);
                }
            })
            .catch((error) => {
                console.log("API call error");
                throw error;
            });
        // setProducts(data);
        // setProductsFiltered(data);
        // setInitialState(data);
        setFocus(false);
        // setCategories(itemCategory);
        setActive(-1);

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
