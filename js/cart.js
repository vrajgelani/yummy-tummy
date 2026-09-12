/* ==================================================
   YUMMY TUMMY
   CART DATA, DISPLAY, ACTIONS AND SUMMARY
   ================================================== */


/* ==================== POPULAR FOOD DATA ==================== */

const cartPopularFoods = [
    {
        id: "paneer-kebab",
        name: "Paneer Kebab",
        category: "Starters",
        price: 249,
        rating: 4.8,
        image: "images/popular-foods/paneer-kebab.png"
    },
    {
        id: "cheese-burst-pizza",
        name: "Cheese Burst Pizza",
        category: "Pizza",
        price: 329,
        rating: 4.9,
        image: "images/popular-foods/cheese-burst-pizza.png"
    },
    {
        id: "peri-peri-burger",
        name: "Peri Peri Burger",
        category: "Burger",
        price: 219,
        rating: 4.7,
        image: "images/popular-foods/peri-peri-burger.png"
    },
    {
        id: "paneer-club-sandwich",
        name: "Paneer Club Sandwich",
        category: "Sandwich",
        price: 229,
        rating: 4.6,
        image: "images/popular-foods/paneer-club-sandwich.png"
    },
    {
        id: "mexican-pasta",
        name: "Mexican Pasta",
        category: "Pasta",
        price: 279,
        rating: 4.8,
        image: "images/popular-foods/mexican-pasta.png"
    },
    {
        id: "royal-kheer",
        name: "Royal Kheer",
        category: "Desserts",
        price: 159,
        rating: 4.9,
        image: "images/popular-foods/royal-kheer.png"
    }
];


/* ==================== GET CART DATA ==================== */

function getStoredCart() {
    const storedCart =
        localStorage.getItem(
            "yummyTummyCart"
        );

    if (!storedCart) {
        return [];
    }

    try {
        const parsedCart =
            JSON.parse(
                storedCart
            );

        if (!Array.isArray(parsedCart)) {
            return [];
        }

        return parsedCart;

    } catch (error) {
        return [];
    }
}


/* ==================== SAVE CART DATA ==================== */

function saveCart(cartItems) {
    localStorage.setItem(
        "yummyTummyCart",
        JSON.stringify(
            cartItems
        )
    );
}


/* ==================== FIND FOOD ==================== */

function findCartFood(foodId) {
    if (!foodId) {
        return null;
    }

    const normalizedFoodId =
        String(
            foodId
        )
            .trim()
            .toLowerCase();

    /*
     * 1. MAIN MENU FOOD
     */
    if (
        typeof menuFoods !==
            "undefined" &&
        Array.isArray(
            menuFoods
        )
    ) {
        const menuFood =
            menuFoods.find(
                function (food) {
                    return (
                        food &&
                        String(
                            food.id || ""
                        )
                            .trim()
                            .toLowerCase() ===
                        normalizedFoodId
                    );
                }
            );

        if (menuFood) {
            return menuFood;
        }
    }


    /*
     * 2. POPULAR FOOD
     */
    const popularFood =
        cartPopularFoods.find(
            function (food) {
                return (
                    food &&
                    String(
                        food.id || ""
                    )
                        .trim()
                        .toLowerCase() ===
                    normalizedFoodId
                );
            }
        );

    if (popularFood) {
        return popularFood;
    }


    /*
     * 3. RESTAURANT MENU FOOD
     */
    if (
        typeof restaurantMenuData !==
        "undefined"
    ) {

        /*
         * ARRAY FORMAT
         */
        if (
            Array.isArray(
                restaurantMenuData
            )
        ) {

            for (
                const restaurant of
                restaurantMenuData
            ) {

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
                                food &&
                                String(
                                    food.id || ""
                                )
                                    .trim()
                                    .toLowerCase() ===
                                normalizedFoodId
                            );
                        }
                    );

                if (restaurantFood) {
                    return {
                        ...restaurantFood,

                        restaurantId:
                            restaurant.restaurantId ||
                            restaurant.id ||
                            ""
                    };
                }
            }
        }


        /*
         * OBJECT FORMAT
         *
         * Supports:
         *
         * {
         *     "restaurant-id": [...]
         * }
         *
         * OR:
         *
         * {
         *     "restaurant-id": {
         *         foods: [...]
         *     }
         * }
         */
        if (
            typeof restaurantMenuData ===
            "object"
        ) {

            const restaurantIds =
                Object.keys(
                    restaurantMenuData
                );

            for (
                let i = 0;
                i <
                restaurantIds.length;
                i++
            ) {

                const restaurantId =
                    restaurantIds[i];

                const restaurant =
                    restaurantMenuData[
                        restaurantId
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

                const restaurantFood =
                    foods.find(
                        function (food) {
                            return (
                                food &&
                                String(
                                    food.id || ""
                                )
                                    .trim()
                                    .toLowerCase() ===
                                normalizedFoodId
                            );
                        }
                    );

                if (restaurantFood) {
                    return {
                        ...restaurantFood,

                        restaurantId:
                            restaurantFood.restaurantId ||
                            restaurantId
                    };
                }
            }
        }
    }


    /*
     * 4. LOCAL STORAGE FALLBACK
     *
     * This is important because the Add to Cart
     * button may already have stored the complete
     * food object in localStorage.
     *
     * So Cart does not depend only on menuFoods
     * or restaurantMenuData.
     */
    const storedCart =
        getStoredCart();

    const storedItem =
        storedCart.find(
            function (item) {

                if (!item) {
                    return false;
                }

                const storedFoodId =
                    item.id ||
                    item.foodId ||
                    "";

                return (
                    String(
                        storedFoodId
                    )
                        .trim()
                        .toLowerCase() ===
                    normalizedFoodId
                );
            }
        );

    if (storedItem) {
        return {
            id:
                storedItem.id ||
                storedItem.foodId ||
                "",

            name:
                storedItem.name ||
                "",

            category:
                storedItem.category ||
                "Food",

            price:
                Number(
                    storedItem.price || 0
                ),

            rating:
                Number(
                    storedItem.rating || 0
                ),

            image:
                storedItem.image ||
                "",

            restaurantId:
                storedItem.restaurantId ||
                "",

            description:
                storedItem.description ||
                ""
        };
    }


    return null;
}


/* ==================== GET FOOD ID ==================== */

function getCartFoodId(
    cartItem
) {
    if (
        !cartItem ||
        typeof cartItem !==
            "object"
    ) {
        return "";
    }

    if (cartItem.id) {
        return cartItem.id;
    }

    if (cartItem.foodId) {
        return cartItem.foodId;
    }

    return "";
}


/* ==================== GET QUANTITY ==================== */

function getCartQuantity(
    cartItem
) {
    const quantity =
        Number(
            cartItem.quantity
        );

    if (
        !Number.isFinite(
            quantity
        ) ||
        quantity < 1
    ) {
        return 1;
    }

    return Math.floor(
        quantity
    );
}


/* ==================== PREPARE CART ITEMS ==================== */

function prepareCartItems() {
    const storedCart =
        getStoredCart();

    const validItems = [];

    storedCart.forEach(
        (
            cartItem
        ) => {

            const foodId =
                getCartFoodId(
                    cartItem
                );

            const food =
                findCartFood(
                    foodId
                );

            if (!food) {
                return;
            }

            const quantity =
                getCartQuantity(
                    cartItem
                );

            validItems.push({
                food:
                    food,

                foodId:
                    foodId,

                quantity:
                    quantity,

                restaurantId:
                    cartItem.restaurantId ||
                    ""
            });

        }
    );

    return validItems;
}


/* ==================== FORMAT PRICE ==================== */

function formatCartPrice(
    price
) {
    const numericPrice =
        Number(price);

    if (
        !Number.isFinite(
            numericPrice
        )
    ) {
        return "₹0";
    }

    return (
        "₹" +
        numericPrice
    );
}


/* ==================== CALCULATE SUBTOTAL ==================== */

function calculateCartSubtotal(
    cartItems
) {
    return cartItems.reduce(
        (
            subtotal,
            cartItem
        ) => {

            const price =
                Number(
                    cartItem.food.price
                );

            const quantity =
                Number(
                    cartItem.quantity
                );

            if (
                !Number.isFinite(
                    price
                ) ||
                !Number.isFinite(
                    quantity
                )
            ) {
                return subtotal;
            }

            return (
                subtotal +
                (
                    price *
                    quantity
                )
            );

        },
        0
    );
}


/* ==================== DELIVERY FEE ==================== */

function calculateDeliveryFee(
    cartItems
) {
    if (
        !cartItems.length
    ) {
        return 0;
    }

    const subtotal =
        calculateCartSubtotal(
            cartItems
        );

    if (
        subtotal >= 500
    ) {
        return 0;
    }

    return 40;
}


/* ==================== UPDATE CART SUMMARY ==================== */

function updateCartSummary(
    cartItems
) {
    const subtotalElement =
        document.getElementById(
            "cartSubtotal"
        );

    const deliveryFeeElement =
        document.getElementById(
            "cartDeliveryFee"
        );

    const grandTotalElement =
        document.getElementById(
            "cartGrandTotal"
        );

    const subtotal =
        calculateCartSubtotal(
            cartItems
        );

    const deliveryFee =
        calculateDeliveryFee(
            cartItems
        );

    const grandTotal =
        subtotal +
        deliveryFee;

    if (
        subtotalElement
    ) {
        subtotalElement.textContent =
            formatCartPrice(
                subtotal
            );
    }

    if (
        deliveryFeeElement
    ) {
        deliveryFeeElement.textContent =
            formatCartPrice(
                deliveryFee
            );
    }

    if (
        grandTotalElement
    ) {
        grandTotalElement.textContent =
            formatCartPrice(
                grandTotal
            );
    }
}


/* ==================== DISPLAY CART ==================== */

function displayCartItems() {
    const cartCards =
        document.querySelectorAll(
            ".cart-item"
        );

    const emptyState =
        document.getElementById(
            "cartEmptyState"
        );

    const cartItemCount =
        document.getElementById(
            "cartItemCount"
        );

    if (
        !cartCards.length
    ) {
        return;
    }

    const cartItems =
        prepareCartItems();

    /*
     * Hide every card before
     * displaying the current cart.
     */
    cartCards.forEach(
        function (card) {
            card.hidden =
                true;

            card.style.display =
                "none";
        }
    );

    cartItems
        .slice(
            0,
            cartCards.length
        )
        .forEach(
            function (
                cartItem,
                index
            ) {

                const card =
                    cartCards[
                        index
                    ];

                if (!card) {
                    return;
                }

                const food =
                    cartItem.food;

                const quantity =
                    cartItem.quantity;

                const image =
                    card.querySelector(
                        "[data-cart-image]"
                    );

                const category =
                    card.querySelector(
                        "[data-cart-category]"
                    );

                const name =
                    card.querySelector(
                        "[data-cart-name]"
                    );

                const price =
                    card.querySelector(
                        "[data-cart-price]"
                    );

                const quantityElement =
                    card.querySelector(
                        "[data-cart-quantity]"
                    );

                const total =
                    card.querySelector(
                        "[data-cart-total]"
                    );

                const viewButton =
                    card.querySelector(
                        "[data-cart-view]"
                    );

                const increaseButton =
                    card.querySelector(
                        "[data-cart-increase]"
                    );

                const decreaseButton =
                    card.querySelector(
                        "[data-cart-decrease]"
                    );

                const removeButton =
                    card.querySelector(
                        "[data-cart-remove]"
                    );


                if (image) {
                    image.src =
                        food.image ||
                        "";

                    image.alt =
                        food.name ||
                        "Food";
                }


                if (category) {
                    category.textContent =
                        food.category ||
                        "Food";
                }


                if (name) {
                    name.textContent =
                        food.name ||
                        "Food";
                }


                if (price) {
                    price.textContent =
                        formatCartPrice(
                            food.price
                        );
                }


                if (
                    quantityElement
                ) {
                    quantityElement.textContent =
                        quantity;
                }


                if (total) {
                    const itemTotal =
                        Number(
                            food.price
                        ) *
                        quantity;

                    total.textContent =
                        formatCartPrice(
                            itemTotal
                        );
                }


                if (viewButton) {

                    let viewUrl =
                        "food-details.html?food=" +
                        encodeURIComponent(
                            food.id
                        );

                    if (
                        cartItem.restaurantId
                    ) {

                        viewUrl +=
                            "&restaurant=" +
                            encodeURIComponent(
                                cartItem.restaurantId
                            );
                    }

                    viewButton.href =
                        viewUrl;
                }


                if (increaseButton) {

                    increaseButton.onclick =
                        function () {

                            changeCartQuantity(
                                food.id,
                                1
                            );

                        };
                }


                if (decreaseButton) {

                    decreaseButton.onclick =
                        function () {

                            changeCartQuantity(
                                food.id,
                                -1
                            );

                        };
                }


                if (removeButton) {

                    removeButton.onclick =
                        function () {

                            removeCartItem(
                                food.id
                            );

                        };
                }


                card.dataset.foodId =
                    food.id;


                /*
                 * Immediately show
                 * the valid card.
                 */
                card.hidden =
                    false;

                card.style.display =
                    "";
            }
        );


    if (
        cartItemCount
    ) {

        const totalQuantity =
            cartItems.reduce(
                function (
                    sum,
                    item
                ) {
                    return (
                        sum +
                        item.quantity
                    );
                },
                0
            );

        if (
            totalQuantity === 1
        ) {

            cartItemCount.textContent =
                "1 Item";

        } else {

            cartItemCount.textContent =
                totalQuantity +
                " Items";
        }
    }


    if (
        emptyState
    ) {

        emptyState.hidden =
            cartItems.length !==
            0;

        emptyState.style.display =
            cartItems.length === 0
                ? ""
                : "none";
    }


    updateCartSummary(
        cartItems
    );
}


/* ==================== CHANGE QUANTITY ==================== */

function changeCartQuantity(
    foodId,
    quantityChange
) {
    if (!foodId) {
        return;
    }

    const normalizedFoodId =
        String(
            foodId
        )
            .trim()
            .toLowerCase();

    const cart =
        getStoredCart();

    const cartIndex =
        cart.findIndex(
            function (
                cartItem
            ) {

                return (
                    String(
                        getCartFoodId(
                            cartItem
                        )
                    )
                        .trim()
                        .toLowerCase() ===
                    normalizedFoodId
                );

            }
        );

    if (
        cartIndex === -1
    ) {
        return;
    }

    const currentQuantity =
        getCartQuantity(
            cart[
                cartIndex
            ]
        );

    const newQuantity =
        currentQuantity +
        Number(
            quantityChange
        );

    if (
        newQuantity <= 0
    ) {

        removeCartItem(
            foodId
        );

        return;
    }

    cart[
        cartIndex
    ].quantity =
        Math.floor(
            newQuantity
        );

    saveCart(
        cart
    );

    displayCartItems();
}


/* ==================== REMOVE CART ITEM ==================== */

function removeCartItem(
    foodId
) {
    if (!foodId) {
        return;
    }

    const shouldRemove =
        window.confirm(
            "Remove this food from your cart?"
        );

    if (!shouldRemove) {
        return;
    }

    const normalizedFoodId =
        String(
            foodId
        )
            .trim()
            .toLowerCase();

    const cart =
        getStoredCart();

    const updatedCart =
        cart.filter(
            function (
                cartItem
            ) {

                const currentFoodId =
                    String(
                        getCartFoodId(
                            cartItem
                        )
                    )
                        .trim()
                        .toLowerCase();

                return (
                    currentFoodId !==
                    normalizedFoodId
                );
            }
        );

    saveCart(
        updatedCart
    );

    /*
     * Immediately refresh
     * the Cart UI.
     */
    displayCartItems();
}


/* ==================================================
   CHECKOUT PAGE
   ================================================== */


/* ==================== UPDATE CHECKOUT ITEMS ==================== */

function updateCheckoutItems() {
    const checkoutItemsList =
        document.getElementById(
            "checkoutItemsList"
        );

    if (
        !checkoutItemsList
    ) {
        return;
    }

    const checkoutCards =
        checkoutItemsList.querySelectorAll(
            ".checkout-item"
        );

    const emptyState =
        document.getElementById(
            "checkoutEmptyState"
        );

    const checkoutItems =
        prepareCartItems();

    checkoutCards.forEach(
        function (card) {
            card.hidden =
                true;

            card.style.display =
                "none";
        }
    );

    checkoutItems
        .slice(
            0,
            checkoutCards.length
        )
        .forEach(
            function (
                cartItem,
                index
            ) {

                const card =
                    checkoutCards[
                        index
                    ];

                if (!card) {
                    return;
                }

                const food =
                    cartItem.food;

                const quantity =
                    cartItem.quantity;

                const image =
                    card.querySelector(
                        "[data-checkout-image]"
                    );

                const category =
                    card.querySelector(
                        "[data-checkout-category]"
                    );

                const name =
                    card.querySelector(
                        "[data-checkout-name]"
                    );

                const quantityElement =
                    card.querySelector(
                        "[data-checkout-quantity]"
                    );

                const price =
                    card.querySelector(
                        "[data-checkout-price]"
                    );


                if (image) {

                    image.src =
                        food.image ||
                        "";

                    image.alt =
                        food.name ||
                        "Food";
                }


                if (category) {

                    category.textContent =
                        food.category ||
                        "Food";
                }


                if (name) {

                    name.textContent =
                        food.name ||
                        "Food";
                }


                if (
                    quantityElement
                ) {

                    quantityElement.textContent =
                        "Quantity: " +
                        quantity;
                }


                if (price) {

                    const itemTotal =
                        Number(
                            food.price
                        ) *
                        quantity;

                    price.textContent =
                        formatCartPrice(
                            itemTotal
                        );
                }


                card.hidden =
                    false;

                card.style.display =
                    "";
            }
        );


    if (
        emptyState
    ) {

        emptyState.hidden =
            checkoutItems.length !==
            0;

        emptyState.style.display =
            checkoutItems.length === 0
                ? ""
                : "none";
    }


    updateCheckoutSummary(
        checkoutItems
    );
}


/* ==================== UPDATE CHECKOUT SUMMARY ==================== */

function updateCheckoutSummary(
    checkoutItems
) {
    const subtotalElement =
        document.getElementById(
            "checkoutSubtotal"
        );

    const deliveryFeeElement =
        document.getElementById(
            "checkoutDeliveryFee"
        );

    const grandTotalElement =
        document.getElementById(
            "checkoutGrandTotal"
        );

    const subtotal =
        calculateCartSubtotal(
            checkoutItems
        );

    const deliveryFee =
        calculateDeliveryFee(
            checkoutItems
        );

    const grandTotal =
        subtotal +
        deliveryFee;


    if (
        subtotalElement
    ) {

        subtotalElement.textContent =
            formatCartPrice(
                subtotal
            );
    }


    if (
        deliveryFeeElement
    ) {

        deliveryFeeElement.textContent =
            formatCartPrice(
                deliveryFee
            );
    }


    if (
        grandTotalElement
    ) {

        grandTotalElement.textContent =
            formatCartPrice(
                grandTotal
            );
    }
}


/* ==================== INITIALIZE CHECKOUT PAGE ==================== */

function initializeCheckoutPage() {
    const checkoutItemsList =
        document.getElementById(
            "checkoutItemsList"
        );

    if (
        !checkoutItemsList
    ) {
        return;
    }

    updateCheckoutItems();
}


/* ==================== INITIALIZE CHECKOUT BUTTON ==================== */

function initializeCheckoutButton() {
    const checkoutButton =
        document.getElementById(
            "cartCheckoutButton"
        );

    if (
        !checkoutButton
    ) {
        return;
    }

    checkoutButton.addEventListener(
        "click",
        function (
            event
        ) {

            event.preventDefault();

            const cartItems =
                prepareCartItems();


            if (
                !cartItems.length
            ) {

                window.alert(
                    "Your cart is empty."
                );

                return;
            }


            const isLoggedIn =
                localStorage.getItem(
                    "yummyTummyLoggedIn"
                ) === "true";


            if (
                !isLoggedIn
            ) {

                const shouldLogin =
                    window.confirm(
                        "Please Login First"
                    );

                if (
                    shouldLogin
                ) {

                    window.location.href =
                        "login.html";
                }

                return;
            }


            window.location.href =
                "checkout.html";
        }
    );
}


/* ==================== INITIALIZE CART PAGE ==================== */

function initializeCartPage() {
    const cartItemsList =
        document.getElementById(
            "cartItemsList"
        );

    if (
        !cartItemsList
    ) {
        return;
    }

    displayCartItems();

    initializeCheckoutButton();
}


/* ==================== PAGE INITIALIZATION ==================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeCartPage();

        initializeCheckoutPage();

    }
);