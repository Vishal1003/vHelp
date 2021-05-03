import { Header, Left, Button, Body, Right, Text, Row, Col } from "native-base";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    Linking,
    ScrollView,
    StyleSheet,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Title } from "react-native-paper";
import { ListItem } from "react-native-elements";
import CategoryFilter from "../../screens/Home/CategoryFilter";
import { REST_API_URL } from "../../constants/URLs";
import axios from "axios";
import ProductList from "../../screens/Home/ProductList";
import ProductListItem from "../Card/ProductListItem";

const { height, width } = Dimensions.get("window");
const colors = require("../../constants/Color");

export default function UserDetail(props) {
    const [user, setUser] = useState(props.route.params.user);
    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);
    const [products, setProducts] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [isLoading, setIsLoading] = useState();

    const message = "Hi I want to buy a few products from you!";

    useEffect(() => {
        const fetchAPI = async () => {
            setIsLoading(true);
            setProducts(user.products);
            setInitialState(user.products);
            setProductsCtg(user.products);
            setProducts(user.products);
            let res = await axios.get(`${REST_API_URL}/api/index/category`);
            if (res.data.success === true) {
                setCategories(res.data.categories);
            } else {
                throw new Error(res.data.message);
            }
            setIsLoading(false);
        };

        fetchAPI();

        console.log(
            productsCtg.map((item, i) => {
                return item.name;
            })
        );
        setActive(-1);
    }, []);

    const openCallDialer = (phone) => {
        Linking.openURL(`tel:${phone}`);
    };

    const openMessageApp = (phone) => {
        Linking.openURL(`whatsapp://send?phone=+91${phone}&text=${message}`);
    };

    const changeCtg = (ctg) => {
        {
            ctg === "all"
                ? [setProductsCtg(initialState), setActive(true)]
                : [
                      setProductsCtg(
                          products.filter((i) => i.category === ctg),
                          setActive(true)
                      )
                  ];
        }
    };

    return (
        <ScrollView>
            <Header style={{ backgroundColor: "#fff" }}>
                <Left>
                    <Button transparent onPress={() => props.navigation.navigate("Contact")}>
                        <Icon name="arrow-left" size={25} />
                    </Button>
                </Left>
                <Body>
                    <Title>Vendor Details</Title>
                </Body>
                <Right>
                    <Button transparent></Button>
                </Right>
            </Header>
            <SafeAreaView>
                <View style={styles.card}>
                    <Image style={styles.image} source={{ uri: `${user.imageUrl}` }} />
                    <View style={styles.cardContent}>
                        <ListItem
                            style={[styles.listItemStyle, { marginTop: 0 }]}
                            containerStyle={{ borderRadius: 10 }}
                        >
                            <ListItem.Subtitle style={{ fontSize: 10 }}>Name :</ListItem.Subtitle>
                            <ListItem.Title>{user.name}</ListItem.Title>
                        </ListItem>

                        <ListItem
                            style={styles.listItemStyle}
                            containerStyle={{ borderRadius: 10 }}
                        >
                            <ListItem.Subtitle style={{ fontSize: 10 }}>Email :</ListItem.Subtitle>
                            <ListItem.Title>{user.email}</ListItem.Title>
                        </ListItem>

                        <ListItem
                            style={styles.listItemStyle}
                            containerStyle={{ borderRadius: 10 }}
                        >
                            <ListItem.Subtitle style={{ fontSize: 10 }}>
                                Contact :
                            </ListItem.Subtitle>
                            <ListItem.Title>{user.contact}</ListItem.Title>
                        </ListItem>

                        <View
                            style={[
                                styles.contactIcon,
                                { backgroundColor: "#fff", marginBottom: 0 }
                            ]}
                        >
                            <Icon
                                name="phone"
                                size={25}
                                style={styles.iconStyle}
                                onPress={() => openCallDialer(user.contact)}
                            />
                            <View style={styles.verticleLine}></View>
                            <Icon
                                name="whatsapp"
                                size={25}
                                style={styles.iconStyle}
                                onPress={() => openMessageApp(user.contact)}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.card}></View>
            </SafeAreaView>
            {isLoading ? (
                <SafeAreaView>
                    <View style={{ alignSelf: "center", marginTop: 50 }}>
                        <ActivityIndicator style={{ margin: 10 }} size="large" color="blue" />
                        <Text note>Loading Products...</Text>
                    </View>
                </SafeAreaView>
            ) : (
                <SafeAreaView style={styles.wallpaper}>
                    <CategoryFilter
                        categories={categories}
                        categoryFilter={changeCtg}
                        active={active}
                        setActive={setActive}
                    />
                    {productsCtg.length > 0 ? (
                        <SafeAreaView style={styles.wallpaper}>
                            {productsCtg.map((item, i) => {
                                return (
                                    <ProductListItem
                                        key={i}
                                        item={item}
                                        navigation={props.navigation}
                                        categories={categories}
                                    />
                                );
                            })}
                        </SafeAreaView>
                    ) : (
                        <View style={[styles.center, { height: height / 2 }]}>
                            <Text>No products found</Text>
                        </View>
                    )}
                </SafeAreaView>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    topcontainer: {
        backgroundColor: "gainsboro"
    },

    wallpaper: {
        backgroundColor: "#E8E8E8"
    },

    card: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#E8E8E8"
    },

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
    contactIcon: {
        padding: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        paddingBottom: 12,
        borderRadius: 10
    },
    verticleLine: {
        height: "100%",
        width: 1,
        backgroundColor: "#909090"
    },

    iconStyle: {
        color: colors.dark,
        textAlign: "center",
        width: 50,
        shadowOpacity: 2,
        textShadowRadius: 10,
        textShadowOffset: { width: 3, height: 3 }
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
    }
});
