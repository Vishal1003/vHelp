import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
// import Swiper from 'react-native-swiper'
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import StarRating from "../components/StarRating";

const HomeScreen = () => {
    return (
        <ScrollView style={styles.container}>
            {/* <View style={styles.sliderContainer}>
                <Swiper autoplay horizontal={false} height={200} activeDotColor="#FF6347">
                    <View style={styles.slide}>
                        <Image
                            source={{
                                uri:
                                    "https://images.thequint.com/thequint%2F2016-05%2F3ad1ce9e-794c-4df6-9aea-5b7052f0a93c%2Fstreet%20food%20hi.jpg"
                            }}
                            resizeMode="cover"
                            style={styles.sliderImage}
                        />
                    </View>
                    <View style={styles.slide}>
                        <Image
                            source={{
                                uri:
                                    "https://www.flashpack.com/wp-content/uploads/2018/10/healthy-street-foods_featured_1352_1000.jpg"
                            }}
                            resizeMode="cover"
                            style={styles.sliderImage}
                        />
                    </View>
                    <View style={styles.slide}>
                        <Image
                            source={{
                                uri:
                                    "https://media-cdn.tripadvisor.com/media/photo-s/15/03/79/e3/otto-s-anatolian-food.jpg"
                            }}
                            resizeMode="cover"
                            style={styles.sliderImage}
                        />
                    </View>
                </Swiper>
            </View> */}

            <View style={styles.categoryContainer}>
                <TouchableOpacity style={styles.categoryBtn}>
                    <View style={styles.categoryIcon}>
                        <Ionicons name="trash" size={35} color="#FF6347" />
                    </View>
                    <Text style={styles.categoryBtnTxt}>Scarp Collector</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryBtn}>
                    <View style={styles.categoryIcon}>
                        <MaterialCommunityIcons name="fruit-pineapple" size={35} color="#FF6347" />
                    </View>
                    <Text style={styles.categoryBtnTxt}>Groceries</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
                    <View style={styles.categoryIcon}>
                        <MaterialCommunityIcons name="food" size={35} color="#FF6347" />
                    </View>
                    <Text style={styles.categoryBtnTxt}>Street Food</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.categoryContainer, { marginTop: 10 }]}>
                <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
                    <View style={styles.categoryIcon}>
                        <Fontisto name="cleaning-services" size={35} color="#FF6347" />
                    </View>
                    <Text style={styles.categoryBtnTxt}>Services</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
                    <View style={styles.categoryIcon}>
                        <Ionicons name="pencil-square-o" size={35} color="#FF6347" />
                    </View>
                    <Text style={styles.categoryBtnTxt}>Art and Craft</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
                    <View style={styles.categoryIcon}>
                        <MaterialIcons name="expand-more" size={35} color="#FF6347" />
                    </View>
                    <Text style={styles.categoryBtnTxt}>Show More</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardsWrapper}>
                <Text
                    style={{
                        alignSelf: "center",
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#333"
                    }}
                >
                    Recently Viewed
                </Text>
                <View style={styles.card}>
                    <View style={styles.cardImgWrapper}>
                        <Image
                            source={{
                                uri:
                                    "https://spoonuniversity.com/wp-content/uploads/sites/98/2016/04/Screenshot-2016-04-02-19.42.44.png"
                            }}
                            resizeMode="cover"
                            style={styles.cardImg}
                        />
                    </View>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardTitle}>Kathi Roll Waala</Text>
                        <StarRating ratings={4} reviews={99} />
                        <Text style={styles.cardDetails}>
                            Some decription for this card!
                        </Text>
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.cardImgWrapper}>
                        <Image
                            source={{
                                uri:
                                    "https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2015/08/The-best-street-food-in-Delhi-%E2%80%94-Chole-Bhature.jpg"
                            }}
                            resizeMode="cover"
                            style={styles.cardImg}
                        />
                    </View>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardTitle}>Gupta's BookStall</Text>
                        <StarRating ratings={4} reviews={99} />
                        <Text style={styles.cardDetails}>
                            Amazing description for this amazing place
                        </Text>
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.cardImgWrapper}>
                        <Image
                            source={{
                                uri:
                                    "https://spoonuniversity.com/wp-content/uploads/sites/98/2016/04/Screenshot-2016-04-02-19.42.44.png"
                            }}
                            resizeMode="cover"
                            style={styles.cardImg}
                        />
                    </View>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardTitle}>Chaai Stall</Text>
                        <StarRating ratings={4} reviews={99} />
                        <Text style={styles.cardDetails}>
                            Amazing description for this amazing place
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    sliderContainer: {
        height: 200,
        width: "90%",
        marginTop: 10,
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 8
    },

    wrapper: {},

    slide: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "transparent",
        borderRadius: 8
    },
    sliderImage: {
        height: "100%",
        width: "100%",
        alignSelf: "center",
        borderRadius: 8
    },
    categoryContainer: {
        flexDirection: "row",
        width: "90%",
        alignSelf: "center",
        marginTop: 25,
        marginBottom: 10
    },
    categoryBtn: {
        flex: 1,
        width: "30%",
        marginHorizontal: 0,
        alignSelf: "center"
    },
    categoryIcon: {
        borderWidth: 0,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: 70,
        height: 70,
        backgroundColor: "#fdeae7" /* '#FF6347' */,
        borderRadius: 50
    },
    categoryBtnTxt: {
        alignSelf: "center",
        marginTop: 5,
        color: "#de4f35"
    },
    cardsWrapper: {
        marginTop: 20,
        width: "90%",
        alignSelf: "center"
    },
    card: {
        height: 100,
        marginVertical: 10,
        flexDirection: "row",
        shadowColor: "#999",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    },
    cardImgWrapper: {
        flex: 1
    },
    cardImg: {
        height: "100%",
        width: "100%",
        alignSelf: "center",
        borderRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0
    },
    cardInfo: {
        flex: 2,
        padding: 10,
        borderColor: "#ccc",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: "#fff"
    },
    cardTitle: {
        fontWeight: "bold"
    },
    cardDetails: {
        fontSize: 12,
        color: "#444"
    }
});
