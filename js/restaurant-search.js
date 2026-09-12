document.addEventListener("DOMContentLoaded", () => {
    initializeRestaurantSearch();
});


function initializeRestaurantSearch() {
    const searchInput = document.getElementById("restaurantSearch");
    const restaurantGrid = document.getElementById("restaurantGrid");
    const resultsTitle = document.getElementById("restaurantResultsTitle");
    const resultsCount = document.getElementById("restaurantResultsCount");
    const emptyState = document.getElementById("restaurantEmptyState");

    if (
        !searchInput ||
        !restaurantGrid ||
        !resultsTitle ||
        !resultsCount ||
        !emptyState
    ) {
        return;
    }

    const restaurantCards = restaurantGrid.querySelectorAll(
        "[data-restaurant-id]"
    );

    applyRestaurantSearch(
        searchInput.value,
        restaurantCards,
        resultsTitle,
        resultsCount,
        emptyState
    );

    searchInput.addEventListener("input", () => {
        applyRestaurantSearch(
            searchInput.value,
            restaurantCards,
            resultsTitle,
            resultsCount,
            emptyState
        );
    });
}


function applyRestaurantSearch(
    searchText,
    restaurantCards,
    resultsTitle,
    resultsCount,
    emptyState
) {
    const normalizedSearch = searchText
        .trim()
        .toLowerCase();

    let visibleCount = 0;

    restaurantCards.forEach((card) => {
        const restaurantNameElement = card.querySelector(
            "[data-restaurant-name]"
        );

        const cuisineElement = card.querySelector(
            "[data-restaurant-cuisine]"
        );

        const locationElement = card.querySelector(
            "[data-restaurant-location]"
        );

        const restaurantName = restaurantNameElement
            ? restaurantNameElement.textContent
                  .trim()
                  .toLowerCase()
            : "";

        const cuisine = cuisineElement
            ? cuisineElement.textContent
                  .trim()
                  .toLowerCase()
            : "";

        const location = locationElement
            ? locationElement.textContent
                  .trim()
                  .toLowerCase()
            : "";

        const matchesSearch =
            normalizedSearch === "" ||
            restaurantName.includes(normalizedSearch) ||
            cuisine.includes(normalizedSearch) ||
            location.includes(normalizedSearch);

        card.hidden = !matchesSearch;

        if (matchesSearch) {
            visibleCount += 1;
        }
    });

    updateRestaurantResults(
        normalizedSearch,
        visibleCount,
        resultsTitle,
        resultsCount,
        emptyState
    );
}


function updateRestaurantResults(
    searchText,
    visibleCount,
    resultsTitle,
    resultsCount,
    emptyState
) {
    if (searchText === "") {
        resultsTitle.textContent = "All Restaurants";
    } else {
        resultsTitle.textContent =
            `Search Results for "${searchText}"`;
    }

    resultsCount.textContent =
        `${visibleCount} ${
            visibleCount === 1
                ? "Restaurant"
                : "Restaurants"
        }`;

    emptyState.hidden = visibleCount !== 0;
}