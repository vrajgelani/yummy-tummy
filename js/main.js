document.addEventListener("DOMContentLoaded", function () {
    initializeMenuPage();
    initializeRestaurantPage();
    initializeViewRestaurantPage();
});


/* =========================
   MENU PAGE
========================= */

function initializeMenuPage() {
    const menuFoodGrid = document.getElementById("menuFoodGrid");

    if (!menuFoodGrid) {
        return;
    }

    const foodCards = Array.from(
        menuFoodGrid.querySelectorAll(".menu-food-card")
    );

    if (typeof menuFoods === "undefined") {
        return;
    }

    foodCards.forEach(function (card) {
        const foodId = card.dataset.foodId;

        const food = menuFoods.find(function (item) {
            return item.id === foodId;
        });

        if (!food) {
            card.hidden = true;
            return;
        }

        const image = card.querySelector(".menu-food-image");
        const name = card.querySelector(".menu-food-name");
        const category = card.querySelector(".menu-food-category");
        const rating = card.querySelector(".menu-food-rating");
        const price = card.querySelector(".menu-food-price");
        const viewLink = card.querySelector(".menu-food-view-link");

        if (image) {
            image.src = food.image;
            image.alt = food.name;
        }

        if (name) {
            name.textContent = food.name;
        }

        if (category) {
            category.textContent = food.category;
        }

        if (rating) {
            rating.textContent = food.rating.toFixed(1);
        }

        if (price) {
            price.textContent = "₹" + food.price;
        }

        if (viewLink) {
            viewLink.href =
                "food-details.html?food=" +
                encodeURIComponent(food.id);
        }

        card.dataset.category = food.categorySlug;
    });

    initializeMenuFilters(foodCards);
}


/* =========================
   MENU FILTERS
========================= */

function initializeMenuFilters(foodCards) {
    const filterButtons = Array.from(
        document.querySelectorAll("[data-menu-category]")
    );

    const resultsTitle = document.getElementById("menuResultsTitle");
    const resultsCount = document.getElementById("menuResultsCount");

    if (!filterButtons.length) {
        return;
    }

    function applyCategory(category, updateUrl) {
        const normalizedCategory = category.toLowerCase();

        let visibleCount = 0;

        foodCards.forEach(function (card) {
            const cardCategory = card.dataset.category;

            const shouldShow =
                normalizedCategory === "all" ||
                cardCategory === normalizedCategory;

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleCount += 1;
            }
        });

        filterButtons.forEach(function (button) {
            const buttonCategory = button.dataset.menuCategory;

            button.classList.toggle(
                "active",
                buttonCategory === normalizedCategory
            );
        });

        if (resultsTitle) {
            if (normalizedCategory === "all") {
                resultsTitle.textContent = "All Foods";
            } else {
                resultsTitle.textContent =
                    getCategoryTitle(normalizedCategory);
            }
        }

        if (resultsCount) {
            resultsCount.textContent =
                visibleCount + " food items available";
        }

        if (updateUrl) {
            const url = new URL(window.location.href);

            if (normalizedCategory === "all") {
                url.searchParams.delete("category");
            } else {
                url.searchParams.set(
                    "category",
                    normalizedCategory
                );
            }

            window.history.pushState(
                {},
                "",
                url.pathname + url.search
            );
        }
    }

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const category = button.dataset.menuCategory;

            if (!isValidMenuCategory(category)) {
                return;
            }

            applyCategory(category, true);
        });
    });

    const params =
        new URLSearchParams(window.location.search);

    const categoryFromUrl =
        params.get("category");

    if (
        categoryFromUrl &&
        isValidMenuCategory(categoryFromUrl)
    ) {
        applyCategory(categoryFromUrl, false);
    } else {
        applyCategory("all", false);
    }

    window.addEventListener("popstate", function () {
        const currentParams =
            new URLSearchParams(window.location.search);

        const currentCategory =
            currentParams.get("category");

        if (
            currentCategory &&
            isValidMenuCategory(currentCategory)
        ) {
            applyCategory(
                currentCategory,
                false
            );
        } else {
            applyCategory(
                "all",
                false
            );
        }
    });
}


function isValidMenuCategory(category) {
    if (!category) {
        return false;
    }

    const validCategories = [
        "all",
        "starters",
        "pizza",
        "burger",
        "sandwich",
        "pasta",
        "chinese",
        "south-indian",
        "gujarati",
        "biryani",
        "desserts"
    ];

    return validCategories.includes(
        category.toLowerCase()
    );
}


function getCategoryTitle(category) {
    const categoryTitles = {
        starters: "Starters",
        pizza: "Pizza",
        burger: "Burger",
        sandwich: "Sandwich",
        pasta: "Pasta",
        chinese: "Chinese",
        "south-indian": "South Indian",
        gujarati: "Gujarati",
        biryani: "Biryani",
        desserts: "Desserts"
    };

    return (
        categoryTitles[category] ||
        "All Foods"
    );
}


/* =========================
   RESTAURANT PAGE
========================= */

function initializeRestaurantPage() {
    const restaurantCards =
        document.querySelectorAll(
            "[data-restaurant-id]"
        );

    if (!restaurantCards.length) {
        return;
    }

    if (typeof restaurantData === "undefined") {
        return;
    }

    restaurantCards.forEach(function (card) {
        const restaurantId =
            card.dataset.restaurantId;

        const restaurant =
            restaurantData.find(function (item) {
                return item.id === restaurantId;
            });

        if (!restaurant) {
            return;
        }

        const ratingElement =
            card.querySelector(
                "[data-rating-id]"
            );

        if (ratingElement) {
            ratingElement.textContent =
                restaurant.rating.toFixed(1);
        }
    });

    initializeRestaurantSearch();
}


/* =========================
   RESTAURANT SEARCH
========================= */

function initializeRestaurantSearch() {
    const searchInput =
        document.getElementById(
            "restaurantSearch"
        );

    const resultsTitle =
        document.getElementById(
            "restaurantResultsTitle"
        );

    const resultsCount =
        document.getElementById(
            "restaurantResultsCount"
        );

    const emptyState =
        document.getElementById(
            "restaurantEmptyState"
        );

    const cards = Array.from(
        document.querySelectorAll(
            "[data-restaurant-id]"
        )
    );

    if (
        !searchInput ||
        !cards.length ||
        typeof restaurantData === "undefined"
    ) {
        return;
    }

    function filterRestaurants() {
        const searchTerm =
            searchInput.value
                .trim()
                .toLowerCase();

        let visibleCount = 0;

        cards.forEach(function (card) {
            const restaurantId =
                card.dataset.restaurantId;

            const restaurant =
                restaurantData.find(function (item) {
                    return item.id === restaurantId;
                });

            if (!restaurant) {
                card.hidden = true;
                return;
            }

            const searchableText =
                (
                    restaurant.name +
                    " " +
                    restaurant.cuisine +
                    " " +
                    restaurant.location
                ).toLowerCase();

            const shouldShow =
                searchableText.includes(
                    searchTerm
                );

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleCount += 1;
            }
        });

        if (resultsCount) {
            resultsCount.textContent =
                visibleCount +
                " restaurants available";
        }

        if (resultsTitle) {
            resultsTitle.textContent =
                searchTerm
                    ? "Search Results"
                    : "All Restaurants";
        }

        if (emptyState) {
            emptyState.hidden =
                visibleCount !== 0;
        }
    }

    searchInput.addEventListener(
        "input",
        filterRestaurants
    );

    filterRestaurants();
}


/* =========================
   VIEW RESTAURANT PAGE
========================= */

function initializeViewRestaurantPage() {
    const restaurantDetailsCard =
        document.getElementById(
            "restaurantDetailsCard"
        );

    if (!restaurantDetailsCard) {
        return;
    }

    if (typeof restaurantData === "undefined") {
        return;
    }

    const params =
        new URLSearchParams(
            window.location.search
        );

    const restaurantId =
        params.get("restaurant");

    const restaurant =
        restaurantData.find(function (item) {
            return item.id === restaurantId;
        });

    if (!restaurant) {
        showInvalidRestaurant();
        return;
    }

    const interiorImage =
        document.getElementById(
            "restaurantInteriorImage"
        );

    const cuisine =
        document.getElementById(
            "viewRestaurantCuisine"
        );

    const name =
        document.getElementById(
            "viewRestaurantName"
        );

    const description =
        document.getElementById(
            "viewRestaurantDescription"
        );

    const location =
        document.getElementById(
            "viewRestaurantLocation"
        );

    const rating =
        document.getElementById(
            "viewRestaurantRating"
        );

    const openingTime =
        document.getElementById(
            "viewRestaurantOpeningTime"
        );

    const closingTime =
        document.getElementById(
            "viewRestaurantClosingTime"
        );

    const address =
        document.getElementById(
            "viewRestaurantAddress"
        );

    const bookTableButton =
        document.getElementById(
            "bookTableButton"
        );

    if (interiorImage) {
        interiorImage.src =
            "images/restaurants/" +
            restaurant.id +
            "-inside.png";

        interiorImage.alt =
            restaurant.name +
            " interior";
    }

    if (cuisine) {
        cuisine.textContent =
            restaurant.cuisine;
    }

    if (name) {
        name.textContent =
            restaurant.name;
    }

    if (description) {
        description.textContent =
            restaurant.description;
    }

    if (location) {
        location.textContent =
            restaurant.location;
    }

    if (rating) {
        rating.textContent =
            restaurant.rating.toFixed(1);
    }

    if (openingTime) {
        openingTime.textContent =
            restaurant.openingTime;
    }

    if (closingTime) {
        closingTime.textContent =
            restaurant.closingTime;
    }

    if (address) {
        address.textContent =
            restaurant.address;
    }

    if (bookTableButton) {
        bookTableButton.href =
            "book-table.html?restaurant=" +
            encodeURIComponent(
                restaurant.id
            );
    }

    document.title =
        restaurant.name +
        " | Yummy Tummy";

    initializeRestaurantMenu(
        restaurant
    );
}


/* =========================
   RESTAURANT MENU
========================= */

function initializeRestaurantMenu(restaurant) {
    const restaurantMenuGrid =
        document.getElementById(
            "restaurantMenuGrid"
        );

    const restaurantMenuTitle =
        document.getElementById(
            "restaurantMenuTitle"
        );

    if (!restaurantMenuGrid) {
        return;
    }

    if (
        typeof restaurantMenuData ===
        "undefined"
    ) {
        return;
    }

    const restaurantMenu =
        restaurantMenuData[
            restaurant.id
        ];

    if (
        !restaurantMenu ||
        !restaurantMenu.length
    ) {
        restaurantMenuGrid.hidden = true;
        return;
    }

    const menuCards = Array.from(
        restaurantMenuGrid.querySelectorAll(
            ".restaurant-menu-card"
        )
    );

    if (!menuCards.length) {
        return;
    }

    menuCards.forEach(function (card) {
        const foodIndex =
            Number(card.dataset.menuFoodId);

        const food =
            restaurantMenu[foodIndex];

        if (!food) {
            card.hidden = true;
            return;
        }

        const image =
            card.querySelector(
                ".restaurant-menu-image"
            );

        const category =
            card.querySelector(
                ".restaurant-menu-category"
            );

        const name =
            card.querySelector(
                ".restaurant-menu-name"
            );

        const rating =
            card.querySelector(
                ".restaurant-menu-rating"
            );

        const price =
            card.querySelector(
                ".restaurant-menu-price"
            );

        const viewLink =
            card.querySelector(
                ".restaurant-menu-view-link"
            );

        if (image) {
            image.src = food.image;
            image.alt =
                food.name +
                " at " +
                restaurant.name;
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
                food.rating.toFixed(1);
        }

        if (price) {
            price.textContent =
                "₹" + food.price;
        }

        if (viewLink) {
            viewLink.href =
                "food-details.html?food=" +
                encodeURIComponent(food.id) +
                "&restaurant=" +
                encodeURIComponent(
                    restaurant.id
                );
        }

        card.hidden = false;
    });

    if (restaurantMenuTitle) {
        restaurantMenuTitle.textContent =
            restaurant.name +
            " Menu";
    }
}


/* =========================
   INVALID RESTAURANT
========================= */

function showInvalidRestaurant() {
    const restaurantDetailsCard =
        document.getElementById(
            "restaurantDetailsCard"
        );

    const restaurantMenuSection =
        document.querySelector(
            ".restaurant-menu-section"
        );

    const invalidState =
        document.getElementById(
            "invalidRestaurantState"
        );

    if (restaurantDetailsCard) {
        restaurantDetailsCard.hidden = true;
    }

    if (restaurantMenuSection) {
        restaurantMenuSection.hidden = true;
    }

    if (invalidState) {
        invalidState.hidden = false;
    }
}