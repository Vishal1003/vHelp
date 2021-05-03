import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Dimensions, View, ScrollView } from "react-native";
import Swiper from "react-native-swiper/src";

const { width } = Dimensions.get("window");

const Banner = () => {
    const [bannerData, setBannerData] = useState([]);

    useEffect(() => {
        setBannerData([
            "https://i.pinimg.com/originals/02/cd/62/02cd62d565293133bae12496bf9a519e.jpg",
            "https://us.123rf.com/450wm/leya1703/leya17032103/leya1703210300007/166372479-traditional-indian-food-on-white-background-horizontal-flyer-vector-illustration-doodle-black-and-wh.jpg?ver=6",
            "https://www.yardproduct.com/blog/wp-content/uploads/2016/01/gardening-banner.jpg"
        ]);

        return () => {
            setBannerData([]);
        };
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.swiper}>
                    <Swiper
                        style={{ height: width / 2 }}
                        showButtons={false}
                        autoplay={true}
                        autoplayTimeout={2}
                    >
                        {bannerData.map((item) => {
                            return (
                                <Image
                                    key={item}
                                    style={styles.imageBanner}
                                    resizeMode="contain"
                                    source={{ uri: item }}
                                />
                            );
                        })}
                    </Swiper>
                    <View style={{ height: 20 }}></View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "gainsboro"
    },
    swiper: {
        width: width,
        alignItems: "center",
        marginTop: 10
    },
    imageBanner: {
        height: width / 2,
        width: width - 40,
        borderRadius: 10,
        marginHorizontal: 20
    }
});

export default Banner;
