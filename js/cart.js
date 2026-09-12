/* ==================================================
   YUMMY TUMMY
   CART DATA AND DISPLAY
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

    const storedCart = localStorage.getItem("yummyTummyCart");

    if (!storedCart) {
        return [];
    }

    try {

        const parsedCart = JSON.parse(storedCart);

        if (!Array.isArray(parsedCart)) {
            return [];
        }

        return parsedCart;

    } catch (error) {

        return [];

    }
}


/* ==================== FIND FOOD ==================== */

function findCartFood(foodId) {

    if (!foodId) {
        return null;
    }


    if (
        typeof menuFoods !== "undefined" &&
        Array.isArray(menuFoods)
    ) {

        const menuFood = menuFoods.find(
            (food) => food.id === foodId
        );

        if (menuFood) {
            return menuFood;
        }

    }


    const popularFood = cartPopularFoods.find(
        (food) => food.id === foodId
    );

    if (popularFood) {
        return popularFood;
    }


    if (
        typeof restaurantMenuData !== "undefined" &&
        Array.isArray(restaurantMenuData)
    ) {

        for (const restaurant of restaurantMenuData) {

            if (!restaurant || !Array.isArray(restaurant.foods)) {
                continue;
            }

            const restaurantFood = restaurant.foods.find(
                (food) => food.id === foodId
            );

            if (restaurantFood) {

                return {
                    ...restaurantFood,
                    restaurantId: restaurant.restaurantId
                };

            }

        }

    }


    return null;
}


/* ==================== GET FOOD ID ==================== */

function getCartFoodId(cartItem) {

    if (!cartItem || typeof cartItem !== "object") {
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

function getCartQuantity(cartItem) {

    const quantity = Number(cartItem.quantity);

    if (!Number.isFinite(quantity) || quantity < 1) {
        return 1;
    }

    return Math.floor(quantity);
}


/* ==================== PREPARE CART ITEMS ==================== */

function prepareCartItems() {

    const storedCart = getStoredCart();

    const validItems = [];

    storedCart.forEach((cartItem) => {

        const foodId = getCartFoodId(cartItem);

        const food = findCartFood(foodId);

        if (!food) {
            return;
        }


        const quantity = getCartQuantity(cartItem);


        validItems.push({
            food: food,
            foodId: foodId,
            quantity: quantity,
            restaurantId: cartItem.restaurantId || ""
        });

    });


    return validItems;
}


/* ==================== FORMAT PRICE ==================== */

function formatCartPrice(price) {

    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice)) {
        return "₹0";
    }

    return `₹${numericPrice}`;
}


/* ==================== DISPLAY CART ==================== */

function displayCartItems() {

    const cartCards = document.querySelectorAll(
        ".cart-item"
    );

    const emptyState = document.getElementById(
        "cartEmptyState"
    );

    const cartItemCount = document.getElementById(
        "cartItemCount"
    );


    if (!cartCards.length) {
        return;
    }


    const cartItems = prepareCartItems();


    cartCards.forEach((card) => {

        card.hidden = true;

    });


    cartItems.slice(0, cartCards.length).forEach(
        (cartItem, index) => {

            const card = cartCards[index];

            if (!card) {
                return;
            }


            const food = cartItem.food;
            const quantity = cartItem.quantity;


            const image = card.querySelector(
                "[data-cart-image]"
            );

            const category = card.querySelector(
                "[data-cart-category]"
            );

            const name = card.querySelector(
                "[data-cart-name]"
            );

            const price = card.querySelector(
                "[data-cart-price]"
            );

            const quantityElement = card.querySelector(
                "[data-cart-quantity]"
            );

            const total = card.querySelector(
                "[data-cart-total]"
            );

            const viewButton = card.querySelector(
                "[data-cart-view]"
            );


            if (image) {

                image.src = food.image || "";
                image.alt = food.name || "Food";

            }


            if (category) {

                category.textContent =
                    food.category || "Food";

            }


            if (name) {

                name.textContent =
                    food.name || "Food";

            }


            if (price) {

                price.textContent =
                    formatCartPrice(food.price);

            }


            if (quantityElement) {

                quantityElement.textContent =
                    quantity;

            }


            if (total) {

                const itemTotal =
                    Number(food.price) * quantity;

                total.textContent =
                    formatCartPrice(itemTotal);

            }


            if (viewButton) {

                let viewUrl =
                    `food-details.html?food=${encodeURIComponent(food.id)}`;


                if (cartItem.restaurantId) {

                    viewUrl +=
                        `&restaurant=${encodeURIComponent(
                            cartItem.restaurantId
                        )}`;

                }


                viewButton.href = viewUrl;

            }


            card.dataset.foodId = food.id;
            card.hidden = false;

        }
    );


    if (cartItemCount) {

        const totalQuantity = cartItems.reduce(
            (sum, item) => sum + item.quantity,
            0
        );


        if (totalQuantity === 1) {

            cartItemCount.textContent =
                "1 Item";

        } else {

            cartItemCount.textContent =
                `${totalQuantity} Items`;

        }

    }


    if (emptyState) {

        emptyState.hidden =
            cartItems.length !== 0;

    }

}


/* ==================== INITIALIZE CART PAGE ==================== */

function initializeCartPage() {

    const cartItemsList =
        document.getElementById("cartItemsList");


    if (!cartItemsList) {
        return;
    }


    displayCartItems();

}


/* ==================== PAGE INITIALIZATION ==================== */

document.addEventListener(
    "DOMContentLoaded",
    initializeCartPage
);