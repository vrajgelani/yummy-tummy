/* =================================
   RESTAURANT DETAILS
================================= */

const restaurantDetails =
    document.querySelector("#restaurantDetails");

const restaurantNotFound =
    document.querySelector("#restaurantNotFound");

const restaurantImage =
    document.querySelector("#restaurantImage");

const restaurantInteriorImage =
    document.querySelector("#restaurantInteriorImage");

const restaurantName =
    document.querySelector("#restaurantName");

const restaurantCategory =
    document.querySelector("#restaurantCategory");

const restaurantDescription =
    document.querySelector("#restaurantDescription");

const restaurantCuisine =
    document.querySelector("#restaurantCuisine");


/* =================================
   RESTAURANT DATA
================================= */

const restaurants = {

    "gujarati-thali-house": {
        name: "Gujarati Thali House",
        category: "Gujarati",
        cuisine: "Gujarati Vegetarian",
        description:
            "Traditional Gujarati vegetarian dining with authentic regional flavours and a warm dining experience.",
        outsideImage:
            "images/restaurants/outside/gujarati-thali-house.png",
        insideImage:
            "images/restaurants/inside/gujarati-thali-house.png"
    },

    "chinese-wok-house": {
        name: "Chinese Wok House",
        category: "Chinese",
        cuisine: "Vegetarian Chinese",
        description:
            "Delicious vegetarian Chinese favourites prepared with fresh ingredients and modern flavours.",
        outsideImage:
            "images/restaurants/outside/chinese-wok-house.png",
        insideImage:
            "images/restaurants/inside/chinese-wok-house.png"
    },

    "green-bowl": {
        name: "Green Bowl",
        category: "Healthy",
        cuisine: "Healthy Vegetarian",
        description:
            "Fresh salads, wholesome bowls and healthy vegetarian meals prepared with fresh ingredients.",
        outsideImage:
            "images/restaurants/outside/green-bowl.png",
        insideImage:
            "images/restaurants/inside/green-bowl.png"
    },

    "south-indian-express": {
        name: "South Indian Express",
        category: "South Indian",
        cuisine: "South Indian Vegetarian",
        description:
            "Classic South Indian vegetarian favourites prepared fresh with traditional flavours.",
        outsideImage:
            "images/restaurants/outside/south-indian-express.png",
        insideImage:
            "images/restaurants/inside/south-indian-express.png"
    },

    "burger-station": {
        name: "Burger Station",
        category: "Burger",
        cuisine: "Vegetarian Burgers",
        description:
            "Gourmet vegetarian burgers prepared with delicious ingredients and modern flavours.",
        outsideImage:
            "images/restaurants/outside/burger-station.png",
        insideImage:
            "images/restaurants/inside/burger-station.png"
    },

    "pizza-corner": {
        name: "Pizza Corner",
        category: "Pizza",
        cuisine: "Vegetarian Pizza",
        description:
            "Freshly prepared vegetarian pizzas with delicious toppings and premium ingredients.",
        outsideImage:
            "images/restaurants/outside/pizza-corner.png",
        insideImage:
            "images/restaurants/inside/pizza-corner.png"
    }

};


/* =================================
   GET RESTAURANT ID
================================= */

function getRestaurantId() {

    const params =
        new URLSearchParams(window.location.search);

    return params.get("restaurant");

}


/* =================================
   SHOW RESTAURANT
================================= */

function showRestaurant(restaurant) {

    if (restaurantDetails) {
        restaurantDetails.hidden = false;
    }

    if (restaurantNotFound) {
        restaurantNotFound.hidden = true;
    }


    if (restaurantName) {
        restaurantName.textContent =
            restaurant.name;
    }


    if (restaurantCategory) {
        restaurantCategory.textContent =
            restaurant.category;
    }


    if (restaurantDescription) {
        restaurantDescription.textContent =
            restaurant.description;
    }


    if (restaurantCuisine) {
        restaurantCuisine.textContent =
            restaurant.cuisine;
    }


    if (restaurantImage) {

        restaurantImage.src =
            restaurant.outsideImage;

        restaurantImage.alt =
            `${restaurant.name} exterior`;

    }


    if (restaurantInteriorImage) {

        restaurantInteriorImage.src =
            restaurant.insideImage;

        restaurantInteriorImage.alt =
            `${restaurant.name} interior`;

    }


    document.title =
        `${restaurant.name} | Yummy Tummy`;

}


/* =================================
   SHOW NOT FOUND
================================= */

function showNotFound() {

    if (restaurantDetails) {
        restaurantDetails.hidden = true;
    }

    if (restaurantNotFound) {
        restaurantNotFound.hidden = false;
    }

}


/* =================================
   RESTAURANT FOOD ELEMENTS
================================= */

const restaurantFoodGrid =
    document.querySelector("#restaurantFoodGrid");

const restaurantFoodEmpty =
    document.querySelector("#restaurantFoodEmpty");


/* =================================
   DISPLAY RESTAURANT FOODS
================================= */

function displayRestaurantFoods(restaurantId) {

    /*
       restaurant-foods.js must be loaded
       before this file.
    */

    if (!restaurantFoodGrid) {
        return;
    }


    restaurantFoodGrid.replaceChildren();


    if (
        typeof restaurantFoods === "undefined" ||
        !Array.isArray(restaurantFoods)
    ) {

        if (restaurantFoodEmpty) {
            restaurantFoodEmpty.hidden = false;
        }

        return;
    }


    const foods =
        restaurantFoods.filter(
            (food) =>
                food.restaurantId === restaurantId
        );


    if (foods.length === 0) {

        if (restaurantFoodEmpty) {
            restaurantFoodEmpty.hidden = false;
        }

        return;
    }


    if (restaurantFoodEmpty) {
        restaurantFoodEmpty.hidden = true;
    }


    foods.forEach((food) => {

        const card =
            document.createElement("article");

        card.className =
            "restaurant-food-card";


        const imageWrapper =
            document.createElement("div");

        imageWrapper.className =
            "restaurant-food-image-wrapper";


        const image =
            document.createElement("img");

        image.className =
            "restaurant-food-image";

        image.src =
            food.image;

        image.alt =
            food.name;

        image.loading =
            "lazy";


        imageWrapper.appendChild(image);


        const content =
            document.createElement("div");

        content.className =
            "restaurant-food-content";


        const category =
            document.createElement("p");

        category.className =
            "restaurant-food-category";

        category.textContent =
            food.category;


        const name =
            document.createElement("h3");

        name.className =
            "restaurant-food-name";

        name.textContent =
            food.name;


        const footer =
            document.createElement("div");

        footer.className =
            "restaurant-food-footer";


        const price =
            document.createElement("span");

        price.className =
            "restaurant-food-price";

        price.textContent =
            `₹${food.price}`;


        const button =
            document.createElement("a");

        button.className =
            "restaurant-food-button";

        button.href =
            `food-details.html?food=${encodeURIComponent(food.id)}`;

        button.textContent =
            "View Food";


        footer.append(
            price,
            button
        );


        content.append(
            category,
            name,
            footer
        );


        card.append(
            imageWrapper,
            content
        );


        restaurantFoodGrid.appendChild(card);

    });

}


/* =================================
   INITIALIZE PAGE
================================= */

function initializeRestaurantDetails() {

    const restaurantId =
        getRestaurantId();


    if (!restaurantId) {

        showNotFound();

        return;
    }


    const restaurant =
        restaurants[restaurantId];


    if (!restaurant) {

        showNotFound();

        return;
    }


    showRestaurant(restaurant);

    displayRestaurantFoods(restaurantId);

}


/* =================================
   START
================================= */

initializeRestaurantDetails();