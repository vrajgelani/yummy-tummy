const restaurantsGrid =
    document.querySelector("#restaurantsGrid");

const restaurantsEmpty =
    document.querySelector("#restaurantsEmpty");


const restaurants = [

    {
        id: "gujarati-thali-house",
        name: "Gujarati Thali House",
        category: "Gujarati",
        description:
            "Traditional Gujarati vegetarian dining with authentic regional flavours."
    },

    {
        id: "chinese-wok-house",
        name: "Chinese Wok House",
        category: "Chinese",
        description:
            "Delicious vegetarian Chinese favourites prepared with fresh ingredients."
    },

    {
        id: "green-bowl",
        name: "Green Bowl",
        category: "Healthy",
        description:
            "Fresh salads, wholesome bowls and healthy vegetarian meals."
    },

    {
        id: "south-indian-express",
        name: "South Indian Express",
        category: "South Indian",
        description:
            "Classic South Indian vegetarian favourites prepared fresh."
    },

    {
        id: "burger-station",
        name: "Burger Station",
        category: "Burger",
        description:
            "Gourmet vegetarian burgers with delicious fresh ingredients."
    },

    {
        id: "pizza-corner",
        name: "Pizza Corner",
        category: "Pizza",
        description:
            "Freshly prepared vegetarian pizzas with delicious toppings."
    }

];


function createRestaurantCard(restaurant) {

    const card =
        document.createElement("article");

    card.className =
        "restaurant-card";


    const imageWrapper =
        document.createElement("div");

    imageWrapper.className =
        "restaurant-card-image-wrapper";


    const image =
        document.createElement("img");

    image.className =
        "restaurant-card-image";

    image.alt =
        restaurant.name;

    image.loading =
        "lazy";


    /*
        Restaurant exterior images
        will be connected in Day 3 Part 2.
    */

    imageWrapper.appendChild(image);


    const content =
        document.createElement("div");

    content.className =
        "restaurant-card-content";


    const category =
        document.createElement("p");

    category.className =
        "restaurant-card-category";

    category.textContent =
        restaurant.category;


    const name =
        document.createElement("h2");

    name.className =
        "restaurant-card-name";

    name.textContent =
        restaurant.name;


    const description =
        document.createElement("p");

    description.className =
        "restaurant-card-description";

    description.textContent =
        restaurant.description;


    const button =
        document.createElement("a");

    button.className =
        "restaurant-card-button";

    button.href =
        `restaurant-details.html?restaurant=${encodeURIComponent(restaurant.id)}`;

    button.textContent =
        "View Restaurant";


    content.append(
        category,
        name,
        description,
        button
    );


    card.append(
        imageWrapper,
        content
    );


    return card;
}


function displayRestaurants() {

    restaurantsGrid.replaceChildren();


    if (restaurants.length === 0) {

        restaurantsEmpty.hidden =
            false;

        return;
    }


    restaurantsEmpty.hidden =
        true;


    restaurants.forEach((restaurant) => {

        const card =
            createRestaurantCard(restaurant);

        restaurantsGrid.appendChild(card);

    });

}


displayRestaurants();