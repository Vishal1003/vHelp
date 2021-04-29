import axios from "axios";
import { Body, Header, Left, Right, Text, Title, Button } from "native-base";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Linking
} from "react-native";
import { Card, ListItem, Avatar } from "react-native-elements";
import { REST_API_URL } from "../../constants/URLs";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ListOfUsers(props) {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState();

    const { height } = Dimensions.get("screen");

    useEffect(() => {
        const fetchAPI = async () => {
            setIsLoading(true);
            let res = await axios.get(`${REST_API_URL}/api/index/vendors`);
            if (res.data.success === true) {
                setUsers(res.data.vendors);
            } else {
                throw new Error(res.data.message);
            }
            setIsLoading(false);
        };

        fetchAPI();
        setIsLoading(false);
    }, []);

    const openCallDialer = (phone) => {
        Linking.openURL(`tel:${phone}`);
    };

    return (
        <SafeAreaView>
            <Header style={{ backgroundColor: "#fff" }}>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={25} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ color: "#000" }}>Verified Vendors</Title>
                </Body>
                <Right>
                    <Button transparent></Button>
                </Right>
            </Header>

            {isLoading && (
                <SafeAreaView>
                    <View style={{ alignSelf: "center", marginTop: height / 2 }}>
                        <ActivityIndicator style={{ margin: 10 }} size="large" color="blue" />
                        <Text note>Loading Data...</Text>
                    </View>
                </SafeAreaView>
            )}

            {!isLoading && (
                <ScrollView containerStyle={{ padding: 0 }}>
                    {users.map((u, i) => (
                        <Card containerStyle={{ padding: 0, margin: 0 }} key={i}>
                            <ListItem>
                                <Avatar
                                    source={{
                                        uri:
                                            u.imageUrl === undefined
                                                ? "https://i.pravatar.cc/150?img=30"
                                                : u.imageUrl
                                    }}
                                />
                                <ListItem.Content>
                                    <ListItem.Title>{u.name}</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron
                                    iconProps={{ name: "phone", size: 20, color: "#843" }}
                                    onPress={() => openCallDialer(u.contact)}
                                />
                                <ListItem.Chevron iconProps={{ color: "#fff" }} />
                                <ListItem.Chevron iconStyle={{ color: "#000", fontSize: 20 }} />
                            </ListItem>
                        </Card>
                    ))}
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
