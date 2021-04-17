import { Card, ListItem } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native";

export default function VendorList() {
    return (
        <SafeAreaView>
            <Card containerStyle={{ padding: 0 }}>
                {users.map((u, i) => (
                    <ListItem key={i} />
                ))}
            </Card>
        </SafeAreaView>
    );
}
