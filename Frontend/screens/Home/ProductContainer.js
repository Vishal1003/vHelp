import React, { useEffect, useState, useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import {
    View,
    RefreshControl,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Dimensions,
    ToastAndroid,
    ActivityIndicator
} from "react-native";
import { Header, Icon, Item, Input, Text, Left, Right, Body } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Switch } from "react-native-paper";
import ProductList from "./ProductList";
import SearchedProduct from "../../components/Card/SearchedProduct";
import Banner from "../../components/Shared/Banner";
import CategoryFilter from "./CategoryFilter";
import MenuDrawer from "react-native-side-drawer";

import { useSelector } from "react-redux";
// const data = require("../../assets/data/products.json");
// const itemCategory = require("../../assets/data/categories.json");

import { REST_API_URL } from "../../constants/URLs";
import axios from "axios";

const { height } = Dimensions.get("window");

const ProductContainer = (props) => {
    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();
    const [refreshing, setRefreshing] = useState(false);

    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState();
    const [open, setOpen] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [initialState, setInitialState] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);
    const [isLoading, setIsLoading] = useState();

    const themeContext = useContext(ThemeContext);

    const error_message = useSelector((state) => state.error_message);
    const success_message = useSelector((state) => state.success_message);

    useEffect(() => {
        const fetchAPI = async () => {
            setIsLoading(true);
            let res = await axios.get(`${REST_API_URL}/api/index/items`);
            if (res.data.success === true) {
                setProducts(res.data.items);
                setProductsFiltered(res.data.items);
                setInitialState(res.data.items);
                setProductsCtg(res.data.items);
            } else {
                throw new Error(res.data.message);
            }
            res = await axios.get(`${REST_API_URL}/api/index/category`);
            if (res.data.success === true) {
                setCategories(res.data.categories);
            } else {
                throw new Error(res.data.message);
            }
            setIsLoading(false);
        };
        fetchAPI();
        setFocus(false);
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

    useEffect(() => {
        if (error_message.length > 0) {
            ToastAndroid.show(error_message, ToastAndroid.SHORT);
        }
    }, [error_message]);
    useEffect(() => {
        if (success_message.length > 0) {
            ToastAndroid.show(success_message, ToastAndroid.SHORT);
        }
    }, [success_message]);

    const toggleOpen = () => {
        setOpen(!open);
    };
    const toggleSwitch = () => {
        setIsEnabled((previousState) => !previousState);
        themeContext.toggleTheme();
    };
    const drawerContent = () => {
        return (
            <ScrollView style={styles.animatedBox}>
                <Header
                    style={{ backgroundColor: themeContext[themeContext.current_theme].background }}
                >
                    <Left>
                        <Switch
                            color={themeContext[themeContext.current_theme].foreground}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </Left>
                    <Body>
                        {themeContext.current_theme == "dark" ? (
                            <Ionicons
                                style={{
                                    marginLeft: 30,
                                    color: themeContext[themeContext.current_theme].foreground
                                }}
                                size={30}
                                name="moon"
                            />
                        ) : (
                            <Ionicons
                                style={{
                                    marginLeft: 30,
                                    color: themeContext[themeContext.current_theme].foreground
                                }}
                                size={30}
                                name="sunny"
                            />
                        )}
                    </Body>
                    <Right>
                        <Icon
                            style={{
                                color: themeContext[themeContext.current_theme].foreground
                            }}
                            onPress={toggleOpen}
                            name="ios-close"
                        />
                    </Right>
                </Header>
            </ScrollView>
        );
    };
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

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        (async () => {
            setIsLoading(true);
            let res = await axios.get(`${REST_API_URL}/api/index/items`);
            if (res.data.success === true) {
                setProducts(res.data.items);
                setProductsFiltered(res.data.items);
                setInitialState(res.data.items);
                setProductsCtg(res.data.items);
            } else {
                throw new Error(res.data.message);
            }
            res = await axios.get(`${REST_API_URL}/api/index/category`);
            if (res.data.success === true) {
                setCategories(res.data.categories);
            } else {
                throw new Error(res.data.message);
            }
            setIsLoading(false);
            setRefreshing(false);
        })();
    }, []);

    return isLoading == true ? (
        <SafeAreaView>
            <View style={{ alignSelf: "center", marginTop: height / 3 }}>
                <ActivityIndicator style={{ margin: 10 }} size="large" color="blue" />
                <Text note>Loading Products...</Text>
            </View>
        </SafeAreaView>
    ) : (
        <SafeAreaView>
            <MenuDrawer
                open={open}
                drawerContent={drawerContent()}
                drawerPercentage={70}
                overlay={true}
                opacity={0.8}
            >
                <Header searchBar rounded style={{ backgroundColor: "#F8F8F8", elevation: 10 }}>
                    <Item style={{ backgroundColor: "#E8E8E8", borderRadius: 20 }}>
                        <Icon name="ios-menu" onPress={toggleOpen} />
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
                    <ScrollView
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    >
                        <View>
                            <View>
                                <Banner />
                            </View>
                            <SafeAreaView>
                                <CategoryFilter
                                    categories={categories}
                                    categoryFilter={changeCtg}
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
            </MenuDrawer>
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
        backgroundColor: "gainsboro",
        marginBottom: 50
    },
    animatedBox: {
        flex: 1,
        backgroundColor: "gainsboro",
        padding: 10
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    }
});

export default ProductContainer;
