/* =========================================================
   YUMMY TUMMY
   WISHLIST PAGE
   ========================================================= */


/* =========================================================
   PAGE INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeWishlistPage();

    }
);


/* =========================================================
   INITIALIZE WISHLIST PAGE
   ========================================================= */

function initializeWishlistPage() {

    const wishlistGrid =
        document.getElementById(
            "wishlistFoodGrid"
        );

    const emptyState =
        document.getElementById(
            "wishlistEmptyState"
        );

    const wishlistCount =
        document.getElementById(
            "wishlistCount"
        );


    if (
        !wishlistGrid ||
        !emptyState ||
        !wishlistCount
    ) {
        return;
    }


    /*
     * Login protection
     */
    if (
        !isWishlistUserLoggedIn()
    ) {

        window.location.href =
            "login.html";

        return;
    }


    /*
     * Get current wishlist
     */
    const wishlistItems =
        getWishlistItems();


    /*
     * Get all pre-existing cards
     */
    const cards =
        wishlistGrid.querySelectorAll(
            ".wishlist-food-card"
        );


    /*
     * Hide every card first.
     *
     * This is important when an item is removed.
     * It makes the removed card disappear immediately.
     */
    cards.forEach(
        function (card) {

            card.hidden =
                true;

            card.style.display =
                "none";

        }
    );


    /*
     * Empty wishlist
     */
    if (
        wishlistItems.length === 0
    ) {

        showWishlistEmptyState(
            cards,
            emptyState,
            wishlistCount
        );

        return;
    }


    /*
     * Wishlist has items
     */
    emptyState.hidden =
        true;

    emptyState.style.display =
        "none";


    let visibleCardIndex =
        0;


    /*
     * Render wishlist items
     */
    wishlistItems.forEach(
        function (
            wishlistItem
        ) {

            /*
             * The saved wishlist object
             * itself is the primary source.
             */
            const food =
                normalizeWishlistItem(
                    wishlistItem
                );


            /*
             * If item data is invalid,
             * do not render it.
             */
            if (!food) {
                return;
            }


            const card =
                cards[
                    visibleCardIndex
                ];


            if (!card) {
                return;
            }


            /*
             * Fill card
             */
            fillWishlistCard(
                card,
                food
            );


            /*
             * Show current card
             */
            card.hidden =
                false;

            card.style.display =
                "";


            /*
             * Initialize remove button
             */
            initializeRemoveButton(
                card,
                food.id
            );


            /*
             * Save food ID on card
             */
            card.dataset.wishlistFoodId =
                food.id;


            visibleCardIndex++;

        }
    );


    /*
     * No valid items found
     */
    if (
        visibleCardIndex === 0
    ) {

        showWishlistEmptyState(
            cards,
            emptyState,
            wishlistCount
        );

        return;
    }


    /*
     * Update count
     */
    updateWishlistCount(
        wishlistCount,
        visibleCardIndex
    );

}


/* =========================================================
   LOGIN CHECK
   ========================================================= */

function isWishlistUserLoggedIn() {

    return (
        localStorage.getItem(
            "yummyTummyLoggedIn"
        ) === "true"
    );

}


/* =========================================================
   GET WISHLIST ITEMS
   ========================================================= */

function getWishlistItems() {

    const storedWishlist =
        localStorage.getItem(
            "yummyTummyWishlist"
        );


    if (!storedWishlist) {
        return [];
    }


    try {

        const parsedWishlist =
            JSON.parse(
                storedWishlist
            );


        if (
            Array.isArray(
                parsedWishlist
            )
        ) {

            return parsedWishlist;

        }


        return [];

    } catch (error) {

        return [];

    }

}


/* =========================================================
   SAVE WISHLIST ITEMS
   ========================================================= */

function saveWishlistItems(
    items
) {

    localStorage.setItem(
        "yummyTummyWishlist",
        JSON.stringify(
            items
        )
    );

}


/* =========================================================
   NORMALIZE WISHLIST ITEM
   ========================================================= */

/*
 * The saved wishlist object is already expected
 * to contain the food information.
 *
 * This prevents the Wishlist page from depending
 * completely on menu-data.js or restaurant-menu-data.js.
 */

function normalizeWishlistItem(
    wishlistItem
) {

    if (
        !wishlistItem ||
        typeof wishlistItem !==
            "object"
    ) {
        return null;
    }


    const foodId =
        wishlistItem.id ||
        wishlistItem.foodId ||
        "";


    if (!foodId) {
        return null;
    }


    const normalizedFood = {

        id:
            String(
                foodId
            ),

        name:
            wishlistItem.name ||
            "Food",

        category:
            wishlistItem.category ||
            "Food",

        price:
            Number(
                wishlistItem.price || 0
            ),

        rating:
            Number(
                wishlistItem.rating || 0
            ),

        image:
            wishlistItem.image ||
            "",

        description:
            wishlistItem.description ||
            "",

        restaurantId:
            wishlistItem.restaurantId ||
            ""

    };


    /*
     * If image is missing,
     * try to find the food from
     * the existing project data.
     */
    if (
        !normalizedFood.image
    ) {

        const fallbackFood =
            findWishlistFood(
                normalizedFood.id
            );


        if (
            fallbackFood
        ) {

            normalizedFood.image =
                fallbackFood.image ||
                "";

            if (
                !normalizedFood.name ||
                normalizedFood.name ===
                    "Food"
            ) {

                normalizedFood.name =
                    fallbackFood.name ||
                    "Food";
            }

            if (
                !normalizedFood.category ||
                normalizedFood.category ===
                    "Food"
            ) {

                normalizedFood.category =
                    fallbackFood.category ||
                    "Food";
            }

            if (
                !normalizedFood.price
            ) {

                normalizedFood.price =
                    Number(
                        fallbackFood.price ||
                        0
                    );
            }

            if (
                !normalizedFood.rating
            ) {

                normalizedFood.rating =
                    Number(
                        fallbackFood.rating ||
                        0
                    );
            }

        }

    }


    return normalizedFood;

}


/* =========================================================
   GET ALL FALLBACK FOOD DATA
   ========================================================= */

function getAllWishlistFoodData() {

    const allFoods = [];


    /*
     * Main Menu Foods
     */
    if (
        Array.isArray(
            window.menuFoods
        )
    ) {

        window.menuFoods.forEach(
            function (
                food
            ) {

                if (
                    food &&
                    food.id
                ) {

                    allFoods.push(
                        food
                    );

                }

            }
        );

    }


    /*
     * Popular Foods
     */
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


    popularFoods.forEach(
        function (
            food
        ) {

            allFoods.push(
                food
            );

        }
    );


    /*
     * Restaurant Menu Foods
     */
    if (
        Array.isArray(
            window.restaurantMenuData
        )
    ) {

        window.restaurantMenuData.forEach(
            function (
                restaurant
            ) {

                if (
                    !restaurant ||
                    !Array.isArray(
                        restaurant.foods
                    )
                ) {
                    return;
                }


                restaurant.foods.forEach(
                    function (
                        food
                    ) {

                        if (
                            !food ||
                            !food.id
                        ) {
                            return;
                        }


                        allFoods.push({

                            id:
                                food.id,

                            name:
                                food.name,

                            category:
                                food.category,

                            price:
                                food.price,

                            rating:
                                food.rating,

                            image:
                                food.image,

                            description:
                                food.description,

                            restaurantId:
                                restaurant.restaurantId ||
                                restaurant.id ||
                                food.restaurantId ||
                                ""

                        });

                    }
                );

            }
        );

    }


    return allFoods;

}


/* =========================================================
   FIND WISHLIST FOOD FALLBACK
   ========================================================= */

function findWishlistFood(
    foodId
) {

    if (!foodId) {
        return null;
    }


    const normalizedId =
        String(
            foodId
        )
            .trim()
            .toLowerCase();


    const allFoods =
        getAllWishlistFoodData();


    return (
        allFoods.find(
            function (
                food
            ) {

                if (
                    !food ||
                    !food.id
                ) {
                    return false;
                }


                return (
                    String(
                        food.id
                    )
                        .trim()
                        .toLowerCase() ===
                    normalizedId
                );

            }
        ) ||
        null
    );

}


/* =========================================================
   FILL WISHLIST CARD
   ========================================================= */

function fillWishlistCard(
    card,
    food
) {

    if (
        !card ||
        !food
    ) {
        return;
    }


    const image =
        card.querySelector(
            "[data-wishlist-image]"
        );


    const category =
        card.querySelector(
            "[data-wishlist-category]"
        );


    const name =
        card.querySelector(
            "[data-wishlist-name]"
        );


    const rating =
        card.querySelector(
            "[data-wishlist-rating]"
        );


    const price =
        card.querySelector(
            "[data-wishlist-price]"
        );


    const viewButton =
        card.querySelector(
            "[data-wishlist-view]"
        );


    /*
     * Image
     */
    if (image) {

        image.src =
            food.image ||
            "";

        image.alt =
            food.name ||
            "Wishlist Food";


        /*
         * If image path fails,
         * try fallback data.
         */
        image.onerror =
            function () {

                image.onerror =
                    null;


                const fallbackFood =
                    findWishlistFood(
                        food.id
                    );


                if (
                    fallbackFood &&
                    fallbackFood.image &&
                    image.src !==
                        fallbackFood.image
                ) {

                    image.src =
                        fallbackFood.image;

                }

            };

    }


    /*
     * Category
     */
    if (category) {

        category.textContent =
            food.category ||
            "Food";

    }


    /*
     * Name
     */
    if (name) {

        name.textContent =
            food.name ||
            "Food";

    }


    /*
     * Rating
     */
    if (rating) {

        rating.textContent =
            "Rating: " +
            Number(
                food.rating || 0
            );

    }


    /*
     * Price
     */
    if (price) {

        price.textContent =
            "₹" +
            Number(
                food.price || 0
            );

    }


    /*
     * View Food
     */
    if (viewButton) {

        let viewUrl =
            "food-details.html?food=" +
            encodeURIComponent(
                food.id
            );


        /*
         * Restaurant food can carry
         * restaurantId.
         */
        if (
            food.restaurantId
        ) {

            viewUrl +=
                "&restaurant=" +
                encodeURIComponent(
                    food.restaurantId
                );

        }


        viewButton.href =
            viewUrl;

    }

}


/* =========================================================
   INITIALIZE REMOVE BUTTON
   ========================================================= */

function initializeRemoveButton(
    card,
    foodId
) {

    if (
        !card ||
        !foodId
    ) {
        return;
    }


    const removeButton =
        card.querySelector(
            "[data-wishlist-remove]"
        );


    if (!removeButton) {
        return;
    }


    /*
     * Remove old handler first
     * to avoid duplicate clicks.
     */
    removeButton.onclick =
        null;


    removeButton.onclick =
        function (
            event
        ) {

            event.preventDefault();

            event.stopPropagation();


            removeWishlistItem(
                foodId
            );

        };

}


/* =========================================================
   REMOVE WISHLIST ITEM
   ========================================================= */

function removeWishlistItem(
    foodId
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


    const wishlistItems =
        getWishlistItems();


    /*
     * Remove item from saved wishlist
     */
    const updatedWishlist =
        wishlistItems.filter(
            function (
                item
            ) {

                if (!item) {
                    return false;
                }


                const itemId =
                    item.id ||
                    item.foodId ||
                    "";


                return (
                    String(
                        itemId
                    )
                        .trim()
                        .toLowerCase() !==
                    normalizedFoodId
                );

            }
        );


    /*
     * Save immediately
     */
    saveWishlistItems(
        updatedWishlist
    );


    /*
     * Refresh only the Wishlist UI.
     *
     * NO page reload.
     */
    initializeWishlistPage();

}


/* =========================================================
   SHOW EMPTY STATE
   ========================================================= */

function showWishlistEmptyState(
    cards,
    emptyState,
    wishlistCount
) {

    /*
     * Hide every card
     */
    cards.forEach(
        function (
            card
        ) {

            card.hidden =
                true;

            card.style.display =
                "none";

        }
    );


    /*
     * Show empty state
     */
    emptyState.hidden =
        false;

    emptyState.style.display =
        "";


    /*
     * Update count
     */
    wishlistCount.textContent =
        "0 Foods";

}


/* =========================================================
   UPDATE WISHLIST COUNT
   ========================================================= */

function updateWishlistCount(
    wishlistCount,
    count
) {

    if (!wishlistCount) {
        return;
    }


    if (
        count === 1
    ) {

        wishlistCount.textContent =
            "1 Food";

        return;
    }


    wishlistCount.textContent =
        count +
        " Foods";

}


/* =========================================================
   STORAGE CHANGE SUPPORT
   ========================================================= */

/*
 * If another page changes the wishlist
 * while this page is open in another tab,
 * synchronize the display.
 */

window.addEventListener(
    "storage",
    function (
        event
    ) {

        if (
            event.key ===
            "yummyTummyWishlist"
        ) {

            initializeWishlistPage();

        }

    }
);