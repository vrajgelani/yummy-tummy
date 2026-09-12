"use strict";


/* ========================================
   FOOD DETAILS PAGE
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeFoodDetailsPage();

    }
);


/* ========================================
   INITIALIZE FOOD DETAILS
======================================== */

function initializeFoodDetailsPage() {

    const detailsSection =
        document.getElementById(
            "foodDetailsSection"
        );


    const invalidState =
        document.getElementById(
            "foodInvalidState"
        );


    if (
        !detailsSection ||
        !invalidState
    ) {
        return;
    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const foodId =
        (
            params.get("food") || ""
        )
            .trim()
            .toLowerCase();


    if (!foodId) {

        showFoodInvalidState();

        return;
    }


    const food =
        findFoodById(foodId);


    if (!food) {

        showFoodInvalidState();

        return;
    }


    displayFoodDetails(
        food
    );


    initializeFoodRestaurant(
        params
    );

}


/* ========================================
   FIND FOOD
======================================== */

function findFoodById(
    foodId
) {

    let food = null;


    /* ------------------------------------
       INDEX MENU FOODS
    ------------------------------------ */

    if (
        typeof menuFoods !==
        "undefined" &&
        Array.isArray(menuFoods)
    ) {

        food =
            menuFoods.find(
                function (item) {

                    return (
                        String(
                            item.id
                        )
                            .toLowerCase() ===
                        foodId
                    );

                }
            );

    }


    if (food) {
        return food;
    }


    /* ------------------------------------
       POPULAR FOODS
    ------------------------------------ */

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
                "Delicious grilled paneer kebabs prepared with aromatic spices and fresh vegetables."
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
                "A rich vegetarian pizza filled with creamy melted cheese and delicious toppings."
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
                "A flavorful vegetarian burger with a crispy patty and spicy peri peri seasoning."
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
                "A delicious layered sandwich filled with paneer, fresh vegetables and creamy dressing."
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
                "Creamy vegetarian pasta prepared with Mexican-inspired spices and fresh vegetables."
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
                "A traditional creamy Indian dessert prepared with milk, rice, nuts and aromatic flavours."
        }

    ];


    food =
        popularFoods.find(
            function (item) {

                return (
                    item.id ===
                    foodId
                );

            }
        );


    if (food) {
        return food;
    }


    /* ------------------------------------
       RESTAURANT MENU FOODS
    ------------------------------------ */

    if (
        typeof restaurantMenuData !==
            "undefined" &&
        Array.isArray(
            restaurantMenuData
        )
    ) {

        for (
            let i = 0;
            i <
            restaurantMenuData.length;
            i++
        ) {

            const restaurantMenu =
                restaurantMenuData[i];


            if (
                !restaurantMenu ||
                !Array.isArray(
                    restaurantMenu.foods
                )
            ) {
                continue;
            }


            const restaurantFood =
                restaurantMenu.foods.find(
                    function (item) {

                        return (
                            String(
                                item.id
                            )
                                .toLowerCase() ===
                            foodId
                        );

                    }
                );


            if (restaurantFood) {

                return {
                    ...restaurantFood,
                    restaurantId:
                        restaurantMenu.restaurantId
                };

            }

        }

    }


    return null;
}


/* ========================================
   DISPLAY FOOD DETAILS
======================================== */

function displayFoodDetails(
    food
) {

    const detailsSection =
        document.getElementById(
            "foodDetailsSection"
        );


    const invalidState =
        document.getElementById(
            "foodInvalidState"
        );


    const image =
        document.getElementById(
            "foodDetailsImage"
        );


    const name =
        document.getElementById(
            "foodDetailsName"
        );


    const category =
        document.getElementById(
            "foodDetailsCategory"
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


    const breadcrumbName =
        document.getElementById(
            "foodBreadcrumbName"
        );


    const backButton =
        document.getElementById(
            "foodBackButton"
        );


    if (detailsSection) {

        detailsSection.hidden =
            false;

    }


    if (invalidState) {

        invalidState.hidden =
            true;

    }


    if (image) {

        if (food.image) {

            image.src =
                food.image;

        }


        image.alt =
            food.name;

    }


    if (name) {

        name.textContent =
            food.name;

    }


    if (category) {

        category.textContent =
            food.category ||
            "Vegetarian Food";

    }


    if (rating) {

        rating.textContent =
            food.rating || "0.0";

    }


    if (price) {

        price.textContent =
            "₹" +
            (
                food.price || 0
            );

    }


    if (description) {

        description.textContent =
            food.description ||
            "Delicious vegetarian food prepared with fresh ingredients and rich flavours.";

    }


    if (breadcrumbName) {

        breadcrumbName.textContent =
            food.name;

    }


    if (backButton) {

        const categorySlug =
            food.categorySlug;


        if (categorySlug) {

            backButton.href =
                "menu.html?category=" +
                encodeURIComponent(
                    categorySlug
                );

        } else {

            backButton.href =
                "menu.html";

        }

    }


    document.title =
        food.name +
        " | Yummy Tummy";

}


/* ========================================
   RESTAURANT INFORMATION
======================================== */

function initializeFoodRestaurant(
    params
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


    const restaurantId =
        (
            params.get("restaurant") ||
            ""
        )
            .trim()
            .toLowerCase();


    if (
        !restaurantId
    ) {

        if (restaurantName) {

            restaurantName.textContent =
                "Available on Yummy Tummy";

        }


        if (restaurantCuisine) {

            restaurantCuisine.textContent =
                "Vegetarian Food";

        }


        if (restaurantLocation) {

            restaurantLocation.textContent =
                "Multiple Restaurants";

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
                    item.id ===
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
            restaurant.cuisine;

    }


    if (restaurantLocation) {

        restaurantLocation.textContent =
            restaurant.location;

    }

}


/* ========================================
   INVALID FOOD
======================================== */

function showFoodInvalidState() {

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