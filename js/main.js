document.addEventListener("DOMContentLoaded", function () {
    initializeMenuPage();
    initializeRestaurantPage();
    initializeRestaurantSearch();
    initializeViewRestaurantPage();
    initializeBookTablePage();
    initializeHeaderAuthentication();
});


/* ========================================
   MENU PAGE
======================================== */

function initializeMenuPage() {
    const menuFoodGrid =
        document.getElementById("menuFoodGrid");

    if (
        !menuFoodGrid ||
        typeof menuFoods === "undefined"
    ) {
        return;
    }

    const foodCards =
        document.querySelectorAll(
            ".menu-food-card"
        );

    const filterButtons =
        document.querySelectorAll(
            ".menu-filter-button"
        );

    const resultsTitle =
        document.getElementById(
            "menuResultsTitle"
        );

    const resultsCount =
        document.getElementById(
            "menuResultsCount"
        );


    function applyCategory(category) {
        let visibleCount = 0;


        foodCards.forEach(function (card) {

            const foodCategory =
                card.getAttribute(
                    "data-category"
                );


            if (
                category === "all" ||
                foodCategory === category
            ) {
                card.hidden = false;
                visibleCount++;
            } else {
                card.hidden = true;
            }

        });


        filterButtons.forEach(
            function (button) {

                const buttonCategory =
                    button.getAttribute(
                        "data-category"
                    );


                if (
                    buttonCategory === category
                ) {
                    button.classList.add(
                        "active"
                    );
                } else {
                    button.classList.remove(
                        "active"
                    );
                }

            }
        );


        if (resultsCount) {
            resultsCount.textContent =
                visibleCount + " Foods";
        }


        if (resultsTitle) {

            if (category === "all") {

                resultsTitle.textContent =
                    "All Foods";

            } else {

                const selectedFood =
                    menuFoods.find(
                        function (food) {
                            return (
                                food.categorySlug ===
                                category
                            );
                        }
                    );


                if (selectedFood) {
                    resultsTitle.textContent =
                        selectedFood.category;
                }

            }

        }
    }


    foodCards.forEach(
        function (card, index) {

            const food =
                menuFoods[index];


            if (!food) {
                card.hidden = true;
                return;
            }


            card.setAttribute(
                "data-food-id",
                food.id
            );


            card.setAttribute(
                "data-category",
                food.categorySlug
            );


            const image =
                card.querySelector(
                    ".menu-food-image"
                );

            const name =
                card.querySelector(
                    ".menu-food-name"
                );

            const category =
                card.querySelector(
                    ".menu-food-category"
                );

            const rating =
                card.querySelector(
                    ".menu-food-rating"
                );

            const price =
                card.querySelector(
                    ".menu-food-price"
                );

            const viewLink =
                card.querySelector(
                    ".menu-food-link"
                );


            if (image) {
                image.src = food.image;
                image.alt = food.name;
            }


            if (name) {
                name.textContent =
                    food.name;
            }


            if (category) {
                category.textContent =
                    food.category;
            }


            if (rating) {
                rating.textContent =
                    food.rating;
            }


            if (price) {
                price.textContent =
                    "₹" + food.price;
            }


            if (viewLink) {
                viewLink.href =
                    "food-details.html?food=" +
                    food.id;
            }

        }
    );


    filterButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const category =
                        button.getAttribute(
                            "data-category"
                        );


                    if (!category) {
                        return;
                    }


                    applyCategory(
                        category
                    );


                    const currentUrl =
                        new URL(
                            window.location.href
                        );


                    if (
                        category === "all"
                    ) {

                        currentUrl.searchParams.delete(
                            "category"
                        );

                    } else {

                        currentUrl.searchParams.set(
                            "category",
                            category
                        );

                    }


                    window.history.pushState(
                        {},
                        "",
                        currentUrl
                    );

                }
            );

        }
    );


    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const urlCategory =
        urlParams.get("category");


    const validCategory =
        menuFoods.some(
            function (food) {
                return (
                    food.categorySlug ===
                    urlCategory
                );
            }
        );


    if (
        urlCategory &&
        validCategory
    ) {

        applyCategory(
            urlCategory
        );

    } else {

        applyCategory("all");

    }


    window.addEventListener(
        "popstate",
        function () {

            const currentParams =
                new URLSearchParams(
                    window.location.search
                );


            const currentCategory =
                currentParams.get(
                    "category"
                );


            const categoryExists =
                menuFoods.some(
                    function (food) {
                        return (
                            food.categorySlug ===
                            currentCategory
                        );
                    }
                );


            if (
                currentCategory &&
                categoryExists
            ) {

                applyCategory(
                    currentCategory
                );

            } else {

                applyCategory("all");

            }

        }
    );
}


/* ========================================
   RESTAURANT PAGE
======================================== */

function initializeRestaurantPage() {
    const restaurantCards =
        document.querySelectorAll(
            "[data-restaurant-id]"
        );


    if (
        !restaurantCards.length ||
        typeof restaurantData ===
            "undefined"
    ) {
        return;
    }


    restaurantCards.forEach(
        function (card) {

            const restaurantId =
                card.getAttribute(
                    "data-restaurant-id"
                );


            const restaurant =
                restaurantData.find(
                    function (item) {
                        return (
                            item.id ===
                            restaurantId
                        );
                    }
                );


            if (!restaurant) {
                return;
            }


            const ratingElement =
                card.querySelector(
                    '[data-rating-id="' +
                        restaurantId +
                        '"]'
                );


            if (ratingElement) {
                ratingElement.textContent =
                    restaurant.rating;
            }

        }
    );
}


/* ========================================
   RESTAURANT SEARCH
======================================== */

function initializeRestaurantSearch() {
    const searchInput =
        document.getElementById(
            "restaurantSearch"
        );


    if (!searchInput) {
        return;
    }


    if (
        typeof restaurantData ===
        "undefined"
    ) {
        return;
    }


    const restaurantCards =
        document.querySelectorAll(
            ".restaurant-card[data-restaurant-id]"
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


    function performSearch() {

        const searchValue =
            searchInput.value
                .trim()
                .toLowerCase();


        let visibleCount = 0;


        restaurantCards.forEach(
            function (card) {

                const restaurantId =
                    card.getAttribute(
                        "data-restaurant-id"
                    );


                const restaurant =
                    restaurantData.find(
                        function (item) {
                            return (
                                item.id ===
                                restaurantId
                            );
                        }
                    );


                if (!restaurant) {

                    card.hidden = true;
                    return;

                }


                const searchableText =
                    restaurant.name +
                    " " +
                    restaurant.cuisine +
                    " " +
                    restaurant.location;


                const matches =
                    searchableText
                        .toLowerCase()
                        .includes(
                            searchValue
                        );


                if (matches) {

                    card.hidden = false;
                    visibleCount++;

                } else {

                    card.hidden = true;

                }

            }
        );


        if (resultsCount) {

            resultsCount.textContent =
                visibleCount +
                " Restaurants";

        }


        if (resultsTitle) {

            if (searchValue) {

                resultsTitle.textContent =
                    "Search Results";

            } else {

                resultsTitle.textContent =
                    "All Restaurants";

            }

        }


        if (emptyState) {

            emptyState.hidden =
                visibleCount !== 0;

        }

    }


    searchInput.addEventListener(
        "input",
        performSearch
    );


    performSearch();
}


/* ========================================
   VIEW RESTAURANT PAGE
======================================== */

function initializeViewRestaurantPage() {
    const restaurantPage =
        document.getElementById(
            "viewRestaurantPage"
        );


    if (
        !restaurantPage ||
        typeof restaurantData ===
            "undefined"
    ) {
        return;
    }


    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const restaurantId =
        urlParams.get(
            "restaurant"
        );


    const restaurant =
        restaurantData.find(
            function (item) {
                return (
                    item.id ===
                    restaurantId
                );
            }
        );


    if (!restaurant) {

        showInvalidRestaurant();
        return;

    }


    const restaurantName =
        document.getElementById(
            "viewRestaurantName"
        );


    const restaurantCuisine =
        document.getElementById(
            "viewRestaurantCuisine"
        );


    const restaurantLocation =
        document.getElementById(
            "viewRestaurantLocation"
        );


    const restaurantRating =
        document.getElementById(
            "viewRestaurantRating"
        );


    const restaurantImage =
        document.getElementById(
            "viewRestaurantImage"
        );


    const bookTableLink =
        document.getElementById(
            "viewRestaurantBookTable"
        );


    if (restaurantName) {

        restaurantName.textContent =
            restaurant.name;

    }


    if (restaurantCuisine) {

        restaurantCuisine.textContent =
            restaurant.cuisine;

    }


    if (restaurantLocation) {

        restaurantLocation.textContent =
            restaurant.location;

    }


    if (restaurantRating) {

        restaurantRating.textContent =
            restaurant.rating;

    }


    if (restaurantImage) {

        restaurantImage.src =
            "images/restaurants/" +
            restaurant.id +
            "-inside.png";


        restaurantImage.alt =
            restaurant.name +
            " Interior";

    }


    if (bookTableLink) {

        bookTableLink.href =
            "book-table.html?restaurant=" +
            restaurant.id;

    }


    document.title =
        restaurant.name +
        " | Yummy Tummy";


    initializeRestaurantMenu(
        restaurant
    );
}


/* ========================================
   INVALID RESTAURANT
======================================== */

function showInvalidRestaurant() {

    const restaurantContent =
        document.getElementById(
            "restaurantContent"
        );


    const invalidState =
        document.getElementById(
            "invalidRestaurantState"
        );


    const restaurantMenuSection =
        document.getElementById(
            "restaurantMenuSection"
        );


    if (restaurantContent) {

        restaurantContent.hidden =
            true;

    }


    if (restaurantMenuSection) {

        restaurantMenuSection.hidden =
            true;

    }


    if (invalidState) {

        invalidState.hidden =
            false;

    }


    document.title =
        "Restaurant Not Found | Yummy Tummy";
}


/* ========================================
   RESTAURANT MENU
======================================== */

function initializeRestaurantMenu(
    restaurant
) {

    const menuCards =
        document.querySelectorAll(
            ".restaurant-menu-card"
        );


    if (
        !menuCards.length ||
        typeof restaurantMenuData ===
            "undefined"
    ) {
        return;
    }


    const restaurantMenu =
        restaurantMenuData.find(
            function (item) {

                return (
                    item.restaurantId ===
                    restaurant.id
                );

            }
        );


    if (!restaurantMenu) {
        return;
    }


    menuCards.forEach(
        function (card, index) {

            const food =
                restaurantMenu.foods[index];


            if (!food) {

                card.hidden = true;
                return;

            }


            card.hidden = false;


            const image =
                card.querySelector(
                    ".restaurant-menu-image"
                );


            const name =
                card.querySelector(
                    ".restaurant-menu-name"
                );


            const category =
                card.querySelector(
                    ".restaurant-menu-category"
                );


            const price =
                card.querySelector(
                    ".restaurant-menu-price"
                );


            const rating =
                card.querySelector(
                    ".restaurant-menu-rating"
                );


            const viewLink =
                card.querySelector(
                    ".restaurant-menu-link"
                );


            if (image) {

                image.src =
                    food.image;

                image.alt =
                    food.name;

            }


            if (name) {

                name.textContent =
                    food.name;

            }


            if (category) {

                category.textContent =
                    food.category;

            }


            if (price) {

                price.textContent =
                    "₹" + food.price;

            }


            if (rating) {

                rating.textContent =
                    food.rating;

            }


            if (viewLink) {

                viewLink.href =
                    "food-details.html?food=" +
                    food.id +
                    "&restaurant=" +
                    restaurant.id;

            }

        }
    );
}


/* ========================================
   BOOK TABLE PAGE
======================================== */

function initializeBookTablePage() {

    const bookTablePage =
        document.getElementById(
            "bookTablePage"
        );


    if (
        !bookTablePage ||
        typeof restaurantData ===
            "undefined"
    ) {
        return;
    }


    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const restaurantId =
        urlParams.get(
            "restaurant"
        );


    const restaurant =
        restaurantData.find(
            function (item) {

                return (
                    item.id ===
                    restaurantId
                );

            }
        );


    if (!restaurant) {

        showInvalidBookingRestaurant();
        return;

    }


    const restaurantName =
        document.getElementById(
            "bookingRestaurantName"
        );


    const restaurantCuisine =
        document.getElementById(
            "bookingRestaurantCuisine"
        );


    const restaurantLocation =
        document.getElementById(
            "bookingRestaurantLocation"
        );


    const restaurantRating =
        document.getElementById(
            "bookingRestaurantRating"
        );


    const bookTableTitle =
        document.getElementById(
            "bookTableTitle"
        );


    if (restaurantName) {

        restaurantName.textContent =
            restaurant.name;

    }


    if (restaurantCuisine) {

        restaurantCuisine.textContent =
            restaurant.cuisine;

    }


    if (restaurantLocation) {

        restaurantLocation.textContent =
            restaurant.location;

    }


    if (restaurantRating) {

        restaurantRating.textContent =
            restaurant.rating;

    }


    if (bookTableTitle) {

        bookTableTitle.textContent =
            "Book a Table at " +
            restaurant.name;

    }


    document.title =
        "Book Table - " +
        restaurant.name +
        " | Yummy Tummy";


    initializeRestaurantTables(
        restaurant
    );


    initializeBookingAction(
        restaurant
    );
}


/* ========================================
   INVALID BOOKING RESTAURANT
======================================== */

function showInvalidBookingRestaurant() {

    const bookingContent =
        document.getElementById(
            "bookingContent"
        );


    const invalidState =
        document.getElementById(
            "invalidBookingState"
        );


    const tableSection =
        document.getElementById(
            "tableBookingSection"
        );


    if (bookingContent) {

        bookingContent.hidden =
            true;

    }


    if (tableSection) {

        tableSection.hidden =
            true;

    }


    if (invalidState) {

        invalidState.hidden =
            false;

    }


    document.title =
        "Restaurant Not Found | Yummy Tummy";
}


/* ========================================
   RESTAURANT TABLES
======================================== */

function initializeRestaurantTables(
    restaurant
) {

    const tableButtons =
        document.querySelectorAll(
            ".restaurant-table"
        );


    if (
        !tableButtons.length ||
        typeof restaurantTableData ===
            "undefined"
    ) {
        return;
    }


    const tables =
        restaurantTableData[
            restaurant.id
        ];


    if (!tables) {

        tableButtons.forEach(
            function (button) {

                button.hidden = true;

            }
        );

        return;
    }


    tableButtons.forEach(
        function (button, index) {

            const table =
                tables[index];


            button.classList.remove(
                "table-available",
                "table-booked",
                "table-selected"
            );


            button.disabled = false;

            button.hidden = true;

            button.removeAttribute(
                "data-selected"
            );


            if (!table) {
                return;
            }


            button.hidden = false;


            button.textContent =
                "Table " +
                table.number +
                " - " +
                table.seats +
                " Seats";


            button.setAttribute(
                "data-table-number",
                table.number
            );


            button.setAttribute(
                "data-table-status",
                table.status
            );


            if (table.position) {

                button.setAttribute(
                    "data-position",
                    table.position
                );

            }


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
}


/* ========================================
   TABLE SELECTION
======================================== */

function initializeTableSelection() {

    const tableButtons =
        document.querySelectorAll(
            ".restaurant-table"
        );


    let selectedTable = null;


    const selectedTableText =
        document.getElementById(
            "selectedTableText"
        );


    tableButtons.forEach(
        function (button) {

            if (
                button.disabled ||
                button.hidden
            ) {
                return;
            }


            button.addEventListener(
                "click",
                function () {

                    if (
                        button.disabled ||
                        button.hidden ||
                        button.getAttribute(
                            "data-table-status"
                        ) !== "available"
                    ) {
                        return;
                    }


                    if (
                        selectedTable &&
                        selectedTable !== button
                    ) {

                        selectedTable.classList.remove(
                            "table-selected"
                        );


                        selectedTable.classList.add(
                            "table-available"
                        );


                        selectedTable.setAttribute(
                            "data-selected",
                            "false"
                        );

                    }


                    if (
                        selectedTable ===
                        button
                    ) {

                        button.classList.remove(
                            "table-selected"
                        );


                        button.classList.add(
                            "table-available"
                        );


                        button.setAttribute(
                            "data-selected",
                            "false"
                        );


                        selectedTable =
                            null;


                        if (
                            selectedTableText
                        ) {

                            selectedTableText.textContent =
                                "No table selected.";

                        }


                        return;
                    }


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


                    selectedTable =
                        button;


                    if (
                        selectedTableText
                    ) {

                        selectedTableText.textContent =
                            "Selected Table: " +
                            button.getAttribute(
                                "data-table-number"
                            );

                    }

                }
            );

        }
    );
}


/* ========================================
   BOOKING ACTION
======================================== */

function initializeBookingAction(
    restaurant
) {

    const bookButton =
        document.getElementById(
            "bookSelectedTableButton"
        );


    const tableButtons =
        document.querySelectorAll(
            ".restaurant-table"
        );


    if (!bookButton) {
        return;
    }


    bookButton.addEventListener(
        "click",
        function () {

            const isLoggedIn =
                localStorage.getItem(
                    "yummyTummyLoggedIn"
                ) === "true";


            if (!isLoggedIn) {

                showLoginRequiredState();
                return;

            }


            let selectedTable =
                null;


            tableButtons.forEach(
                function (button) {

                    if (
                        button.getAttribute(
                            "data-selected"
                        ) === "true"
                    ) {

                        selectedTable =
                            button;

                    }

                }
            );


            if (!selectedTable) {

                alert(
                    "Please select an available table first."
                );

                return;
            }


            const tableNumber =
                selectedTable.getAttribute(
                    "data-table-number"
                );


            saveTableBooking(
                restaurant,
                tableNumber
            );

        }
    );
}


/* ========================================
   LOGIN REQUIRED
======================================== */

function showLoginRequiredState() {

    const bookingContent =
        document.getElementById(
            "bookingContent"
        );


    const loginRequiredState =
        document.getElementById(
            "loginRequiredState"
        );


    if (bookingContent) {

        bookingContent.hidden =
            true;

    }


    if (loginRequiredState) {

        loginRequiredState.hidden =
            false;

    }
}


/* ========================================
   SAVE TABLE BOOKING
======================================== */

function saveTableBooking(
    restaurant,
    tableNumber
) {

    const now =
        new Date();


    const bookingId =
        "YT-" +
        now.getFullYear() +
        String(
            now.getMonth() + 1
        ).padStart(2, "0") +
        String(
            now.getDate()
        ).padStart(2, "0") +
        "-" +
        String(
            now.getHours()
        ).padStart(2, "0") +
        String(
            now.getMinutes()
        ).padStart(2, "0") +
        String(
            now.getSeconds()
        ).padStart(2, "0");


    const bookingDate =
        now.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        );


    const bookingTime =
        now.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    const booking = {

        bookingId:
            bookingId,

        restaurantId:
            restaurant.id,

        restaurantName:
            restaurant.name,

        tableNumber:
            tableNumber,

        bookingDate:
            bookingDate,

        bookingTime:
            bookingTime,

        bookedAt:
            now.toISOString()

    };


    let existingBookings = [];


    try {

        existingBookings =
            JSON.parse(
                localStorage.getItem(
                    "yummyTummyTableBookings"
                )
            ) || [];

    } catch (error) {

        existingBookings = [];

    }


    if (
        !Array.isArray(
            existingBookings
        )
    ) {

        existingBookings = [];

    }


    existingBookings.push(
        booking
    );


    localStorage.setItem(
        "yummyTummyTableBookings",
        JSON.stringify(
            existingBookings
        )
    );


    showBookingSuccess(
        booking
    );
}


/* ========================================
   SHOW BOOKING SUCCESS
======================================== */

function showBookingSuccess(
    booking
) {

    const bookingContent =
        document.getElementById(
            "bookingContent"
        );


    const bookingSuccessState =
        document.getElementById(
            "bookingSuccessState"
        );


    const successBookingId =
        document.getElementById(
            "successBookingId"
        );


    const successRestaurantName =
        document.getElementById(
            "successRestaurantName"
        );


    const successTableNumber =
        document.getElementById(
            "successTableNumber"
        );


    const successBookingDate =
        document.getElementById(
            "successBookingDate"
        );


    const successBookingTime =
        document.getElementById(
            "successBookingTime"
        );


    if (successBookingId) {

        successBookingId.textContent =
            booking.bookingId;

    }


    if (successRestaurantName) {

        successRestaurantName.textContent =
            booking.restaurantName;

    }


    if (successTableNumber) {

        successTableNumber.textContent =
            "Table " +
            booking.tableNumber;

    }


    if (successBookingDate) {

        successBookingDate.textContent =
            booking.bookingDate;

    }


    if (successBookingTime) {

        successBookingTime.textContent =
            booking.bookingTime;

    }


    if (bookingContent) {

        bookingContent.hidden =
            true;

    }


    if (bookingSuccessState) {

        bookingSuccessState.hidden =
            false;

    }
}


/* ========================================
   HEADER AUTHENTICATION
======================================== */

function initializeHeaderAuthentication() {

    const loginLink =
        document.getElementById(
            "loginHeaderLink"
        );


    const registerLink =
        document.getElementById(
            "registerHeaderLink"
        );


    const profileLink =
        document.getElementById(
            "profileHeaderLink"
        );


    const isLoggedIn =
        localStorage.getItem(
            "yummyTummyLoggedIn"
        ) === "true";


    if (isLoggedIn) {

        if (loginLink) {

            loginLink.hidden = true;

        }


        if (registerLink) {

            registerLink.hidden = true;

        }


        if (profileLink) {

            profileLink.hidden = false;

        }

    } else {

        if (loginLink) {

            loginLink.hidden = false;

        }


        if (registerLink) {

            registerLink.hidden = false;

        }


        if (profileLink) {

            profileLink.hidden = true;

        }

    }
}


/* ========================================
   TABLE STATUS LABEL
======================================== */

function getTableStatusLabel(
    status
) {

    if (
        status === "available"
    ) {
        return "Available";
    }


    if (
        status === "booked"
    ) {
        return "Booked";
    }


    if (
        status === "selected"
    ) {
        return "Selected";
    }


    return "";
}