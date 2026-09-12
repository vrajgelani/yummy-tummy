document.addEventListener("DOMContentLoaded", () => {
    initializeMenuSearch();
});


function initializeMenuSearch() {
    const searchInput = document.getElementById("headerSearch");
    const foodGrid = document.getElementById("menuFoodGrid");
    const resultsTitle = document.getElementById("menuResultsTitle");
    const resultsCount = document.getElementById("menuResultsCount");
    const emptyState = document.getElementById("menuSearchEmptyState");

    if (
        !searchInput ||
        !foodGrid ||
        !resultsTitle ||
        !resultsCount ||
        !emptyState
    ) {
        return;
    }

    const foodCards = foodGrid.querySelectorAll(".menu-food-card");
    const filterButtons = document.querySelectorAll(
        ".menu-filter-button"
    );

    let selectedCategory = getCategoryFromUrl();

    applyMenuSearch(
        searchInput.value,
        selectedCategory,
        foodCards,
        filterButtons,
        resultsTitle,
        resultsCount,
        emptyState
    );

    searchInput.addEventListener("input", () => {
        applyMenuSearch(
            searchInput.value,
            selectedCategory,
            foodCards,
            filterButtons,
            resultsTitle,
            resultsCount,
            emptyState
        );
    });

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            selectedCategory = button.dataset.category || "all";

            updateCategoryUrl(selectedCategory);

            searchInput.value = "";

            applyMenuSearch(
                "",
                selectedCategory,
                foodCards,
                filterButtons,
                resultsTitle,
                resultsCount,
                emptyState
            );
        });
    });
}


function applyMenuSearch(
    searchText,
    category,
    foodCards,
    filterButtons,
    resultsTitle,
    resultsCount,
    emptyState
) {
    const normalizedSearch = searchText
        .trim()
        .toLowerCase();

    const normalizedCategory = category
        .trim()
        .toLowerCase();

    let visibleCount = 0;

    foodCards.forEach((card) => {
        const foodNameElement = card.querySelector(
            "[data-food-name]"
        );

        const categoryElement = card.querySelector(
            "[data-food-category]"
        );

        const foodName = foodNameElement
            ? foodNameElement.textContent.trim().toLowerCase()
            : "";

        const foodCategory = categoryElement
            ? foodCategoryToSlug(
                  categoryElement.textContent.trim()
              )
            : "";

        const matchesSearch =
            normalizedSearch === "" ||
            foodName.includes(normalizedSearch);

        const matchesCategory =
            normalizedCategory === "all" ||
            foodCategory === normalizedCategory;

        const shouldShow =
            matchesSearch && matchesCategory;

        card.hidden = !shouldShow;

        if (shouldShow) {
            visibleCount += 1;
        }
    });

    updateMenuResults(
        normalizedSearch,
        normalizedCategory,
        visibleCount,
        resultsTitle,
        resultsCount,
        emptyState
    );

    updateActiveCategoryButton(
        normalizedCategory,
        filterButtons
    );
}


function updateMenuResults(
    searchText,
    category,
    visibleCount,
    resultsTitle,
    resultsCount,
    emptyState
) {
    if (searchText !== "") {
        resultsTitle.textContent = `Search Results for "${searchText}"`;
    } else if (category === "all") {
        resultsTitle.textContent = "All Foods";
    } else {
        resultsTitle.textContent = getCategoryTitle(category);
    }

    resultsCount.textContent =
        `${visibleCount} ${visibleCount === 1 ? "Food" : "Foods"}`;

    emptyState.hidden = visibleCount !== 0;
}


function updateActiveCategoryButton(
    selectedCategory,
    filterButtons
) {
    filterButtons.forEach((button) => {
        const buttonCategory =
            button.dataset.category || "all";

        button.classList.toggle(
            "active",
            buttonCategory === selectedCategory
        );
    });
}


function getCategoryFromUrl() {
    const params = new URLSearchParams(
        window.location.search
    );

    const category = params.get("category");

    if (!category) {
        return "all";
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

    return validCategories.includes(category)
        ? category
        : "all";
}


function updateCategoryUrl(category) {
    const url = new URL(window.location.href);

    if (category === "all") {
        url.searchParams.delete("category");
    } else {
        url.searchParams.set("category", category);
    }

    window.history.pushState(
        {},
        "",
        url
    );
}


function foodCategoryToSlug(category) {
    return category
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");
}


function getCategoryTitle(category) {
    const categoryTitles = {
        all: "All Foods",
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