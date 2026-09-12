document.addEventListener("DOMContentLoaded", function () {
    initializeWishlistPage();
});


function initializeWishlistPage() {
    const wishlistGrid =
        document.getElementById("wishlistFoodGrid");

    const emptyState =
        document.getElementById("wishlistEmptyState");

    const wishlistCount =
        document.getElementById("wishlistCount");

    if (
        !wishlistGrid ||
        !emptyState ||
        !wishlistCount
    ) {
        return;
    }

    const wishlistItems =
        getWishlistItems();

    const cards =
        wishlistGrid.querySelectorAll(
            ".wishlist-food-card"
        );

    cards.forEach(function (card) {
        card.hidden = true;
    });

    if (wishlistItems.length === 0) {
        emptyState.hidden = false;
        wishlistCount.textContent = "0 Foods";
        return;
    }

    emptyState.hidden = true;

    wishlistItems.forEach(function (wishlistItem, index) {
        const card = cards[index];

        if (!card) {
            return;
        }

        fillWishlistCard(
            card,
            wishlistItem
        );

        card.hidden = false;
    });

    wishlistCount.textContent =
        wishlistItems.length +
        (
            wishlistItems.length === 1
                ? " Food"
                : " Foods"
        );
}


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
            JSON.parse(storedWishlist);

        if (Array.isArray(parsedWishlist)) {
            return parsedWishlist;
        }

        return [];
    } catch (error) {
        return [];
    }
}


function saveWishlistItems(items) {
    localStorage.setItem(
        "yummyTummyWishlist",
        JSON.stringify(items)
    );
}


function getAllWishlistFoodData() {
    const allFoods = [];

    if (Array.isArray(window.menuFoods)) {
        window.menuFoods.forEach(function (food) {
            allFoods.push(food);
        });
    }

    const popularFoods = [
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

    popularFoods.forEach(function (food) {
        allFoods.push(food);
    });

    if (Array.isArray(window.restaurantMenuData)) {
        window.restaurantMenuData.forEach(
            function (restaurant) {
                if (
                    !restaurant ||
                    !Array.isArray(restaurant.foods)
                ) {
                    return;
                }

                restaurant.foods.forEach(
                    function (food) {
                        allFoods.push({
                            id: food.id,
                            name: food.name,
                            category: food.category,
                            price: food.price,
                            rating: food.rating,
                            image: food.image
                        });
                    }
                );
            }
        );
    }

    return allFoods;
}


function findWishlistFood(foodId) {
    const allFoods =
        getAllWishlistFoodData();

    return allFoods.find(function (food) {
        return food.id === foodId;
    });
}


function fillWishlistCard(card, wishlistItem) {
    const foodId =
        wishlistItem.id ||
        wishlistItem.foodId;

    const food =
        findWishlistFood(foodId);

    if (!food) {
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

    if (image) {
        image.src = food.image;
        image.alt = food.name;
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
            "Rating: " + food.rating;
    }

    if (price) {
        price.textContent =
            "₹" + food.price;
    }

    if (viewButton) {
        viewButton.href =
            "food-details.html?food=" +
            encodeURIComponent(food.id);
    }
}


function removeWishlistItem(foodId) {
    const wishlistItems =
        getWishlistItems();

    const updatedWishlist =
        wishlistItems.filter(function (item) {
            const itemId =
                item.id ||
                item.foodId;

            return itemId !== foodId;
        });

    saveWishlistItems(updatedWishlist);

    initializeWishlistPage();
}