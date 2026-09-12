/* =========================================================
   YUMMY TUMMY
   MY ORDERS PAGE
   FULL FIXED VERSION
   ========================================================= */


/* =========================================================
   PAGE INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {
        initializeOrdersPage();
    }
);


/* =========================================================
   INITIALIZE ORDERS PAGE
   ========================================================= */

function initializeOrdersPage() {

    const ordersList =
        document.getElementById("ordersList");

    const ordersEmptyState =
        document.getElementById("ordersEmptyState");

    const ordersCount =
        document.getElementById("ordersCount");


    if (
        !ordersList ||
        !ordersEmptyState ||
        !ordersCount
    ) {
        return;
    }


    const isLoggedIn =
        localStorage.getItem(
            "yummyTummyLoggedIn"
        ) === "true";


    if (!isLoggedIn) {

        window.location.href =
            "login.html";

        return;
    }


    const orders =
        getSavedOrders();


    resetOrderCards();


    if (orders.length === 0) {

        ordersCount.textContent =
            "0";

        ordersEmptyState.hidden =
            false;

        return;
    }


    ordersCount.textContent =
        String(
            orders.length
        );

    ordersEmptyState.hidden =
        true;


    const orderCards =
        ordersList.querySelectorAll(
            "[data-order-card]"
        );


    orders.forEach(
        function (
            order,
            orderIndex
        ) {

            const card =
                orderCards[
                    orderIndex
                ];


            if (!card) {
                return;
            }


            fillOrderCard(
                card,
                order
            );


            initializeOrderDetailsButton(
                card
            );


            card.hidden =
                false;

        }
    );

}


/* =========================================================
   GET SAVED ORDERS
   ========================================================= */

function getSavedOrders() {

    const savedOrders =
        localStorage.getItem(
            "yummyTummyOrders"
        );


    if (!savedOrders) {
        return [];
    }


    try {

        const orders =
            JSON.parse(
                savedOrders
            );


        if (
            !Array.isArray(
                orders
            )
        ) {
            return [];
        }


        return orders;

    } catch (error) {

        return [];

    }

}


/* =========================================================
   RESET ORDER CARDS
   ========================================================= */

function resetOrderCards() {

    const orderCards =
        document.querySelectorAll(
            "[data-order-card]"
        );


    orderCards.forEach(
        function (card) {

            card.hidden =
                true;


            const orderId =
                card.querySelector(
                    "[data-order-id]"
                );

            const orderDate =
                card.querySelector(
                    "[data-order-date]"
                );

            const orderPayment =
                card.querySelector(
                    "[data-order-payment]"
                );

            const orderTotal =
                card.querySelector(
                    "[data-order-total]"
                );

            const orderAddress =
                card.querySelector(
                    "[data-order-address]"
                );

            const orderStatus =
                card.querySelector(
                    "[data-order-status]"
                );

            const detailsButton =
                card.querySelector(
                    "[data-order-details-button]"
                );

            const detailsSection =
                card.querySelector(
                    "[data-order-details]"
                );


            if (orderId) {
                orderId.textContent =
                    "Order ID";
            }


            if (orderDate) {
                orderDate.textContent =
                    "-";
            }


            if (orderPayment) {
                orderPayment.textContent =
                    "-";
            }


            if (orderTotal) {
                orderTotal.textContent =
                    "₹0";
            }


            if (orderAddress) {
                orderAddress.textContent =
                    "-";
            }


            if (orderStatus) {

                orderStatus.textContent =
                    "Order Placed";

                applyOrderStatusClass(
                    orderStatus,
                    "Order Placed"
                );

            }


            if (detailsButton) {

                detailsButton.textContent =
                    "View Details";

                detailsButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }


            if (detailsSection) {

                detailsSection.hidden =
                    true;

            }


            resetOrderItems(
                card
            );

        }
    );

}


/* =========================================================
   RESET ORDER ITEMS
   ========================================================= */

function resetOrderItems(
    card
) {

    const itemElements =
        card.querySelectorAll(
            "[data-order-item]"
        );


    itemElements.forEach(
        function (itemElement) {

            itemElement.hidden =
                true;


            const image =
                itemElement.querySelector(
                    "[data-order-item-image]"
                );

            const name =
                itemElement.querySelector(
                    "[data-order-item-name]"
                );

            const category =
                itemElement.querySelector(
                    "[data-order-item-category]"
                );

            const quantity =
                itemElement.querySelector(
                    "[data-order-item-quantity]"
                );

            const price =
                itemElement.querySelector(
                    "[data-order-item-price]"
                );


            if (image) {

                image.removeAttribute(
                    "src"
                );

                image.alt =
                    "";

            }


            if (name) {
                name.textContent =
                    "Food Name";
            }


            if (category) {
                category.textContent =
                    "Category";
            }


            if (quantity) {
                quantity.textContent =
                    "Quantity: 1";
            }


            if (price) {
                price.textContent =
                    "₹0";
            }

        }
    );

}


/* =========================================================
   FILL ORDER CARD
   ========================================================= */

function fillOrderCard(
    card,
    order
) {

    const orderId =
        card.querySelector(
            "[data-order-id]"
        );

    const orderDate =
        card.querySelector(
            "[data-order-date]"
        );

    const orderPayment =
        card.querySelector(
            "[data-order-payment]"
        );

    const orderTotal =
        card.querySelector(
            "[data-order-total]"
        );

    const orderAddress =
        card.querySelector(
            "[data-order-address]"
        );

    const orderStatus =
        card.querySelector(
            "[data-order-status]"
        );


    if (orderId) {

        orderId.textContent =
            order.id ||
            "Order ID";

    }


    if (orderDate) {

        orderDate.textContent =
            formatOrderDate(
                order.createdAt
            );

    }


    if (orderPayment) {

        orderPayment.textContent =
            order.paymentMethodName ||
            getPaymentMethodName(
                order.paymentMethod
            );

    }


    if (orderTotal) {

        orderTotal.textContent =
            formatPrice(
                order.grandTotal
            );

    }


    if (orderAddress) {

        orderAddress.textContent =
            formatAddress(
                order.address
            );

    }


    if (orderStatus) {

        const status =
            order.status ||
            "Order Placed";


        orderStatus.textContent =
            status;


        applyOrderStatusClass(
            orderStatus,
            status
        );

    }


    fillOrderItems(
        card,
        order.items
    );

}


/* =========================================================
   NORMALIZE ORDER ITEM
   ========================================================= */

function normalizeOrderItem(
    rawItem
) {

    if (
        !rawItem ||
        typeof rawItem !==
            "object"
    ) {
        return null;
    }


    /*
     * Keep the original object.
     */
    let source = {
        ...rawItem
    };


    /*
     * Support nested food object.
     */
    if (
        rawItem.food &&
        typeof rawItem.food ===
            "object"
    ) {

        source = {
            ...rawItem.food,
            ...source
        };

    }


    /*
     * Support nested item object.
     */
    if (
        rawItem.item &&
        typeof rawItem.item ===
            "object"
    ) {

        source = {
            ...rawItem.item,
            ...source
        };

    }


    const originalFoodId =
        source.foodId ||
        source.id ||
        (
            rawItem.food &&
            rawItem.food.id
        ) ||
        "";


    const normalizedFoodId =
        normalizeId(
            originalFoodId
        );


    const restaurantId =
        source.restaurantId ||
        (
            rawItem.food &&
            rawItem.food.restaurantId
        ) ||
        "";


    /*
     * Try to find the food.
     */
    const resolvedFood =
        findOrderFood(
            normalizedFoodId,
            restaurantId,
            source.name
        );


    /*
     * NAME
     */
    const name =
        cleanValue(
            source.name
        ) ||
        (
            resolvedFood &&
            cleanValue(
                resolvedFood.name
            )
        ) ||
        getFoodNameFromId(
            normalizedFoodId
        ) ||
        "Food";


    /*
     * CATEGORY
     */
    const category =
        cleanValue(
            source.category
        ) ||
        (
            resolvedFood &&
            cleanValue(
                resolvedFood.category
            )
        ) ||
        getFoodCategoryFromId(
            normalizedFoodId
        ) ||
        "Food";


    /*
     * PRICE
     */
    let price =
        Number(
            source.price
        );


    if (
        !Number.isFinite(
            price
        ) ||
        price < 0
    ) {

        price = 0;

    }


    if (
        price === 0 &&
        resolvedFood
    ) {

        const resolvedPrice =
            Number(
                resolvedFood.price
            );


        if (
            Number.isFinite(
                resolvedPrice
            ) &&
            resolvedPrice > 0
        ) {

            price =
                resolvedPrice;

        }

    }


    /*
     * QUANTITY
     */
    let quantity =
        Number(
            source.quantity
        );


    if (
        !Number.isFinite(
            quantity
        ) ||
        quantity <= 0
    ) {

        quantity =
            1;

    }


    quantity =
        Math.floor(
            quantity
        );


    /*
     * IMAGE
     */
    let image =
        cleanValue(
            source.image
        );


    if (
        !image &&
        resolvedFood
    ) {

        image =
            cleanValue(
                resolvedFood.image
            ) ||
            "";

    }


    /*
     * If saved image doesn't exist,
     * use a project fallback.
     */
    if (!image) {

        image =
            getOrderFoodImage({
                id:
                    normalizedFoodId,

                foodId:
                    normalizedFoodId,

                category:
                    category,

                restaurantId:
                    restaurantId
            });

    }


    /*
     * ITEM TOTAL
     */
    let itemTotal =
        Number(
            source.itemTotal
        );


    if (
        !Number.isFinite(
            itemTotal
        ) ||
        itemTotal < 0
    ) {

        itemTotal =
            price *
            quantity;

    }


    if (
        itemTotal === 0 &&
        price > 0
    ) {

        itemTotal =
            price *
            quantity;

    }


    /*
     * Even if foodId is missing,
     * name is available.
     */
    if (
        !normalizedFoodId &&
        !name
    ) {

        return null;

    }


    return {

        id:
            normalizedFoodId,

        foodId:
            normalizedFoodId,

        name:
            name,

        category:
            category,

        price:
            price,

        quantity:
            quantity,

        image:
            image,

        restaurantId:
            restaurantId,

        itemTotal:
            itemTotal

    };

}


/* =========================================================
   FILL ORDER ITEMS
   ========================================================= */

function fillOrderItems(
    card,
    items
) {

    if (
        !Array.isArray(
            items
        )
    ) {
        return;
    }


    const itemElements =
        card.querySelectorAll(
            "[data-order-item]"
        );


    items
        .forEach(
            function (
                rawItem,
                itemIndex
            ) {

                const itemElement =
                    itemElements[
                        itemIndex
                    ];


                if (!itemElement) {
                    return;
                }


                const item =
                    normalizeOrderItem(
                        rawItem
                    );


                /*
                 * Do not leave a blank card.
                 */
                if (!item) {

                    itemElement.hidden =
                        true;

                    return;

                }


                const image =
                    itemElement.querySelector(
                        "[data-order-item-image]"
                    );

                const name =
                    itemElement.querySelector(
                        "[data-order-item-name]"
                    );

                const category =
                    itemElement.querySelector(
                        "[data-order-item-category]"
                    );

                const quantity =
                    itemElement.querySelector(
                        "[data-order-item-quantity]"
                    );

                const price =
                    itemElement.querySelector(
                        "[data-order-item-price]"
                    );


                /*
                 * IMAGE
                 */
                if (image) {

                    if (
                        item.image
                    ) {

                        image.src =
                            item.image;

                    } else {

                        image.removeAttribute(
                            "src"
                        );

                    }


                    image.alt =
                        item.name ||
                        "Food";


                    image.onerror =
                        function () {

                            image.onerror =
                                null;


                            const fallbackImage =
                                getOrderFoodImage(
                                    item
                                );


                            if (
                                fallbackImage
                            ) {

                                image.src =
                                    fallbackImage;

                            }

                        };

                }


                /*
                 * NAME
                 */
                if (name) {

                    name.textContent =
                        item.name;

                }


                /*
                 * CATEGORY
                 */
                if (category) {

                    category.textContent =
                        item.category;

                }


                /*
                 * QUANTITY
                 */
                if (quantity) {

                    quantity.textContent =
                        "Quantity: " +
                        item.quantity;

                }


                /*
                 * PRICE
                 */
                if (price) {

                    price.textContent =
                        formatPrice(
                            item.itemTotal
                        );

                }


                itemElement.dataset.foodId =
                    item.foodId ||
                    "";


                itemElement.hidden =
                    false;

            }
        );

}


/* =========================================================
   FIND ORDER FOOD
   ========================================================= */

function findOrderFood(
    foodId,
    restaurantId,
    foodName
) {

    const normalizedFoodId =
        normalizeId(
            foodId
        );

    const normalizedFoodName =
        normalizeText(
            foodName
        );


    /*
     * If ID is available,
     * try normal menu data.
     */
    if (
        normalizedFoodId &&
        typeof menuFoods !==
            "undefined" &&
        Array.isArray(
            menuFoods
        )
    ) {

        const menuFood =
            menuFoods.find(
                function (
                    food
                ) {

                    if (
                        !food
                    ) {
                        return false;
                    }


                    const currentId =
                        normalizeId(
                            food.id
                        );


                    const currentName =
                        normalizeText(
                            food.name
                        );


                    return (
                        (
                            currentId &&
                            currentId ===
                                normalizedFoodId
                        ) ||
                        (
                            normalizedFoodName &&
                            currentName ===
                                normalizedFoodName
                        )
                    );

                }
            );


        if (
            menuFood
        ) {

            return menuFood;

        }

    }


    /*
     * Popular food
     */
    if (
        normalizedFoodId
    ) {

        const popularFood =
            getPopularOrderFood(
                normalizedFoodId
            );


        if (
            popularFood
        ) {

            return popularFood;

        }

    }


    /*
     * Restaurant menu data
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
                let i = 0;
                i <
                restaurantMenuData.length;
                i++
            ) {

                const restaurant =
                    restaurantMenuData[
                        i
                    ];


                if (
                    !restaurant
                ) {
                    continue;
                }


                const currentRestaurantId =
                    normalizeId(
                        restaurant.restaurantId ||
                        restaurant.id ||
                        ""
                    );


                if (
                    restaurantId &&
                    currentRestaurantId &&
                    currentRestaurantId !==
                        normalizeId(
                            restaurantId
                        )
                ) {
                    continue;
                }


                const foods =
                    Array.isArray(
                        restaurant.foods
                    )
                        ? restaurant.foods
                        : [];


                const restaurantFood =
                    foods.find(
                        function (
                            food
                        ) {

                            if (
                                !food
                            ) {
                                return false;
                            }


                            const currentId =
                                normalizeId(
                                    food.id
                                );


                            const currentName =
                                normalizeText(
                                    food.name
                                );


                            return (
                                (
                                    normalizedFoodId &&
                                    currentId ===
                                        normalizedFoodId
                                ) ||
                                (
                                    normalizedFoodName &&
                                    currentName ===
                                        normalizedFoodName
                                )
                            );

                        }
                    );


                if (
                    restaurantFood
                ) {

                    return {

                        ...restaurantFood,

                        restaurantId:
                            restaurantId ||
                            currentRestaurantId

                    };

                }

            }

        }


        /*
         * OBJECT FORMAT
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

                const currentRestaurantId =
                    normalizeId(
                        restaurantIds[
                            i
                        ]
                    );


                if (
                    restaurantId &&
                    currentRestaurantId !==
                        normalizeId(
                            restaurantId
                        )
                ) {
                    continue;
                }


                const currentRestaurant =
                    restaurantMenuData[
                        restaurantIds[
                            i
                        ]
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


                const restaurantFood =
                    foods.find(
                        function (
                            food
                        ) {

                            if (
                                !food
                            ) {
                                return false;
                            }


                            const currentId =
                                normalizeId(
                                    food.id
                                );


                            const currentName =
                                normalizeText(
                                    food.name
                                );


                            return (
                                (
                                    normalizedFoodId &&
                                    currentId ===
                                        normalizedFoodId
                                ) ||
                                (
                                    normalizedFoodName &&
                                    currentName ===
                                        normalizedFoodName
                                )
                            );

                        }
                    );


                if (
                    restaurantFood
                ) {

                    return {

                        ...restaurantFood,

                        restaurantId:
                            restaurantId ||
                            currentRestaurantId

                    };

                }

            }

        }

    }


    /*
     * Fallback Main Menu
     */
    if (
        normalizedFoodId
    ) {

        const fallbackFood =
            getFallbackMenuFood(
                normalizedFoodId
            );


        if (
            fallbackFood
        ) {

            return fallbackFood;

        }

    }


    /*
     * Fallback by food name
     */
    if (
        normalizedFoodName
    ) {

        const fallbackFoods =
            getFallbackMenuFoods();


        const fallbackByName =
            fallbackFoods.find(
                function (
                    food
                ) {

                    return (
                        normalizeText(
                            food.name
                        ) ===
                        normalizedFoodName
                    );

                }
            );


        if (
            fallbackByName
        ) {

            return fallbackByName;

        }

    }


    return null;

}


/* =========================================================
   POPULAR FOOD
   ========================================================= */

function getPopularOrderFood(
    foodId
) {

    const popularFoods = [

        {
            id:
                "paneer-kebab",

            name:
                "Paneer Kebab",

            category:
                "Starters",

            price:
                249,

            rating:
                4.8,

            image:
                "images/popular-foods/paneer-kebab.png"
        },

        {
            id:
                "cheese-burst-pizza",

            name:
                "Cheese Burst Pizza",

            category:
                "Pizza",

            price:
                329,

            rating:
                4.9,

            image:
                "images/popular-foods/cheese-burst-pizza.png"
        },

        {
            id:
                "peri-peri-burger",

            name:
                "Peri Peri Burger",

            category:
                "Burger",

            price:
                219,

            rating:
                4.7,

            image:
                "images/popular-foods/peri-peri-burger.png"
        },

        {
            id:
                "paneer-club-sandwich",

            name:
                "Paneer Club Sandwich",

            category:
                "Sandwich",

            price:
                229,

            rating:
                4.6,

            image:
                "images/popular-foods/paneer-club-sandwich.png"
        },

        {
            id:
                "mexican-pasta",

            name:
                "Mexican Pasta",

            category:
                "Pasta",

            price:
                279,

            rating:
                4.8,

            image:
                "images/popular-foods/mexican-pasta.png"
        },

        {
            id:
                "royal-kheer",

            name:
                "Royal Kheer",

            category:
                "Desserts",

            price:
                159,

            rating:
                4.9,

            image:
                "images/popular-foods/royal-kheer.png"
        }

    ];


    return (
        popularFoods.find(
            function (
                food
            ) {

                return (
                    normalizeId(
                        food.id
                    ) ===
                    normalizeId(
                        foodId
                    )
                );

            }
        ) ||
        null
    );

}


/* =========================================================
   FALLBACK MAIN MENU FOODS
   ========================================================= */

function getFallbackMenuFoods() {

    return [

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

}


/* =========================================================
   GET SINGLE FALLBACK MENU FOOD
   ========================================================= */

function getFallbackMenuFood(
    foodId
) {

    const foods =
        getFallbackMenuFoods();


    return (
        foods.find(
            function (
                food
            ) {

                return (
                    normalizeId(
                        food.id
                    ) ===
                    normalizeId(
                        foodId
                    )
                );

            }
        ) ||
        null
    );

}


/* =========================================================
   GET FOOD NAME FROM ID
   ========================================================= */

function getFoodNameFromId(
    foodId
) {

    const normalizedId =
        normalizeId(
            foodId
        );


    const fallbackFood =
        getFallbackMenuFood(
            normalizedId
        );


    if (
        fallbackFood
    ) {

        return fallbackFood.name;

    }


    const popularFood =
        getPopularOrderFood(
            normalizedId
        );


    if (
        popularFood
    ) {

        return popularFood.name;

    }


    return "";

}


/* =========================================================
   GET FOOD CATEGORY FROM ID
   ========================================================= */

function getFoodCategoryFromId(
    foodId
) {

    const normalizedId =
        normalizeId(
            foodId
        );


    const fallbackFood =
        getFallbackMenuFood(
            normalizedId
        );


    if (
        fallbackFood
    ) {

        return fallbackFood.category;

    }


    const popularFood =
        getPopularOrderFood(
            normalizedId
        );


    if (
        popularFood
    ) {

        return popularFood.category;

    }


    return "";

}


/* =========================================================
   GET ORDER FOOD IMAGE
   ========================================================= */

function getOrderFoodImage(
    food
) {

    if (!food) {
        return "";
    }


    const directImage =
        cleanValue(
            food.image
        );


    if (
        directImage
    ) {

        return directImage;

    }


    const foodId =
        normalizeId(
            food.id ||
            food.foodId
        );


    const restaurantId =
        normalizeId(
            food.restaurantId
        );


    /*
     * Restaurant food
     */
    if (
        restaurantId &&
        foodId
    ) {

        return (
            "images/restaurant-food/" +
            restaurantId +
            "/" +
            foodId +
            ".png"
        );

    }


    const menuImageMap = {

        "paneer-tikka":
            "images/menu-foods/starter-01.png",

        "veg-spring-rolls":
            "images/menu-foods/starter-02.png",

        "hara-bhara-kebab":
            "images/menu-foods/starter-03.png",

        "cheese-corn-balls":
            "images/menu-foods/starter-04.png",

        "crispy-veg-fingers":
            "images/menu-foods/starter-05.png",


        "margherita-pizza":
            "images/menu-foods/pizza-01.png",

        "farmhouse-pizza":
            "images/menu-foods/pizza-02.png",

        "veggie-delight-pizza":
            "images/menu-foods/pizza-03.png",

        "corn-cheese-pizza":
            "images/menu-foods/pizza-04.png",

        "paneer-tikka-pizza":
            "images/menu-foods/pizza-05.png",


        "classic-veg-burger":
            "images/menu-foods/burger-01.png",

        "aloo-tikki-burger":
            "images/menu-foods/burger-02.png",

        "cheese-veg-burger":
            "images/menu-foods/burger-03.png",

        "paneer-burger":
            "images/menu-foods/burger-04.png",

        "mexican-veg-burger":
            "images/menu-foods/burger-05.png",


        "grilled-veg-sandwich":
            "images/menu-foods/sandwich-01.png",

        "bombay-veg-sandwich":
            "images/menu-foods/sandwich-02.png",

        "cheese-corn-sandwich":
            "images/menu-foods/sandwich-03.png",

        "masala-paneer-sandwich":
            "images/menu-foods/sandwich-04.png",

        "veg-club-sandwich":
            "images/menu-foods/sandwich-05.png",


        "arrabbiata-pasta":
            "images/menu-foods/pasta-01.png",

        "alfredo-pasta":
            "images/menu-foods/pasta-02.png",

        "pink-sauce-pasta":
            "images/menu-foods/pasta-03.png",

        "pesto-veg-pasta":
            "images/menu-foods/pasta-04.png",

        "creamy-mushroom-pasta":
            "images/menu-foods/pasta-05.png",


        "veg-hakka-noodles":
            "images/menu-foods/chinese-01.png",

        "veg-fried-rice":
            "images/menu-foods/chinese-02.png",

        "veg-manchurian":
            "images/menu-foods/chinese-03.png",

        "chilli-paneer":
            "images/menu-foods/chinese-04.png",

        "schezwan-veg-noodles":
            "images/menu-foods/chinese-05.png",


        "masala-dosa":
            "images/menu-foods/south-indian-01.png",

        "plain-dosa":
            "images/menu-foods/south-indian-02.png",

        "idli-sambar":
            "images/menu-foods/south-indian-03.png",

        "medu-vada":
            "images/menu-foods/south-indian-04.png",

        "uttapam":
            "images/menu-foods/south-indian-05.png",


        "gujarati-thali":
            "images/menu-foods/gujarati-01.png",

        "sev-tameta":
            "images/menu-foods/gujarati-02.png",

        "undhiyu":
            "images/menu-foods/gujarati-03.png",

        "dal-dhokli":
            "images/menu-foods/gujarati-04.png",

        "khandvi":
            "images/menu-foods/gujarati-05.png",


        "veg-dum-biryani":
            "images/menu-foods/biryani-01.png",

        "paneer-biryani":
            "images/menu-foods/biryani-02.png",

        "hyderabadi-veg-biryani":
            "images/menu-foods/biryani-03.png",

        "kathiyawadi-veg-biryani":
            "images/menu-foods/biryani-04.png",

        "tawa-veg-biryani":
            "images/menu-foods/biryani-05.png",


        "gulab-jamun":
            "images/menu-foods/dessert-01.png",

        "rasmalai":
            "images/menu-foods/dessert-02.png",

        "jalebi":
            "images/menu-foods/dessert-03.png",

        "gajar-halwa":
            "images/menu-foods/dessert-04.png",

        "shrikhand":
            "images/menu-foods/dessert-05.png"

    };


    if (
        menuImageMap[
            foodId
        ]
    ) {

        return (
            menuImageMap[
                foodId
            ]
        );

    }


    const popularFood =
        getPopularOrderFood(
            foodId
        );


    if (
        popularFood &&
        popularFood.image
    ) {

        return popularFood.image;

    }


    return "";

}


/* =========================================================
   INITIALIZE DETAILS BUTTON
   ========================================================= */

function initializeOrderDetailsButton(
    card
) {

    const button =
        card.querySelector(
            "[data-order-details-button]"
        );

    const detailsSection =
        card.querySelector(
            "[data-order-details]"
        );


    if (
        !button ||
        !detailsSection
    ) {
        return;
    }


    button.onclick =
        function () {

            const isHidden =
                detailsSection.hidden;


            detailsSection.hidden =
                !isHidden;


            button.setAttribute(
                "aria-expanded",
                String(
                    isHidden
                )
            );


            button.textContent =
                isHidden
                    ? "Hide Details"
                    : "View Details";

        };

}


/* =========================================================
   STATUS CLASS
   ========================================================= */

function applyOrderStatusClass(
    statusElement,
    status
) {

    statusElement.classList.remove(
        "status-placed",
        "status-confirmed",
        "status-preparing",
        "status-out-for-delivery",
        "status-delivered",
        "status-cancelled"
    );


    const normalizedStatus =
        String(
            status
        )
            .toLowerCase()
            .trim();


    if (
        normalizedStatus ===
        "order placed"
    ) {

        statusElement.classList.add(
            "status-placed"
        );

        return;

    }


    if (
        normalizedStatus ===
        "confirmed"
    ) {

        statusElement.classList.add(
            "status-confirmed"
        );

        return;

    }


    if (
        normalizedStatus ===
        "preparing"
    ) {

        statusElement.classList.add(
            "status-preparing"
        );

        return;

    }


    if (
        normalizedStatus ===
        "out for delivery"
    ) {

        statusElement.classList.add(
            "status-out-for-delivery"
        );

        return;

    }


    if (
        normalizedStatus ===
        "delivered"
    ) {

        statusElement.classList.add(
            "status-delivered"
        );

        return;

    }


    if (
        normalizedStatus ===
        "cancelled"
    ) {

        statusElement.classList.add(
            "status-cancelled"
        );

    }

}


/* =========================================================
   FORMAT PRICE
   ========================================================= */

function formatPrice(
    value
) {

    const amount =
        Number(
            value || 0
        );


    return (
        "₹" +
        amount
    );

}


/* =========================================================
   FORMAT DATE
   ========================================================= */

function formatOrderDate(
    value
) {

    if (!value) {
        return "-";
    }


    const date =
        new Date(
            value
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "-";
    }


    return date.toLocaleString(
        "en-IN",
        {
            day:
                "2-digit",

            month:
                "short",

            year:
                "numeric",

            hour:
                "2-digit",

            minute:
                "2-digit"

        }
    );

}


/* =========================================================
   FORMAT ADDRESS
   ========================================================= */

function formatAddress(
    address
) {

    if (
        !address ||
        typeof address !==
            "object"
    ) {
        return "-";
    }


    const parts = [

        address.name,

        address.house,

        address.area,

        address.city,

        address.state,

        address.pincode,

        address.mobile,

        address.address,

        address.addressLine

    ];


    return parts
        .filter(
            function (
                part
            ) {

                return (
                    part !==
                        undefined &&
                    part !==
                        null &&
                    String(
                        part
                    ).trim() !==
                        ""
                );

            }
        )
        .join(
            ", "
        );

}


/* =========================================================
   PAYMENT METHOD
   ========================================================= */

function getPaymentMethodName(
    method
) {

    if (
        method ===
        "cod"
    ) {
        return "Cash on Delivery";
    }


    if (
        method ===
        "upi"
    ) {
        return "UPI";
    }


    if (
        method ===
        "online"
    ) {
        return "Online Payment";
    }


    return "Not Available";

}


/* =========================================================
   NORMALIZE ID
   ========================================================= */

function normalizeId(
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


/* =========================================================
   NORMALIZE TEXT
   ========================================================= */

function normalizeText(
    value
) {

    return String(
        value || ""
    )
        .trim()
        .toLowerCase()
        .replace(
            /[^a-z0-9]+/g,
            " "
        )
        .replace(
            /\s+/g,
            " "
        );

}


/* =========================================================
   CLEAN VALUE
   ========================================================= */

function cleanValue(
    value
) {

    if (
        value ===
            undefined ||
        value ===
            null
    ) {

        return "";

    }


    return String(
        value
    ).trim();

}