"use strict";


document.addEventListener("DOMContentLoaded", () => {
    initializeMenuPage();
});



/* =========================================
   MENU FOOD DATA
   ========================================= */

const menuFoods = [

    /* =========================
       STARTERS
       ========================= */

    {
        id: "crispy-veg-spring-roll",
        name: "Crispy Veg Spring Roll",
        category: "Starters",
        price: 169,
        rating: 4.5,
        image: "assets/images/home-menu/crispy-veg-spring-roll.png",
        description:
            "Crispy golden spring rolls filled with fresh vegetables and served with a flavorful dip."
    },

    {
        id: "paneer-pakora",
        name: "Paneer Pakora",
        category: "Starters",
        price: 189,
        rating: 4.4,
        image: "assets/images/home-menu/paneer-pakora.png",
        description:
            "Crispy gram-flour coated paneer pieces prepared with aromatic Indian spices."
    },

    {
        id: "cheese-corn-balls",
        name: "Cheese Corn Balls",
        category: "Starters",
        price: 199,
        rating: 4.6,
        image: "assets/images/home-menu/cheese-corn-balls.png",
        description:
            "Golden crispy cheese and sweet corn balls with a delicious creamy center."
    },

    {
        id: "hara-bhara-kebab",
        name: "Hara Bhara Kebab",
        category: "Starters",
        price: 179,
        rating: 4.5,
        image: "assets/images/home-menu/hara-bhara-kebab.png",
        description:
            "Healthy and flavorful green vegetable kebabs made with spinach and aromatic spices."
    },


    /* =========================
       PIZZA
       ========================= */

    {
        id: "tandoori-paneer-pizza",
        name: "Tandoori Paneer Pizza",
        category: "Pizza",
        price: 299,
        rating: 4.6,
        image: "assets/images/home-menu/tandoori-paneer-pizza.png",
        description:
            "A delicious pizza topped with smoky paneer, vegetables, mozzarella and herbs."
    },

    {
        id: "garden-fresh-pizza",
        name: "Garden Fresh Pizza",
        category: "Pizza",
        price: 289,
        rating: 4.5,
        image: "assets/images/home-menu/garden-fresh-pizza.png",
        description:
            "Fresh vegetables, mozzarella and herbs on a golden crispy pizza base."
    },

    {
        id: "cheese-burst-veg-pizza",
        name: "Cheese Burst Veg Pizza",
        category: "Pizza",
        price: 319,
        rating: 4.7,
        image: "assets/images/home-menu/cheese-burst-veg-pizza.png",
        description:
            "A rich vegetarian pizza loaded with melted cheese and colorful vegetables."
    },

    {
        id: "roasted-corn-pizza",
        name: "Roasted Corn Pizza",
        category: "Pizza",
        price: 279,
        rating: 4.4,
        image: "assets/images/home-menu/roasted-corn-pizza.png",
        description:
            "Roasted sweet corn, vegetables, mozzarella and herbs on a delicious pizza base."
    },


    /* =========================
       BURGERS
       ========================= */

    {
        id: "crispy-veg-burger",
        name: "Crispy Veg Burger",
        category: "Burgers",
        price: 179,
        rating: 4.5,
        image: "assets/images/home-menu/crispy-veg-burger.png",
        description:
            "Crunchy vegetarian patty with fresh vegetables, creamy sauce and a toasted bun."
    },

    {
        id: "paneer-peri-peri-burger",
        name: "Paneer Peri Peri Burger",
        category: "Burgers",
        price: 209,
        rating: 4.6,
        image: "assets/images/home-menu/paneer-peri-peri-burger.png",
        description:
            "Grilled paneer with peri peri seasoning, fresh vegetables and creamy sauce."
    },

    {
        id: "mexican-bean-burger",
        name: "Mexican Bean Burger",
        category: "Burgers",
        price: 199,
        rating: 4.4,
        image: "assets/images/home-menu/mexican-bean-burger.png",
        description:
            "A flavorful Mexican-inspired vegetarian bean patty with fresh toppings."
    },

    {
        id: "double-cheese-veg-burger",
        name: "Double Cheese Veg Burger",
        category: "Burgers",
        price: 229,
        rating: 4.7,
        image: "assets/images/home-menu/double-cheese-veg-burger.png",
        description:
            "A premium vegetarian burger with crispy patty and double melted cheese."
    },


    /* =========================
       SANDWICHES
       ========================= */

    {
        id: "grilled-veg-sandwich",
        name: "Grilled Veg Sandwich",
        category: "Sandwiches",
        price: 159,
        rating: 4.5,
        image: "assets/images/home-menu/grilled-veg-sandwich.png",
        description:
            "Golden grilled bread filled with fresh vegetables, cheese and flavorful sauce."
    },

    {
        id: "cheese-corn-sandwich",
        name: "Cheese Corn Sandwich",
        category: "Sandwiches",
        price: 179,
        rating: 4.6,
        image: "assets/images/home-menu/cheese-corn-sandwich.png",
        description:
            "Creamy cheese and sweet corn filling inside freshly grilled bread."
    },

    {
        id: "paneer-masala-sandwich",
        name: "Paneer Masala Sandwich",
        category: "Sandwiches",
        price: 189,
        rating: 4.5,
        image: "assets/images/home-menu/paneer-masala-sandwich.png",
        description:
            "Spiced paneer filling combined with fresh vegetables and grilled bread."
    },

    {
        id: "garden-club-sandwich",
        name: "Garden Club Sandwich",
        category: "Sandwiches",
        price: 199,
        rating: 4.4,
        image: "assets/images/home-menu/garden-club-sandwich.png",
        description:
            "A fresh multi-layer vegetarian sandwich packed with colorful vegetables."
    },


    /* =========================
       PASTA
       ========================= */

    {
        id: "arrabbiata-penne",
        name: "Arrabbiata Penne",
        category: "Pasta",
        price: 239,
        rating: 4.5,
        image: "assets/images/home-menu/arrabbiata-penne.png",
        description:
            "Penne pasta tossed in a rich tomato and chili sauce with fresh herbs."
    },

    {
        id: "pesto-vegetable-pasta",
        name: "Pesto Vegetable Pasta",
        category: "Pasta",
        price: 259,
        rating: 4.6,
        image: "assets/images/home-menu/pesto-vegetable-pasta.png",
        description:
            "Creamy pesto pasta with colorful vegetables, parmesan and fresh basil."
    },

    {
        id: "pink-sauce-penne",
        name: "Pink Sauce Penne",
        category: "Pasta",
        price: 249,
        rating: 4.5,
        image: "assets/images/home-menu/pink-sauce-penne.png",
        description:
            "Penne pasta covered in a rich creamy tomato pink sauce."
    },

    {
        id: "spinach-corn-pasta",
        name: "Spinach Corn Pasta",
        category: "Pasta",
        price: 239,
        rating: 4.4,
        image: "assets/images/home-menu/spinach-corn-pasta.png",
        description:
            "Creamy pasta with spinach, sweet corn, parmesan and fresh herbs."
    },


    /* =========================
       SOUTH INDIAN
       ========================= */

    {
        id: "masala-dosa",
        name: "Masala Dosa",
        category: "South Indian",
        price: 149,
        rating: 4.7,
        image: "assets/images/home-menu/masala-dosa.png",
        description:
            "Crispy golden dosa filled with flavorful potato masala, served with chutney and sambar."
    },

    {
        id: "mysore-masala-dosa",
        name: "Mysore Masala Dosa",
        category: "South Indian",
        price: 169,
        rating: 4.6,
        image: "assets/images/home-menu/mysore-masala-dosa.png",
        description:
            "Crispy Mysore dosa layered with spicy chutney and delicious potato masala."
    },

    {
        id: "idli-sambar",
        name: "Idli Sambar",
        category: "South Indian",
        price: 119,
        rating: 4.5,
        image: "assets/images/home-menu/idli-sambar.png",
        description:
            "Soft steamed idlis served with flavorful sambar and coconut chutney."
    },

    {
        id: "medu-vada",
        name: "Medu Vada",
        category: "South Indian",
        price: 129,
        rating: 4.4,
        image: "assets/images/home-menu/medu-vada.png",
        description:
            "Crispy South Indian medu vada served with sambar and coconut chutney."
    },


    /* =========================
       GUJARATI
       ========================= */

    {
        id: "sev-tameta",
        name: "Sev Tameta",
        category: "Gujarati",
        price: 159,
        rating: 4.5,
        image: "assets/images/home-menu/sev-tameta.png",
        description:
            "Gujarati tomato curry topped with crispy sev and fresh coriander."
    },

    {
        id: "undhiyu",
        name: "Undhiyu",
        category: "Gujarati",
        price: 229,
        rating: 4.7,
        image: "assets/images/home-menu/undhiyu.png",
        description:
            "Traditional Gujarati mixed vegetable preparation with aromatic spices."
    },

    {
        id: "dal-dhokli",
        name: "Dal Dhokli",
        category: "Gujarati",
        price: 179,
        rating: 4.6,
        image: "assets/images/home-menu/dal-dhokli.png",
        description:
            "Soft wheat dhokli simmered in a flavorful Gujarati lentil curry."
    },

    {
        id: "kathiyawadi-khichdi",
        name: "Kathiyawadi Khichdi",
        category: "Gujarati",
        price: 169,
        rating: 4.5,
        image: "assets/images/home-menu/kathiyawadi-khichdi.png",
        description:
            "Traditional rice and lentil khichdi prepared in Kathiyawadi style."
    },


    /* =========================
       CHINESE
       ========================= */

    {
        id: "veg-hakka-noodles",
        name: "Veg Hakka Noodles",
        category: "Chinese",
        price: 199,
        rating: 4.6,
        image: "assets/images/home-menu/veg-hakka-noodles.png",
        description:
            "Stir-fried noodles loaded with fresh vegetables and Indo-Chinese flavors."
    },

    {
        id: "schezwan-fried-rice",
        name: "Schezwan Fried Rice",
        category: "Chinese",
        price: 209,
        rating: 4.5,
        image: "assets/images/home-menu/schezwan-fried-rice.png",
        description:
            "Spicy vegetarian fried rice tossed with vegetables and Schezwan sauce."
    },

    {
        id: "chilli-paneer",
        name: "Chilli Paneer",
        category: "Chinese",
        price: 219,
        rating: 4.7,
        image: "assets/images/home-menu/chilli-paneer.png",
        description:
            "Crispy paneer tossed with vegetables in a flavorful Indo-Chinese sauce."
    },

    {
        id: "veg-manchurian",
        name: "Veg Manchurian",
        category: "Chinese",
        price: 189,
        rating: 4.5,
        image: "assets/images/home-menu/veg-manchurian.png",
        description:
            "Crispy vegetable Manchurian balls coated in a rich Indo-Chinese sauce."
    },


    /* =========================
       DESSERTS
       ========================= */

    {
        id: "gulab-jamun",
        name: "Gulab Jamun",
        category: "Desserts",
        price: 99,
        rating: 4.6,
        image: "assets/images/home-menu/gulab-jamun.png",
        description:
            "Soft golden gulab jamun soaked in fragrant saffron sugar syrup."
    },

    {
        id: "rasmalai",
        name: "Rasmalai",
        category: "Desserts",
        price: 139,
        rating: 4.7,
        image: "assets/images/home-menu/rasmalai.png",
        description:
            "Soft cottage cheese dumplings soaked in creamy saffron milk."
    },

    {
        id: "brownie-sundae",
        name: "Brownie Sundae",
        category: "Desserts",
        price: 199,
        rating: 4.8,
        image: "assets/images/home-menu/brownie-sundae.png",
        description:
            "Warm fudgy brownie served with creamy vanilla ice cream and chocolate sauce."
    },

    {
        id: "kesar-pista-kulfi",
        name: "Kesar Pista Kulfi",
        category: "Desserts",
        price: 129,
        rating: 4.6,
        image: "assets/images/home-menu/kesar-pista-kulfi.png",
        description:
            "Creamy traditional kulfi flavored with saffron and pistachios."
    },


    /* =========================
       BROWNIES
       ========================= */

    {
        id: "walnut-brownie",
        name: "Walnut Brownie",
        category: "Brownies",
        price: 149,
        rating: 4.7,
        image: "assets/images/home-menu/walnut-brownie.png",
        description:
            "Rich fudgy chocolate brownie packed with roasted walnut pieces."
    },

    {
        id: "triple-chocolate-brownie",
        name: "Triple Chocolate Brownie",
        category: "Brownies",
        price: 179,
        rating: 4.8,
        image: "assets/images/home-menu/triple-chocolate-brownie.png",
        description:
            "Decadent brownie made with dark, milk and white chocolate."
    },

    {
        id: "salted-caramel-brownie",
        name: "Salted Caramel Brownie",
        category: "Brownies",
        price: 189,
        rating: 4.7,
        image: "assets/images/home-menu/salted-caramel-brownie.png",
        description:
            "Fudgy chocolate brownie finished with glossy salted caramel."
    },

    {
        id: "dark-chocolate-brownie",
        name: "Dark Chocolate Brownie",
        category: "Brownies",
        price: 159,
        rating: 4.6,
        image: "assets/images/home-menu/dark-chocolate-brownie.png",
        description:
            "Rich dark chocolate brownie with a deep fudgy center."
    }

];



/* =========================================
   INITIALIZE MENU
   ========================================= */

function initializeMenuPage() {

    const urlParams =
        new URLSearchParams(window.location.search);


    const selectedCategory =
        urlParams.get("category");


    const category =
        selectedCategory
            ? decodeURIComponent(selectedCategory)
            : "";


    setupCategoryTitle(category);

    setupCategoryLinks(category);

    displayFoods(category);

    setupSearch(category);

}



/* =========================================
   CATEGORY TITLE
   ========================================= */

function setupCategoryTitle(category) {

    const titleElement =
        document.getElementById("menu-page-title");


    const categoryTitleElement =
        document.getElementById("menu-category-title");


    const descriptionElement =
        document.getElementById("menu-page-description");


    if (!category) {

        titleElement.textContent =
            "Explore Our Menu";


        categoryTitleElement.textContent =
            "All Foods";


        descriptionElement.textContent =
            "Discover delicious vegetarian food from different categories.";


        return;
    }


    titleElement.textContent =
        category;


    categoryTitleElement.textContent =
        category;


    descriptionElement.textContent =
        "Explore delicious vegetarian food from the " +
        category +
        " category.";

}



/* =========================================
   CATEGORY LINKS
   ========================================= */

function setupCategoryLinks(activeCategory) {

    const categoryLinks =
        document.querySelectorAll(
            ".menu-category-link"
        );


    categoryLinks.forEach((link) => {

        const linkUrl =
            new URL(
                link.href,
                window.location.href
            );


        const category =
            linkUrl.searchParams.get(
                "category"
            );


        /*
         * All Foods
         */

        if (
            !activeCategory &&
            !category
        ) {

            link.classList.add(
                "active"
            );

            return;
        }


        /*
         * Selected Category
         */

        if (
            category === activeCategory
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}



/* =========================================
   DISPLAY FOODS
   ========================================= */

function displayFoods(category) {

    const foodGrid =
        document.getElementById(
            "menu-food-grid"
        );


    const emptyState =
        document.getElementById(
            "menu-empty-state"
        );


    const countElement =
        document.getElementById(
            "menu-food-count"
        );


    const templateCard =
        foodGrid.querySelector(
            ".menu-food-card"
        );


    const filteredFoods =
        category
            ? menuFoods.filter(
                (food) =>
                    food.category === category
            )
            : menuFoods;


    foodGrid.replaceChildren();


    if (
        filteredFoods.length === 0
    ) {

        emptyState.hidden = false;

        countElement.textContent =
            "0 Foods";

        return;
    }


    emptyState.hidden = true;


    countElement.textContent =
        filteredFoods.length +
        " Foods";


    filteredFoods.forEach((food) => {

        const card =
            templateCard.cloneNode(
                true
            );


        updateFoodCard(
            card,
            food
        );


        foodGrid.appendChild(
            card
        );

    });

}



/* =========================================
   UPDATE FOOD CARD
   ========================================= */

function updateFoodCard(
    card,
    food
) {

    const link =
        card.querySelector(
            "[data-food-link]"
        );


    const image =
        card.querySelector(
            "[data-food-image]"
        );


    const categoryElement =
        card.querySelector(
            "[data-food-category]"
        );


    const nameElement =
        card.querySelector(
            "[data-food-name]"
        );


    const descriptionElement =
        card.querySelector(
            "[data-food-description]"
        );


    const ratingElement =
        card.querySelector(
            "[data-food-rating]"
        );


    const priceElement =
        card.querySelector(
            "[data-food-price]"
        );


    link.href =
        "food.html?id=" +
        encodeURIComponent(
            food.id
        );


    image.src =
        food.image;


    image.alt =
        food.name;


    categoryElement.textContent =
        food.category;


    nameElement.textContent =
        food.name;


    descriptionElement.textContent =
        food.description;


    ratingElement.textContent =
        "★ " +
        food.rating;


    priceElement.textContent =
        "₹" +
        food.price;

}



/* =========================================
   SEARCH
   ========================================= */

function setupSearch(category) {

    const searchInput =
        document.getElementById(
            "menu-search"
        );


    searchInput.addEventListener(
        "input",
        () => {

            const searchText =
                searchInput.value
                    .trim()
                    .toLowerCase();


            const categoryFoods =
                category
                    ? menuFoods.filter(
                        (food) =>
                            food.category ===
                            category
                    )
                    : menuFoods;


            const searchedFoods =
                categoryFoods.filter(
                    (food) => {

                        return (
                            food.name
                                .toLowerCase()
                                .includes(
                                    searchText
                                ) ||

                            food.category
                                .toLowerCase()
                                .includes(
                                    searchText
                                )
                        );

                    }
                );


            updateDisplayedFoods(
                searchedFoods
            );

        }
    );

}



/* =========================================
   UPDATE SEARCH RESULTS
   ========================================= */

function updateDisplayedFoods(
    foods
) {

    const foodGrid =
        document.getElementById(
            "menu-food-grid"
        );


    const emptyState =
        document.getElementById(
            "menu-empty-state"
        );


    const countElement =
        document.getElementById(
            "menu-food-count"
        );


    const originalCard =
        document.querySelector(
            ".menu-food-card"
        );


    foodGrid.replaceChildren();


    if (
        foods.length === 0
    ) {

        emptyState.hidden = false;

        countElement.textContent =
            "0 Foods";

        return;
    }


    emptyState.hidden = true;


    countElement.textContent =
        foods.length +
        " Foods";


    foods.forEach((food) => {

        const card =
            originalCard.cloneNode(
                true
            );


        updateFoodCard(
            card,
            food
        );


        foodGrid.appendChild(
            card
        );

    });

}