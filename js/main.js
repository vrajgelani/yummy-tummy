"use strict";


document.addEventListener("DOMContentLoaded", function () {

    initializeMenuPage();

});


function initializeMenuPage() {

    const menuFoodGrid = document.getElementById(
        "menuFoodGrid"
    );

    if (!menuFoodGrid) {
        return;
    }


    const foodCards = document.querySelectorAll(
        ".menu-food-card"
    );


    const categoryButtons = document.querySelectorAll(
        ".menu-category-filter"
    );


    const resultsTitle = document.getElementById(
        "menuResultsTitle"
    );


    const resultsCount = document.getElementById(
        "menuResultsCount"
    );


    if (
        typeof menuFoods === "undefined" ||
        !Array.isArray(menuFoods)
    ) {

        console.error(
            "Menu food data could not be loaded."
        );

        return;

    }


    /*
     * Fill all existing food cards
     */
    foodCards.forEach(function (card) {

        const foodId = card.dataset.foodId;


        const food = menuFoods.find(function (item) {

            return item.id === foodId;

        });


        if (!food) {
            return;
        }


        const categoryElement = card.querySelector(
            ".menu-food-category"
        );


        const nameElement = card.querySelector(
            ".menu-food-name"
        );


        const ratingElement = card.querySelector(
            ".menu-food-rating"
        );


        const priceElement = card.querySelector(
            ".menu-food-price"
        );


        const viewFoodButton = card.querySelector(
            ".menu-food-view-button"
        );


        if (categoryElement) {

            categoryElement.textContent =
                food.categoryName;

        }


        if (nameElement) {

            nameElement.textContent =
                food.name;

        }


        if (ratingElement) {

            ratingElement.textContent =
                "Rating: " + food.rating;

        }


        if (priceElement) {

            priceElement.textContent =
                "₹" + food.price;

        }


        if (viewFoodButton) {

            viewFoodButton.href =
                "food-details.html?food=" +
                encodeURIComponent(food.id);

        }

    });


    /*
     * Get category from URL
     */
    function getCategoryFromURL() {

        const urlParams =
            new URLSearchParams(window.location.search);


        const category =
            urlParams.get("category");


        if (!category) {
            return "all";
        }


        const categoryExists =
            menuFoods.some(function (food) {

                return food.category === category;

            });


        if (!categoryExists) {
            return "all";
        }


        return category;

    }


    /*
     * Update URL without reloading page
     */
    function updateCategoryURL(category) {

        const currentURL =
            new URL(window.location.href);


        if (category === "all") {

            currentURL.searchParams.delete(
                "category"
            );

        } else {

            currentURL.searchParams.set(
                "category",
                category
            );

        }


        window.history.pushState(
            {},
            "",
            currentURL
        );

    }


    /*
     * Set active category button
     */
    function setActiveCategoryButton(category) {

        categoryButtons.forEach(function (button) {

            const buttonCategory =
                button.dataset.category;


            if (buttonCategory === category) {

                button.classList.add("active");

            } else {

                button.classList.remove("active");

            }

        });

    }


    /*
     * Find category name
     */
    function getCategoryName(category) {

        if (category === "all") {
            return "All Foods";
        }


        const food =
            menuFoods.find(function (item) {

                return item.category === category;

            });


        if (food) {
            return food.categoryName;
        }


        return "All Foods";

    }


    /*
     * Filter food cards
     */
    function updateMenuResults(category) {

        let visibleCount = 0;


        foodCards.forEach(function (card) {

            const foodId =
                card.dataset.foodId;


            const food =
                menuFoods.find(function (item) {

                    return item.id === foodId;

                });


            if (!food) {

                card.hidden = true;

                return;

            }


            const shouldShow =
                category === "all" ||
                food.category === category;


            if (shouldShow) {

                card.hidden = false;

                visibleCount++;

            } else {

                card.hidden = true;

            }

        });


        if (resultsTitle) {

            resultsTitle.textContent =
                getCategoryName(category);

        }


        if (resultsCount) {

            resultsCount.textContent =
                visibleCount + " Foods";

        }


        setActiveCategoryButton(category);

    }


    /*
     * Apply category selected from URL
     */
    function applyURLCategory() {

        const category =
            getCategoryFromURL();


        updateMenuResults(category);

    }


    /*
     * Category button click
     */
    categoryButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const selectedCategory =
                    button.dataset.category;


                updateCategoryURL(
                    selectedCategory
                );


                updateMenuResults(
                    selectedCategory
                );

            }
        );

    });


    /*
     * Browser Back / Forward
     */
    window.addEventListener(
        "popstate",
        function () {

            applyURLCategory();

        }
    );


    /*
     * Initial page load
     */
    applyURLCategory();

}