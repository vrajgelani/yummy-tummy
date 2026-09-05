const menuFoodGrid =
    document.querySelector("#menuFoodGrid");

const menuEmpty =
    document.querySelector("#menuEmpty");

const menuTitle =
    document.querySelector("#menuTitle");

const menuDescription =
    document.querySelector("#menuDescription");

const filterButtons =
    document.querySelectorAll(".menu-filter-button");


/* =================================
   MENU FOODS
================================= */

const menuFoods = [

    /* =================================
       GUJARATI
    ================================= */

    {
        id: "gujarati-dal-dhokli",
        name: "Gujarati Dal Dhokli",
        category: "gujarati",
        restaurant: "Gujarati Thali House",
        price: 189,
        description:
            "Traditional Gujarati dal dhokli prepared with authentic regional flavours.",
        image:
            "images/restaurants/gujarati-dal-dhokli.png"
    },

    {
        id: "kathiyawadi-undhiyu",
        name: "Kathiyawadi Undhiyu",
        category: "gujarati",
        restaurant: "Gujarati Thali House",
        price: 229,
        description:
            "Traditional Kathiyawadi undhiyu prepared with fresh vegetables and spices.",
        image:
            "images/restaurants/kathiyawadi-undhiyu.png"
    },

    {
        id: "sev-tameta-sabzi",
        name: "Sev Tameta Sabzi",
        category: "gujarati",
        restaurant: "Gujarati Thali House",
        price: 159,
        description:
            "Classic Gujarati tomato curry topped with crispy sev.",
        image:
            "images/restaurants/sev-tameta-sabzi.png"
    },

    {
        id: "mohanthal",
        name: "Mohanthal",
        category: "gujarati",
        restaurant: "Gujarati Thali House",
        price: 129,
        description:
            "Traditional Gujarati sweet prepared with gram flour and rich flavour.",
        image:
            "images/restaurants/mohanthal.png"
    },


    /* =================================
       CHINESE
    ================================= */

    {
        id: "chilli-paneer",
        name: "Chilli Paneer",
        category: "chinese",
        restaurant: "Chinese Wok House",
        price: 219,
        description:
            "Crispy paneer tossed with vegetables and flavourful Chinese sauce.",
        image:
            "images/restaurants/chilli-paneer.png"
    },

    {
        id: "schezwan-paneer-rice",
        name: "Schezwan Paneer Rice",
        category: "chinese",
        restaurant: "Chinese Wok House",
        price: 199,
        description:
            "Spicy Schezwan rice prepared with paneer and fresh vegetables.",
        image:
            "images/restaurants/schezwan-paneer-rice.png"
    },

    {
        id: "honey-chilli-potato",
        name: "Honey Chilli Potato",
        category: "chinese",
        restaurant: "Chinese Wok House",
        price: 179,
        description:
            "Crispy potato tossed in a sweet and spicy honey chilli sauce.",
        image:
            "images/restaurants/honey-chilli-potato.png"
    },

    {
        id: "hummus-veg-platter",
        name: "Hummus Veg Platter",
        category: "chinese",
        restaurant: "Chinese Wok House",
        price: 239,
        description:
            "Fresh vegetarian platter served with creamy hummus and accompaniments.",
        image:
            "images/restaurants/hummus-veg-platter.png"
    },


    /* =================================
       HEALTHY
    ================================= */

    {
        id: "mediterranean-veg-bowl",
        name: "Mediterranean Veg Bowl",
        category: "healthy",
        restaurant: "Green Bowl",
        price: 259,
        description:
            "Fresh Mediterranean-style vegetarian bowl with wholesome ingredients.",
        image:
            "images/restaurants/mediterranean-veg-bowl.png"
    },

    {
        id: "quinoa-rainbow-bowl",
        name: "Quinoa Rainbow Bowl",
        category: "healthy",
        restaurant: "Green Bowl",
        price: 279,
        description:
            "Colourful quinoa bowl packed with fresh vegetables and wholesome toppings.",
        image:
            "images/restaurants/quinoa-rainbow-bowl.png"
    },

    {
        id: "date-nut-energy-bites",
        name: "Date Nut Energy Bites",
        category: "healthy",
        restaurant: "Green Bowl",
        price: 149,
        description:
            "Wholesome energy bites prepared with dates and nutritious nuts.",
        image:
            "images/restaurants/date-nut-energy-bites.png"
    },

    {
        id: "hummus-veg-platter-healthy",
        name: "Hummus Veg Platter",
        category: "healthy",
        restaurant: "Green Bowl",
        price: 239,
        description:
            "Fresh vegetables served with creamy hummus.",
        image:
            "images/restaurants/hummus-veg-platter.png"
    },


    /* =================================
       SOUTH INDIAN
    ================================= */

    {
        id: "mysore-masala-dosa",
        name: "Mysore Masala Dosa",
        category: "south-indian",
        restaurant: "South Indian Express",
        price: 179,
        description:
            "Crispy Mysore masala dosa served with traditional accompaniments.",
        image:
            "images/restaurants/mysore-masala-dosa.png"
    },

    {
        id: "podi-idli",
        name: "Podi Idli",
        category: "south-indian",
        restaurant: "South Indian Express",
        price: 139,
        description:
            "Soft idlis tossed with aromatic South Indian podi.",
        image:
            "images/restaurants/podi-idli.png"
    },

    {
        id: "onion-uttapam",
        name: "Onion Uttapam",
        category: "south-indian",
        restaurant: "South Indian Express",
        price: 149,
        description:
            "Soft uttapam topped with fresh onions and traditional seasoning.",
        image:
            "images/restaurants/onion-uttapam.png"
    },

    {
        id: "filter-coffee-tiramisu",
        name: "Filter Coffee Tiramisu",
        category: "south-indian",
        restaurant: "South Indian Express",
        price: 169,
        description:
            "Creative dessert combining South Indian filter coffee flavours with tiramisu.",
        image:
            "images/restaurants/filter-coffee-tiramisu.png"
    },


    /* =================================
       BURGER
    ================================= */

    {
        id: "paneer-tikka-burger",
        name: "Paneer Tikka Burger",
        category: "burger",
        restaurant: "Burger Station",
        price: 199,
        description:
            "Delicious vegetarian burger filled with flavourful paneer tikka.",
        image:
            "images/restaurants/paneer-tikka-burger.png"
    },

    {
        id: "peri-peri-veg-burger",
        name: "Peri Peri Veg Burger",
        category: "burger",
        restaurant: "Burger Station",
        price: 189,
        description:
            "Vegetarian burger with a crispy patty and peri peri seasoning.",
        image:
            "images/restaurants/peri-peri-veg-burger.png"
    },

    {
        id: "mexican-bean-burger",
        name: "Mexican Bean Burger",
        category: "burger",
        restaurant: "Burger Station",
        price: 209,
        description:
            "Mexican-inspired vegetarian burger with a flavourful bean patty.",
        image:
            "images/restaurants/mexican-bean-burger.png"
    },

    {
        id: "chilli-paneer-burger",
        name: "Chilli Paneer Burger",
        category: "burger",
        restaurant: "Burger Station",
        price: 199,
        description:
            "Vegetarian burger with delicious chilli paneer filling.",
        image:
            "images/restaurants/chilli-paneer.png"
    },


    /* =================================
       PIZZA
    ================================= */

    {
        id: "farmhouse-paneer-pizza",
        name: "Farmhouse Paneer Pizza",
        category: "pizza",
        restaurant: "Pizza Corner",
        price: 299,
        description:
            "Fresh vegetarian pizza topped with paneer and colourful vegetables.",
        image:
            "images/restaurants/farmhouse-paneer-pizza.png"
    },

    {
        id: "pesto-corn-pizza",
        name: "Pesto Corn Pizza",
        category: "pizza",
        restaurant: "Pizza Corner",
        price: 279,
        description:
            "Premium pizza with creamy pesto sauce, sweet corn and cheese.",
        image:
            "images/restaurants/pesto-corn-pizza.png"
    },

    {
        id: "tandoori-veg-pizza",
        name: "Tandoori Veg Pizza",
        category: "pizza",
        restaurant: "Pizza Corner",
        price: 289,
        description:
            "Vegetarian pizza topped with delicious tandoori-style vegetables.",
        image:
            "images/restaurants/tandoori-veg-pizza.png"
    },

    {
        id: "nutella-hazelnut-pizza",
        name: "Nutella Hazelnut Pizza",
        category: "pizza",
        restaurant: "Pizza Corner",
        price: 249,
        description:
            "Sweet dessert pizza topped with hazelnut chocolate flavour.",
        image:
            "images/restaurants/nutella-hazelnut-pizza.png"
    },


    /* =================================
       DESSERT
    ================================= */

    {
        id: "salted-caramel-brownie-sundae",
        name: "Salted Caramel Brownie Sundae",
        category: "dessert",
        restaurant: "Burger Station",
        price: 179,
        description:
            "Rich brownie dessert served with creamy salted caramel flavour.",
        image:
            "images/restaurants/salted-caramel-brownie-sundae.png"
    },

    {
        id: "nutella-hazelnut-dessert-pizza",
        name: "Nutella Hazelnut Pizza",
        category: "dessert",
        restaurant: "Pizza Corner",
        price: 249,
        description:
            "Sweet pizza with rich chocolate and hazelnut flavour.",
        image:
            "images/restaurants/nutella-hazelnut-pizza.png"
    },


    /* =================================
       BEVERAGES
    ================================= */

    {
        id: "filter-coffee",
        name: "Filter Coffee",
        category: "beverages",
        restaurant: "South Indian Express",
        price: 99,
        description:
            "Freshly prepared South Indian filter coffee.",
        image:
            "images/restaurants/filter-coffee-tiramisu.png"
    }

];


/* =================================
   CATEGORY NAMES
================================= */

const categoryNames = {

    all:
        "Explore Our Menu",

    gujarati:
        "Gujarati Food",

    chinese:
        "Chinese Food",

    healthy:
        "Healthy Food",

    "south-indian":
        "South Indian Food",

    burger:
        "Burger",

    pizza:
        "Pizza",

    dessert:
        "Desserts",

    beverages:
        "Beverages"

};


/* =================================
   CATEGORY DESCRIPTIONS
================================= */

const categoryDescriptions = {

    all:
        "Discover delicious vegetarian food from different categories.",

    gujarati:
        "Explore delicious Gujarati vegetarian favourites.",

    chinese:
        "Discover fresh and flavourful vegetarian Chinese dishes.",

    healthy:
        "Choose wholesome and refreshing vegetarian meals.",

    "south-indian":
        "Enjoy delicious South Indian vegetarian favourites.",

    burger:
        "Explore a variety of delicious vegetarian burgers.",

    pizza:
        "Discover premium vegetarian pizzas with delicious toppings.",

    dessert:
        "Enjoy delicious desserts and sweet treats.",

    beverages:
        "Refresh yourself with freshly prepared beverages."

};


/* =================================
   GET SELECTED CATEGORY
================================= */

function getSelectedCategory() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return (
        params.get("category") ||
        "all"
    );

}


/* =================================
   FILTER FOODS
================================= */

function filterFoods(category) {

    if (category === "all") {

        return menuFoods;

    }

    return menuFoods.filter(
        (food) =>
            food.category === category
    );

}


/* =================================
   UPDATE PAGE HEADING
================================= */

function updatePageHeading(category) {

    if (!menuTitle || !menuDescription) {
        return;
    }

    menuTitle.textContent =
        categoryNames[category] ||
        categoryNames.all;

    menuDescription.textContent =
        categoryDescriptions[category] ||
        categoryDescriptions.all;

}


/* =================================
   UPDATE ACTIVE BUTTON
================================= */

function updateActiveButton(category) {

    filterButtons.forEach(
        (button) => {

            button.classList.toggle(
                "active",
                button.dataset.category ===
                    category
            );

        }
    );

}


/* =================================
   DISPLAY FOODS
================================= */

function displayFoods(category) {

    if (!menuFoodGrid || !menuEmpty) {
        return;
    }

    const foods =
        filterFoods(category);

    menuFoodGrid.replaceChildren();

    if (foods.length === 0) {

        menuEmpty.hidden = false;

        return;

    }

    menuEmpty.hidden = true;


    foods.forEach(
        (food) => {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "menu-food-card";


            const image =
                document.createElement(
                    "img"
                );

            image.className =
                "menu-food-image";

            image.src =
                food.image;

            image.alt =
                food.name;

            image.loading =
                "lazy";


            image.addEventListener(
                "error",
                () => {

                    image.hidden = true;

                }
            );


            const content =
                document.createElement(
                    "div"
                );

            content.className =
                "menu-food-content";


            const category =
                document.createElement(
                    "p"
                );

            category.className =
                "menu-food-category";

            category.textContent =
                food.category;


            const name =
                document.createElement(
                    "h2"
                );

            name.className =
                "menu-food-name";

            name.textContent =
                food.name;


            const description =
                document.createElement(
                    "p"
                );

            description.className =
                "menu-food-description";

            description.textContent =
                food.description;


            const footer =
                document.createElement(
                    "div"
                );

            footer.className =
                "menu-food-footer";


            const price =
                document.createElement(
                    "span"
                );

            price.className =
                "menu-food-price";

            price.textContent =
                `₹${food.price}`;


            const restaurant =
                document.createElement(
                    "span"
                );

            restaurant.className =
                "menu-food-restaurant";

            restaurant.textContent =
                food.restaurant;


            footer.append(
                price,
                restaurant
            );


            content.append(
                category,
                name,
                description,
                footer
            );


            card.append(
                image,
                content
            );


            menuFoodGrid.appendChild(
                card
            );

        }
    );

}


/* =================================
   SET CATEGORY
================================= */

function setCategory(category) {

    const validCategory =
        categoryNames[category]
            ? category
            : "all";


    updatePageHeading(
        validCategory
    );


    updateActiveButton(
        validCategory
    );


    displayFoods(
        validCategory
    );

}


/* =================================
   CATEGORY BUTTON EVENTS
================================= */

filterButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const category =
                    button.dataset.category;

                const url =
                    new URL(
                        window.location.href
                    );


                if (category === "all") {

                    url.searchParams.delete(
                        "category"
                    );

                } else {

                    url.searchParams.set(
                        "category",
                        category
                    );

                }


                window.history.pushState(
                    {},
                    "",
                    url
                );


                setCategory(
                    category
                );

            }
        );

    }
);


/* =================================
   BROWSER BACK / FORWARD
================================= */

window.addEventListener(
    "popstate",
    () => {

        setCategory(
            getSelectedCategory()
        );

    }
);


/* =================================
   INITIAL LOAD
================================= */

setCategory(
    getSelectedCategory()
);