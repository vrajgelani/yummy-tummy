document.addEventListener("DOMContentLoaded", function () {
    initializeMenuPage();
    initializeRestaurantPage();
});


function initializeMenuPage() {
    const menuFoodGrid = document.getElementById("menuFoodGrid");

    if (!menuFoodGrid) {
        return;
    }

    const foodCards = menuFoodGrid.querySelectorAll(".menu-food-card");

    if (typeof menuFoods === "undefined") {
        return;
    }

    foodCards.forEach(function (card) {
        const foodId = card.dataset.foodId;

        const food = menuFoods.find(function (item) {
            return item.id === foodId;
        });

        if (!food) {
            return;
        }

        const image = card.querySelector(".menu-food-image");
        const name = card.querySelector(".menu-food-name");
        const category = card.querySelector(".menu-food-category");
        const rating = card.querySelector(".menu-food-rating");
        const price = card.querySelector(".menu-food-price");
        const viewFoodLink = card.querySelector(".menu-food-link");

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
            rating.textContent = "Rating: " + food.rating;
        }

        if (price) {
            price.textContent = "₹" + food.price;
        }

        if (viewFoodLink) {
            viewFoodLink.href =
                "food-details.html?food=" +
                encodeURIComponent(food.id);
        }

        card.dataset.category = food.categorySlug;
    });


    initializeMenuFilters(foodCards);
}


function initializeMenuFilters(foodCards) {
    const filterButtons =
        document.querySelectorAll(".menu-category-filter");

    const resultsTitle =
        document.querySelector(".menu-results-heading h2");

    const resultsCount =
        document.getElementById("menuResultsCount");

    if (!filterButtons.length) {
        return;
    }


    function applyCategoryFilter(category, updateUrl) {
        let validCategory = category;

        if (
            validCategory !== "all" &&
            !isValidMenuCategory(validCategory)
        ) {
            validCategory = "all";
        }


        let visibleCount = 0;


        foodCards.forEach(function (card) {
            const cardCategory = card.dataset.category;

            const shouldShow =
                validCategory === "all" ||
                cardCategory === validCategory;

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleCount++;
            }
        });


        filterButtons.forEach(function (button) {
            const buttonCategory =
                button.dataset.category;

            button.classList.toggle(
                "active",
                buttonCategory === validCategory
            );
        });


        if (resultsTitle) {
            if (validCategory === "all") {
                resultsTitle.textContent = "All Foods";
            } else {
                resultsTitle.textContent =
                    getCategoryTitle(validCategory);
            }
        }


        if (resultsCount) {
            resultsCount.textContent =
                visibleCount + " Foods";
        }


        if (updateUrl) {
            const url =
                new URL(window.location.href);

            if (validCategory === "all") {
                url.searchParams.delete("category");
            } else {
                url.searchParams.set(
                    "category",
                    validCategory
                );
            }

            window.history.pushState(
                {},
                "",
                url
            );
        }
    }


    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const category =
                button.dataset.category;

            applyCategoryFilter(
                category,
                true
            );
        });
    });


    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    const requestedCategory =
        urlParams.get("category") || "all";


    applyCategoryFilter(
        requestedCategory,
        false
    );


    window.addEventListener("popstate", function () {
        const currentParams =
            new URLSearchParams(
                window.location.search
            );

        const currentCategory =
            currentParams.get("category") || "all";

        applyCategoryFilter(
            currentCategory,
            false
        );
    });
}


function isValidMenuCategory(category) {
    const validCategories = [
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

    return validCategories.includes(category);
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

    return categoryTitles[category] || "All Foods";
}


function initializeRestaurantPage() {
    const restaurantGrid =
        document.getElementById("restaurantGrid");

    if (!restaurantGrid) {
        return;
    }

    if (typeof restaurantData === "undefined") {
        return;
    }


    const ratingElements =
        restaurantGrid.querySelectorAll(
            "[data-rating-id]"
        );


    ratingElements.forEach(function (element) {
        const restaurantId =
            element.dataset.ratingId;

        const restaurant =
            restaurantData.find(function (item) {
                return item.id === restaurantId;
            });


        if (!restaurant) {
            return;
        }


        element.textContent =
            "Rating: " +
            restaurant.rating;
    });
}