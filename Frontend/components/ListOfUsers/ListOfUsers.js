import axios from "axios";
import { Container, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, SafeAreaView, View } from "react-native";
import { Card, ListItem, Avatar } from "react-native-elements";
import { REST_API_URL } from "../../constants/URLs";

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

    return isLoading == true ? (
        <SafeAreaView>
            <View style={{ alignSelf: "center", marginTop: height / 3 }}>
                <ActivityIndicator style={{ margin: 10 }} size="large" color="blue" />
                <Text note>Loading Data...</Text>
            </View>
        </SafeAreaView>
    ) : (
        <View containerStyle={{ padding: 0 }}>
            {users.map((u, i) => (
                <Card containerStyle={{ padding: 0, margin: 0 }} key={i}>
                    <ListItem>
                        <Avatar
                            source={{
                                uri: "https://i.pravatar.cc/150?img=47"
                            }}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{u.name}</ListItem.Title>
                            {/* <ListItem.Subtitle>{u.products.length} products</ListItem.Subtitle> */}
                        </ListItem.Content>
                    </ListItem>
                </Card>
            ))}
        </View>
    );
}
