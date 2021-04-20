import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform,
    ToastAndroid
} from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

import * as ImagePicker from "expo-image-picker";
import * as Font from "expo-font";

import { Body, Button, Container, Header, Item, Left, Picker, Right, Title } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import FormContainer from "../../components/Shared/FormContainer";
import Input from "../../components/Shared/Input";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const customColor = require("../../constants/Color");

const categories = require("../../assets/data/categories.json");

export default function ProductForm(props) {
    const [pickerValue, setPickerValue] = useState();
    const [name, setName] = useState();
    const [cost, setCost] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [category, setCategory] = useState();
    const [item, setItem] = useState(null);
    useEffect(() => {
        if (!props.route.params) {
            // Adding
            setItem(null);
        } else {
            // Updating
            setItem(props.route.params.item);
            setName(props.route.params.item.name);
            setCost(props.route.params.item.cost.toString());
            setDescription(props.route.params.item.description);
            setImage(props.route.params.item.image);
            setCategory(props.route.params.item.category);
            setLongDesc(props.route.params.item.longdesc);
        }
        // Image Picker
        (async () => {
            if (Platform.OS !== "web") {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert("Sorry, we need camera roll permissions to make this work!");
                }
            }
        })();

        // Font error
        (async () =>
            await Font.loadAsync({
                Roboto: require("native-base/Fonts/Roboto.ttf"),
                Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
            }))();
    }, []);

    const takePhotoFromCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) setImage(result.uri);
    };

    const choosePhotoFromLibrary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const addProduct = () => {
        if (name == "" || cost == "" || description == "" || image === undefined) {
            ToastAndroid.show("Please fill out the form completely", ToastAndroid.SHORT);
        }
    };

    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{ alignItems: "center" }}>
                <Text style={styles.panelTitle}>Upload Photo</Text>
                <Text style={styles.panelSubtitle}>
                    Choose the photo that describes your product the best!
                </Text>
            </View>
            <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
                <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
                <Text style={styles.panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={() => bs.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    );

    const bs = useRef();
    const fall = new Animated.Value(1);

    return (
        <Container>
            <Header style={{ backgroundColor: "#fff" }}>
                <Left>
                    <Button transparent>
                        <MaterialCommunityIcons name="arrow-left" size={25} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ color: "#000", fontWeight: "400" }}>Create Product</Title>
                </Body>
                <Right>
                    <Button transparent></Button>
                </Right>
            </Header>
            <Animated.View
                style={{
                    opacity: Animated.add(0.1, Animated.multiply(fall, 1.0))
                }}
            >
                <FormContainer>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: image }} />
                        <TouchableOpacity
                            onPress={() => bs.current.snapTo(0)}
                            style={styles.imagePicker}
                        >
                            <Icon style={{ color: "white" }} name="camera" />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.label, { marginTop: 20 }]}>
                        <Text>Name of the Product</Text>
                    </View>
                    <Input
                        placeholder="Name"
                        name="name"
                        id="name"
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                    <View style={styles.label}>
                        <Text>Price (INR)</Text>
                    </View>
                    <Input
                        placeholder="Price"
                        name="cost"
                        id="cost"
                        value={cost}
                        keyboardType={"numeric"}
                        onChangeText={(text) => setCost(text)}
                    />

                    <View style={styles.label}>
                        <Text>Description (Short Desc)</Text>
                    </View>
                    <Input
                        placeholder="Description (50 words)"
                        name="description"
                        id="description"
                        value={description}
                        multiline={true}
                        numOfLine={2}
                        onChangeText={(text) => setDescription(text)}
                    />

                    <View style={styles.label}>
                        <Text>Select Category</Text>
                    </View>
                    <Item picker style={{width:"80%"}}>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
                            placeholder="Select your Category"
                            style={{ width: Platform.OS === "ios" ? undefined : 120 }}
                            selectedValue={pickerValue}
                            onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
                            style={{ height: 40 }}
                        >
                            {categories.map((c) => {
                                return <Picker.Item key={c._id} label={c.name} value={c.name} />;
                            })}
                        </Picker>
                    </Item>

                    {/* {err ? <Error message={err} /> : null} */}
                    <TouchableOpacity
                        onPress={() => addProduct()}
                        style={[styles.buttonContainer, { marginTop: 20 }]}
                    >
                        <Text style={styles.buttonText}>CONFIRM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {}}
                        style={[
                            styles.buttonContainer,
                            { backgroundColor: customColor.medium, marginBottom: 80 }
                        ]}
                    >
                        <Text style={styles.buttonText}>CANCEL</Text>
                    </TouchableOpacity>
                </FormContainer>
            </Animated.View>
            <BottomSheet
                ref={bs}
                snapPoints={[330, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
            />
        </Container>
    );
}

const styles = StyleSheet.create({
    label: {
        width: "80%",
        marginTop: 10
    },
    buttonContainer: {
        width: "85%",
        marginTop: 10,
        padding: 15,
        alignItems: "center",
        textAlign: "center",
        borderRadius: 10,
        backgroundColor: customColor.dark
    },
    buttonText: {
        color: "white",
        fontWeight: "bold"
    },
    imageContainer: {
        width: 300,
        height: 200,
        borderStyle: "solid",
        borderWidth: 2,
        padding: 0,
        justifyContent: "center",
        borderRadius: 10,
        borderColor: customColor.medium,
        elevation: 5
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10
    },
    imagePicker: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: customColor.dark,
        padding: 8,
        borderRadius: 100,
        elevation: 20
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#00008B",
        alignItems: "center",
        marginTop: 10
    },
    panel: {
        padding: 20,
        backgroundColor: "#FFFFFF",
        paddingTop: 20
    },
    header: {
        backgroundColor: "#FFFFFF",
        shadowColor: "#333333",
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    panelHeader: {
        alignItems: "center"
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#00000040",
        marginBottom: 10
    },
    panelTitle: {
        fontSize: 27,
        height: 35
    },
    panelSubtitle: {
        fontSize: 14,
        color: "gray",
        height: 30,
        marginBottom: 10
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: "#00008B",
        alignItems: "center",
        marginVertical: 7
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: "bold",
        color: "white"
    },
    action: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
        paddingBottom: 5
    },
    actionError: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#FF0000",
        paddingBottom: 5
    }
});
