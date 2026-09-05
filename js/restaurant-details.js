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


function getRestaurantId() {

    const params =
        new URLSearchParams(window.location.search);

    return params.get("restaurant");

}


function showRestaurant(restaurant) {

    restaurantDetails.hidden = false;
    restaurantNotFound.hidden = true;


    restaurantName.textContent =
        restaurant.name;

    restaurantCategory.textContent =
        restaurant.category;

    restaurantDescription.textContent =
        restaurant.description;

    restaurantCuisine.textContent =
        restaurant.cuisine;


    restaurantImage.src =
        restaurant.outsideImage;

    restaurantImage.alt =
        `${restaurant.name} exterior`;


    restaurantInteriorImage.src =
        restaurant.insideImage;

    restaurantInteriorImage.alt =
        `${restaurant.name} interior`;


    document.title =
        `${restaurant.name} | Yummy Tummy`;

}


function showNotFound() {

    restaurantDetails.hidden = true;
    restaurantNotFound.hidden = false;

}


function initializeRestaurantDetails() {

    const restaurantId =
        getRestaurantId();

    const restaurant =
        restaurants[restaurantId];


    if (!restaurant) {

        showNotFound();

        return;
    }


    showRestaurant(restaurant);

}


initializeRestaurantDetails();