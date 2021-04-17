import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Button,
    ToastAndroid
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Item, Picker } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import FormContainer from "../../components/Shared/FormContainer";
import Input from "../../components/Shared/Input";

const categories = require("../../assets/data/categories.json");

export default function ProductForm(props) {
    const [pickerValue, setPickerValue] = useState();
    const [name, setName] = useState();
    const [cost, setCost] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [category, setCategory] = useState();
    const [item, setItem] = useState(null);

    React.useEffect(() => {
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
    }, []);

    const pickCameraImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1
        });
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const pickGalleryImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
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
    return (
        <FormContainer title="Add Product">
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: image }} />
                <TouchableOpacity onPress={pickGalleryImage} style={styles.imagePicker}>
                    <Icon style={{ color: "white" }} name="camera" />
                </TouchableOpacity>
            </View>
            <View style={styles.label}>
                <Text>Name</Text>
            </View>
            <Input
                placeholder="Name"
                name="name"
                id="name"
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <View style={styles.label}>
                <Text>Cost</Text>
            </View>
            <Input
                placeholder="Cost"
                name="cost"
                id="cost"
                value={cost}
                keyboardType={"numeric"}
                onChangeText={(text) => setCost(text)}
            />
            <View style={styles.label}>
                <Text>Description</Text>
            </View>
            <Input
                placeholder="Description"
                name="description"
                id="description"
                value={description}
                onChangeText={(text) => setDescription(text)}
            />
            <Item picker>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
                    style={{ width: undefined }}
                    placeholder="Select your Category"
                    selectedValue={pickerValue}
                    placeholderStyle={{ color: "#007aff" }}
                    placeholderIconColor="#007aff"
                    onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
                >
                    {categories.map((c) => {
                        return <Picker.Item key={c._id.$oid} label={c.name} value={c.name} />;
                    })}
                </Picker>
            </Item>
            {/* {err ? <Error message={err} /> : null} */}
            <TouchableOpacity onPress={() => addProduct()} style={styles.buttonContainer}>
                <Text style={styles.buttonText}>CONFIRM</Text>
            </TouchableOpacity>
        </FormContainer>
    );
}

const styles = StyleSheet.create({
    label: {
        width: "80%",
        marginTop: 10
    },
    buttonContainer: {
        width: "80%",
        marginBottom: 80,
        marginTop: 20,
        padding: 10,
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "#03bafc"
    },
    buttonText: {
        color: "white",
        fontWeight: "bold"
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderStyle: "solid",
        borderWidth: 8,
        padding: 0,
        justifyContent: "center",
        borderRadius: 100,
        borderColor: "#a0e1eb",
        elevation: 10
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 100
    },
    imagePicker: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "#a0e1eb",
        padding: 8,
        borderRadius: 100,
        elevation: 20
    }
});
