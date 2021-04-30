import { Card, Header, ListItem } from "native-base";
import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import ListOfUsers from "../../components/ListOfUsers/ListOfUsers";

export default function Contact({ navigation }) {
    return (
        <ScrollView>
            <ListOfUsers navigation={navigation} />
        </ScrollView>
    );
}
