const Images = [
    {
        image: require("../images/image1.jpg")
    },
    {
        image: require("../images/image2.png")
    },
    {
        image: require("../images/image3.jpg")
    },
    { image: require("../images/image4.webp") }
];

export const markers = [
    {
        coordinate: {
            latitude: 22.6293867,
            longitude: 88.4354486
        },
        title: "Er. Ramesh Shop",
        description: "Repair your electronics products here!",
        image: Images[0].image,
        rating: 4,
        reviews: 83
    },
    {
        coordinate: {
            latitude: 22.6345648,
            longitude: 88.4377279
        },
        title: "Grocery Store",
        description: "Buy anything or everything at cheapest price!",
        image: Images[1].image,
        rating: 3,
        reviews: 102
    },
    {
        coordinate: {
            latitude: 22.6281662,
            longitude: 88.4410113
        },
        title: "Food Corner",
        description: "Best place for snacks out there!",
        image: Images[2].image,
        rating: 4,
        reviews: 220
    },
    {
        coordinate: {
            latitude: 22.6341137,
            longitude: 88.4497463
        },
        title: "House Repair",
        description: "Repair any house product here!",
        image: Images[3].image,
        rating: 4,
        reviews: 48
    },
    {
        coordinate: {
            latitude: 22.6292757,
            longitude: 88.444781
        },
        title: "Amazing Food Place",
        description: "This is the best food place",
        image: Images[3].image,
        rating: 2,
        reviews: 178
    }
];

export const mapStandardStyle = [
    {
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    }
];
