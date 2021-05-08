import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
    StyleSheet,
    ScrollView,
    Dimensions,
    ToastAndroid,
    View,
    ImageBackground,
    TouchableOpacity,
    Image,
    Text
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { REST_API_URL } from "../../constants/URLs";
import axios from "axios";
import { Avatar, ListItem } from "react-native-elements";
import StarRating from "../../components/Card/StarRating";
import Icon from "react-native-vector-icons/MaterialIcons";
// import SimilarProducts from "../../components/Card/SimilarProducts";

const { height, width } = Dimensions.get("window");
const customColors = require("../../constants/Color");

export default function ProductDetails(props) {
    const [item, setItem] = React.useState(props.route.params.item);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [vendorProducts, setVendorProducts] = useState([]);
    const scrollRef = useRef();
    let similarProductsData = [];
    let vendorProductData = [];

    // const token = useSelector((state) => state.token);
    useEffect(() => {
        const fetchAPI = async () => {
            try {
                let response = await axios.get(
                    `${REST_API_URL}/api/index/category/${item.category._id}`
                );
                if (response.data.success == true) {
                    setSimilarProducts(response.data.data);
                }

                response = await axios.get(`${REST_API_URL}/api/index/seller/${item.seller._id}`);
                if (response.data.success == true) {
                    setVendorProducts(response.data.data);
                }
            } catch (e) {
                console.log("API error");
            }
        };
        fetchAPI();

        return () => {
            setSimilarProducts([]);
            setVendorProducts([]);
        };
    }, [item]);

    // const handleDeleteItem = () => {
    //     (async () => {
    //         let unDecodedToken = await AsyncStorage.getItem("jwt");
    //         const requestConfig = {
    //             headers: {
    //                 "Content-Type": "application/x-www-form-urlencoded",
    //                 Authorization: `Bearer ${unDecodedToken}`
    //             }
    //         };
    //         try {
    //             let response = await axios.delete(
    //                 `${REST_API_URL}/api/vendor/item/${item._id}`,
    //                 {},
    //                 requestConfig
    //             );
    //             response = response.data;
    //             if (response.success === true) {
    //                 props.navigation.navigate("Home");
    //                 ToastAndroid.show("Item removed successfully", ToastAndroid.SHORT);
    //             } else {
    //                 ToastAndroid.show(response.message, ToastAndroid.SHORT);
    //             }
    //         } catch (error) {
    //             console.log("API call error", error);
    //         }
    //     })();
    // };
    if (similarProducts.length > 0) {
        similarProductsData = [];
        similarProducts.forEach((item) => {
            similarProductsData.push(
                <ListItem
                    containerStyle={{
                        borderRadius: 20,
                        width: width / 1.5,
                        marginRight: 10,
                        elevation: 5
                    }}
                    key={item._id}
                    onPress={() => {
                        setItem(item);
                        scrollRef.current.scrollTo({
                            y: 0,
                            animated: true
                        });
                    }}
                >
                    <Avatar size={70} source={{ uri: item.imageUrl }} />
                    <ListItem.Content>
                        <ListItem.Title style={{ fontWeight: "bold" }}>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>
                            {item.description.substring(0, Math.min(item.description.length, 15))}
                            ...
                        </ListItem.Subtitle>
                        <ListItem.Subtitle style={{ fontSize: 12 }}>
                            Price :{" "}
                            <ListItem.Subtitle style={{ fontWeight: "bold", color: "#000" }}>
                                {" "}
                                ₹ {item.cost}
                            </ListItem.Subtitle>
                        </ListItem.Subtitle>
                        <StarRating ratings={3} reviews={99} />
                    </ListItem.Content>
                </ListItem>
            );
        });
    }
    if (vendorProducts.length > 0) {
        vendorProductData = [];
        vendorProducts.forEach((item) => {
            vendorProductData.push(
                <ListItem
                    containerStyle={{
                        borderRadius: 20,
                        width: width / 1.5,
                        marginRight: 10,
                        elevation: 5
                    }}
                    key={item._id}
                    onPress={() => {
                        setItem(item);
                        scrollRef.current.scrollTo({
                            y: 0,
                            animated: true
                        });
                    }}
                >
                    <Avatar size={70} source={{ uri: item.imageUrl }} />
                    <ListItem.Content>
                        <ListItem.Title style={{ fontWeight: "bold" }}>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>
                            {item.description.substring(0, Math.min(item.description.length, 15))}
                            ...
                        </ListItem.Subtitle>
                        <ListItem.Subtitle style={{ fontSize: 12 }}>
                            Price :{" "}
                            <ListItem.Subtitle style={{ fontWeight: "bold", color: "#000" }}>
                                {" "}
                                ₹ {item.cost}
                            </ListItem.Subtitle>
                        </ListItem.Subtitle>
                        <StarRating ratings={3} reviews={99} />
                    </ListItem.Content>
                </ListItem>
            );
        });
    }
    return (
        <ScrollView ref={scrollRef}>
            {/* Product Image */}
            <View style={{ borderColor: "gainsboro", borderBottomWidth: 1 }}>
                <ImageBackground style={styles.imageStyle} source={{ uri: item.imageUrl }}>
                    <View style={styles.imageTextConatiner}>
                        <Text style={styles.imageText}>{item.name.toUpperCase()}</Text>
                    </View>
                    <View style={styles.imageTextConatiner2}>
                        <Text style={styles.OuterText}>
                            <Text note style={styles.imageText2}>
                                CATEGORY : {}
                            </Text>
                            {item.category.name}
                        </Text>
                    </View>
                </ImageBackground>
            </View>

            {/* Product  Details*/}
            <ListItem>
                <ListItem.Content>
                    <ListItem.Subtitle style={{ fontSize: 10, marginBottom: height / 50 }}>
                        PRICE : {"  "}
                        <ListItem.Title style={{ fontWeight: "bold" }}>
                            ₹ {item.cost}
                        </ListItem.Title>
                        {"  "}
                        (PER UNIT ITEM)
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={{ fontSize: 10, marginBottom: height / 50 }}>
                        DESCRIPTION : {"  "}
                        <ListItem.Title>{item.description}</ListItem.Title>
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={{ fontSize: 10, marginBottom: height / 50 }}>
                        RATINGS : {"  "}
                        <StarRating ratings={3} reviews={99} />
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={{ fontSize: 10 }}>
                        SELLER : {"  "}
                        <ListItem.Title style={{ fontSize: 15 }}>{item.seller.name}</ListItem.Title>
                    </ListItem.Subtitle>
                </ListItem.Content>
                <View style={styles.imageTextConatiner2}>
                    <TouchableOpacity style={styles.mapSticker}>
                        <Icon size={30} name="location-pin" />
                        <Text style={{ fontSize: 10 }}>LOCATE</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.imageTextConatiner2}>
                    <TouchableOpacity style={styles.callSticker}>
                        <Icon size={30} name="phone" />
                        <Text style={{ fontSize: 10 }}>CALL</Text>
                    </TouchableOpacity>
                </View>
            </ListItem>

            <View
                style={[
                    styles.card,
                    {
                        backgroundColor: "#fff",
                        marginTop: 10,
                        height: 200
                    }
                ]}
            >
                <Text note style={{ margin: 20 }}>
                    More from this category{" "}
                </Text>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    bounces={true}
                    nestedScrollEnabled={true}
                    horizontal={true}
                    style={{ backgroundColor: "#f2f2f2", padding: 10 }}
                >
                    {similarProducts.length > 0 && (
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            {similarProductsData.map((image) => {
                                return image;
                            })}
                        </View>
                    )}
                </ScrollView>
            </View>

            <View
                style={[
                    styles.card,
                    {
                        backgroundColor: "#fff",
                        marginTop: 10,
                        height: 200
                    }
                ]}
            >
                <Text note style={{ margin: 20 }}>
                    More from this vendor{" "}
                </Text>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    bounces={true}
                    nestedScrollEnabled={true}
                    horizontal={true}
                    style={{ backgroundColor: "#f2f2f2", padding: 10 }}
                >
                    {vendorProducts.length > 0 && (
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            {vendorProductData.map((image) => {
                                return image;
                            })}
                        </View>
                    )}
                </ScrollView>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: "#E8E8E8",
        height: height / 4,
        width: width,
        // backgroundColor: "#F8F8F8",
        borderRadius: 10,
        elevation: 10
    },
    imageStyle: {
        width: width,
        height: height / 2.5
    },
    imageTextConatiner: {
        position: "absolute",
        left: 0,
        bottom: 0,
        justifyContent: "flex-end",
        alignItems: "flex-start",
        width: width,
        height: height / 10,
        backgroundColor: "#E8E8E8",
        opacity: 0.7
    },
    imageTextConatiner2: {
        position: "absolute",
        right: 0,
        bottom: 0,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        width: width,
        height: height / 10
    },
    imageText: {
        fontSize: 24,
        fontWeight: "bold",
        color: customColors.dark,
        paddingLeft: 10,
        paddingBottom: 10
    },
    imageText2: {
        color: customColors.dark,
        fontWeight: "100",
        paddingRight: 10,
        paddingBottom: 10,
        fontSize: 10
    },
    OuterText: {
        fontSize: 15,
        fontWeight: "bold",
        color: customColors.dark,
        paddingRight: 10,
        paddingBottom: 10
    },
    mapSticker: {
        height: 60,
        width: 50,
        backgroundColor: customColors.light,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: 15,
        elevation: 10
    },

    callSticker: {
        height: 60,
        width: 50,
        backgroundColor: customColors.light,
        marginRight: 70,
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: 15,
        elevation: 10
    },
    listContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
        marginBottom: 50
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
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
