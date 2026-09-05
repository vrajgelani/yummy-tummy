document.addEventListener("DOMContentLoaded", () => {
    const menuFoodGrid = document.querySelector("#menuFoodGrid");
    const menuEmpty = document.querySelector("#menuEmpty");
    const menuTitle = document.querySelector("#menuTitle");
    const menuDescription = document.querySelector("#menuDescription");
    const filterButtons = document.querySelectorAll(
        ".menu-filter-button"
    );

    const menuFoods = [
        {
            name: "Gujarati Thali",
            category: "gujarati",
            restaurant: "Gujarati Thali House",
            price: 249,
            description: "Traditional Gujarati vegetarian thali.",
            image: "images/foods/general/gujarati-thali.png"
        },
        {
            name: "Dhokla",
            category: "gujarati",
            restaurant: "Gujarati Thali House",
            price: 99,
            description: "Soft and fresh Gujarati dhokla.",
            image: "images/foods/general/dhokla.png"
        },
        {
            name: "Khandvi",
            category: "gujarati",
            restaurant: "Gujarati Thali House",
            price: 129,
            description: "Delicate Gujarati khandvi rolls.",
            image: "images/foods/general/khandvi.png"
        },
        {
            name: "Mohanthal",
            category: "gujarati",
            restaurant: "Gujarati Thali House",
            price: 119,
            description: "Traditional Gujarati gram flour sweet.",
            image: "images/foods/general/mohanthal.png"
        },

        {
            name: "Veg Hakka Noodles",
            category: "chinese",
            restaurant: "Chinese Wok House",
            price: 179,
            description: "Classic vegetarian Hakka noodles.",
            image: "images/foods/general/hakka-noodles.png"
        },
        {
            name: "Veg Fried Rice",
            category: "chinese",
            restaurant: "Chinese Wok House",
            price: 169,
            description: "Aromatic vegetable fried rice.",
            image: "images/foods/general/fried-rice.png"
        },
        {
            name: "Veg Manchurian",
            category: "chinese",
            restaurant: "Chinese Wok House",
            price: 189,
            description: "Crispy vegetable balls in sauce.",
            image: "images/foods/general/manchurian.png"
        },
        {
            name: "Sesame Honey Noodles Dessert",
            category: "chinese",
            restaurant: "Chinese Wok House",
            price: 139,
            description: "Crispy noodles with honey and sesame.",
            image: "images/foods/general/sesame-honey-noodles-dessert.png"
        },

        {
            name: "Green Salad",
            category: "healthy",
            restaurant: "Green Bowl",
            price: 149,
            description: "Fresh seasonal vegetable salad.",
            image: "images/foods/general/green-salad.png"
        },
        {
            name: "Avocado Bowl",
            category: "healthy",
            restaurant: "Green Bowl",
            price: 229,
            description: "Fresh avocado and vegetable bowl.",
            image: "images/foods/general/avocado-bowl.png"
        },
        {
            name: "Protein Bowl",
            category: "healthy",
            restaurant: "Green Bowl",
            price: 249,
            description: "Balanced vegetarian protein bowl.",
            image: "images/foods/general/protein-bowl.png"
        },
        {
            name: "Chia Berry Pudding",
            category: "healthy",
            restaurant: "Green Bowl",
            price: 139,
            description: "Fresh chia pudding with seasonal berries.",
            image: "images/foods/general/chia-berry-pudding.png"
        },

        {
            name: "Masala Dosa",
            category: "south-indian",
            restaurant: "South Indian Express",
            price: 149,
            description: "Crispy dosa with potato masala.",
            image: "images/foods/general/masala-dosa.png"
        },
        {
            name: "Idli Sambar",
            category: "south-indian",
            restaurant: "South Indian Express",
            price: 119,
            description: "Soft idli served with sambar.",
            image: "images/foods/general/idli-sambar.png"
        },
        {
            name: "Medu Vada",
            category: "south-indian",
            restaurant: "South Indian Express",
            price: 129,
            description: "Crispy South Indian medu vada.",
            image: "images/foods/general/medu-vada.png"
        },
        {
            name: "Payasam",
            category: "south-indian",
            restaurant: "South Indian Express",
            price: 119,
            description: "Traditional creamy South Indian dessert.",
            image: "images/foods/general/payasam.png"
        },

        {
            name: "Classic Veg Burger",
            category: "burger",
            restaurant: "Burger Station",
            price: 159,
            description: "Classic vegetarian burger.",
            image: "images/foods/general/veg-burger.png"
        },
        {
            name: "Cheese Burger",
            category: "burger",
            restaurant: "Burger Station",
            price: 189,
            description: "Vegetarian burger with cheese.",
            image: "images/foods/general/cheese-burger.png"
        },
        {
            name: "Crispy Burger",
            category: "burger",
            restaurant: "Burger Station",
            price: 179,
            description: "Crispy vegetarian burger.",
            image: "images/foods/general/crispy-burger.png"
        },
        {
            name: "Biscoff Cheesecake Cup",
            category: "burger",
            restaurant: "Burger Station",
            price: 149,
            description: "Creamy cheesecake with caramelized biscuit.",
            image: "images/foods/general/biscoff-cheesecake-cup.png"
        },

        {
            name: "Margherita Pizza",
            category: "pizza",
            restaurant: "Pizza Corner",
            price: 199,
            description: "Classic cheese and tomato pizza.",
            image: "images/foods/general/margherita-pizza.png"
        },
        {
            name: "Veggie Pizza",
            category: "pizza",
            restaurant: "Pizza Corner",
            price: 229,
            description: "Loaded vegetarian pizza.",
            image: "images/foods/general/veggie-pizza.png"
        },
        {
            name: "Cheese Burst Pizza",
            category: "pizza",
            restaurant: "Pizza Corner",
            price: 269,
            description: "Rich cheese-filled pizza.",
            image: "images/foods/general/cheese-burst-pizza.png"
        },
        {
            name: "Tiramisu",
            category: "pizza",
            restaurant: "Pizza Corner",
            price: 159,
            description: "Classic Italian mascarpone dessert.",
            image: "images/foods/general/tiramisu.png"
        },

        {
            name: "Chocolate Cake",
            category: "dessert",
            restaurant: "Sweet Treats",
            price: 149,
            description: "Rich chocolate cake.",
            image: "images/foods/general/chocolate-cake.png"
        },
        {
            name: "Cheesecake",
            category: "dessert",
            restaurant: "Sweet Treats",
            price: 179,
            description: "Creamy premium cheesecake.",
            image: "images/foods/general/cheesecake.png"
        },
        {
            name: "Gulab Jamun",
            category: "dessert",
            restaurant: "Sweet Treats",
            price: 99,
            description: "Soft traditional Indian dessert.",
            image: "images/foods/general/gulab-jamun.png"
        },
        {
            name: "Rasmalai",
            category: "dessert",
            restaurant: "Sweet Treats",
            price: 129,
            description: "Soft rasmalai in saffron milk.",
            image: "images/foods/general/rasmalai.png"
        },

        {
            name: "Fresh Lemonade",
            category: "beverages",
            restaurant: "Fresh Drinks",
            price: 79,
            description: "Refreshing fresh lemonade.",
            image: "images/foods/general/lemonade.png"
        },
        {
            name: "Mango Smoothie",
            category: "beverages",
            restaurant: "Fresh Drinks",
            price: 129,
            description: "Creamy fresh mango smoothie.",
            image: "images/foods/general/mango-smoothie.png"
        },
        {
            name: "Cold Coffee",
            category: "beverages",
            restaurant: "Fresh Drinks",
            price: 119,
            description: "Chilled creamy cold coffee.",
            image: "images/foods/general/cold-coffee.png"
        },
        {
            name: "Mango Falooda",
            category: "beverages",
            restaurant: "Fresh Drinks",
            price: 159,
            description: "Refreshing mango falooda dessert drink.",
            image: "images/foods/general/mango-falooda.png"
        }
    ];

    const categoryNames = {
        all: "Explore Our Menu",
        gujarati: "Gujarati Food",
        chinese: "Chinese Food",
        healthy: "Healthy Food",
        "south-indian": "South Indian Food",
        burger: "Burger",
        pizza: "Pizza",
        dessert: "Desserts",
        beverages: "Beverages"
    };

    const categoryDescriptions = {
        all: "Discover delicious food from different categories.",
        gujarati: "Enjoy traditional Gujarati vegetarian favourites.",
        chinese: "Explore delicious vegetarian Chinese favourites.",
        healthy: "Choose fresh and healthy vegetarian meals.",
        "south-indian": "Discover delicious South Indian favourites.",
        burger: "Explore delicious vegetarian burger choices.",
        pizza: "Discover freshly prepared vegetarian pizzas.",
        dessert: "Enjoy delicious sweet treats and desserts.",
        beverages: "Refresh yourself with delicious beverages."
    };

    function getSelectedCategory() {
        const params = new URLSearchParams(
            window.location.search
        );

        return params.get("category") || "all";
    }

    function filterFoods(category) {
        if (category === "all") {
            return menuFoods;
        }

        return menuFoods.filter(
            (food) => food.category === category
        );
    }

    function updatePageHeading(category) {
        menuTitle.textContent =
            categoryNames[category] || categoryNames.all;

        menuDescription.textContent =
            categoryDescriptions[category] ||
            categoryDescriptions.all;
    }

    function updateActiveButton(category) {
        filterButtons.forEach((button) => {
            button.classList.toggle(
                "active",
                button.dataset.category === category
            );
        });
    }

    function createFoodCard(food) {
        const card = document.createElement("article");

        card.className = "menu-food-card";

        const image = document.createElement("img");

        image.className = "menu-food-image";
        image.src = food.image;
        image.alt = food.name;
        image.loading = "lazy";

        image.addEventListener("error", () => {
            image.classList.add("image-error");
        });

        const content = document.createElement("div");

        content.className = "menu-food-content";

        const category = document.createElement("p");

        category.className = "menu-food-category";
        category.textContent = food.category;

        const name = document.createElement("h2");

        name.className = "menu-food-name";
        name.textContent = food.name;

        const description = document.createElement("p");

        description.className = "menu-food-description";
        description.textContent = food.description;

        const footer = document.createElement("div");

        footer.className = "menu-food-footer";

        const price = document.createElement("span");

        price.className = "menu-food-price";
        price.textContent = `₹${food.price}`;

        const restaurant = document.createElement("span");

        restaurant.className = "menu-food-restaurant";
        restaurant.textContent = food.restaurant;

        footer.append(price, restaurant);

        content.append(
            category,
            name,
            description,
            footer
        );

        card.append(image, content);

        return card;
    }

    function displayFoods(category) {
        const foods = filterFoods(category);

        menuFoodGrid.replaceChildren();

        if (foods.length === 0) {
            menuEmpty.hidden = false;
            return;
        }

        menuEmpty.hidden = true;

        foods.forEach((food) => {
            const card = createFoodCard(food);

            menuFoodGrid.append(card);
        });
    }

    function setCategory(category) {
        const validCategory =
            categoryNames[category] ? category : "all";

        updatePageHeading(validCategory);
        updateActiveButton(validCategory);
        displayFoods(validCategory);
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const category = button.dataset.category;

            const url = new URL(
                window.location.href
            );

            if (category === "all") {
                url.searchParams.delete("category");
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

            setCategory(category);
        });
    });

    window.addEventListener(
        "popstate",
        () => {
            setCategory(
                getSelectedCategory()
            );
        }
    );

    setCategory(
        getSelectedCategory()
    );
});