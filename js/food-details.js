const foodDetails =
    document.querySelector("#foodDetails");

const foodNotFound =
    document.querySelector("#foodNotFound");

const foodImage =
    document.querySelector("#foodImage");

const foodCategory =
    document.querySelector("#foodCategory");

const foodName =
    document.querySelector("#foodName");

const foodDescription =
    document.querySelector("#foodDescription");

const foodRestaurant =
    document.querySelector("#foodRestaurant");

const foodCategoryInfo =
    document.querySelector("#foodCategoryInfo");

const foodPrice =
    document.querySelector("#foodPrice");

const addToCartButton =
    document.querySelector("#addToCartButton");


function getFoodId() {

    const params =
        new URLSearchParams(window.location.search);

    return params.get("food");

}


function showFood(food) {

    foodDetails.hidden =
        false;

    foodNotFound.hidden =
        true;


    foodImage.src =
        food.image;

    foodImage.alt =
        food.name;


    foodCategory.textContent =
        food.category;

    foodName.textContent =
        food.name;

    foodDescription.textContent =
        `Enjoy ${food.name} from ${food.restaurant}. Freshly prepared vegetarian food made for a delicious experience.`;

    foodRestaurant.textContent =
        food.restaurant;

    foodCategoryInfo.textContent =
        food.category;

    foodPrice.textContent =
        `₹${food.price}`;


    document.title =
        `${food.name} | Yummy Tummy`;

}


function showNotFound() {

    foodDetails.hidden =
        true;

    foodNotFound.hidden =
        false;

}


function initializeFoodDetails() {

    const foodId =
        getFoodId();


    const food =
        restaurantFoods.find(
            (item) =>
                item.id === foodId
        );


    if (!food) {

        showNotFound();

        return;
    }


    showFood(food);

}


initializeFoodDetails();