const restaurantMenuData = [
    {
        restaurantId: "rajasthani-rasoi",
        foods: [
            ["Rajasthani Mirchi Vada", "Starter", 149, 4.6],
            ["Dal Baati Churma", "Main Course", 249, 4.9],
            ["Gatte Ki Sabzi", "Main Course", 199, 4.7],
            ["Ker Sangri", "Main Course", 219, 4.6],
            ["Bajra Roti", "Main Course", 99, 4.5],
            ["Rajasthani Kadhi", "Main Course", 159, 4.6],
            ["Papad Ki Sabzi", "Main Course", 149, 4.5],
            ["Mawa Kachori", "Dessert", 129, 4.7],
            ["Rajasthani Veg Biryani", "Biryani", 249, 4.7],
            ["Kesar Ice Cream", "Ice Cream", 119, 4.6]
        ]
    },

    {
        restaurantId: "gujarati-thali-house",
        foods: [
            ["Khandvi", "Starter", 139, 4.5],
            ["Gujarati Thali", "Main Course", 299, 4.8],
            ["Sev Tameta", "Main Course", 169, 4.5],
            ["Undhiyu", "Main Course", 219, 4.7],
            ["Dal Dhokli", "Main Course", 179, 4.6],
            ["Gujarati Kadhi", "Main Course", 149, 4.6],
            ["Thepla", "Main Course", 99, 4.5],
            ["Mohanthal", "Dessert", 139, 4.7],
            ["Gujarati Veg Biryani", "Biryani", 239, 4.5],
            ["Rajbhog Ice Cream", "Ice Cream", 129, 4.7]
        ]
    },

    {
        restaurantId: "punjabi-zaika",
        foods: [
            ["Paneer Pakora", "Starter", 179, 4.5],
            ["Dal Makhani", "Main Course", 219, 4.6],
            ["Paneer Butter Masala", "Main Course", 249, 4.7],
            ["Chole Punjabi", "Main Course", 179, 4.5],
            ["Amritsari Kulcha", "Main Course", 169, 4.6],
            ["Rajma Masala", "Main Course", 189, 4.5],
            ["Jeera Rice", "Rice", 139, 4.4],
            ["Gajar Halwa", "Dessert", 139, 4.6],
            ["Punjabi Veg Biryani", "Biryani", 259, 4.6],
            ["Kulfi Ice Cream", "Ice Cream", 119, 4.7]
        ]
    },

    {
        restaurantId: "bengal-bhojan",
        foods: [
            ["Beguni", "Starter", 129, 4.4],
            ["Aloo Posto", "Main Course", 179, 4.5],
            ["Shukto", "Main Course", 169, 4.3],
            ["Cholar Dal", "Main Course", 159, 4.4],
            ["Luchi", "Main Course", 119, 4.5],
            ["Dhokar Dalna", "Main Course", 189, 4.5],
            ["Basanti Pulao", "Rice", 179, 4.4],
            ["Mishti Doi", "Dessert", 99, 4.6],
            ["Bengali Veg Biryani", "Biryani", 249, 4.5],
            ["Mango Ice Cream", "Ice Cream", 109, 4.5]
        ]
    },

    {
        restaurantId: "south-spice-kitchen",
        foods: [
            ["Medu Vada", "Starter", 129, 4.5],
            ["Masala Dosa", "Main Course", 149, 4.7],
            ["Idli Sambar", "Main Course", 109, 4.6],
            ["Podi Idli", "Main Course", 119, 4.5],
            ["Vegetable Uttapam", "Main Course", 159, 4.6],
            ["Ven Pongal", "Main Course", 139, 4.5],
            ["Curd Rice", "Rice", 119, 4.4],
            ["Mysore Pak", "Dessert", 109, 4.6],
            ["South Indian Veg Biryani", "Biryani", 239, 4.6],
            ["Tender Coconut Ice Cream", "Ice Cream", 139, 4.7]
        ]
    },

    {
        restaurantId: "maharashtra-tadka",
        foods: [
            ["Kothimbir Vadi", "Starter", 139, 4.5],
            ["Misal Pav", "Main Course", 159, 4.6],
            ["Pav Bhaji", "Main Course", 179, 4.7],
            ["Bharli Vangi", "Main Course", 189, 4.5],
            ["Pithla Bhakri", "Main Course", 199, 4.6],
            ["Batata Bhaji", "Main Course", 139, 4.4],
            ["Vangyache Bharit", "Main Course", 169, 4.5],
            ["Puran Poli", "Dessert", 119, 4.7],
            ["Maharashtrian Veg Biryani", "Biryani", 239, 4.5],
            ["Mango Ice Cream", "Ice Cream", 109, 4.5]
        ]
    },

    {
        restaurantId: "kashmir-valley-kitchen",
        foods: [
            ["Kashmiri Aloo", "Starter", 159, 4.4],
            ["Dum Aloo Kashmiri", "Main Course", 199, 4.6],
            ["Rajma Gogji", "Main Course", 189, 4.4],
            ["Nadru Yakhni", "Main Course", 219, 4.5],
            ["Haak Saag", "Main Course", 169, 4.4],
            ["Kashmiri Pulao", "Rice", 189, 4.6],
            ["Modur Pulao", "Rice", 179, 4.5],
            ["Phirni", "Dessert", 119, 4.6],
            ["Kashmiri Veg Biryani", "Biryani", 259, 4.6],
            ["Saffron Ice Cream", "Ice Cream", 149, 4.7]
        ]
    },

    {
        restaurantId: "awadhi-dastarkhwan",
        foods: [
            ["Galouti Style Veg Kebab", "Starter", 219, 4.6],
            ["Awadhi Paneer Korma", "Main Course", 249, 4.7],
            ["Subz Korma", "Main Course", 229, 4.5],
            ["Awadhi Dal", "Main Course", 179, 4.5],
            ["Sheermal Roti", "Main Course", 119, 4.4],
            ["Roomali Roti", "Main Course", 99, 4.5],
            ["Awadhi Pulao", "Rice", 189, 4.6],
            ["Shahi Tukda", "Dessert", 139, 4.7],
            ["Awadhi Veg Biryani", "Biryani", 269, 4.8],
            ["Kesar Ice Cream", "Ice Cream", 129, 4.6]
        ]
    },

    {
        restaurantId: "hyderabadi-nizams-kitchen",
        foods: [
            ["Mirchi Bajji", "Starter", 129, 4.4],
            ["Bagara Baingan", "Main Course", 189, 4.5],
            ["Mirchi Ka Salan", "Main Course", 179, 4.4],
            ["Paneer Shahi Korma", "Main Course", 239, 4.6],
            ["Hyderabadi Khatti Dal", "Main Course", 169, 4.5],
            ["Veg Double Ka Meetha", "Dessert", 129, 4.6],
            ["Bagara Rice", "Rice", 159, 4.5],
            ["Qubani Sweet", "Dessert", 139, 4.5],
            ["Hyderabadi Veg Biryani", "Biryani", 259, 4.8],
            ["Pista Ice Cream", "Ice Cream", 129, 4.6]
        ]
    },

    {
        restaurantId: "goan-coastal-bites",
        foods: [
            ["Goan Veg Cutlet", "Starter", 149, 4.3],
            ["Vegetable Xacuti", "Main Course", 219, 4.5],
            ["Goan Kaju Curry", "Main Course", 229, 4.6],
            ["Veg Cafreal", "Main Course", 199, 4.4],
            ["Goan Dal", "Main Course", 159, 4.3],
            ["Poi Bread", "Main Course", 89, 4.4],
            ["Coconut Rice", "Rice", 169, 4.5],
            ["Bebinca", "Dessert", 129, 4.6],
            ["Goan Veg Biryani", "Biryani", 249, 4.5],
            ["Coconut Ice Cream", "Ice Cream", 139, 4.7]
        ]
    },

    {
        restaurantId: "kerala-coconut-kitchen",
        foods: [
            ["Banana Fritters", "Starter", 119, 4.5],
            ["Avial", "Main Course", 189, 4.6],
            ["Kerala Vegetable Stew", "Main Course", 199, 4.5],
            ["Kadala Curry", "Main Course", 169, 4.4],
            ["Thoran", "Main Course", 159, 4.5],
            ["Appam", "Main Course", 129, 4.6],
            ["Lemon Rice", "Rice", 139, 4.4],
            ["Palada Payasam", "Dessert", 119, 4.7],
            ["Kerala Veg Biryani", "Biryani", 249, 4.6],
            ["Tender Coconut Ice Cream", "Ice Cream", 139, 4.7]
        ]
    },

    {
        restaurantId: "bihar-swad-ghar",
        foods: [
            ["Litti Chokha", "Starter", 159, 4.5],
            ["Sattu Paratha", "Main Course", 149, 4.4],
            ["Bihari Aloo", "Main Course", 139, 4.3],
            ["Ghugni", "Main Course", 129, 4.4],
            ["Dal Pitha", "Main Course", 159, 4.3],
            ["Bharbhara", "Main Course", 119, 4.2],
            ["Jeera Rice", "Rice", 129, 4.3],
            ["Thekua", "Dessert", 99, 4.5],
            ["Bihari Veg Biryani", "Biryani", 229, 4.4],
            ["Kulfi Ice Cream", "Ice Cream", 119, 4.5]
        ]
    }
];


restaurantMenuData.forEach(function (restaurantMenu) {
    restaurantMenu.foods =
        restaurantMenu.foods.map(function (food, index) {
            const restaurantId =
                restaurantMenu.restaurantId;

            const foodId =
                restaurantId +
                "-food-" +
                String(index + 1).padStart(2, "0");

            return {
                id: foodId,
                name: food[0],
                category: food[1],
                price: food[2],
                rating: food[3],
                image:
                    "images/restaurant-food/" +
                    restaurantId +
                    "/" +
                    foodId +
                    ".png"
            };
        });
});