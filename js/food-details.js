document.addEventListener("DOMContentLoaded", function () {
    initializeFoodDetailsPage();
});

function initializeFoodDetailsPage() {
    const params = new URLSearchParams(
        window.location.search
    );

    const foodId = normalizeId(
        params.get("food")
    );

    const restaurantId = normalizeId(
        params.get("restaurant")
    );

    if (!foodId) {
        showInvalidFood();
        return;
    }

    const food = findFoodById(
        foodId,
        restaurantId
    );

    if (!food) {
        showInvalidFood();
        return;
    }

    showFoodDetails(
        food,
        restaurantId
    );
}

function findFoodById(
    foodId,
    restaurantId
) {
    const normalizedId =
        normalizeId(foodId);

    if (
        typeof menuFoods !== "undefined" &&
        Array.isArray(menuFoods)
    ) {
        const menuFood =
            menuFoods.find(function (food) {
                return (
                    food &&
                    normalizeId(food.id) ===
                    normalizedId
                );
            });

        if (menuFood) {
            return prepareFood(
                menuFood
            );
        }
    }

    const popularFood =
        getPopularFood(
            normalizedId
        );

    if (popularFood) {
        return prepareFood(
            popularFood
        );
    }

    const restaurantFood =
        findRestaurantFoodById(
            normalizedId,
            restaurantId
        );

    if (restaurantFood) {
        const preparedRestaurantFood =
            prepareFood(
                restaurantFood
            );

        if (
            restaurantId &&
            !preparedRestaurantFood.restaurantId
        ) {
            preparedRestaurantFood.restaurantId =
                restaurantId;
        }

        return preparedRestaurantFood;
    }

    const fallbackFood =
        getFallbackMenuFood(
            normalizedId
        );

    if (fallbackFood) {
        return prepareFood(
            fallbackFood
        );
    }

    return null;
}

function prepareFood(food) {
    if (!food) {
        return null;
    }

    return {
        id:
            food.id || "",

        name:
            food.name || "",

        category:
            food.category || "",

        price:
            Number(food.price || 0),

        rating:
            Number(food.rating || 0),

        image:
            food.image || "",

        restaurantId:
            food.restaurantId || "",

        description:
            food.description ||
            getFoodDescription(
                food.name,
                food.category
            )
    };
}

function findRestaurantFoodById(
    foodId,
    restaurantId
) {
    if (
        typeof restaurantMenuData === "undefined" ||
        !restaurantMenuData
    ) {
        return null;
    }

    const normalizedFoodId =
        normalizeId(foodId);

    const normalizedRestaurantId =
        normalizeId(restaurantId);

    if (
        Array.isArray(
            restaurantMenuData
        )
    ) {
        if (normalizedRestaurantId) {
            const restaurant =
                restaurantMenuData.find(
                    function (item) {
                        return (
                            item &&
                            normalizeId(
                                item.restaurantId
                            ) ===
                            normalizedRestaurantId
                        );
                    }
                );

            if (
                restaurant &&
                Array.isArray(
                    restaurant.foods
                )
            ) {
                const food =
                    restaurant.foods.find(
                        function (item) {
                            return (
                                item &&
                                normalizeId(
                                    item.id
                                ) ===
                                normalizedFoodId
                            );
                        }
                    );

                if (food) {
                    return {
                        ...food,
                        restaurantId:
                            normalizedRestaurantId
                    };
                }
            }
        }

        for (
            let i = 0;
            i < restaurantMenuData.length;
            i++
        ) {
            const restaurant =
                restaurantMenuData[i];

            if (
                !restaurant ||
                !Array.isArray(
                    restaurant.foods
                )
            ) {
                continue;
            }

            const food =
                restaurant.foods.find(
                    function (item) {
                        return (
                            item &&
                            normalizeId(
                                item.id
                            ) ===
                            normalizedFoodId
                        );
                    }
                );

            if (food) {
                return {
                    ...food,
                    restaurantId:
                        normalizeId(
                            restaurant.restaurantId
                        )
                };
            }
        }

        return null;
    }

    if (
        typeof restaurantMenuData ===
        "object"
    ) {
        if (
            normalizedRestaurantId &&
            restaurantMenuData[
                normalizedRestaurantId
            ]
        ) {
            const restaurant =
                restaurantMenuData[
                    normalizedRestaurantId
                ];

            let foods = [];

            if (
                Array.isArray(
                    restaurant
                )
            ) {
                foods =
                    restaurant;
            } else if (
                restaurant &&
                Array.isArray(
                    restaurant.foods
                )
            ) {
                foods =
                    restaurant.foods;
            }

            const food =
                foods.find(
                    function (item) {
                        return (
                            item &&
                            normalizeId(
                                item.id
                            ) ===
                            normalizedFoodId
                        );
                    }
                );

            if (food) {
                return {
                    ...food,
                    restaurantId:
                        normalizedRestaurantId
                };
            }
        }

        const restaurantIds =
            Object.keys(
                restaurantMenuData
            );

        for (
            let i = 0;
            i < restaurantIds.length;
            i++
        ) {
            const currentRestaurantId =
                restaurantIds[i];

            const currentRestaurant =
                restaurantMenuData[
                    currentRestaurantId
                ];

            let foods = [];

            if (
                Array.isArray(
                    currentRestaurant
                )
            ) {
                foods =
                    currentRestaurant;
            } else if (
                currentRestaurant &&
                Array.isArray(
                    currentRestaurant.foods
                )
            ) {
                foods =
                    currentRestaurant.foods;
            }

            const food =
                foods.find(
                    function (item) {
                        return (
                            item &&
                            normalizeId(
                                item.id
                            ) ===
                            normalizedFoodId
                        );
                    }
                );

            if (food) {
                return {
                    ...food,
                    restaurantId:
                        normalizeId(
                            currentRestaurantId
                        )
                };
            }
        }
    }

    return null;
}

function getPopularFood(
    foodId
) {
    const popularFoods = [
        {
            id: "paneer-kebab",
            name: "Paneer Kebab",
            category: "Starters",
            price: 249,
            rating: 4.8,
            image:
                "images/popular-foods/paneer-kebab.png",
            description:
                "Delicious grilled paneer kebabs prepared with aromatic spices and served as a flavorful vegetarian starter."
        },
        {
            id: "cheese-burst-pizza",
            name: "Cheese Burst Pizza",
            category: "Pizza",
            price: 329,
            rating: 4.9,
            image:
                "images/popular-foods/cheese-burst-pizza.png",
            description:
                "A rich vegetarian pizza loaded with melted cheese, fresh toppings and a delicious cheese-filled crust."
        },
        {
            id: "peri-peri-burger",
            name: "Peri Peri Burger",
            category: "Burger",
            price: 219,
            rating: 4.7,
            image:
                "images/popular-foods/peri-peri-burger.png",
            description:
                "A flavorful vegetarian burger prepared with a crispy patty, fresh vegetables and peri peri seasoning."
        },
        {
            id: "paneer-club-sandwich",
            name: "Paneer Club Sandwich",
            category: "Sandwich",
            price: 229,
            rating: 4.6,
            image:
                "images/popular-foods/paneer-club-sandwich.png",
            description:
                "A delicious layered vegetarian sandwich filled with paneer, fresh vegetables and creamy dressing."
        },
        {
            id: "mexican-pasta",
            name: "Mexican Pasta",
            category: "Pasta",
            price: 279,
            rating: 4.8,
            image:
                "images/popular-foods/mexican-pasta.png",
            description:
                "Creamy and flavorful vegetarian pasta prepared with Mexican-inspired spices, vegetables and herbs."
        },
        {
            id: "royal-kheer",
            name: "Royal Kheer",
            category: "Desserts",
            price: 159,
            rating: 4.9,
            image:
                "images/popular-foods/royal-kheer.png",
            description:
                "A rich traditional Indian rice pudding prepared with milk, aromatic ingredients and a royal touch."
        }
    ];

    return (
        popularFoods.find(
            function (food) {
                return (
                    normalizeId(
                        food.id
                    ) ===
                    foodId
                );
            }
        ) || null
    );
}

function getFallbackMenuFood(
    foodId
) {
    const foods = [
        {
            id: "paneer-tikka",
            name: "Paneer Tikka",
            category: "Starters",
            price: 249,
            rating: 4.6
        },
        {
            id: "veg-spring-rolls",
            name: "Veg Spring Rolls",
            category: "Starters",
            price: 199,
            rating: 4.5
        },
        {
            id: "hara-bhara-kebab",
            name: "Hara Bhara Kebab",
            category: "Starters",
            price: 219,
            rating: 4.7
        },
        {
            id: "cheese-corn-balls",
            name: "Cheese Corn Balls",
            category: "Starters",
            price: 229,
            rating: 4.6
        },
        {
            id: "crispy-veg-fingers",
            name: "Crispy Veg Fingers",
            category: "Starters",
            price: 189,
            rating: 4.5
        },
        {
            id: "margherita-pizza",
            name: "Margherita Pizza",
            category: "Pizza",
            price: 249,
            rating: 4.5
        },
        {
            id: "farmhouse-pizza",
            name: "Farmhouse Pizza",
            category: "Pizza",
            price: 299,
            rating: 4.7
        },
        {
            id: "veggie-delight-pizza",
            name: "Veggie Delight Pizza",
            category: "Pizza",
            price: 279,
            rating: 4.6
        },
        {
            id: "corn-cheese-pizza",
            name: "Corn Cheese Pizza",
            category: "Pizza",
            price: 289,
            rating: 4.5
        },
        {
            id: "paneer-tikka-pizza",
            name: "Paneer Tikka Pizza",
            category: "Pizza",
            price: 319,
            rating: 4.8
        },
        {
            id: "classic-veg-burger",
            name: "Classic Veg Burger",
            category: "Burger",
            price: 169,
            rating: 4.5
        },
        {
            id: "aloo-tikki-burger",
            name: "Aloo Tikki Burger",
            category: "Burger",
            price: 149,
            rating: 4.6
        },
        {
            id: "cheese-veg-burger",
            name: "Cheese Veg Burger",
            category: "Burger",
            price: 189,
            rating: 4.7
        },
        {
            id: "paneer-burger",
            name: "Paneer Burger",
            category: "Burger",
            price: 209,
            rating: 4.6
        },
        {
            id: "mexican-veg-burger",
            name: "Mexican Veg Burger",
            category: "Burger",
            price: 199,
            rating: 4.5
        },
        {
            id: "grilled-veg-sandwich",
            name: "Grilled Veg Sandwich",
            category: "Sandwich",
            price: 159,
            rating: 4.5
        },
        {
            id: "bombay-veg-sandwich",
            name: "Bombay Veg Sandwich",
            category: "Sandwich",
            price: 149,
            rating: 4.6
        },
        {
            id: "cheese-corn-sandwich",
            name: "Cheese Corn Sandwich",
            category: "Sandwich",
            price: 179,
            rating: 4.5
        },
        {
            id: "masala-paneer-sandwich",
            name: "Masala Paneer Sandwich",
            category: "Sandwich",
            price: 199,
            rating: 4.7
        },
        {
            id: "veg-club-sandwich",
            name: "Veg Club Sandwich",
            category: "Sandwich",
            price: 219,
            rating: 4.6
        },
        {
            id: "arrabbiata-pasta",
            name: "Arrabbiata Pasta",
            category: "Pasta",
            price: 229,
            rating: 4.5
        },
        {
            id: "alfredo-pasta",
            name: "Alfredo Pasta",
            category: "Pasta",
            price: 249,
            rating: 4.7
        },
        {
            id: "pink-sauce-pasta",
            name: "Pink Sauce Pasta",
            category: "Pasta",
            price: 259,
            rating: 4.6
        },
        {
            id: "pesto-veg-pasta",
            name: "Pesto Veg Pasta",
            category: "Pasta",
            price: 269,
            rating: 4.5
        },
        {
            id: "creamy-mushroom-pasta",
            name: "Creamy Mushroom Pasta",
            category: "Pasta",
            price: 279,
            rating: 4.6
        },
        {
            id: "veg-hakka-noodles",
            name: "Veg Hakka Noodles",
            category: "Chinese",
            price: 199,
            rating: 4.6
        },
        {
            id: "veg-fried-rice",
            name: "Veg Fried Rice",
            category: "Chinese",
            price: 189,
            rating: 4.5
        },
        {
            id: "veg-manchurian",
            name: "Veg Manchurian",
            category: "Chinese",
            price: 209,
            rating: 4.7
        },
        {
            id: "chilli-paneer",
            name: "Chilli Paneer",
            category: "Chinese",
            price: 229,
            rating: 4.6
        },
        {
            id: "schezwan-veg-noodles",
            name: "Schezwan Veg Noodles",
            category: "Chinese",
            price: 219,
            rating: 4.5
        },
        {
            id: "masala-dosa",
            name: "Masala Dosa",
            category: "South Indian",
            price: 149,
            rating: 4.7
        },
        {
            id: "plain-dosa",
            name: "Plain Dosa",
            category: "South Indian",
            price: 119,
            rating: 4.5
        },
        {
            id: "idli-sambar",
            name: "Idli Sambar",
            category: "South Indian",
            price: 109,
            rating: 4.6
        },
        {
            id: "medu-vada",
            name: "Medu Vada",
            category: "South Indian",
            price: 129,
            rating: 4.5
        },
        {
            id: "uttapam",
            name: "Uttapam",
            category: "South Indian",
            price: 159,
            rating: 4.6
        },
        {
            id: "gujarati-thali",
            name: "Gujarati Thali",
            category: "Gujarati",
            price: 299,
            rating: 4.8
        },
        {
            id: "sev-tameta",
            name: "Sev Tameta",
            category: "Gujarati",
            price: 169,
            rating: 4.5
        },
        {
            id: "undhiyu",
            name: "Undhiyu",
            category: "Gujarati",
            price: 219,
            rating: 4.7
        },
        {
            id: "dal-dhokli",
            name: "Dal Dhokli",
            category: "Gujarati",
            price: 179,
            rating: 4.6
        },
        {
            id: "khandvi",
            name: "Khandvi",
            category: "Gujarati",
            price: 139,
            rating: 4.5
        },
        {
            id: "veg-dum-biryani",
            name: "Veg Dum Biryani",
            category: "Biryani",
            price: 249,
            rating: 4.7
        },
        {
            id: "paneer-biryani",
            name: "Paneer Biryani",
            category: "Biryani",
            price: 269,
            rating: 4.6
        },
        {
            id: "hyderabadi-veg-biryani",
            name: "Hyderabadi Veg Biryani",
            category: "Biryani",
            price: 259,
            rating: 4.8
        },
        {
            id: "kathiyawadi-veg-biryani",
            name: "Kathiyawadi Veg Biryani",
            category: "Biryani",
            price: 239,
            rating: 4.5
        },
        {
            id: "tawa-veg-biryani",
            name: "Tawa Veg Biryani",
            category: "Biryani",
            price: 229,
            rating: 4.6
        },
        {
            id: "gulab-jamun",
            name: "Gulab Jamun",
            category: "Desserts",
            price: 119,
            rating: 4.6
        },
        {
            id: "rasmalai",
            name: "Rasmalai",
            category: "Desserts",
            price: 149,
            rating: 4.7
        },
        {
            id: "jalebi",
            name: "Jalebi",
            category: "Desserts",
            price: 99,
            rating: 4.5
        },
        {
            id: "gajar-halwa",
            name: "Gajar Halwa",
            category: "Desserts",
            price: 139,
            rating: 4.6
        },
        {
            id: "shrikhand",
            name: "Shrikhand",
            category: "Desserts",
            price: 129,
            rating: 4.7
        }
    ];

    return (
        foods.find(
            function (food) {
                return (
                    normalizeId(
                        food.id
                    ) ===
                    foodId
                );
            }
        ) || null
    );
}

function showFoodDetails(
    food,
    restaurantId
) {
    const detailsSection =
        document.getElementById(
            "foodDetailsSection"
        );

    const detailsContainer =
        document.getElementById(
            "foodDetails"
        );

    const invalidState =
        document.getElementById(
            "foodInvalidState"
        );

    if (detailsSection) {
        detailsSection.hidden = false;
    }

    if (detailsContainer) {
        detailsContainer.hidden = false;
    }

    if (invalidState) {
        invalidState.hidden = true;
    }

    setText(
        "foodDetailsCategory",
        food.category || ""
    );

    setText(
        "foodDetailsName",
        food.name || ""
    );

    setText(
        "foodDetailsRating",
        formatRating(
            food.rating
        )
    );

    setText(
        "foodDetailsPrice",
        "₹" +
        Number(
            food.price || 0
        )
    );

    setText(
        "foodDetailsDescription",
        food.description ||
        getFoodDescription(
            food.name,
            food.category
        )
    );

    const image =
        document.getElementById(
            "foodDetailsImage"
        );

    if (image) {
        const imagePath =
            getFoodImage(
                food,
                restaurantId
            );

        image.src =
            imagePath;

        image.alt =
            food.name ||
            "Vegetarian Food";

        image.loading =
            "eager";

        image.onerror =
            function () {
                image.onerror = null;

                const fallback =
                    getFallbackFoodImage(
                        food
                    );

                if (fallback) {
                    image.src =
                        fallback;
                }
            };
    }

    initializeFoodRestaurantInfo(
        food,
        restaurantId
    );

    initializeFoodBackButton(
        restaurantId
    );

    /* FIX: Food Actions */
    initializeFoodActions(
        food,
        restaurantId
    );

    document.title =
        food.name +
        " | Yummy Tummy";
}

function initializeFoodRestaurantInfo(
    food,
    restaurantId
) {
    let finalRestaurantId =
        normalizeId(
            restaurantId
        );

    if (
        !finalRestaurantId &&
        food &&
        food.restaurantId
    ) {
        finalRestaurantId =
            normalizeId(
                food.restaurantId
            );
    }

    if (finalRestaurantId) {
        const restaurant =
            findRestaurantById(
                finalRestaurantId
            );

        if (restaurant) {
            setText(
                "foodDetailsRestaurantName",
                restaurant.name
            );

            setText(
                "foodDetailsRestaurantCuisine",
                restaurant.cuisine
            );

            setText(
                "foodDetailsRestaurantLocation",
                restaurant.location
            );

            return;
        }
    }

    const externalRestaurant =
        getExternalFoodRestaurant(
            food
        );

    if (externalRestaurant) {
        setText(
            "foodDetailsRestaurantName",
            externalRestaurant.name
        );

        setText(
            "foodDetailsRestaurantCuisine",
            externalRestaurant.cuisine
        );

        setText(
            "foodDetailsRestaurantLocation",
            externalRestaurant.location
        );

        return;
    }

    setText(
        "foodDetailsRestaurantName",
        "Cream Centre"
    );

    setText(
        "foodDetailsRestaurantCuisine",
        "Vegetarian Multi-Cuisine"
    );

    setText(
        "foodDetailsRestaurantLocation",
        "Mumbai, Maharashtra"
    );
}

function getExternalFoodRestaurant(
    food
) {
    if (!food) {
        return null;
    }

    const foodId =
        normalizeId(
            food.id
        );

    const externalRestaurantMap = {
        "paneer-kebab": {
            name: "AGNIYA",
            cuisine: "Pure Vegetarian Indian",
            location: "India"
        },

        "cheese-burst-pizza": {
            name: "Cream Centre",
            cuisine: "Vegetarian Multi-Cuisine",
            location: "Mumbai, Maharashtra"
        },

        "peri-peri-burger": {
            name: "Ajay's Café",
            cuisine: "Vegetarian Café",
            location: "Gujarat, India"
        },

        "paneer-club-sandwich": {
            name: "Cream Centre",
            cuisine: "Vegetarian Multi-Cuisine",
            location: "Mumbai, Maharashtra"
        },

        "mexican-pasta": {
            name: "Cream Centre",
            cuisine: "Vegetarian Multi-Cuisine",
            location: "Mumbai, Maharashtra"
        },

        "royal-kheer": {
            name: "Rajdhani",
            cuisine: "Rajasthani & Gujarati Vegetarian",
            location: "India"
        },

        "paneer-tikka": {
            name: "AGNIYA",
            cuisine: "Pure Vegetarian Indian",
            location: "India"
        },

        "veg-spring-rolls": {
            name: "Green Leaf Restaurant",
            cuisine: "Vegetarian Multi-Cuisine",
            location: "Thane, Maharashtra"
        },

        "hara-bhara-kebab": {
            name: "Cream Centre",
            cuisine: "Vegetarian Multi-Cuisine",
            location: "Mumbai, Maharashtra"
        },

        "cheese-corn-balls": {
            name: "Ajay's Café",
            cuisine: "Vegetarian Café",
            location: "Gujarat, India"
        },

        "crispy-veg-fingers": {
            name: "Green Leaf Restaurant",
            cuisine: "Vegetarian Multi-Cuisine",
            location: "Thane, Maharashtra"
        },

        "margherita-pizza": {
            name: "Cream Centre",
            cuisine: "Vegetarian Multi-Cuisine",
            location: "Mumbai, Maharashtra"
        },

        "farmhouse-pizza": {
            name: "Green Leaf Restaurant",
            cuisine: "Vegetarian Multi-Cuisine",
            location: "Thane, Maharashtra"
        },

        "veggie-delight-pizza": {
            name: "Cream Centre",
            cuisine: "Vegetarian Multi-Cuisine",
            location: "Mumbai, Maharashtra"
        },

        "corn-cheese-pizza": {
            name: "Ajay's Café",
            cuisine: "Vegetarian Café",
            location: "Gujarat, India"
        },

        "paneer-tikka-pizza": {
            name: "Cream Centre",
            cuisine: "Vegetarian Multi-Cuisine",
            location: "Mumbai, Maharashtra"
        },

        "classic-veg-burger": {
            name: "Ajay's Café",
            cuisine: "Vegetarian Café",
            location: "Gujarat, India"
        },

        "aloo-tikki-burger": {
            name: "Ajay's Café",
            cuisine: "Vegetarian Café",
            location: "Gujarat, India"
        },

        "cheese-veg-burger": {
            name: "ZORKO",
            cuisine: "Vegetarian Fast Food",
            location: "India"
        },

        "paneer-burger": {
            name: "Ajay's Café",
            cuisine: "Vegetarian Café",
            location: "Gujarat, India"
        },

        "mexican-veg-burger": {
            name: "ZORKO",
            cuisine: "Vegetarian Fast Food",
            location: "India"
        },

        "grilled-veg-sandwich": {
            name: "Cream Centre",
            cuisine: "Vegetarian Multi-Cuisine",
            location: "Mumbai, Maharashtra"
        },

        "bombay-veg-sandwich": {
            name: "Cream Centre",
            cuisine: "Vegetarian Multi-Cuisine",
            location: "Mumbai, Maharashtra"
        },

        "cheese-corn-sandwich": {
            name: "Ajay's Café",
            cuisine: "Vegetarian Café",
            location: "Gujarat, India"
        },

        "masala-paneer-sandwich": {
            name: "Ajay's Café",
            cuisine: "Vegetarian Café",
            location: "Gujarat, India"
        },

        "veg-club-sandwich": {
            name: "Cream Centre",
            cuisine: "Vegetarian Multi-Cuisine",
            location: "Mumbai, Maharashtra"
        },

        "arrabbiata-pasta": {
            name: "Cream Centre",
            cuisine: "Vegetarian Multi-Cuisine",
            location: "Mumbai, Maharashtra"
        },

        "alfredo-pasta": {
            name: "Cream Centre",
            cuisine: "Vegetarian Multi-Cuisine",
            location: "Mumbai, Maharashtra"
        },

        "pink-sauce-pasta": {
            name: "Green Leaf Restaurant",
            cuisine: "Vegetarian Multi-Cuisine",
            location: "Thane, Maharashtra"
        },

        "pesto-veg-pasta": {
            name: "Cream Centre",
            cuisine: "Vegetarian Multi-Cuisine",
            location: "Mumbai, Maharashtra"
        },

        "creamy-mushroom-pasta": {
            name: "Cream Centre",
            cuisine: "Vegetarian Multi-Cuisine",
            location: "Mumbai, Maharashtra"
        },

        "veg-hakka-noodles": {
            name: "Green Leaf Restaurant",
            cuisine: "Vegetarian Multi-Cuisine",
            location: "Thane, Maharashtra"
        },

        "veg-fried-rice": {
            name: "Green Leaf Restaurant",
            cuisine: "Vegetarian Multi-Cuisine",
            location: "Thane, Maharashtra"
        },

        "veg-manchurian": {
            name: "Green Leaf Restaurant",
            cuisine: "Vegetarian Multi-Cuisine",
            location: "Thane, Maharashtra"
        },

        "chilli-paneer": {
            name: "Masaledaar",
            cuisine: "Pure Vegetarian",
            location: "South India"
        },

        "schezwan-veg-noodles": {
            name: "Masaledaar",
            cuisine: "Pure Vegetarian",
            location: "South India"
        },

        "masala-dosa": {
            name: "Sangeetha Veg Restaurant",
            cuisine: "South Indian Vegetarian",
            location: "Chennai, Tamil Nadu"
        },

        "plain-dosa": {
            name: "Sangeetha Veg Restaurant",
            cuisine: "South Indian Vegetarian",
            location: "Chennai, Tamil Nadu"
        },

        "idli-sambar": {
            name: "Adyar Ananda Bhavan",
            cuisine: "South Indian Vegetarian",
            location: "Chennai, Tamil Nadu"
        },

        "medu-vada": {
            name: "Sangeetha Veg Restaurant",
            cuisine: "South Indian Vegetarian",
            location: "Chennai, Tamil Nadu"
        },

        "uttapam": {
            name: "Adyar Ananda Bhavan",
            cuisine: "South Indian Vegetarian",
            location: "Chennai, Tamil Nadu"
        },

        "gujarati-thali": {
            name: "Rajdhani",
            cuisine: "Rajasthani & Gujarati Vegetarian",
            location: "India"
        },

        "sev-tameta": {
            name: "Rajdhani",
            cuisine: "Rajasthani & Gujarati Vegetarian",
            location: "India"
        },

        "undhiyu": {
            name: "Rajdhani",
            cuisine: "Rajasthani & Gujarati Vegetarian",
            location: "India"
        },

        "dal-dhokli": {
            name: "Rajdhani",
            cuisine: "Rajasthani & Gujarati Vegetarian",
            location: "India"
        },

        "khandvi": {
            name: "Rajdhani",
            cuisine: "Rajasthani & Gujarati Vegetarian",
            location: "India"
        },

        "veg-dum-biryani": {
            name: "AGNIYA",
            cuisine: "Pure Vegetarian Indian",
            location: "India"
        },

        "paneer-biryani": {
            name: "AGNIYA",
            cuisine: "Pure Vegetarian Indian",
            location: "India"
        },

        "hyderabadi-veg-biryani": {
            name: "AGNIYA",
            cuisine: "Pure Vegetarian Indian",
            location: "India"
        },

        "kathiyawadi-veg-biryani": {
            name: "Rajdhani",
            cuisine: "Rajasthani & Gujarati Vegetarian",
            location: "India"
        },

        "tawa-veg-biryani": {
            name: "Green Leaf Restaurant",
            cuisine: "Vegetarian Multi-Cuisine",
            location: "Thane, Maharashtra"
        },

        "gulab-jamun": {
            name: "Rajdhani",
            cuisine: "Rajasthani & Gujarati Vegetarian",
            location: "India"
        },

        "rasmalai": {
            name: "Adyar Ananda Bhavan",
            cuisine: "South Indian Vegetarian & Sweets",
            location: "Chennai, Tamil Nadu"
        },

        "jalebi": {
            name: "Adyar Ananda Bhavan",
            cuisine: "South Indian Vegetarian & Sweets",
            location: "Chennai, Tamil Nadu"
        },

        "gajar-halwa": {
            name: "Rajdhani",
            cuisine: "Rajasthani & Gujarati Vegetarian",
            location: "India"
        },

        "shrikhand": {
            name: "Rajdhani",
            cuisine: "Rajasthani & Gujarati Vegetarian",
            location: "India"
        }
    };

    return (
        externalRestaurantMap[
            foodId
        ] || null
    );
}

function findRestaurantById(
    restaurantId
) {
    const normalizedId =
        normalizeId(
            restaurantId
        );

    if (
        typeof restaurantData !== "undefined" &&
        Array.isArray(
            restaurantData
        )
    ) {
        const restaurant =
            restaurantData.find(
                function (item) {
                    return (
                        item &&
                        normalizeId(
                            item.id
                        ) ===
                        normalizedId
                    );
                }
            );

        if (restaurant) {
            return restaurant;
        }
    }

    const fallbackRestaurants = {
        "rajasthani-rasoi": {
            id: "rajasthani-rasoi",
            name: "Rajasthani Rasoi",
            cuisine: "Rajasthani Vegetarian",
            location: "Rajasthan"
        },

        "gujarati-thali-house": {
            id: "gujarati-thali-house",
            name: "Gujarati Thali House",
            cuisine: "Gujarati Vegetarian",
            location: "Gujarat"
        },

        "punjabi-zaika": {
            id: "punjabi-zaika",
            name: "Punjabi Zaika",
            cuisine: "Punjabi Vegetarian",
            location: "Punjab"
        },

        "bengal-bhojan": {
            id: "bengal-bhojan",
            name: "Bengal Bhojan",
            cuisine: "Bengali Vegetarian",
            location: "West Bengal"
        },

        "south-spice-kitchen": {
            id: "south-spice-kitchen",
            name: "South Spice Kitchen",
            cuisine: "South Indian Vegetarian",
            location: "South India"
        },

        "maharashtra-tadka": {
            id: "maharashtra-tadka",
            name: "Maharashtra Tadka",
            cuisine: "Maharashtrian Vegetarian",
            location: "Maharashtra"
        },

        "kashmir-valley-kitchen": {
            id: "kashmir-valley-kitchen",
            name: "Kashmir Valley Kitchen",
            cuisine: "Kashmiri Vegetarian",
            location: "Kashmir"
        },

        "awadhi-dastarkhwan": {
            id: "awadhi-dastarkhwan",
            name: "Awadhi Dastarkhwan",
            cuisine: "Awadhi Vegetarian",
            location: "Lucknow"
        },

        "hyderabadi-nizams-kitchen": {
            id: "hyderabadi-nizams-kitchen",
            name: "Hyderabadi Nizam's Kitchen",
            cuisine: "Hyderabadi Vegetarian",
            location: "Hyderabad"
        },

        "goan-coastal-bites": {
            id: "goan-coastal-bites",
            name: "Goan Coastal Bites",
            cuisine: "Goan Vegetarian",
            location: "Goa"
        },

        "kerala-coconut-kitchen": {
            id: "kerala-coconut-kitchen",
            name: "Kerala Coconut Kitchen",
            cuisine: "Kerala Vegetarian",
            location: "Kerala"
        },

        "bihar-swad-ghar": {
            id: "bihar-swad-ghar",
            name: "Bihar Swad Ghar",
            cuisine: "Bihari Vegetarian",
            location: "Bihar"
        }
    };

    return (
        fallbackRestaurants[
            normalizedId
        ] || null
    );
}

function getFoodImage(
    food,
    restaurantId
) {
    if (!food) {
        return "";
    }

    if (
        food.image &&
        String(
            food.image
        ).trim() !== ""
    ) {
        return String(
            food.image
        ).trim();
    }

    const finalRestaurantId =
        normalizeId(
            restaurantId ||
            food.restaurantId
        );

    if (
        finalRestaurantId &&
        food.id
    ) {
        return (
            "images/restaurant-food/" +
            finalRestaurantId +
            "/" +
            food.id +
            ".png"
        );
    }

    return getMenuFoodImage(
        food
    );
}

function getMenuFoodImage(
    food
) {
    if (!food) {
        return "";
    }

    const category =
        normalizeCategory(
            food.category
        );

    const imageNumber =
        getMenuFoodNumber(
            food.id
        );

    const categoryMap = {
        starters: "starter",
        starter: "starter",
        pizza: "pizza",
        burger: "burger",
        sandwich: "sandwich",
        pasta: "pasta",
        chinese: "chinese",
        "south-indian":
            "south-indian",
        southindian:
            "south-indian",
        south_indian:
            "south-indian",
        gujarati:
            "gujarati",
        biryani:
            "biryani",
        desserts:
            "dessert",
        dessert:
            "dessert"
    };

    const folderName =
        categoryMap[
            category
        ] || category;

    return (
        "images/menu-foods/" +
        folderName +
        "-" +
        imageNumber +
        ".png"
    );
}

function getMenuFoodNumber(
    foodId
) {
    const foodNumberMap = {
        "paneer-tikka": "01",
        "veg-spring-rolls": "02",
        "hara-bhara-kebab": "03",
        "cheese-corn-balls": "04",
        "crispy-veg-fingers": "05",

        "margherita-pizza": "01",
        "farmhouse-pizza": "02",
        "veggie-delight-pizza": "03",
        "corn-cheese-pizza": "04",
        "paneer-tikka-pizza": "05",

        "classic-veg-burger": "01",
        "aloo-tikki-burger": "02",
        "cheese-veg-burger": "03",
        "paneer-burger": "04",
        "mexican-veg-burger": "05",

        "grilled-veg-sandwich": "01",
        "bombay-veg-sandwich": "02",
        "cheese-corn-sandwich": "03",
        "masala-paneer-sandwich": "04",
        "veg-club-sandwich": "05",

        "arrabbiata-pasta": "01",
        "alfredo-pasta": "02",
        "pink-sauce-pasta": "03",
        "pesto-veg-pasta": "04",
        "creamy-mushroom-pasta": "05",

        "veg-hakka-noodles": "01",
        "veg-fried-rice": "02",
        "veg-manchurian": "03",
        "chilli-paneer": "04",
        "schezwan-veg-noodles": "05",

        "masala-dosa": "01",
        "plain-dosa": "02",
        "idli-sambar": "03",
        "medu-vada": "04",
        "uttapam": "05",

        "gujarati-thali": "01",
        "sev-tameta": "02",
        "undhiyu": "03",
        "dal-dhokli": "04",
        "khandvi": "05",

        "veg-dum-biryani": "01",
        "paneer-biryani": "02",
        "hyderabadi-veg-biryani": "03",
        "kathiyawadi-veg-biryani": "04",
        "tawa-veg-biryani": "05",

        "gulab-jamun": "01",
        "rasmalai": "02",
        "jalebi": "03",
        "gajar-halwa": "04",
        "shrikhand": "05"
    };

    return (
        foodNumberMap[
            normalizeId(
                foodId
            )
        ] || "01"
    );
}

function getFallbackFoodImage(
    food
) {
    if (!food) {
        return "";
    }

    const popularFood =
        getPopularFood(
            normalizeId(
                food.id
            )
        );

    if (
        popularFood &&
        popularFood.image
    ) {
        return popularFood.image;
    }

    if (food.id) {
        return getMenuFoodImage(
            food
        );
    }

    return "";
}

function getFoodDescription(
    foodName,
    category
) {
    const name =
        String(
            foodName || ""
        ).trim();

    const foodCategory =
        String(
            category || ""
        )
            .trim()
            .toLowerCase();

    if (!name) {
        return "";
    }

    if (
        foodCategory.includes(
            "starter"
        )
    ) {
        return (
            name +
            " is a delicious vegetarian starter prepared with fresh ingredients and aromatic spices."
        );
    }

    if (
        foodCategory.includes(
            "pizza"
        )
    ) {
        return (
            name +
            " is a delicious vegetarian pizza prepared with fresh toppings, cheese and flavorful ingredients."
        );
    }

    if (
        foodCategory.includes(
            "burger"
        )
    ) {
        return (
            name +
            " is a delicious vegetarian burger prepared with fresh vegetables, a flavorful patty and tasty sauces."
        );
    }

    if (
        foodCategory.includes(
            "sandwich"
        )
    ) {
        return (
            name +
            " is a delicious vegetarian sandwich prepared with fresh vegetables, flavorful fillings and tasty dressing."
        );
    }

    if (
        foodCategory.includes(
            "pasta"
        )
    ) {
        return (
            name +
            " is a flavorful vegetarian pasta prepared with quality ingredients, herbs and a delicious sauce."
        );
    }

    if (
        foodCategory.includes(
            "chinese"
        )
    ) {
        return (
            name +
            " is a delicious vegetarian Indo-Chinese dish prepared with fresh vegetables and flavorful seasonings."
        );
    }

    if (
        foodCategory.includes(
            "south"
        )
    ) {
        return (
            name +
            " is a traditional vegetarian South Indian dish prepared with authentic ingredients and flavorful accompaniments."
        );
    }

    if (
        foodCategory.includes(
            "gujarati"
        )
    ) {
        return (
            name +
            " is a traditional vegetarian Gujarati dish prepared with authentic regional flavors and quality ingredients."
        );
    }

    if (
        foodCategory.includes(
            "biryani"
        )
    ) {
        return (
            name +
            " is a flavorful vegetarian biryani prepared with aromatic rice, fresh vegetables and traditional spices."
        );
    }

    if (
        foodCategory.includes(
            "dessert"
        )
    ) {
        return (
            name +
            " is a delicious Indian vegetarian dessert prepared with rich ingredients and traditional flavors."
        );
    }

    return (
        name +
        " is a delicious vegetarian food prepared with quality ingredients and flavorful spices."
    );
}

function showInvalidFood() {
    const detailsSection =
        document.getElementById(
            "foodDetailsSection"
        );

    const detailsContainer =
        document.getElementById(
            "foodDetails"
        );

    const invalidState =
        document.getElementById(
            "foodInvalidState"
        );

    if (detailsSection) {
        detailsSection.hidden = true;
    }

    if (detailsContainer) {
        detailsContainer.hidden = true;
    }

    if (invalidState) {
        invalidState.hidden = false;
    }

    clearRestaurantInformation();

    document.title =
        "Food Not Found | Yummy Tummy";
}

function clearRestaurantInformation() {
    setText(
        "foodDetailsRestaurantName",
        "-"
    );

    setText(
        "foodDetailsRestaurantCuisine",
        "-"
    );

    setText(
        "foodDetailsRestaurantLocation",
        "-"
    );
}

function initializeFoodBackButton(
    restaurantId
) {
    const backButton =
        document.getElementById(
            "foodBackButton"
        );

    if (!backButton) {
        return;
    }

    if (restaurantId) {
        backButton.href =
            "view-restaurant.html?restaurant=" +
            encodeURIComponent(
                restaurantId
            );

        backButton.textContent =
            "Back to Restaurant";

        return;
    }

    backButton.href =
        "menu.html";

    backButton.textContent =
        "Back to Menu";
}

function setText(
    elementId,
    value
) {
    const element =
        document.getElementById(
            elementId
        );

    if (!element) {
        return;
    }

    element.textContent =
        value === undefined ||
        value === null
            ? ""
            : String(value);
}

function formatRating(
    rating
) {
    const numericRating =
        Number(rating);

    if (
        Number.isNaN(
            numericRating
        )
    ) {
        return "0.0 Rating";
    }

    return (
        numericRating.toFixed(1) +
        " Rating"
    );
}

function normalizeId(
    value
) {
    return String(
        value || ""
    )
        .trim()
        .toLowerCase();
}

function normalizeCategory(
    value
) {
    return String(
        value || ""
    )
        .trim()
        .toLowerCase()
        .replace(
            /_/g,
            "-"
        )
        .replace(
            /\s+/g,
            "-"
        );
}

function initializeFoodActions(
    food,
    restaurantId
) {
    const cartButton =
        document.getElementById(
            "foodAddCartButton"
        );

    const wishlistButton =
        document.getElementById(
            "foodWishlistButton"
        );

    if (!cartButton && !wishlistButton) {
        return;
    }

    function isUserLoggedIn() {
        const loggedIn =
            localStorage.getItem(
                "yummyTummyLoggedIn"
            );

        const user =
            localStorage.getItem(
                "yummyTummyUser"
            );

        return (
            loggedIn === "true" &&
            !!user
        );
    }

    if (cartButton) {
        cartButton.onclick =
            function () {

                if (!isUserLoggedIn()) {
                    const goToLogin =
                        window.confirm(
                            "Please Login First"
                        );

                    if (goToLogin) {
                        window.location.href =
                            "login.html";
                    }

                    return;
                }

                let cart = [];

                try {
                    cart =
                        JSON.parse(
                            localStorage.getItem(
                                "yummyTummyCart"
                            ) || "[]"
                        );
                } catch (error) {
                    cart = [];
                }

                if (!Array.isArray(cart)) {
                    cart = [];
                }

                const existingItem =
                    cart.find(
                        function (item) {
                            return (
                                item &&
                                normalizeId(
                                    item.id
                                ) ===
                                normalizeId(
                                    food.id
                                )
                            );
                        }
                    );

                if (existingItem) {
                    existingItem.quantity =
                        Number(
                            existingItem.quantity || 0
                        ) + 1;
                } else {
                    cart.push({
                        id:
                            food.id,

                        name:
                            food.name,

                        category:
                            food.category || "",

                        price:
                            Number(
                                food.price || 0
                            ),

                        rating:
                            Number(
                                food.rating || 0
                            ),

                        image:
                            getFoodImage(
                                food,
                                restaurantId
                            ),

                        restaurantId:
                            restaurantId ||
                            food.restaurantId ||
                            "",

                        quantity:
                            1
                    });
                }

                localStorage.setItem(
                    "yummyTummyCart",
                    JSON.stringify(cart)
                );

                cartButton.textContent =
                    "Added to Cart";

                cartButton.disabled =
                    true;

                setTimeout(
                    function () {
                        cartButton.textContent =
                            "Add to Cart";

                        cartButton.disabled =
                            false;
                    },
                    1200
                );
            };
    }

    if (wishlistButton) {
        wishlistButton.onclick =
            function () {

                if (!isUserLoggedIn()) {
                    const goToLogin =
                        window.confirm(
                            "Please Login First"
                        );

                    if (goToLogin) {
                        window.location.href =
                            "login.html";
                    }

                    return;
                }

                let wishlist = [];

                try {
                    wishlist =
                        JSON.parse(
                            localStorage.getItem(
                                "yummyTummyWishlist"
                            ) || "[]"
                        );
                } catch (error) {
                    wishlist = [];
                }

                if (!Array.isArray(wishlist)) {
                    wishlist = [];
                }

                const existingItem =
                    wishlist.find(
                        function (item) {
                            return (
                                item &&
                                normalizeId(
                                    item.id
                                ) ===
                                normalizeId(
                                    food.id
                                )
                            );
                        }
                    );

                if (existingItem) {
                    wishlistButton.textContent =
                        "Already in Wishlist";

                    return;
                }

                wishlist.push({
                    id:
                        food.id,

                    name:
                        food.name,

                    category:
                        food.category || "",

                    price:
                        Number(
                            food.price || 0
                        ),

                    rating:
                        Number(
                            food.rating || 0
                        ),

                    image:
                        getFoodImage(
                            food,
                            restaurantId
                        ),

                    description:
                        food.description || "",

                    restaurantId:
                        restaurantId ||
                        food.restaurantId ||
                        ""
                });

                localStorage.setItem(
                    "yummyTummyWishlist",
                    JSON.stringify(
                        wishlist
                    )
                );

                wishlistButton.textContent =
                    "Added to Wishlist";

                wishlistButton.disabled =
                    true;

                setTimeout(
                    function () {
                        wishlistButton.textContent =
                            "Remove from Wishlist";

                        wishlistButton.disabled =
                            false;
                    },
                    1200
                );
            };
    }

    if (
        wishlistButton &&
        isUserLoggedIn()
    ) {
        let wishlist = [];

        try {
            wishlist =
                JSON.parse(
                    localStorage.getItem(
                        "yummyTummyWishlist"
                    ) || "[]"
                );
        } catch (error) {
            wishlist = [];
        }

        if (Array.isArray(wishlist)) {
            const alreadyAdded =
                wishlist.some(
                    function (item) {
                        return (
                            item &&
                            normalizeId(
                                item.id
                            ) ===
                            normalizeId(
                                food.id
                            )
                        );
                    }
                );

            if (alreadyAdded) {
                wishlistButton.textContent =
                    "Remove from Wishlist";
            }
        }
    }
}

document.addEventListener(
    "click",
    function (event) {

        const clickedButton =
            event.target.closest(
                "#foodAddCartButton, #foodWishlistButton"
            );

        if (!clickedButton) {
            return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();

        const params =
            new URLSearchParams(
                window.location.search
            );

        const foodId =
            normalizeId(
                params.get("food")
            );

        const restaurantId =
            normalizeId(
                params.get("restaurant")
            );

        if (!foodId) {
            alert(
                "Food information not found."
            );

            return;
        }

        const food =
            findFoodById(
                foodId,
                restaurantId
            );

        if (!food) {
            alert(
                "Food information not found."
            );

            return;
        }

        const loggedIn =
            localStorage.getItem(
                "yummyTummyLoggedIn"
            ) === "true";

        if (!loggedIn) {
            const shouldLogin =
                window.confirm(
                    "Please Login First"
                );

            if (shouldLogin) {
                window.location.href =
                    "login.html";
            }

            return;
        }

        if (
            clickedButton.id ===
            "foodAddCartButton"
        ) {
            let cart = [];

            try {
                const savedCart =
                    localStorage.getItem(
                        "yummyTummyCart"
                    );

                if (savedCart) {
                    cart =
                        JSON.parse(
                            savedCart
                        );
                }
            } catch (error) {
                cart = [];
            }

            if (!Array.isArray(cart)) {
                cart = [];
            }

            const normalizedFoodId =
                normalizeId(
                    food.id
                );

            const existingItem =
                cart.find(
                    function (item) {
                        return (
                            item &&
                            normalizeId(
                                item.id
                            ) ===
                            normalizedFoodId
                        );
                    }
                );

            if (existingItem) {
                existingItem.quantity =
                    Number(
                        existingItem.quantity || 0
                    ) + 1;
            } else {
                cart.push({
                    id:
                        food.id || "",

                    name:
                        food.name || "",

                    category:
                        food.category || "",

                    price:
                        Number(
                            food.price || 0
                        ),

                    rating:
                        Number(
                            food.rating || 0
                        ),

                    image:
                        getFoodImage(
                            food,
                            restaurantId
                        ),

                    restaurantId:
                        restaurantId ||
                        food.restaurantId ||
                        "",

                    quantity:
                        1
                });
            }

            localStorage.setItem(
                "yummyTummyCart",
                JSON.stringify(
                    cart
                )
            );

            clickedButton.textContent =
                "Added to Cart";

            clickedButton.disabled =
                true;

            window.setTimeout(
                function () {
                    clickedButton.textContent =
                        "Add to Cart";

                    clickedButton.disabled =
                        false;
                },
                1200
            );

            return;
        }

        if (
            clickedButton.id ===
            "foodWishlistButton"
        ) {
            let wishlist = [];

            try {
                const savedWishlist =
                    localStorage.getItem(
                        "yummyTummyWishlist"
                    );

                if (savedWishlist) {
                    wishlist =
                        JSON.parse(
                            savedWishlist
                        );
                }
            } catch (error) {
                wishlist = [];
            }

            if (!Array.isArray(wishlist)) {
                wishlist = [];
            }

            const normalizedFoodId =
                normalizeId(
                    food.id
                );

            const existingIndex =
                wishlist.findIndex(
                    function (item) {
                        return (
                            item &&
                            normalizeId(
                                item.id
                            ) ===
                            normalizedFoodId
                        );
                    }
                );

            if (
                existingIndex !==
                -1
            ) {
                wishlist.splice(
                    existingIndex,
                    1
                );

                localStorage.setItem(
                    "yummyTummyWishlist",
                    JSON.stringify(
                        wishlist
                    )
                );

                clickedButton.textContent =
                    "Add to Wishlist";

                return;
            }

            wishlist.push({
                id:
                    food.id || "",

                name:
                    food.name || "",

                category:
                    food.category || "",

                price:
                    Number(
                        food.price || 0
                    ),

                rating:
                    Number(
                        food.rating || 0
                    ),

                image:
                    getFoodImage(
                        food,
                        restaurantId
                    ),

                description:
                    food.description ||
                    getFoodDescription(
                        food.name,
                        food.category
                    ),

                restaurantId:
                    restaurantId ||
                    food.restaurantId ||
                    ""
            });

            localStorage.setItem(
                "yummyTummyWishlist",
                JSON.stringify(
                    wishlist
                )
            );

            clickedButton.textContent =
                "Remove from Wishlist";
        }

    },
    true
);