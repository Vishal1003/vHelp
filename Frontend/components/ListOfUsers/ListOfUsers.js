import axios from "axios";
import { Header, Text, Item, Input, Icon } from "native-base";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View
} from "react-native";
import { REST_API_URL } from "../../constants/URLs";
import UserCard from "./UserCard";

export default function ListOfUsers({ navigation }) {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState();
    const [focus, setfocus] = useState(false);

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

    return (
        <SafeAreaView>
            <Header searchBar rounded style={{ backgroundColor: "#F8F8F8" }}>
                <Item style={{ backgroundColor: "#E8E8E8", borderRadius: 20 }}>
                    <Icon name="ios-search" />
                    <Input
                        placeholder="Search"
                        // onChangeText={(text) => searchProduct(text)}
                    />
                    {focus == true ? <Icon name="ios-close" /> : null}
                </Item>
            </Header>
            {!isLoading ? (
                <ScrollView containerStyle={{ padding: 0 }}>
                    {users.map((u, i) => {
                        return <UserCard key={i} user={u} navigation={navigation} />;
                    })}
                </ScrollView>
            ) : (
                <SafeAreaView>
                    <View style={{ alignSelf: "center", marginTop: height / 2 }}>
                        <ActivityIndicator style={{ margin: 10 }} size="large" color="blue" />
                        <Text note>Loading Data...</Text>
                    </View>
                </SafeAreaView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
