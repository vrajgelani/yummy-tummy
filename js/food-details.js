/* =================================
   FOOD DETAILS
================================= */

const WISHLIST_STORAGE_KEY =
    "yummyTummyWishlist";

const CART_STORAGE_KEY =
    "yummyTummyCart";


/* =================================
   ELEMENTS
================================= */

const foodDetails =
    document.querySelector("#foodDetails");

const foodNotFound =
    document.querySelector("#foodNotFound");

const foodImage =
    document.querySelector("#foodImage");

const foodCategory =
    document.querySelector("#foodCategory");

const foodName =
    document.querySelector("#foodName");

const foodDescription =
    document.querySelector("#foodDescription");

const foodRestaurant =
    document.querySelector("#foodRestaurant");

const foodCategoryInfo =
    document.querySelector("#foodCategoryInfo");

const foodPrice =
    document.querySelector("#foodPrice");

const addToCartButton =
    document.querySelector("#addToCartButton");

const addToWishlistButton =
    document.querySelector("#addToWishlistButton");

const wishlistMessage =
    document.querySelector("#wishlistMessage");


/* =================================
   GET FOOD ID
================================= */

function getFoodId() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return params.get("food");
}


/* =================================
   WISHLIST
================================= */

function getWishlist() {

    try {

        const wishlist =
            JSON.parse(
                localStorage.getItem(
                    WISHLIST_STORAGE_KEY
                )
            );

        return Array.isArray(wishlist)
            ? wishlist
            : [];

    } catch (error) {

        console.error(
            "Unable to read wishlist:",
            error
        );

        return [];
    }
}


function saveWishlist(wishlist) {

    try {

        localStorage.setItem(
            WISHLIST_STORAGE_KEY,
            JSON.stringify(wishlist)
        );

        return true;

    } catch (error) {

        console.error(
            "Unable to save wishlist:",
            error
        );

        return false;
    }
}


function isFoodInWishlist(foodId) {

    return getWishlist().includes(
        foodId
    );
}


function updateWishlistButton(foodId) {

    if (!addToWishlistButton) {
        return;
    }

    if (isFoodInWishlist(foodId)) {

        addToWishlistButton.textContent =
            "Added to Wishlist";

        addToWishlistButton.classList.add(
            "added"
        );

    } else {

        addToWishlistButton.textContent =
            "Add to Wishlist";

        addToWishlistButton.classList.remove(
            "added"
        );
    }
}


function addToWishlist(foodId) {

    const wishlist =
        getWishlist();

    if (wishlist.includes(foodId)) {

        if (wishlistMessage) {

            wishlistMessage.textContent =
                "This food is already in your wishlist.";
        }

        return;
    }

    wishlist.push(foodId);

    const saved =
        saveWishlist(wishlist);

    if (!saved) {

        if (wishlistMessage) {

            wishlistMessage.textContent =
                "Unable to save this food to wishlist.";
        }

        return;
    }

    if (wishlistMessage) {

        wishlistMessage.textContent =
            "Food added to wishlist.";
    }

    updateWishlistButton(foodId);
}


/* =================================
   CART
================================= */

function getCart() {

    try {

        const cart =
            JSON.parse(
                localStorage.getItem(
                    CART_STORAGE_KEY
                )
            );

        return Array.isArray(cart)
            ? cart
            : [];

    } catch (error) {

        console.error(
            "Unable to read cart:",
            error
        );

        return [];
    }
}


function saveCart(cart) {

    try {

        localStorage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify(cart)
        );

        return true;

    } catch (error) {

        console.error(
            "Unable to save cart:",
            error
        );

        return false;
    }
}


/* =================================
   ADD TO CART
================================= */

function addToCart(food) {

    const cart =
        getCart();


    const existingItem =
        cart.find(
            (item) =>
                item.id === food.id
        );


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({

            id: food.id,

            restaurantId:
                food.restaurantId,

            restaurant:
                food.restaurant,

            category:
                food.category,

            name:
                food.name,

            price:
                food.price,

            image:
                food.image,

            quantity: 1

        });
    }


    const saved =
        saveCart(cart);


    if (!saved) {

        if (addToCartButton) {

            addToCartButton.textContent =
                "Unable to Add";

        }

        return;
    }


    if (addToCartButton) {

        addToCartButton.textContent =
            existingItem
                ? "Added Again"
                : "Added to Cart";


        addToCartButton.classList.add(
            "added"
        );


        setTimeout(
            () => {

                addToCartButton.textContent =
                    "Add to Cart";

                addToCartButton.classList.remove(
                    "added"
                );

            },
            1200
        );
    }
}


/* =================================
   SHOW FOOD
================================= */

function showFood(food) {

    if (foodDetails) {

        foodDetails.hidden =
            false;
    }

    if (foodNotFound) {

        foodNotFound.hidden =
            true;
    }


    if (foodImage) {

        foodImage.src =
            food.image;

        foodImage.alt =
            food.name;
    }


    if (foodCategory) {

        foodCategory.textContent =
            food.category;
    }


    if (foodName) {

        foodName.textContent =
            food.name;
    }


    if (foodDescription) {

        foodDescription.textContent =
            `Enjoy ${food.name} from ${food.restaurant}. Freshly prepared vegetarian food made for a delicious experience.`;
    }


    if (foodRestaurant) {

        foodRestaurant.textContent =
            food.restaurant;
    }


    if (foodCategoryInfo) {

        foodCategoryInfo.textContent =
            food.category;
    }


    if (foodPrice) {

        foodPrice.textContent =
            `₹${food.price}`;
    }


    document.title =
        `${food.name} | Yummy Tummy`;


    updateWishlistButton(
        food.id
    );
}


/* =================================
   NOT FOUND
================================= */

function showNotFound() {

    if (foodDetails) {

        foodDetails.hidden =
            true;
    }

    if (foodNotFound) {

        foodNotFound.hidden =
            false;
    }
}


/* =================================
   WISHLIST BUTTON
================================= */

function initializeWishlistButton(
    foodId
) {

    if (!addToWishlistButton) {
        return;
    }

    addToWishlistButton.addEventListener(
        "click",
        () => {

            addToWishlist(foodId);

        }
    );
}


/* =================================
   CART BUTTON
================================= */

function initializeCartButton(
    food
) {

    if (!addToCartButton) {
        return;
    }

    addToCartButton.addEventListener(
        "click",
        () => {

            addToCart(food);

        }
    );
}


/* =================================
   INITIALIZE
================================= */

function initializeFoodDetails() {

    const foodId =
        getFoodId();


    if (!foodId) {

        showNotFound();

        return;
    }


    if (
        typeof restaurantFoods ===
        "undefined"
    ) {

        console.error(
            "restaurantFoods data not found."
        );

        showNotFound();

        return;
    }


    const food =
        restaurantFoods.find(
            (item) =>
                item.id === foodId
        );


    if (!food) {

        showNotFound();

        return;
    }


    showFood(food);


    initializeWishlistButton(
        food.id
    );


    initializeCartButton(
        food
    );
}


/* =================================
   START
================================= */

initializeFoodDetails();