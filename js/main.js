document.addEventListener("DOMContentLoaded", function () {
    initializeMenuPage();
    initializeRestaurantPage();
    initializeRestaurantSearch();
    initializeViewRestaurantPage();
    initializeBookTablePage();
    initializeHeaderAuthentication();
});


/* =========================================================
   MENU PAGE
========================================================= */

function initializeMenuPage() {
    const menuGrid = document.getElementById("menuFoodGrid");

    if (!menuGrid) {
        return;
    }

    const cards = Array.from(
        menuGrid.querySelectorAll(".menu-food-card")
    );

    if (cards.length === 0) {
        return;
    }

    setupMenuFoodCards(cards);

    const searchInput =
        document.getElementById("headerSearch");

    const filterButtons =
        document.querySelectorAll(
            ".menu-filter-button"
        );

    let currentCategory =
        getCategoryFromURL();

    let currentSearch =
        getSearchFromURL();

    function applyMenuFilter() {
        let visibleCount = 0;

        cards.forEach(function (card) {

            const categoryElement =
                card.querySelector(
                    "[data-food-category]"
                );

            const nameElement =
                card.querySelector(
                    "[data-food-name]"
                );

            const category =
                categoryElement
                    ? categoryElement
                        .textContent
                        .trim()
                        .toLowerCase()
                    : "";

            /*
             * ADDED FIX
             *
             * Example:
             * South Indian
             *      ↓
             * south-indian
             *
             * URL:
             * category=south-indian
             */
            const normalizedCategory =
                normalizeCategory(category);

            const name =
                nameElement
                    ? nameElement
                        .textContent
                        .trim()
                        .toLowerCase()
                    : "";

            /*
             * ORIGINAL CATEGORY MATCH
             * + NORMALIZED CATEGORY MATCH ADDED
             */
            const categoryMatch =
                currentCategory === "all" ||
                category === currentCategory ||
                normalizedCategory ===
                    currentCategory;

            const searchMatch =
                currentSearch === "" ||
                name.includes(
                    currentSearch
                );

            const shouldShow =
                categoryMatch &&
                searchMatch;

            card.hidden =
                !shouldShow;

            if (shouldShow) {
                visibleCount++;
            }
        });

        updateMenuResultText(
            currentCategory,
            currentSearch,
            visibleCount
        );

        updateMenuActiveButton(
            filterButtons,
            currentCategory
        );

        updateMenuEmptyState(
            visibleCount
        );
    }

    filterButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const category =
                        button.getAttribute(
                            "data-category"
                        ) || "all";

                    currentCategory =
                        normalizeCategory(
                            category
                        );

                    updateURL(
                        currentCategory,
                        currentSearch
                    );

                    applyMenuFilter();
                }
            );
        }
    );

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                currentSearch =
                    searchInput.value
                        .trim()
                        .toLowerCase();

                updateURL(
                    currentCategory,
                    currentSearch
                );

                applyMenuFilter();
            }
        );

        searchInput.value =
            currentSearch;
    }

    window.addEventListener(
        "popstate",
        function () {

            currentCategory =
                getCategoryFromURL();

            currentSearch =
                getSearchFromURL();

            if (searchInput) {
                searchInput.value =
                    currentSearch;
            }

            applyMenuFilter();
        }
    );

    applyMenuFilter();
}


/* =========================================================
   MENU FOOD CARD SETUP
========================================================= */

function setupMenuFoodCards(cards) {
    cards.forEach(function (card, index) {
        const foodId =
            card.getAttribute("data-food-id") || "";

        const categoryElement =
            card.querySelector("[data-food-category]");

        const imageElement =
            card.querySelector("[data-food-image]");

        const nameElement =
            card.querySelector("[data-food-name]");

        const linkElement =
            card.querySelector("[data-food-link]");

        if (!categoryElement) {
            return;
        }

        const category =
            normalizeCategory(
                categoryElement.textContent
            );

        const imageNumber =
            String((index % 5) + 1).padStart(2, "0");

        const imageName =
            getMenuImageName(
                category,
                imageNumber
            );

        if (imageElement) {
            imageElement.alt =
                nameElement
                    ? nameElement.textContent.trim()
                    : "Vegetarian Food";

            const imagePath =
                "images/menu-foods/" + imageName;

            imageElement.src = imagePath;

            imageElement.onerror = function () {
                imageElement.onerror = null;

                const alternatePath =
                    "images/menu-foods/" +
                    category +
                    "-" +
                    imageNumber +
                    ".png";

                imageElement.src = alternatePath;
            };
        }

        if (linkElement && foodId !== "") {
            linkElement.href =
                "food-details.html?food=" +
                encodeURIComponent(foodId);
        }
    });
}


/* =========================================================
   MENU IMAGE NAME
========================================================= */

function getMenuImageName(category, number) {
    const imageCategoryMap = {
        starters: "starter",
        pizza: "pizza",
        burger: "burger",
        sandwich: "sandwich",
        pasta: "pasta",
        chinese: "chinese",
        "south-indian": "south-indian",
        gujarati: "gujarati",
        biryani: "biryani",
        desserts: "dessert"
    };

    const folderName =
        imageCategoryMap[category] || category;

    return (
        folderName +
        "-" +
        number +
        ".png"
    );
}


/* =========================================================
   CATEGORY NORMALIZATION
========================================================= */

function normalizeCategory(value) {
    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/_/g, "-");
}


/* =========================================================
   URL CATEGORY
========================================================= */

function getCategoryFromURL() {
    const params =
        new URLSearchParams(window.location.search);

    const category =
        params.get("category");

    if (!category) {
        return "all";
    }

    return normalizeCategory(category);
}


/* =========================================================
   URL SEARCH
========================================================= */

function getSearchFromURL() {
    const params =
        new URLSearchParams(window.location.search);

    return (
        params.get("search") || ""
    )
        .trim()
        .toLowerCase();
}


/* =========================================================
   UPDATE URL
========================================================= */

function updateURL(category, search) {
    const params =
        new URLSearchParams();

    if (category && category !== "all") {
        params.set(
            "category",
            category
        );
    }

    if (search) {
        params.set(
            "search",
            search
        );
    }

    const queryString =
        params.toString();

    const newURL =
        queryString
            ? "menu.html?" + queryString
            : "menu.html";

    window.history.pushState(
        {},
        "",
        newURL
    );
}


/* =========================================================
   MENU RESULT TEXT
========================================================= */

function updateMenuResultText(
    category,
    search,
    visibleCount
) {
    const title =
        document.getElementById(
            "menuResultsTitle"
        );

    const count =
        document.getElementById(
            "menuResultsCount"
        );

    if (title) {
        if (search) {
            title.textContent =
                "Search Results";
        } else if (category !== "all") {
            title.textContent =
                capitalizeCategory(category);
        } else {
            title.textContent =
                "All Foods";
        }
    }

    if (count) {
        count.textContent =
            visibleCount + " Foods Found";
    }
}


/* =========================================================
   ACTIVE CATEGORY BUTTON
========================================================= */

function updateMenuActiveButton(
    buttons,
    currentCategory
) {
    buttons.forEach(function (button) {
        const buttonCategory =
            normalizeCategory(
                button.getAttribute(
                    "data-category"
                )
            );

        button.classList.toggle(
            "active",
            buttonCategory === currentCategory
        );
    });
}


/* =========================================================
   EMPTY STATE
========================================================= */

function updateMenuEmptyState(
    visibleCount
) {
    const emptyState =
        document.getElementById(
            "menuSearchEmptyState"
        );

    if (!emptyState) {
        return;
    }

    emptyState.hidden =
        visibleCount !== 0;
}


/* =========================================================
   CATEGORY TITLE
========================================================= */

function capitalizeCategory(category) {
    return category
        .split("-")
        .map(function (word) {
            return (
                word.charAt(0).toUpperCase() +
                word.slice(1)
            );
        })
        .join(" ");
}


/* =========================================================
   RESTAURANT PAGE
========================================================= */

function initializeRestaurantPage() {
    const restaurantGrid =
        document.getElementById(
            "restaurantGrid"
        );

    if (!restaurantGrid) {
        return;
    }

    if (
        typeof restaurantData === "undefined" ||
        !Array.isArray(restaurantData)
    ) {
        return;
    }

    const cards =
        restaurantGrid.querySelectorAll(
            ".restaurant-card"
        );

    cards.forEach(function (card) {
        const restaurantId =
            card.getAttribute(
                "data-restaurant-id"
            );

        const restaurant =
            restaurantData.find(function (item) {
                return item.id === restaurantId;
            });

        if (!restaurant) {
            return;
        }

        const rating =
            card.querySelector(
                "[data-rating-id]"
            );

        if (rating) {
            rating.textContent =
                restaurant.rating.toFixed(1);
        }
    });
}


/* =========================================================
   RESTAURANT SEARCH
========================================================= */

function initializeRestaurantSearch() {
    const searchInput =
        document.getElementById(
            "restaurantSearch"
        );

    const restaurantGrid =
        document.getElementById(
            "restaurantGrid"
        );

    if (
        !searchInput ||
        !restaurantGrid
    ) {
        return;
    }

    const cards =
        restaurantGrid.querySelectorAll(
            ".restaurant-card"
        );

    searchInput.addEventListener(
        "input",
        function () {
            const search =
                searchInput.value
                    .trim()
                    .toLowerCase();

            let visibleCount = 0;

            cards.forEach(function (card) {
                const id =
                    card.getAttribute(
                        "data-restaurant-id"
                    );

                const restaurant =
                    findRestaurantById(id);

                if (!restaurant) {
                    card.hidden = true;
                    return;
                }

                const searchableText = (
                    restaurant.name +
                    " " +
                    restaurant.cuisine +
                    " " +
                    restaurant.location
                ).toLowerCase();

                const match =
                    searchableText.includes(
                        search
                    );

                card.hidden = !match;

                if (match) {
                    visibleCount++;
                }
            });

            const count =
                document.getElementById(
                    "restaurantResultsCount"
                );

            if (count) {
                count.textContent =
                    visibleCount +
                    " Restaurants Found";
            }

            const emptyState =
                document.getElementById(
                    "restaurantEmptyState"
                );

            if (emptyState) {
                emptyState.hidden =
                    visibleCount !== 0;
            }
        }
    );
}


/* =========================================================
   FIND RESTAURANT
========================================================= */

function findRestaurantById(id) {
    if (
        typeof restaurantData === "undefined" ||
        !Array.isArray(restaurantData)
    ) {
        return null;
    }

    return restaurantData.find(
        function (restaurant) {
            return restaurant.id === id;
        }
    ) || null;
}


/* =========================================================
   VIEW RESTAURANT PAGE
========================================================= */

function initializeViewRestaurantPage() {
    const page =
        document.getElementById(
            "viewRestaurantPage"
        );

    if (!page) {
        return;
    }

    const params =
        new URLSearchParams(
            window.location.search
        );

    const restaurantId =
        params.get("restaurant");

    const restaurant =
        findRestaurantById(
            restaurantId
        );

    if (!restaurant) {
        showInvalidRestaurant();
        return;
    }

    setText(
        "viewRestaurantName",
        restaurant.name
    );

    setText(
        "viewRestaurantCuisine",
        restaurant.cuisine
    );

    setText(
        "viewRestaurantDescription",
        restaurant.description || ""
    );

    setText(
        "viewRestaurantLocation",
        restaurant.location
    );

    setText(
        "viewRestaurantRating",
        restaurant.rating
            ? restaurant.rating.toFixed(1)
            : "0.0"
    );

    setText(
        "viewRestaurantRatingDetails",
        restaurant.rating
            ? restaurant.rating.toFixed(1) +
              " Rating"
            : ""
    );

    setText(
        "viewRestaurantOpeningTime",
        restaurant.openingTime || ""
    );

    setText(
        "viewRestaurantClosingTime",
        restaurant.closingTime || ""
    );

    setText(
        "viewRestaurantAddress",
        restaurant.address || ""
    );

    const image =
        document.getElementById(
            "viewRestaurantImage"
        );

    if (image) {
        image.src =
            restaurant.insideImage ||
            "images/restaurants/" +
            restaurant.id +
            "-inside.png";

        image.alt =
            restaurant.name +
            " Interior";
    }

    const bookTable =
        document.getElementById(
            "viewRestaurantBookTable"
        );

    if (bookTable) {
        bookTable.href =
            "book-table.html?restaurant=" +
            encodeURIComponent(
                restaurant.id
            );
    }

    initializeRestaurantMenu(
        restaurant
    );
}


/* =========================================================
   RESTAURANT MENU
========================================================= */

function initializeRestaurantMenu(restaurant) {
    if (!restaurant) {
        return;
    }

    /*
       SUPPORT BOTH MENU CONTAINERS

       New:
       #restaurantMenuGrid

       Existing:
       #restaurantFoodList
    */

    const grid =
        document.getElementById(
            "restaurantMenuGrid"
        ) ||
        document.getElementById(
            "restaurantFoodList"
        );

    if (!grid) {
        return;
    }

    /*
       SUPPORT BOTH CARD CLASSES

       New:
       .restaurant-menu-card

       Existing:
       .food-card
    */

    let cards = Array.from(
        grid.querySelectorAll(
            ".restaurant-menu-card"
        )
    );

    if (cards.length === 0) {
        cards = Array.from(
            grid.querySelectorAll(
                ".food-card"
            )
        );
    }

    if (cards.length === 0) {
        return;
    }

    /*
       CHECK RESTAURANT MENU DATA
    */

    if (
        typeof restaurantMenuData ===
            "undefined" ||
        !restaurantMenuData
    ) {
        return;
    }

    let foods = [];

    /*
       FORMAT 1

       restaurantMenuData = [
           {
               restaurantId: "...",
               foods: [...]
           }
       ]
    */

    if (
        Array.isArray(
            restaurantMenuData
        )
    ) {
        const restaurantMenu =
            restaurantMenuData.find(
                function (item) {
                    return (
                        item &&
                        item.restaurantId ===
                            restaurant.id
                    );
                }
            );

        if (
            restaurantMenu &&
            Array.isArray(
                restaurantMenu.foods
            )
        ) {
            foods =
                restaurantMenu.foods;
        }
    }

    /*
       FORMAT 2

       restaurantMenuData = {
           "rajasthani-rasoi": [...]
       }
    */

    if (
        !foods.length &&
        typeof restaurantMenuData ===
            "object" &&
        !Array.isArray(
            restaurantMenuData
        )
    ) {
        const restaurantMenu =
            restaurantMenuData[
                restaurant.id
            ];

        if (
            Array.isArray(
                restaurantMenu
            )
        ) {
            foods =
                restaurantMenu;
        } else if (
            restaurantMenu &&
            Array.isArray(
                restaurantMenu.foods
            )
        ) {
            foods =
                restaurantMenu.foods;
        }
    }

    /*
       NO FOOD DATA
    */

    if (
        !Array.isArray(foods) ||
        foods.length === 0
    ) {
        cards.forEach(
            function (card) {
                card.hidden = true;
            }
        );

        return;
    }

    /*
       SHOW FOOD CARDS
    */

    cards.forEach(
        function (card, index) {
            const food =
                foods[index];

            if (!food) {
                card.hidden = true;
                return;
            }

            card.hidden = false;

            /*
               IMAGE

               Supports:
               .restaurant-menu-image
               .food-image
            */

            const image =
                card.querySelector(
                    ".restaurant-menu-image"
                ) ||
                card.querySelector(
                    ".food-image"
                ) ||
                card.querySelector(
                    "img"
                );

            /*
               CATEGORY

               Supports:
               .restaurant-menu-category
               .food-category
            */

            const category =
                card.querySelector(
                    ".restaurant-menu-category"
                ) ||
                card.querySelector(
                    ".food-category"
                );

            /*
               NAME

               Supports:
               .restaurant-menu-name
               .food-card-content h3
            */

            const name =
                card.querySelector(
                    ".restaurant-menu-name"
                ) ||
                card.querySelector(
                    ".food-card-content h3"
                );

            /*
               DESCRIPTION

               Existing food card supports
               .food-description
            */

            const description =
                card.querySelector(
                    ".restaurant-menu-description"
                ) ||
                card.querySelector(
                    ".food-description"
                );

            /*
               RATING

               Supports:
               .restaurant-menu-rating
               .food-rating
            */

            const rating =
                card.querySelector(
                    ".restaurant-menu-rating"
                ) ||
                card.querySelector(
                    ".food-rating"
                );

            /*
               PRICE

               Supports:
               .restaurant-menu-price
               .food-price
            */

            const price =
                card.querySelector(
                    ".restaurant-menu-price"
                ) ||
                card.querySelector(
                    ".food-price"
                );

            /*
               VIEW FOOD

               Supports:
               .restaurant-menu-link
               .view-food-button
               .view-food-link
            */

            const link =
                card.querySelector(
                    ".restaurant-menu-link"
                ) ||
                card.querySelector(
                    ".view-food-button"
                ) ||
                card.querySelector(
                    ".view-food-link"
                ) ||
                card.querySelector(
                    "a"
                );

            /*
               SET IMAGE
            */

            if (image) {
                image.src =
                    food.image || "";

                image.alt =
                    food.name ||
                    "Vegetarian Food";

                image.loading =
                    "lazy";

                image.onerror =
                    function () {
                        image.onerror =
                            null;

                        /*
                           If exact image from
                           restaurant-menu-data.js
                           is unavailable,
                           try ID based image.
                        */

                        if (
                            food.id
                        ) {
                            image.src =
                                "images/restaurant-food/" +
                                restaurant.id +
                                "/" +
                                food.id +
                                ".png";
                        }
                    };
            }

            /*
               SET CATEGORY
            */

            if (category) {
                category.textContent =
                    food.category ||
                    "Food";
            }

            /*
               SET NAME
            */

            if (name) {
                name.textContent =
                    food.name ||
                    "Food Name";
            }

            /*
               SET DESCRIPTION
            */

            if (description) {
                description.textContent =
                    food.description ||
                    "Delicious vegetarian food prepared with quality ingredients and authentic flavours.";
            }

            /*
               SET RATING
            */

            if (rating) {
                const foodRating =
                    Number(
                        food.rating
                    );

                if (
                    !Number.isNaN(
                        foodRating
                    )
                ) {
                    rating.textContent =
                        foodRating.toFixed(
                            1
                        );
                } else {
                    rating.textContent =
                        "0.0";
                }
            }

            /*
               SET PRICE
            */

            if (price) {
                price.textContent =
                    "₹" +
                    (
                        food.price ||
                        0
                    );
            }

            /*
               SET FOOD ID
            */

            card.setAttribute(
                "data-food-id",
                food.id || ""
            );

            /*
               VIEW FOOD LINK
            */

            if (link) {
                link.href =
                    "food-details.html?food=" +
                    encodeURIComponent(
                        food.id || ""
                    ) +
                    "&restaurant=" +
                    encodeURIComponent(
                        restaurant.id
                    );
            }
        }
    );

    /*
       UPDATE MENU COUNT
    */

    const menuCount =
        document.getElementById(
            "menuItemCount"
        );

    if (menuCount) {
        menuCount.textContent =
            foods.length +
            " Items";
    }
}


/* =========================================================
   INVALID RESTAURANT
========================================================= */

function showInvalidRestaurant() {
    const content =
        document.getElementById(
            "restaurantContent"
        );

    const invalid =
        document.getElementById(
            "invalidRestaurantState"
        );

    if (content) {
        content.hidden = true;
    }

    if (invalid) {
        invalid.hidden = false;
    }
}


/* =========================================================
   BOOK TABLE PAGE
========================================================= */

function initializeBookTablePage() {
    const page =
        document.getElementById(
            "bookTablePage"
        );

    if (!page) {
        return;
    }

    const params =
        new URLSearchParams(
            window.location.search
        );

    const restaurantId =
        params.get("restaurant");

    const restaurant =
        findRestaurantById(
            restaurantId
        );

    if (!restaurant) {
        showInvalidBookingRestaurant();
        return;
    }

    setText(
        "bookingRestaurantName",
        restaurant.name
    );

    setText(
        "bookingRestaurantCuisine",
        restaurant.cuisine
    );

    setText(
        "bookingRestaurantLocation",
        restaurant.location
    );

    setText(
        "bookingRestaurantRating",
        restaurant.rating
            ? restaurant.rating.toFixed(1)
            : "0.0"
    );

    initializeRestaurantTables(
        restaurant
    );
}


/* =========================================================
   INVALID BOOKING
========================================================= */

function showInvalidBookingRestaurant() {
    const content =
        document.getElementById(
            "bookTableContent"
        );

    const invalid =
        document.getElementById(
            "invalidBookingState"
        );

    if (content) {
        content.hidden = true;
    }

    if (invalid) {
        invalid.hidden = false;
    }
}


/* =========================================================
   RESTAURANT TABLES
========================================================= */

function initializeRestaurantTables(
    restaurant
) {
    const tableGrid =
        document.getElementById(
            "restaurantTableGrid"
        );

    if (!tableGrid) {
        return;
    }

    if (
        typeof restaurantTableData ===
            "undefined"
    ) {
        return;
    }

    const tableData =
        restaurantTableData[
            restaurant.id
        ];

    if (
        !Array.isArray(tableData)
    ) {
        return;
    }

    const buttons =
        Array.from(
            tableGrid.querySelectorAll(
                ".restaurant-table"
            )
        );

    buttons.forEach(
        function (button, index) {
            const table =
                tableData[index];

            if (!table) {
                button.hidden = true;
                return;
            }

            button.hidden = false;

            button.textContent =
                "Table " +
                table.number;

            button.setAttribute(
                "data-table-number",
                table.number
            );

            button.setAttribute(
                "data-table-seats",
                table.seats
            );

            button.setAttribute(
                "data-table-status",
                table.status
            );

            button.classList.remove(
                "table-available",
                "table-booked",
                "table-selected"
            );

            if (
                table.status ===
                "booked"
            ) {
                button.classList.add(
                    "table-booked"
                );

                button.disabled = true;
            } else {
                button.classList.add(
                    "table-available"
                );

                button.disabled = false;
            }
        }
    );

    initializeTableSelection();
    initializeBookingAction();
}


/* =========================================================
   TABLE SELECTION
========================================================= */

function initializeTableSelection() {
    const buttons =
        document.querySelectorAll(
            ".restaurant-table"
        );

    buttons.forEach(
        function (button) {
            button.addEventListener(
                "click",
                function () {
                    if (
                        button.disabled
                    ) {
                        return;
                    }

                    buttons.forEach(
                        function (otherButton) {
                            if (
                                !otherButton.disabled
                            ) {
                                otherButton.classList.remove(
                                    "table-selected"
                                );

                                otherButton.classList.add(
                                    "table-available"
                                );
                            }
                        }
                    );

                    button.classList.remove(
                        "table-available"
                    );

                    button.classList.add(
                        "table-selected"
                    );

                    button.setAttribute(
                        "data-selected",
                        "true"
                    );
                }
            );
        }
    );
}


/* =========================================================
   BOOKING ACTION
========================================================= */

function initializeBookingAction() {
    const button =
        document.getElementById(
            "confirmTableBooking"
        );

    if (!button) {
        return;
    }

    button.addEventListener(
        "click",
        function () {
            const loggedIn =
                localStorage.getItem(
                    "yummyTummyLoggedIn"
                ) === "true";

            if (!loggedIn) {
                showLoginRequiredState();
                return;
            }

            const selected =
                document.querySelector(
                    ".restaurant-table.table-selected"
                );

            if (!selected) {
                alert(
                    "Please select an available table first."
                );

                return;
            }

            saveTableBooking(
                selected
            );
        }
    );
}


/* =========================================================
   LOGIN REQUIRED
========================================================= */

function showLoginRequiredState() {
    const shouldLogin =
        window.confirm(
            "Please Login First"
        );

    if (shouldLogin) {
        window.location.href =
            "login.html";
    }
}


/* =========================================================
   SAVE TABLE BOOKING
========================================================= */

function saveTableBooking(
    selectedTable
) {
    const params =
        new URLSearchParams(
            window.location.search
        );

    const restaurantId =
        params.get("restaurant");

    const booking = {
        restaurantId:
            restaurantId,
        tableNumber:
            selectedTable.getAttribute(
                "data-table-number"
            ),
        seats:
            selectedTable.getAttribute(
                "data-table-seats"
            ),
        status:
            "Booked",
        createdAt:
            new Date().toISOString()
    };

    const existingBookings =
        JSON.parse(
            localStorage.getItem(
                "yummyTummyTableBookings"
            ) || "[]"
        );

    existingBookings.push(
        booking
    );

    localStorage.setItem(
        "yummyTummyTableBookings",
        JSON.stringify(
            existingBookings
        )
    );

    showBookingSuccess();
}


/* =========================================================
   BOOKING SUCCESS
========================================================= */

function showBookingSuccess() {
    alert(
        "Table booked successfully!"
    );
}


/* =========================================================
   HEADER AUTHENTICATION
========================================================= */

function initializeHeaderAuthentication() {
    const isLoggedIn =
        localStorage.getItem(
            "yummyTummyLoggedIn"
        ) === "true";

    const loginLinks =
        document.querySelectorAll(
            ".login-link, #loginHeaderLink"
        );

    const registerLinks =
        document.querySelectorAll(
            ".register-link, #registerHeaderLink"
        );

    const profileLinks =
        document.querySelectorAll(
            ".profile-link, #profileHeaderLink"
        );

    loginLinks.forEach(
        function (link) {
            link.hidden = isLoggedIn;
        }
    );

    registerLinks.forEach(
        function (link) {
            link.hidden = isLoggedIn;
        }
    );

    profileLinks.forEach(
        function (link) {
            link.hidden = !isLoggedIn;
        }
    );

    const logoutLinks =
        document.querySelectorAll(
            ".logout-link"
        );

    logoutLinks.forEach(
        function (link) {
            link.addEventListener(
                "click",
                function (event) {
                    event.preventDefault();

                    const confirmLogout =
                        window.confirm(
                            "Are you sure you want to logout?"
                        );

                    if (!confirmLogout) {
                        return;
                    }

                    localStorage.removeItem(
                        "yummyTummyLoggedIn"
                    );

                    localStorage.removeItem(
                        "yummyTummyUser"
                    );

                    window.location.href =
                        "index.html";
                }
            );
        }
    );
}


/* =========================================================
   HELPER: FIND ELEMENT
========================================================= */

function setText(
    id,
    value,
    parentElement,
    selector
) {
    let element = null;

    if (id) {
        element =
            document.getElementById(id);
    } else if (
        parentElement &&
        selector
    ) {
        element =
            parentElement.querySelector(
                selector
            );
    }

    if (element) {
        element.textContent =
            value === undefined ||
            value === null
                ? ""
                : value;
    }
}


/* =========================================================
   HELPER: ATTRIBUTE
========================================================= */

function setElementAttribute(
    parentElement,
    selector,
    attribute,
    value
) {
    if (!parentElement) {
        return;
    }

    const element =
        parentElement.querySelector(
            selector
        );

    if (!element) {
        return;
    }

    element.setAttribute(
        attribute,
        value
    );
}


/* =========================================================
   TABLE STATUS LABEL
========================================================= */

function getTableStatusLabel(status) {
    if (status === "booked") {
        return "Booked";
    }

    if (status === "available") {
        return "Available";
    }

    if (status === "selected") {
        return "Selected";
    }

    return "Available";
}