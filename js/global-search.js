document.addEventListener("DOMContentLoaded", () => {
    initializeGlobalSearch();
});


function initializeGlobalSearch() {
    const searchInput = document.getElementById("headerSearch");

    if (!searchInput) {
        return;
    }

    searchInput.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") {
            return;
        }

        const searchText = searchInput.value.trim();

        if (searchText === "") {
            return;
        }

        handleGlobalSearch(searchText);
    });
}


function handleGlobalSearch(searchText) {
    const normalizedSearch = searchText.toLowerCase();

    const foodMatch = findFoodMatch(normalizedSearch);

    if (foodMatch) {
        window.location.href =
            `menu.html?search=${encodeURIComponent(foodMatch.name)}`;

        return;
    }

    const restaurantMatch =
        findRestaurantMatch(normalizedSearch);

    if (restaurantMatch) {
        window.location.href =
            `restaurants.html?search=${encodeURIComponent(searchText)}`;

        return;
    }

    window.location.href =
        `menu.html?search=${encodeURIComponent(searchText)}`;
}


function findFoodMatch(searchText) {
    if (
        typeof menuFoods === "undefined" ||
        !Array.isArray(menuFoods)
    ) {
        return null;
    }

    return menuFoods.find((food) => {
        const foodName = String(food.name)
            .trim()
            .toLowerCase();

        const category = String(food.category || "")
            .trim()
            .toLowerCase();

        return (
            foodName.includes(searchText) ||
            category.includes(searchText)
        );
    });
}


function findRestaurantMatch(searchText) {
    if (
        typeof restaurantData === "undefined" ||
        !Array.isArray(restaurantData)
    ) {
        return null;
    }

    return restaurantData.find((restaurant) => {
        const name = String(restaurant.name)
            .trim()
            .toLowerCase();

        const cuisine = String(restaurant.cuisine || "")
            .trim()
            .toLowerCase();

        const location = String(restaurant.location || "")
            .trim()
            .toLowerCase();

        return (
            name.includes(searchText) ||
            cuisine.includes(searchText) ||
            location.includes(searchText)
        );
    });
}