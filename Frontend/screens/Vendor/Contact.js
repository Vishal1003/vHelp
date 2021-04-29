import { Card, Header, ListItem } from "native-base";
import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import ListOfUsers from "../../components/ListOfUsers/ListOfUsers";

export default function Contact() {
    return (
        <ScrollView>
            <ListOfUsers />
        </ScrollView>
    );
}
