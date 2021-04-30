import { Header, Left, Button, Body, Right } from "native-base";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Avatar, Title } from "react-native-paper";

export default function UserDetail(props) {

    const user = props.user;

    return (
        <SafeAreaView>
            <Header style={{ backgroundColor: "#fff" }}>
                <Left>
                    <Button transparent onPress={() => props.navigation.goBack()}>
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



        </SafeAreaView>
    );
}
