import React from "react";
import { Container, Content, Card, CardItem } from "native-base";

export default function ProductCard(props) {
    return (
        <Container>
            <Content>
                <Card>
                    <CardItem></CardItem>
                    <CardItem cardBody></CardItem>
                </Card>
            </Content>
        </Container>
    );
}
