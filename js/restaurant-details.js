const restaurantName =
    document.querySelector("#restaurantName");

const restaurantCategory =
    document.querySelector("#restaurantCategory");

const restaurantDescription =
    document.querySelector("#restaurantDescription");

const restaurantImage =
    document.querySelector("#restaurantImage");

const restaurantInfo =
    document.querySelector("#restaurantInfo");

const restaurantInfoName =
    document.querySelector("#restaurantInfoName");

const restaurantInfoCategory =
    document.querySelector("#restaurantInfoCategory");

const restaurantDetailsEmpty =
    document.querySelector("#restaurantDetailsEmpty");


const restaurantDetails = {

    "Gujarati Thali House": {
        category: "Gujarati",
        description:
            "Traditional Gujarati vegetarian dining with authentic flavours.",
        image:
            "images/restaurants/inside/gujarati-thali-house.png"
    },

    "Chinese Wok House": {
        category: "Chinese",
        description:
            "Delicious vegetarian Chinese favourites with fresh ingredients.",
        image:
            "images/restaurants/inside/chinese-wok-house.png"
    },

    "Green Bowl": {
        category: "Healthy",
        description:
            "Fresh salads, healthy bowls and wholesome vegetarian meals.",
        image:
            "images/restaurants/inside/green-bowl.png"
    },

    "South Indian Express": {
        category: "South Indian",
        description:
            "Classic South Indian vegetarian favourites and delicious meals.",
        image:
            "images/restaurants/inside/south-indian-express.png"
    },

    "Burger Station": {
        category: "Burger",
        description:
            "Gourmet vegetarian burgers prepared with delicious ingredients.",
        image:
            "images/restaurants/inside/burger-station.png"
    },

    "Pizza Corner": {
        category: "Pizza",
        description:
            "Freshly prepared vegetarian pizzas with delicious toppings.",
        image:
            "images/restaurants/inside/pizza-corner.png"
    }

};


function getRestaurantName() {

    const params =
        new URLSearchParams(window.location.search);

    return params.get("restaurant");

}


function showRestaurantNotFound() {

    restaurantName.textContent =
        "Restaurant Not Found";

    restaurantCategory.textContent =
        "";

    restaurantDescription.textContent =
        "The requested restaurant could not be found.";

    restaurantImage.hidden =
        true;

    restaurantInfo.hidden =
        true;

    restaurantDetailsEmpty.hidden =
        false;

}


function displayRestaurant() {

    const selectedRestaurant =
        getRestaurantName();

    const restaurant =
        restaurantDetails[selectedRestaurant];

    if (!restaurant) {

        showRestaurantNotFound();

        return;
    }


    restaurantName.textContent =
        selectedRestaurant;

    restaurantCategory.textContent =
        restaurant.category;

    restaurantDescription.textContent =
        restaurant.description;


    restaurantImage.src =
        restaurant.image;

    restaurantImage.alt =
        `${selectedRestaurant} interior`;

    restaurantImage.hidden =
        false;


    restaurantInfoName.textContent =
        selectedRestaurant;

    restaurantInfoCategory.textContent =
        restaurant.category;

    restaurantInfo.hidden =
        false;

    restaurantDetailsEmpty.hidden =
        true;

}


displayRestaurant();