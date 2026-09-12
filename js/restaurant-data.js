const restaurantData = [
    {
        id: "rajasthani-rasoi",
        name: "Rajasthani Rasoi",
        cuisine: "Rajasthani Vegetarian",
        location: "Jaipur, Rajasthan",
        rating: 4.9,
        openingTime: "11:00 AM",
        closingTime: "11:00 PM",
        address: "MI Road, Jaipur, Rajasthan, India",
        description:
            "Authentic vegetarian flavours inspired by the rich culinary traditions of Rajasthan.",
        outsideImage:
            "images/restaurants/rajasthani-rasoi-outside.png",
        insideImage:
            "images/restaurants/rajasthani-rasoi-inside.png"
    },

    {
        id: "gujarati-thali-house",
        name: "Gujarati Thali House",
        cuisine: "Gujarati Vegetarian",
        location: "Ahmedabad, Gujarat",
        rating: 4.8,
        openingTime: "11:00 AM",
        closingTime: "10:30 PM",
        address: "CG Road, Ahmedabad, Gujarat, India",
        description:
            "Traditional Gujarati vegetarian dining with authentic regional flavours and a warm dining experience.",
        outsideImage:
            "images/restaurants/gujarati-thali-house-outside.png",
        insideImage:
            "images/restaurants/gujarati-thali-house-inside.png"
    },

    {
        id: "punjabi-zaika",
        name: "Punjabi Zaika",
        cuisine: "Punjabi Vegetarian",
        location: "Amritsar, Punjab",
        rating: 4.4,
        openingTime: "11:00 AM",
        closingTime: "11:00 PM",
        address: "Lawrence Road, Amritsar, Punjab, India",
        description:
            "Rich Punjabi vegetarian flavours served with traditional recipes and homestyle warmth.",
        outsideImage:
            "images/restaurants/punjabi-zaika-outside.png",
        insideImage:
            "images/restaurants/punjabi-zaika-inside.png"
    },

    {
        id: "bengal-bhojan",
        name: "Bengal Bhojan",
        cuisine: "Bengali Vegetarian",
        location: "Kolkata, West Bengal",
        rating: 4.2,
        openingTime: "12:00 PM",
        closingTime: "10:30 PM",
        address: "Park Street, Kolkata, West Bengal, India",
        description:
            "A vegetarian Bengali dining experience inspired by traditional flavours and regional recipes.",
        outsideImage:
            "images/restaurants/bengal-bhojan-outside.png",
        insideImage:
            "images/restaurants/bengal-bhojan-inside.png"
    },

    {
        id: "south-spice-kitchen",
        name: "South Spice Kitchen",
        cuisine: "South Indian Vegetarian",
        location: "Chennai, Tamil Nadu",
        rating: 4.7,
        openingTime: "7:00 AM",
        closingTime: "11:00 PM",
        address: "Anna Nagar, Chennai, Tamil Nadu, India",
        description:
            "Fresh South Indian vegetarian dishes prepared with traditional spices and authentic techniques.",
        outsideImage:
            "images/restaurants/south-spice-kitchen-outside.png",
        insideImage:
            "images/restaurants/south-spice-kitchen-inside.png"
    },

    {
        id: "maharashtra-tadka",
        name: "Maharashtra Tadka",
        cuisine: "Maharashtrian Vegetarian",
        location: "Pune, Maharashtra",
        rating: 4.6,
        openingTime: "11:00 AM",
        closingTime: "10:30 PM",
        address: "FC Road, Pune, Maharashtra, India",
        description:
            "Authentic Maharashtrian vegetarian food featuring traditional spices and comforting flavours.",
        outsideImage:
            "images/restaurants/maharashtra-tadka-outside.png",
        insideImage:
            "images/restaurants/maharashtra-tadka-inside.png"
    },

    {
        id: "kashmir-valley-kitchen",
        name: "Kashmir Valley Kitchen",
        cuisine: "Kashmiri Vegetarian",
        location: "Srinagar, Kashmir",
        rating: 4.1,
        openingTime: "12:00 PM",
        closingTime: "10:00 PM",
        address: "Residency Road, Srinagar, Kashmir, India",
        description:
            "A warm Kashmiri vegetarian dining experience inspired by traditional valley cuisine.",
        outsideImage:
            "images/restaurants/kashmir-valley-kitchen-outside.png",
        insideImage:
            "images/restaurants/kashmir-valley-kitchen-inside.png"
    },

    {
        id: "awadhi-dastarkhwan",
        name: "Awadhi Dastarkhwan",
        cuisine: "Awadhi Vegetarian",
        location: "Lucknow, Uttar Pradesh",
        rating: 4.5,
        openingTime: "11:30 AM",
        closingTime: "11:00 PM",
        address: "Hazratganj, Lucknow, Uttar Pradesh, India",
        description:
            "Elegant vegetarian Awadhi cuisine inspired by the royal culinary traditions of Lucknow.",
        outsideImage:
            "images/restaurants/awadhi-dastarkhan-outside.png",
        insideImage:
            "images/restaurants/awadhi-dastarkhan-inside.png"
    },

    {
        id: "hyderabadi-nizams-kitchen",
        name: "Hyderabadi Nizam's Kitchen",
        cuisine: "Hyderabadi Vegetarian",
        location: "Hyderabad, Telangana",
        rating: 4.3,
        openingTime: "11:00 AM",
        closingTime: "11:00 PM",
        address: "Banjara Hills, Hyderabad, Telangana, India",
        description:
            "Flavourful vegetarian Hyderabadi dishes inspired by the royal kitchens of the Deccan.",
        outsideImage:
            "images/restaurants/hyderabadi-nizams-kitchen-outside.png",
        insideImage:
            "images/restaurants/hyderabadi-nizams-kitchen-inside.png"
    },

    {
        id: "goan-coastal-bites",
        name: "Goan Coastal Bites",
        cuisine: "Goan Vegetarian",
        location: "Panaji, Goa",
        rating: 4.0,
        openingTime: "12:00 PM",
        closingTime: "10:30 PM",
        address: "Miramar Road, Panaji, Goa, India",
        description:
            "A colourful Goan vegetarian experience featuring coastal flavours and local ingredients.",
        outsideImage:
            "images/restaurants/goan-coastal-bites-outside.png",
        insideImage:
            "images/restaurants/goan-coastal-bites-inside.png"
    },

    {
        id: "kerala-coconut-kitchen",
        name: "Kerala Coconut Kitchen",
        cuisine: "Kerala Vegetarian",
        location: "Kochi, Kerala",
        rating: 4.4,
        openingTime: "7:30 AM",
        closingTime: "10:30 PM",
        address: "MG Road, Kochi, Kerala, India",
        description:
            "Authentic Kerala vegetarian dishes prepared with coconut, spices and traditional recipes.",
        outsideImage:
            "images/restaurants/kerala-coconut-kitchen-outside.png",
        insideImage:
            "images/restaurants/kerala-coconut-kitchen-inside.png"
    },

    {
        id: "bihar-swad-ghar",
        name: "Bihar Swad Ghar",
        cuisine: "Bihari Vegetarian",
        location: "Patna, Bihar",
        rating: 3.9,
        openingTime: "11:00 AM",
        closingTime: "10:00 PM",
        address: "Fraser Road, Patna, Bihar, India",
        description:
            "Traditional Bihari vegetarian food prepared with authentic regional flavours.",
        outsideImage:
            "images/restaurants/bihar-swad-ghar-outside.png",
        insideImage:
            "images/restaurants/bihar-swad-ghar-inside.png"
    }
];