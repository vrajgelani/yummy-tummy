document.addEventListener("DOMContentLoaded", function () {
    initializeFoodDetailsPage();
});


/* ========================================
   FOOD DETAILS PAGE
======================================== */

function initializeFoodDetailsPage() {

    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    const foodId =
        String(
            urlParams.get("food") || ""
        )
            .trim()
            .toLowerCase();

    const restaurantId =
        String(
            urlParams.get("restaurant") || ""
        )
            .trim()
            .toLowerCase();


    if (!foodId) {
        showFoodNotFound();
        return;
    }


    const food =
        findFoodById(foodId);


    if (!food) {
        showFoodNotFound();
        return;
    }


    displayFoodDetails(
        food,
        restaurantId
    );
}


/* ========================================
   FIND FOOD
======================================== */

function findFoodById(foodId) {

    /* --------------------------------
       1. MENU DATA
    -------------------------------- */

    if (
        typeof menuFoods !== "undefined" &&
        Array.isArray(menuFoods)
    ) {

        const menuFood =
            menuFoods.find(
                function (food) {

                    return (
                        String(
                            food.id || ""
                        )
                            .trim()
                            .toLowerCase() ===
                        foodId
                    );

                }
            );


        if (menuFood) {

            return createMenuFoodDetails(
                menuFood
            );

        }
    }


    /* --------------------------------
       2. FALLBACK MENU DATA
    -------------------------------- */

    const fallbackMenuFood =
        getFallbackMenuFood(
            foodId
        );


    if (fallbackMenuFood) {

        return fallbackMenuFood;

    }


    /* --------------------------------
       3. POPULAR FOOD
    -------------------------------- */

    const popularFood =
        getPopularFoodById(
            foodId
        );


    if (popularFood) {

        return popularFood;

    }


    /* --------------------------------
       4. RESTAURANT MENU
    -------------------------------- */

    if (
        typeof restaurantMenuData !==
            "undefined" &&
        Array.isArray(
            restaurantMenuData
        )
    ) {

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


            const restaurantFood =
                restaurant.foods.find(
                    function (food) {

                        return (
                            String(
                                food.id || ""
                            )
                                .trim()
                                .toLowerCase() ===
                            foodId
                        );

                    }
                );


            if (restaurantFood) {

                return {
                    id:
                        restaurantFood.id,

                    name:
                        restaurantFood.name,

                    category:
                        restaurantFood.category,

                    categorySlug:
                        createCategorySlug(
                            restaurantFood.category
                        ),

                    price:
                        Number(
                            restaurantFood.price || 0
                        ),

                    rating:
                        Number(
                            restaurantFood.rating || 0
                        ),

                    image:
                        restaurantFood.image ||
                        getRestaurantFoodImage(
                            restaurant.id,
                            restaurantFood
                        ),

                    description:
                        restaurantFood.description ||
                        createFoodDescription(
                            restaurantFood.name,
                            restaurantFood.category
                        ),

                    source:
                        "restaurant",

                    restaurantId:
                        restaurant.id
                };
            }
        }
    }


    return null;
}


/* ========================================
   CREATE MENU FOOD DETAILS
======================================== */

function createMenuFoodDetails(
    food
) {

    let image =
        getMenuFoodImage(
            food
        );


    return {

        id:
            String(
                food.id
            )
                .trim()
                .toLowerCase(),

        name:
            food.name,

        category:
            food.category,

        categorySlug:
            food.categorySlug ||
            createCategorySlug(
                food.category
            ),

        price:
            Number(
                food.price || 0
            ),

        rating:
            Number(
                food.rating || 0
            ),

        image:
            image,

        description:
            food.description ||
            createFoodDescription(
                food.name,
                food.category
            ),

        source:
            "menu"

    };
}


/* ========================================
   MENU FOOD IMAGE
======================================== */

function getMenuFoodImage(
    food
) {

    const category =
        String(
            food.categorySlug ||
            food.category ||
            ""
        )
            .trim()
            .toLowerCase();


    const imageCategoryMap = {

        starters:
            "starter",

        starter:
            "starter",

        pizza:
            "pizza",

        burger:
            "burger",

        burgers:
            "burger",

        sandwich:
            "sandwich",

        sandwiches:
            "sandwich",

        pasta:
            "pasta",

        chinese:
            "chinese",

        "south-indian":
            "south-indian",

        "south indian":
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


    const imagePrefix =
        imageCategoryMap[category] ||
        category;


    let imageNumber =
        getMenuFoodNumber(
            food
        );


    return (
        "images/menu-foods/" +
        imagePrefix +
        "-" +
        imageNumber +
        ".png"
    );
}


/* ========================================
   GET MENU FOOD NUMBER
======================================== */

function getMenuFoodNumber(
    food
) {

    const foodId =
        String(
            food.id || ""
        )
            .trim()
            .toLowerCase();


    /*
       IMPORTANT:
       Starter images:
       starter-01.png
       starter-02.png
       starter-03.png
       starter-04.png
       starter-05.png
    */

    const foodNumberMap = {

        "paneer-tikka":
            "01",

        "veg-spring-rolls":
            "02",

        "hara-bhara-kebab":
            "03",

        "cheese-corn-balls":
            "04",

        "crispy-veg-fingers":
            "05",


        "margherita-pizza":
            "01",

        "farmhouse-pizza":
            "02",

        "veggie-delight-pizza":
            "03",

        "corn-cheese-pizza":
            "04",

        "paneer-tikka-pizza":
            "05",


        "classic-veg-burger":
            "01",

        "aloo-tikki-burger":
            "02",

        "cheese-veg-burger":
            "03",

        "paneer-burger":
            "04",

        "mexican-veg-burger":
            "05",


        "grilled-veg-sandwich":
            "01",

        "bombay-veg-sandwich":
            "02",

        "cheese-corn-sandwich":
            "03",

        "masala-paneer-sandwich":
            "04",

        "veg-club-sandwich":
            "05",


        "arrabbiata-pasta":
            "01",

        "alfredo-pasta":
            "02",

        "pink-sauce-pasta":
            "03",

        "pesto-veg-pasta":
            "04",

        "creamy-mushroom-pasta":
            "05",


        "veg-hakka-noodles":
            "01",

        "veg-fried-rice":
            "02",

        "veg-manchurian":
            "03",

        "chilli-paneer":
            "04",

        "schezwan-veg-noodles":
            "05",


        "masala-dosa":
            "01",

        "plain-dosa":
            "02",

        "idli-sambar":
            "03",

        "medu-vada":
            "04",

        "uttapam":
            "05",


        "gujarati-thali":
            "01",

        "sev-tameta":
            "02",

        "undhiyu":
            "03",

        "dal-dhokli":
            "04",

        "khandvi":
            "05",


        "veg-dum-biryani":
            "01",

        "paneer-biryani":
            "02",

        "hyderabadi-veg-biryani":
            "03",

        "kathiyawadi-veg-biryani":
            "04",

        "tawa-veg-biryani":
            "05",


        "gulab-jamun":
            "01",

        "rasmalai":
            "02",

        "jalebi":
            "03",

        "gajar-halwa":
            "04",

        "shrikhand":
            "05"

    };


    return (
        foodNumberMap[foodId] ||
        "01"
    );
}


/* ========================================
   FALLBACK MENU FOOD
======================================== */

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


    const food =
        foods.find(
            function (item) {

                return (
                    item.id ===
                    foodId
                );

            }
        );


    if (!food) {
        return null;
    }


    return {

        id:
            food.id,

        name:
            food.name,

        category:
            food.category,

        categorySlug:
            createCategorySlug(
                food.category
            ),

        price:
            food.price,

        rating:
            food.rating,

        image:
            getMenuFoodImage(
                food
            ),

        description:
            createFoodDescription(
                food.name,
                food.category
            ),

        source:
            "menu"

    };
}


/* ========================================
   POPULAR FOOD
======================================== */

function getPopularFoodById(
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
                "Soft paneer kebabs grilled with aromatic spices and served as a delicious vegetarian starter."

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
                "Delicious vegetarian pizza loaded with rich cheese and a soft cheese-filled crust."

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
                "A flavorful vegetarian burger with spicy peri peri seasoning and fresh ingredients."

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
                "A satisfying vegetarian club sandwich filled with seasoned paneer and fresh vegetables."

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
                "Creamy vegetarian pasta prepared with Mexican-inspired spices, vegetables and rich sauce."

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
                "Traditional creamy rice pudding prepared with milk, aromatic spices and dry fruits."

        }

    ];


    const food =
        popularFoods.find(
            function (item) {

                return (
                    item.id ===
                    foodId
                );

            }
        );


    if (!food) {
        return null;
    }


    return {

        id:
            food.id,

        name:
            food.name,

        category:
            food.category,

        categorySlug:
            createCategorySlug(
                food.category
            ),

        price:
            food.price,

        rating:
            food.rating,

        image:
            food.image,

        description:
            food.description,

        source:
            "popular"

    };
}


/* ========================================
   RESTAURANT FOOD IMAGE
======================================== */

function getRestaurantFoodImage(
    restaurantId,
    food
) {

    if (!restaurantId || !food) {
        return "";
    }


    const foodId =
        String(
            food.id || ""
        )
            .trim()
            .toLowerCase();


    return (
        "images/restaurant-food/" +
        restaurantId +
        "/" +
        foodId +
        ".png"
    );
}


/* ========================================
   DISPLAY FOOD DETAILS
======================================== */

function displayFoodDetails(
    food,
    restaurantId
) {

    const detailsSection =
        document.getElementById(
            "foodDetailsSection"
        );


    const invalidState =
        document.getElementById(
            "foodInvalidState"
        );


    if (detailsSection) {

        detailsSection.hidden =
            false;

    }


    if (invalidState) {

        invalidState.hidden =
            true;

    }


    const image =
        document.getElementById(
            "foodDetailsImage"
        );

    const category =
        document.getElementById(
            "foodDetailsCategory"
        );

    const name =
        document.getElementById(
            "foodDetailsName"
        );

    const rating =
        document.getElementById(
            "foodDetailsRating"
        );

    const price =
        document.getElementById(
            "foodDetailsPrice"
        );

    const description =
        document.getElementById(
            "foodDetailsDescription"
        );


    if (image) {

        image.src =
            food.image;

        image.alt =
            food.name;

        image.onerror =
            function () {

                const fallback =
                    getFallbackFoodImage(
                        food
                    );


                if (
                    fallback &&
                    image.src !==
                        new URL(
                            fallback,
                            window.location.href
                        ).href
                ) {

                    image.src =
                        fallback;

                }

            };

    }


    if (category) {

        category.textContent =
            food.category;

    }


    if (name) {

        name.textContent =
            food.name;

    }


    if (rating) {

        rating.textContent =
            String(
                food.rating
            );

    }


    if (price) {

        price.textContent =
            "₹" +
            food.price;

    }


    if (description) {

        description.textContent =
            food.description;

    }


    displayRestaurantInformation(
        restaurantId
    );


    const backButton =
        document.getElementById(
            "foodBackButton"
        );


    if (backButton) {

        if (restaurantId) {

            backButton.href =
                "view-restaurant.html?restaurant=" +
                encodeURIComponent(
                    restaurantId
                );

        } else {

            backButton.href =
                "menu.html";

        }

    }


    const addCartButton =
        document.getElementById(
            "foodAddCartButton"
        );


    const wishlistButton =
        document.getElementById(
            "foodWishlistButton"
        );


    if (addCartButton) {

        addCartButton.dataset.foodId =
            food.id;

    }


    if (wishlistButton) {

        wishlistButton.dataset.foodId =
            food.id;

    }


    document.title =
        food.name +
        " | Yummy Tummy";
}


/* ========================================
   RESTAURANT INFORMATION
======================================== */

function displayRestaurantInformation(
    restaurantId
) {

    const restaurantName =
        document.getElementById(
            "foodDetailsRestaurantName"
        );

    const restaurantCuisine =
        document.getElementById(
            "foodDetailsRestaurantCuisine"
        );

    const restaurantLocation =
        document.getElementById(
            "foodDetailsRestaurantLocation"
        );


    if (!restaurantId) {

        if (restaurantName) {

            restaurantName.textContent =
                "Yummy Tummy";

        }


        if (restaurantCuisine) {

            restaurantCuisine.textContent =
                "Vegetarian Food";

        }


        if (restaurantLocation) {

            restaurantLocation.textContent =
                "Available Across India";

        }


        return;
    }


    if (
        typeof restaurantData ===
            "undefined" ||
        !Array.isArray(
            restaurantData
        )
    ) {
        return;
    }


    const restaurant =
        restaurantData.find(
            function (item) {

                return (
                    String(
                        item.id || ""
                    )
                        .trim()
                        .toLowerCase() ===
                    restaurantId
                );

            }
        );


    if (!restaurant) {
        return;
    }


    if (restaurantName) {

        restaurantName.textContent =
            restaurant.name;

    }


    if (restaurantCuisine) {

        restaurantCuisine.textContent =
            restaurant.cuisine ||
            "Vegetarian";

    }


    if (restaurantLocation) {

        restaurantLocation.textContent =
            restaurant.location ||
            "India";

    }
}


/* ========================================
   FALLBACK FOOD IMAGE
======================================== */

function getFallbackFoodImage(
    food
) {

    if (!food) {
        return "";
    }


    const category =
        String(
            food.categorySlug ||
            food.category ||
            ""
        )
            .trim()
            .toLowerCase();


    const imageCategoryMap = {

        starters:
            "starter",

        starter:
            "starter",

        pizza:
            "pizza",

        burger:
            "burger",

        burgers:
            "burger",

        sandwich:
            "sandwich",

        sandwiches:
            "sandwich",

        pasta:
            "pasta",

        chinese:
            "chinese",

        "south-indian":
            "south-indian",

        "south indian":
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


    const imagePrefix =
        imageCategoryMap[category] ||
        category;


    const imageNumber =
        getMenuFoodNumber(
            food
        );


    return (
        "images/menu-foods/" +
        imagePrefix +
        "-" +
        imageNumber +
        ".png"
    );
}


/* ========================================
   CATEGORY SLUG
======================================== */

function createCategorySlug(
    category
) {

    const value =
        String(
            category || ""
        )
            .trim()
            .toLowerCase();


    const categoryMap = {

        starters:
            "starters",

        starter:
            "starters",

        pizza:
            "pizza",

        burger:
            "burger",

        burgers:
            "burger",

        sandwich:
            "sandwich",

        sandwiches:
            "sandwich",

        pasta:
            "pasta",

        chinese:
            "chinese",

        "south indian":
            "south-indian",

        "south-indian":
            "south-indian",

        gujarati:
            "gujarati",

        biryani:
            "biryani",

        desserts:
            "desserts",

        dessert:
            "desserts"

    };


    return (
        categoryMap[value] ||
        value.replace(
            /\s+/g,
            "-"
        )
    );
}


/* ========================================
   FOOD DESCRIPTION
======================================== */

function createFoodDescription(
    name,
    category
) {

    const foodName =
        name ||
        "This delicious food";


    const foodCategory =
        category ||
        "vegetarian";


    return (
        foodName +
        " is a delicious vegetarian " +
        foodCategory.toLowerCase() +
        " prepared with fresh ingredients and flavorful spices. Enjoy a satisfying food experience with Yummy Tummy."
    );
}


/* ========================================
   FOOD NOT FOUND
======================================== */

function showFoodNotFound() {

    const detailsSection =
        document.getElementById(
            "foodDetailsSection"
        );


    const invalidState =
        document.getElementById(
            "foodInvalidState"
        );


    if (detailsSection) {

        detailsSection.hidden =
            true;

    }


    if (invalidState) {

        invalidState.hidden =
            false;

    }


    document.title =
        "Food Not Found | Yummy Tummy";
}