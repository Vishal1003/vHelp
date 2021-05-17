import React, { useContext, useEffect } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import StarRating from "./StarRating";
import { Content, Card, CardItem, Text, Icon, Left, Body, Right } from "native-base";
import ThemeContext from "../../context/ThemeContext";

const { height } = Dimensions.get("window");

export default function ProductCard(props) {
    const { name, cost, imageUrl, seller, description } = props;
    const themeContext = useContext(ThemeContext);
    return (
        <Content>
            <Card
                style={{
                    elevation: 5
                }}
            >
                <CardItem
                    style={{ backgroundColor: themeContext[themeContext.current_theme].background }}
                >
                    <Body>
                        <Text
                            style={{
                                color: themeContext[themeContext.current_theme].foreground,
                                fontWeight: "bold"
                            }}
                        >
                            {name}
                        </Text>
                        <Text
                            style={{ color: themeContext[themeContext.current_theme].foreground }}
                            note
                        >
                            @{seller.name}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem cardBody>
                    <Image
                        source={{ uri: imageUrl }}
                        style={{ height: height / 4, width: null, flex: 1 }}
                    />
                </CardItem>
                <CardItem
                    style={{ backgroundColor: themeContext[themeContext.current_theme].background }}
                >
                    <Left>
                        <StarRating ratings={4} reviews={99} />
                    </Left>
                    <Right>
                        <Icon active name="chatbubbles" />
                    </Right>
                </CardItem>
                <CardItem
                    style={{ backgroundColor: themeContext[themeContext.current_theme].background }}
                >
                    <Text
                        style={{ color: themeContext[themeContext.current_theme].foreground }}
                        note
                    >
                        Price :{" "}
                    </Text>
                    <Text
                        style={{
                            color: themeContext[themeContext.current_theme].foreground,
                            fontWeight: "bold"
                        }}
                    >
                        ₹ {cost}
                    </Text>
                </CardItem>
                <CardItem
                    style={{ backgroundColor: themeContext[themeContext.current_theme].background }}
                >
                    <Text style={{ color: themeContext[themeContext.current_theme].foreground }}>
                        {description}
                    </Text>
                </CardItem>
            </Card>
        </Content>
    );
}

const styles = StyleSheet.create({
    container: {
        height: (3 * height) / 4 - 50,
        backgroundColor: "gainsboro"
    }
});
