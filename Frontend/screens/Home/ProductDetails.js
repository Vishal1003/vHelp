import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    StyleSheet,
    ScrollView,
    Dimensions,
    ToastAndroid,
    View,
    ImageBackground,
    TouchableOpacity
} from "react-native";
import { Text } from "native-base";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { REST_API_URL } from "../../constants/URLs";
import axios from "axios";
import { ListItem } from "react-native-elements";
import StarRating from "../../components/Card/StarRating";
import Icon from "react-native-vector-icons/MaterialIcons";

const { height, width } = Dimensions.get("window");
const customColors = require("../../constants/Color");

export default function ProductDetails(props) {
    const [item, setItem] = React.useState(props.route.params.item);
    const token = useSelector((state) => state.token);

    useEffect(() => {
        console.log(item)
    })

    const handleDeleteItem = () => {
        (async () => {
            let unDecodedToken = await AsyncStorage.getItem("jwt");
            const requestConfig = {
                headers: {
                    Authorization: `Bearer ${unDecodedToken}`
                }
            };
            try {
                let response = await axios.delete(
                    `${REST_API_URL}/api/vendor/item/${item._id}`,
                    {},
                    requestConfig
                );
                response = response.data;
                if (response.success === true) {
                    props.navigation.navigate("Home");
                    ToastAndroid.show("Item removed successfully", ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show(response.message, ToastAndroid.SHORT);
                }
            } catch (error) {
                console.log("API call error", error);
            }
        })();
    };
    return (
        <ScrollView>
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

            <View>
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
            </View>
        </ScrollView>

        // <Container style={styles.container}>
        //     <ScrollView>
        //         <Content>
        //             <Card style={styles.cardContainer}>
        //                 <CardItem cardBody>
        //                     <Image
        //                         style={{ height: 200, width: null, flex: 1 }}
        //                         source={{ uri: item.imageUrl }}
        //                     />
        //                 </CardItem>
        //                 <CardItem>
        //                     <Body>
        //                         <H1>
        //                             {item.name} | {item.category.name}
        //                         </H1>
        //                     </Body>
        //                 </CardItem>
        //                 <CardItem cardBody>
        //                     <Text style={{ marginHorizontal: 20 }}>{item.description}</Text>
        //                 </CardItem>
        //                 <CardItem>
        //                     <Left>
        //                         <H1>₹{item.cost}</H1>
        //                     </Left>
        //                     <Body />
        //                     <Right>
        //                         <Text>{item.seller.name}</Text>
        //                     </Right>
        //                 </CardItem>
        //                 {token.userId === item.seller._id ? (
        //                     <CardItem>
        //                         <Left />
        //                         <Body>
        //                             <Button style={styles.button} onPress={handleDeleteItem}>
        //                                 <Text>Delete</Text>
        //                             </Button>
        //                         </Body>
        //                         <Right />
        //                     </CardItem>
        //                 ) : (
        //                     <CardItem>
        //                         <Left />
        //                         <Body>
        //                             <Button style={styles.button}>
        //                                 <Text>Track</Text>
        //                             </Button>
        //                         </Body>
        //                         <Right />
        //                     </CardItem>
        //                 )}
        //             </Card>
        //         </Content>
        //     </ScrollView>
        // </Container>
    );
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: "#E8E8E8",
        height: height / 4,
        width: width,
        backgroundColor: "#F8F8F8",
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
    }
});
