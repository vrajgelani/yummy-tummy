"use strict";

document.addEventListener("DOMContentLoaded", () => {
    initializeFoodPage();
});


const foodDetails = [
    {
        id: "crispy-veg-spring-roll",
        name: "Crispy Veg Spring Roll",
        category: "Starters",
        price: 169,
        rating: 4.5,
        image: "assets/images/home-menu/crispy-veg-spring-roll.png",
        description: "Crispy golden spring rolls filled with fresh vegetables and served with a flavorful dip."
    },
    {
        id: "paneer-pakora",
        name: "Paneer Pakora",
        category: "Starters",
        price: 189,
        rating: 4.4,
        image: "assets/images/home-menu/paneer-pakora.png",
        description: "Crispy gram-flour coated paneer pieces prepared with aromatic Indian spices."
    },
    {
        id: "cheese-corn-balls",
        name: "Cheese Corn Balls",
        category: "Starters",
        price: 199,
        rating: 4.6,
        image: "assets/images/home-menu/cheese-corn-balls.png",
        description: "Golden crispy cheese and sweet corn balls with a delicious creamy center."
    },
    {
        id: "hara-bhara-kebab",
        name: "Hara Bhara Kebab",
        category: "Starters",
        price: 179,
        rating: 4.5,
        image: "assets/images/home-menu/hara-bhara-kebab.png",
        description: "Healthy and flavorful green vegetable kebabs made with spinach and aromatic spices."
    },

    {
        id: "tandoori-paneer-pizza",
        name: "Tandoori Paneer Pizza",
        category: "Pizza",
        price: 299,
        rating: 4.6,
        image: "assets/images/home-menu/tandoori-paneer-pizza.png",
        description: "A delicious pizza topped with smoky paneer, vegetables, mozzarella and herbs."
    },
    {
        id: "garden-fresh-pizza",
        name: "Garden Fresh Pizza",
        category: "Pizza",
        price: 289,
        rating: 4.5,
        image: "assets/images/home-menu/garden-fresh-pizza.png",
        description: "Fresh vegetables, mozzarella and herbs on a golden crispy pizza base."
    },
    {
        id: "cheese-burst-veg-pizza",
        name: "Cheese Burst Veg Pizza",
        category: "Pizza",
        price: 319,
        rating: 4.7,
        image: "assets/images/home-menu/cheese-burst-veg-pizza.png",
        description: "A rich vegetarian pizza loaded with melted cheese and colorful vegetables."
    },
    {
        id: "roasted-corn-pizza",
        name: "Roasted Corn Pizza",
        category: "Pizza",
        price: 279,
        rating: 4.4,
        image: "assets/images/home-menu/roasted-corn-pizza.png",
        description: "Roasted sweet corn, vegetables, mozzarella and herbs on a delicious pizza base."
    },

    {
        id: "crispy-veg-burger",
        name: "Crispy Veg Burger",
        category: "Burgers",
        price: 179,
        rating: 4.5,
        image: "assets/images/home-menu/crispy-veg-burger.png",
        description: "Crunchy vegetarian patty with fresh vegetables, creamy sauce and a toasted bun."
    },
    {
        id: "paneer-peri-peri-burger",
        name: "Paneer Peri Peri Burger",
        category: "Burgers",
        price: 209,
        rating: 4.6,
        image: "assets/images/home-menu/paneer-peri-peri-burger.png",
        description: "Grilled paneer with peri peri seasoning, fresh vegetables and creamy sauce."
    },
    {
        id: "mexican-bean-burger",
        name: "Mexican Bean Burger",
        category: "Burgers",
        price: 199,
        rating: 4.4,
        image: "assets/images/home-menu/mexican-bean-burger.png",
        description: "A flavorful Mexican-inspired vegetarian bean patty with fresh toppings."
    },
    {
        id: "double-cheese-veg-burger",
        name: "Double Cheese Veg Burger",
        category: "Burgers",
        price: 229,
        rating: 4.7,
        image: "assets/images/home-menu/double-cheese-veg-burger.png",
        description: "A premium vegetarian burger with crispy patty and double melted cheese."
    },

    {
        id: "grilled-veg-sandwich",
        name: "Grilled Veg Sandwich",
        category: "Sandwiches",
        price: 159,
        rating: 4.5,
        image: "assets/images/home-menu/grilled-veg-sandwich.png",
        description: "Golden grilled bread filled with fresh vegetables, cheese and flavorful sauce."
    },
    {
        id: "cheese-corn-sandwich",
        name: "Cheese Corn Sandwich",
        category: "Sandwiches",
        price: 179,
        rating: 4.6,
        image: "assets/images/home-menu/cheese-corn-sandwich.png",
        description: "Creamy cheese and sweet corn filling inside freshly grilled bread."
    },
    {
        id: "paneer-masala-sandwich",
        name: "Paneer Masala Sandwich",
        category: "Sandwiches",
        price: 189,
        rating: 4.5,
        image: "assets/images/home-menu/paneer-masala-sandwich.png",
        description: "Spiced paneer filling combined with fresh vegetables and grilled bread."
    },
    {
        id: "garden-club-sandwich",
        name: "Garden Club Sandwich",
        category: "Sandwiches",
        price: 199,
        rating: 4.4,
        image: "assets/images/home-menu/garden-club-sandwich.png",
        description: "A fresh multi-layer vegetarian sandwich packed with colorful vegetables."
    },

    {
        id: "arrabbiata-penne",
        name: "Arrabbiata Penne",
        category: "Pasta",
        price: 239,
        rating: 4.5,
        image: "assets/images/home-menu/arrabbiata-penne.png",
        description: "Penne pasta tossed in a rich tomato and chili sauce with fresh herbs."
    },
    {
        id: "pesto-vegetable-pasta",
        name: "Pesto Vegetable Pasta",
        category: "Pasta",
        price: 259,
        rating: 4.6,
        image: "assets/images/home-menu/pesto-vegetable-pasta.png",
        description: "Creamy pesto pasta with colorful vegetables, parmesan and fresh basil."
    },
    {
        id: "pink-sauce-penne",
        name: "Pink Sauce Penne",
        category: "Pasta",
        price: 249,
        rating: 4.5,
        image: "assets/images/home-menu/pink-sauce-penne.png",
        description: "Penne pasta covered in a rich creamy tomato pink sauce."
    },
    {
        id: "spinach-corn-pasta",
        name: "Spinach Corn Pasta",
        category: "Pasta",
        price: 239,
        rating: 4.4,
        image: "assets/images/home-menu/spinach-corn-pasta.png",
        description: "Creamy pasta with spinach, sweet corn, parmesan and fresh herbs."
    },

    {
        id: "masala-dosa",
        name: "Masala Dosa",
        category: "South Indian",
        price: 149,
        rating: 4.7,
        image: "assets/images/home-menu/masala-dosa.png",
        description: "Crispy golden dosa filled with flavorful potato masala, served with chutney and sambar."
    },
    {
        id: "mysore-masala-dosa",
        name: "Mysore Masala Dosa",
        category: "South Indian",
        price: 169,
        rating: 4.6,
        image: "assets/images/home-menu/mysore-masala-dosa.png",
        description: "Crispy Mysore dosa layered with spicy chutney and delicious potato masala."
    },
    {
        id: "idli-sambar",
        name: "Idli Sambar",
        category: "South Indian",
        price: 119,
        rating: 4.5,
        image: "assets/images/home-menu/idli-sambar.png",
        description: "Soft steamed idlis served with flavorful sambar and coconut chutney."
    },
    {
        id: "medu-vada",
        name: "Medu Vada",
        category: "South Indian",
        price: 129,
        rating: 4.4,
        image: "assets/images/home-menu/medu-vada.png",
        description: "Crispy South Indian medu vada served with sambar and coconut chutney."
    },

    {
        id: "sev-tameta",
        name: "Sev Tameta",
        category: "Gujarati",
        price: 159,
        rating: 4.5,
        image: "assets/images/home-menu/sev-tameta.png",
        description: "Gujarati tomato curry topped with crispy sev and fresh coriander."
    },
    {
        id: "undhiyu",
        name: "Undhiyu",
        category: "Gujarati",
        price: 229,
        rating: 4.7,
        image: "assets/images/home-menu/undhiyu.png",
        description: "Traditional Gujarati mixed vegetable preparation with aromatic spices."
    },
    {
        id: "dal-dhokli",
        name: "Dal Dhokli",
        category: "Gujarati",
        price: 179,
        rating: 4.6,
        image: "assets/images/home-menu/dal-dhokli.png",
        description: "Soft wheat dhokli simmered in a flavorful Gujarati lentil curry."
    },
    {
        id: "kathiyawadi-khichdi",
        name: "Kathiyawadi Khichdi",
        category: "Gujarati",
        price: 169,
        rating: 4.5,
        image: "assets/images/home-menu/kathiyawadi-khichdi.png",
        description: "Traditional rice and lentil khichdi prepared in Kathiyawadi style."
    },

    {
        id: "veg-hakka-noodles",
        name: "Veg Hakka Noodles",
        category: "Chinese",
        price: 199,
        rating: 4.6,
        image: "assets/images/home-menu/veg-hakka-noodles.png",
        description: "Stir-fried noodles loaded with fresh vegetables and Indo-Chinese flavors."
    },
    {
        id: "schezwan-fried-rice",
        name: "Schezwan Fried Rice",
        category: "Chinese",
        price: 209,
        rating: 4.5,
        image: "assets/images/home-menu/schezwan-fried-rice.png",
        description: "Spicy vegetarian fried rice tossed with vegetables and Schezwan sauce."
    },
    {
        id: "chilli-paneer",
        name: "Chilli Paneer",
        category: "Chinese",
        price: 219,
        rating: 4.7,
        image: "assets/images/home-menu/chilli-paneer.png",
        description: "Crispy paneer tossed with vegetables in a flavorful Indo-Chinese sauce."
    },
    {
        id: "veg-manchurian",
        name: "Veg Manchurian",
        category: "Chinese",
        price: 189,
        rating: 4.5,
        image: "assets/images/home-menu/veg-manchurian.png",
        description: "Crispy vegetable Manchurian balls coated in a rich Indo-Chinese sauce."
    },

    {
        id: "gulab-jamun",
        name: "Gulab Jamun",
        category: "Desserts",
        price: 99,
        rating: 4.6,
        image: "assets/images/home-menu/gulab-jamun.png",
        description: "Soft golden gulab jamun soaked in fragrant saffron sugar syrup."
    },
    {
        id: "rasmalai",
        name: "Rasmalai",
        category: "Desserts",
        price: 139,
        rating: 4.7,
        image: "assets/images/home-menu/rasmalai.png",
        description: "Soft cottage cheese dumplings soaked in creamy saffron milk."
    },
    {
        id: "brownie-sundae",
        name: "Brownie Sundae",
        category: "Desserts",
        price: 199,
        rating: 4.8,
        image: "assets/images/home-menu/brownie-sundae.png",
        description: "Warm fudgy brownie served with creamy vanilla ice cream and chocolate sauce."
    },
    {
        id: "kesar-pista-kulfi",
        name: "Kesar Pista Kulfi",
        category: "Desserts",
        price: 129,
        rating: 4.6,
        image: "assets/images/home-menu/kesar-pista-kulfi.png",
        description: "Creamy traditional kulfi flavored with saffron and pistachios."
    },

    {
        id: "walnut-brownie",
        name: "Walnut Brownie",
        category: "Brownies",
        price: 149,
        rating: 4.7,
        image: "assets/images/home-menu/walnut-brownie.png",
        description: "Rich fudgy chocolate brownie packed with roasted walnut pieces."
    },
    {
        id: "triple-chocolate-brownie",
        name: "Triple Chocolate Brownie",
        category: "Brownies",
        price: 179,
        rating: 4.8,
        image: "assets/images/home-menu/triple-chocolate-brownie.png",
        description: "Decadent brownie made with dark, milk and white chocolate."
    },
    {
        id: "salted-caramel-brownie",
        name: "Salted Caramel Brownie",
        category: "Brownies",
        price: 189,
        rating: 4.7,
        image: "assets/images/home-menu/salted-caramel-brownie.png",
        description: "Fudgy chocolate brownie finished with glossy salted caramel."
    },
    {
        id: "dark-chocolate-brownie",
        name: "Dark Chocolate Brownie",
        category: "Brownies",
        price: 159,
        rating: 4.6,
        image: "assets/images/home-menu/dark-chocolate-brownie.png",
        description: "Rich dark chocolate brownie with a deep fudgy center."
    }
];


function initializeFoodPage() {

    const params =
        new URLSearchParams(window.location.search);

    const foodId =
        params.get("id");

    const selectedFood =
        foodDetails.find(
            (food) => food.id === foodId
        );

    if (!selectedFood) {

        showFoodNotFound();

        return;
    }

    displayFoodDetails(selectedFood);
    setupFoodActions(selectedFood);
}


function displayFoodDetails(food) {

    const image =
        document.getElementById("food-detail-image");

    const category =
        document.getElementById("food-detail-category");

    const name =
        document.getElementById("food-detail-name");

    const rating =
        document.getElementById("food-detail-rating");

    const description =
        document.getElementById("food-detail-description");

    const price =
        document.getElementById("food-detail-price");

    const breadcrumb =
        document.getElementById("food-breadcrumb-name");

    const infoCategory =
        document.getElementById("food-info-category");


    image.src = food.image;
    image.alt = food.name;

    category.textContent =
        food.category;

    name.textContent =
        food.name;

    rating.textContent =
        "★ " + food.rating;

    description.textContent =
        food.description;

    price.textContent =
        "₹" + food.price;

    breadcrumb.textContent =
        food.name;

    infoCategory.textContent =
        food.category;

    document.title =
        food.name + " | Yummy Tummy";
}


function setupFoodActions(food) {

    const cartButton =
        document.getElementById("add-to-cart-button");

    const wishlistButton =
        document.getElementById("add-to-wishlist-button");


    cartButton.addEventListener("click", () => {

        const cart =
            JSON.parse(
                localStorage.getItem("yummyTummyCart") || "[]"
            );

        const existingFood =
            cart.find(
                (item) => item.id === food.id
            );

        if (existingFood) {

            existingFood.quantity += 1;

        } else {

            cart.push({
                id: food.id,
                name: food.name,
                price: food.price,
                image: food.image,
                quantity: 1
            });

        }

        localStorage.setItem(
            "yummyTummyCart",
            JSON.stringify(cart)
        );

        cartButton.textContent =
            "Added to Cart";

    });


    wishlistButton.addEventListener("click", () => {

        const wishlist =
            JSON.parse(
                localStorage.getItem("yummyTummyWishlist") || "[]"
            );

        const exists =
            wishlist.some(
                (item) => item.id === food.id
            );

        if (!exists) {

            wishlist.push(food);

            localStorage.setItem(
                "yummyTummyWishlist",
                JSON.stringify(wishlist)
            );

            wishlistButton.textContent =
                "Added to Wishlist";

        } else {

            wishlistButton.textContent =
                "Already in Wishlist";

        }

    });
}


function showFoodNotFound() {

    const name =
        document.getElementById("food-detail-name");

    const description =
        document.getElementById("food-detail-description");

    const image =
        document.getElementById("food-detail-image");

    name.textContent =
        "Food Not Found";

    description.textContent =
        "The selected food could not be found.";

    image.removeAttribute("src");

    document.title =
        "Food Not Found | Yummy Tummy";
}