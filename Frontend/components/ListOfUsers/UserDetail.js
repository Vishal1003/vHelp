import { Header, Left, Button, Body, Right, Text, Row, Col } from "native-base";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, Linking, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Title } from "react-native-paper";
import { ListItem } from "react-native-elements";

const { height, width } = Dimensions.get("window");
const colors = require("../../constants/Color");

export default function UserDetail(props) {
    const [user, setUser] = useState(props.route.params.user);

    const message = "Hi I want to buy a few products from you!";

    useEffect(() => {
        console.log(user);
    });

    const openCallDialer = (phone) => {
        Linking.openURL(`tel:${phone}`);
    };

    const openMessageApp = (phone) => {
        Linking.openURL(`whatsapp://send?phone=+91${phone}&text=${message}`);
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
                            style={styles.listItemStyle}
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

                        <View style={styles.contactIcon}>
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
            </SafeAreaView>
            {/* <Grid>
                <Row style={styles.topcontainer}>
                    <Col>
                        <Image style={styles.image} source={{ uri: `${user.imageUrl}` }} />
                    </Col>
                    <Col>
                        <Image style={styles.image} source={{ uri: `${user.imageUrl}` }} />
                    </Col>
                </Row>
                <Row></Row>
            </Grid> */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    topcontainer: {
        backgroundColor: "gainsboro"
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
        width: "100%"
    },
    verticleLine: {
        height: "100%",
        width: 1,
        backgroundColor: "#909090"
    },

    iconStyle: {
        color: colors.dark,
        textAlign: 'center',
        width: 50,
        shadowOpacity: 2,
        textShadowRadius: 10,
        textShadowOffset: { width: 3, height: 3 }
    },

    listItemStyle: {
        elevation: 2,
        marginTop: 5
    }
});
