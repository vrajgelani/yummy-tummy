"use strict";


/* ========================================
   FOOD ACTIONS
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeFoodActions();

    }
);


/* ========================================
   INITIALIZE
======================================== */

function initializeFoodActions() {

    const addCartButton =
        document.getElementById(
            "foodAddCartButton"
        );

    const wishlistButton =
        document.getElementById(
            "foodWishlistButton"
        );


    if (
        !addCartButton ||
        !wishlistButton
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
        return;
    }


    const food =
        findActionFood(foodId);


    if (!food) {
        return;
    }


    addCartButton.addEventListener(
        "click",
        function () {

            handleAddToCart(food);

        }
    );


    wishlistButton.addEventListener(
        "click",
        function () {

            handleAddToWishlist(food);

        }
    );


    updateWishlistButton(
        food.id,
        wishlistButton
    );

}


/* ========================================
   FIND FOOD
======================================== */

function findActionFood(
    foodId
) {

    if (
        typeof menuFoods !==
            "undefined" &&
        Array.isArray(menuFoods)
    ) {

        const menuFood =
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


        if (menuFood) {

            return menuFood;

        }

    }


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


    const popularFood =
        popularFoods.find(
            function (item) {

                return (
                    item.id ===
                    foodId
                );

            }
        );


    if (popularFood) {

        return popularFood;

    }


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

                return restaurantFood;

            }

        }

    }


    return null;
}


/* ========================================
   LOGIN CHECK
======================================== */

function isUserLoggedIn() {

    const possibleKeys = [

        "yummyTummyLoggedIn",
        "yummyTummyUser",
        "isLoggedIn",
        "loggedIn"

    ];


    for (
        let i = 0;
        i < possibleKeys.length;
        i++
    ) {

        const value =
            localStorage.getItem(
                possibleKeys[i]
            );


        if (
            value === "true" ||
            value === "1"
        ) {

            return true;

        }

    }


    return false;
}


/* ========================================
   LOGIN MESSAGE
======================================== */

function showLoginRequiredMessage() {

    const shouldLogin =
        window.confirm(
            "Please Login First"
        );


    if (shouldLogin) {

        window.location.href =
            "login.html";

    }

}


/* ========================================
   ADD TO CART
======================================== */

function handleAddToCart(
    food
) {

    if (
        !isUserLoggedIn()
    ) {

        showLoginRequiredMessage();

        return;

    }


    let cartItems = [];


    const storedCart =
        localStorage.getItem(
            "yummyTummyCart"
        );


    if (storedCart) {

        try {

            cartItems =
                JSON.parse(
                    storedCart
                );


            if (
                !Array.isArray(
                    cartItems
                )
            ) {

                cartItems = [];

            }

        } catch (error) {

            cartItems = [];

        }

    }


    const existingItem =
        cartItems.find(
            function (item) {

                return (
                    item.id ===
                    food.id
                );

            }
        );


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cartItems.push({

            id: food.id,

            name: food.name,

            category:
                food.category || "",

            price:
                Number(
                    food.price
                ) || 0,

            rating:
                Number(
                    food.rating
                ) || 0,

            image:
                food.image || "",

            quantity: 1

        });

    }


    localStorage.setItem(
        "yummyTummyCart",
        JSON.stringify(
            cartItems
        )
    );


    window.alert(
        food.name +
        " added to cart."
    );

}


/* ========================================
   ADD TO WISHLIST
======================================== */

function handleAddToWishlist(
    food
) {

    if (
        !isUserLoggedIn()
    ) {

        showLoginRequiredMessage();

        return;

    }


    let wishlistItems = [];


    const storedWishlist =
        localStorage.getItem(
            "yummyTummyWishlist"
        );


    if (storedWishlist) {

        try {

            wishlistItems =
                JSON.parse(
                    storedWishlist
                );


            if (
                !Array.isArray(
                    wishlistItems
                )
            ) {

                wishlistItems = [];

            }

        } catch (error) {

            wishlistItems = [];

        }

    }


    const alreadyExists =
        wishlistItems.some(
            function (item) {

                return (
                    item.id ===
                    food.id
                );

            }
        );


    if (alreadyExists) {

        window.alert(
            food.name +
            " is already in your wishlist."
        );

        return;

    }


    wishlistItems.push({

        id: food.id,

        name: food.name,

        category:
            food.category || "",

        price:
            Number(
                food.price
            ) || 0,

        rating:
            Number(
                food.rating
            ) || 0,

        image:
            food.image || ""

    });


    localStorage.setItem(
        "yummyTummyWishlist",
        JSON.stringify(
            wishlistItems
        )
    );


    const wishlistButton =
        document.getElementById(
            "foodWishlistButton"
        );


    updateWishlistButton(
        food.id,
        wishlistButton
    );


    window.alert(
        food.name +
        " added to wishlist."
    );

}


/* ========================================
   WISHLIST BUTTON STATE
======================================== */

function updateWishlistButton(
    foodId,
    button
) {

    if (!button) {
        return;
    }


    const storedWishlist =
        localStorage.getItem(
            "yummyTummyWishlist"
        );


    if (!storedWishlist) {

        button.textContent =
            "Add to Wishlist";

        return;

    }


    let wishlistItems = [];


    try {

        wishlistItems =
            JSON.parse(
                storedWishlist
            );

    } catch (error) {

        wishlistItems = [];

    }


    if (
        !Array.isArray(
            wishlistItems
        )
    ) {

        wishlistItems = [];

    }


    const exists =
        wishlistItems.some(
            function (item) {

                return (
                    item.id ===
                    foodId
                );

            }
        );


    if (exists) {

        button.textContent =
            "Remove from Wishlist";

    } else {

        button.textContent =
            "Add to Wishlist";

    }

}