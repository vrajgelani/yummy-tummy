"use strict";

const menuFoods = [
    // =========================
    // 1. STARTERS
    // =========================
    {
        id: "starter-01",
        name: "Paneer Tikka",
        category: "starters",
        categoryName: "Starters",
        price: 249,
        rating: 4.6
    },
    {
        id: "starter-02",
        name: "Veg Spring Rolls",
        category: "starters",
        categoryName: "Starters",
        price: 199,
        rating: 4.5
    },
    {
        id: "starter-03",
        name: "Hara Bhara Kebab",
        category: "starters",
        categoryName: "Starters",
        price: 219,
        rating: 4.7
    },
    {
        id: "starter-04",
        name: "Cheese Corn Balls",
        category: "starters",
        categoryName: "Starters",
        price: 229,
        rating: 4.6
    },
    {
        id: "starter-05",
        name: "Crispy Veg Fingers",
        category: "starters",
        categoryName: "Starters",
        price: 189,
        rating: 4.5
    },

    // =========================
    // 2. PIZZA
    // =========================
    {
        id: "pizza-01",
        name: "Margherita Pizza",
        category: "pizza",
        categoryName: "Pizza",
        price: 249,
        rating: 4.5
    },
    {
        id: "pizza-02",
        name: "Farmhouse Pizza",
        category: "pizza",
        categoryName: "Pizza",
        price: 299,
        rating: 4.7
    },
    {
        id: "pizza-03",
        name: "Veggie Delight Pizza",
        category: "pizza",
        categoryName: "Pizza",
        price: 279,
        rating: 4.6
    },
    {
        id: "pizza-04",
        name: "Corn Cheese Pizza",
        category: "pizza",
        categoryName: "Pizza",
        price: 289,
        rating: 4.5
    },
    {
        id: "pizza-05",
        name: "Paneer Tikka Pizza",
        category: "pizza",
        categoryName: "Pizza",
        price: 319,
        rating: 4.8
    },

    // =========================
    // 3. BURGER
    // =========================
    {
        id: "burger-01",
        name: "Classic Veg Burger",
        category: "burger",
        categoryName: "Burger",
        price: 169,
        rating: 4.5
    },
    {
        id: "burger-02",
        name: "Aloo Tikki Burger",
        category: "burger",
        categoryName: "Burger",
        price: 149,
        rating: 4.6
    },
    {
        id: "burger-03",
        name: "Cheese Veg Burger",
        category: "burger",
        categoryName: "Burger",
        price: 189,
        rating: 4.7
    },
    {
        id: "burger-04",
        name: "Paneer Burger",
        category: "burger",
        categoryName: "Burger",
        price: 209,
        rating: 4.6
    },
    {
        id: "burger-05",
        name: "Mexican Veg Burger",
        category: "burger",
        categoryName: "Burger",
        price: 199,
        rating: 4.5
    },

    // =========================
    // 4. SANDWICH
    // =========================
    {
        id: "sandwich-01",
        name: "Grilled Veg Sandwich",
        category: "sandwich",
        categoryName: "Sandwich",
        price: 159,
        rating: 4.5
    },
    {
        id: "sandwich-02",
        name: "Bombay Veg Sandwich",
        category: "sandwich",
        categoryName: "Sandwich",
        price: 149,
        rating: 4.6
    },
    {
        id: "sandwich-03",
        name: "Cheese Corn Sandwich",
        category: "sandwich",
        categoryName: "Sandwich",
        price: 179,
        rating: 4.5
    },
    {
        id: "sandwich-04",
        name: "Masala Paneer Sandwich",
        category: "sandwich",
        categoryName: "Sandwich",
        price: 199,
        rating: 4.7
    },
    {
        id: "sandwich-05",
        name: "Veg Club Sandwich",
        category: "sandwich",
        categoryName: "Sandwich",
        price: 219,
        rating: 4.6
    },

    // =========================
    // 5. PASTA
    // =========================
    {
        id: "pasta-01",
        name: "Arrabbiata Pasta",
        category: "pasta",
        categoryName: "Pasta",
        price: 229,
        rating: 4.5
    },
    {
        id: "pasta-02",
        name: "Alfredo Pasta",
        category: "pasta",
        categoryName: "Pasta",
        price: 249,
        rating: 4.7
    },
    {
        id: "pasta-03",
        name: "Pink Sauce Pasta",
        category: "pasta",
        categoryName: "Pasta",
        price: 259,
        rating: 4.6
    },
    {
        id: "pasta-04",
        name: "Pesto Veg Pasta",
        category: "pasta",
        categoryName: "Pasta",
        price: 269,
        rating: 4.5
    },
    {
        id: "pasta-05",
        name: "Creamy Mushroom Pasta",
        category: "pasta",
        categoryName: "Pasta",
        price: 279,
        rating: 4.6
    },

    // =========================
    // 6. CHINESE
    // =========================
    {
        id: "chinese-01",
        name: "Veg Hakka Noodles",
        category: "chinese",
        categoryName: "Chinese",
        price: 199,
        rating: 4.6
    },
    {
        id: "chinese-02",
        name: "Veg Fried Rice",
        category: "chinese",
        categoryName: "Chinese",
        price: 189,
        rating: 4.5
    },
    {
        id: "chinese-03",
        name: "Veg Manchurian",
        category: "chinese",
        categoryName: "Chinese",
        price: 209,
        rating: 4.7
    },
    {
        id: "chinese-04",
        name: "Chilli Paneer",
        category: "chinese",
        categoryName: "Chinese",
        price: 229,
        rating: 4.6
    },
    {
        id: "chinese-05",
        name: "Schezwan Veg Noodles",
        category: "chinese",
        categoryName: "Chinese",
        price: 219,
        rating: 4.5
    },

    // =========================
    // 7. SOUTH INDIAN
    // =========================
    {
        id: "south-indian-01",
        name: "Masala Dosa",
        category: "south-indian",
        categoryName: "South Indian",
        price: 149,
        rating: 4.7
    },
    {
        id: "south-indian-02",
        name: "Plain Dosa",
        category: "south-indian",
        categoryName: "South Indian",
        price: 119,
        rating: 4.5
    },
    {
        id: "south-indian-03",
        name: "Idli Sambar",
        category: "south-indian",
        categoryName: "South Indian",
        price: 109,
        rating: 4.6
    },
    {
        id: "south-indian-04",
        name: "Medu Vada",
        category: "south-indian",
        categoryName: "South Indian",
        price: 129,
        rating: 4.5
    },
    {
        id: "south-indian-05",
        name: "Uttapam",
        category: "south-indian",
        categoryName: "South Indian",
        price: 159,
        rating: 4.6
    },

    // =========================
    // 8. GUJARATI
    // =========================
    {
        id: "gujarati-01",
        name: "Gujarati Thali",
        category: "gujarati",
        categoryName: "Gujarati",
        price: 299,
        rating: 4.8
    },
    {
        id: "gujarati-02",
        name: "Sev Tameta",
        category: "gujarati",
        categoryName: "Gujarati",
        price: 169,
        rating: 4.5
    },
    {
        id: "gujarati-03",
        name: "Undhiyu",
        category: "gujarati",
        categoryName: "Gujarati",
        price: 219,
        rating: 4.7
    },
    {
        id: "gujarati-04",
        name: "Dal Dhokli",
        category: "gujarati",
        categoryName: "Gujarati",
        price: 179,
        rating: 4.6
    },
    {
        id: "gujarati-05",
        name: "Khandvi",
        category: "gujarati",
        categoryName: "Gujarati",
        price: 139,
        rating: 4.5
    },

    // =========================
    // 9. BIRYANI
    // =========================
    {
        id: "biryani-01",
        name: "Veg Dum Biryani",
        category: "biryani",
        categoryName: "Biryani",
        price: 249,
        rating: 4.7
    },
    {
        id: "biryani-02",
        name: "Paneer Biryani",
        category: "biryani",
        categoryName: "Biryani",
        price: 269,
        rating: 4.6
    },
    {
        id: "biryani-03",
        name: "Hyderabadi Veg Biryani",
        category: "biryani",
        categoryName: "Biryani",
        price: 259,
        rating: 4.8
    },
    {
        id: "biryani-04",
        name: "Kathiyawadi Veg Biryani",
        category: "biryani",
        categoryName: "Biryani",
        price: 239,
        rating: 4.5
    },
    {
        id: "biryani-05",
        name: "Tawa Veg Biryani",
        category: "biryani",
        categoryName: "Biryani",
        price: 229,
        rating: 4.6
    },

    // =========================
    // 10. DESSERTS
    // =========================
    {
        id: "dessert-01",
        name: "Gulab Jamun",
        category: "desserts",
        categoryName: "Desserts",
        price: 119,
        rating: 4.6
    },
    {
        id: "dessert-02",
        name: "Rasmalai",
        category: "desserts",
        categoryName: "Desserts",
        price: 149,
        rating: 4.7
    },
    {
        id: "dessert-03",
        name: "Jalebi",
        category: "desserts",
        categoryName: "Desserts",
        price: 99,
        rating: 4.5
    },
    {
        id: "dessert-04",
        name: "Gajar Halwa",
        category: "desserts",
        categoryName: "Desserts",
        price: 139,
        rating: 4.6
    },
    {
        id: "dessert-05",
        name: "Shrikhand",
        category: "desserts",
        categoryName: "Desserts",
        price: 129,
        rating: 4.7
    }
];