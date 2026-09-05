const restaurantFoods = [
    {
        id: "kathiyawadi-undhiyu",
        restaurantId: "gujarati-thali-house",
        restaurant: "Gujarati Thali House",
        category: "Gujarati",
        name: "Kathiyawadi Undhiyu",
        price: 229,
        image: "images/restaurants/kathiyawadi-undhiyu.png"
    },

    {
        id: "gujarati-dal-dhokli",
        restaurantId: "gujarati-thali-house",
        restaurant: "Gujarati Thali House",
        category: "Gujarati",
        name: "Gujarati Dal Dhokli",
        price: 189,
        image: "images/restaurants/gujarati-dal-dhokli.png"
    },

    {
        id: "sev-tameta-sabzi",
        restaurantId: "gujarati-thali-house",
        restaurant: "Gujarati Thali House",
        category: "Gujarati",
        name: "Sev Tameta Sabzi",
        price: 159,
        image: "images/restaurants/sev-tameta-sabzi.png"
    },

    {
        id: "mohanthal",
        restaurantId: "gujarati-thali-house",
        restaurant: "Gujarati Thali House",
        category: "Gujarati",
        name: "Mohanthal",
        price: 129,
        image: "images/restaurants/mohanthal.png"
    },

    {
        id: "chilli-paneer",
        restaurantId: "chinese-wok-house",
        restaurant: "Chinese Wok House",
        category: "Chinese",
        name: "Chilli Paneer",
        price: 219,
        image: "images/restaurants/chilli-paneer.png"
    },

    {
        id: "veg-spring-rolls",
        restaurantId: "chinese-wok-house",
        restaurant: "Chinese Wok House",
        category: "Chinese",
        name: "Veg Spring Rolls",
        price: 169,
        image: "images/restaurants/veg-spring-rolls.png"
    },

    {
        id: "schezwan-paneer-rice",
        restaurantId: "chinese-wok-house",
        restaurant: "Chinese Wok House",
        category: "Chinese",
        name: "Schezwan Paneer Rice",
        price: 199,
        image: "images/restaurants/schezwan-paneer-rice.png"
    },

    {
        id: "honey-chilli-potato",
        restaurantId: "chinese-wok-house",
        restaurant: "Chinese Wok House",
        category: "Chinese",
        name: "Honey Chilli Potato",
        price: 179,
        image: "images/restaurants/honey-chilli-potato.png"
    },

    {
        id: "mediterranean-veg-bowl",
        restaurantId: "green-bowl",
        restaurant: "Green Bowl",
        category: "Healthy",
        name: "Mediterranean Veg Bowl",
        price: 259,
        image: "images/restaurants/mediterranean-veg-bowl.png"
    },

    {
        id: "quinoa-rainbow-bowl",
        restaurantId: "green-bowl",
        restaurant: "Green Bowl",
        category: "Healthy",
        name: "Quinoa Rainbow Bowl",
        price: 279,
        image: "images/restaurants/quinoa-rainbow-bowl.png"
    },

    {
        id: "hummus-veg-platter",
        restaurantId: "green-bowl",
        restaurant: "Green Bowl",
        category: "Healthy",
        name: "Hummus Veg Platter",
        price: 239,
        image: "images/restaurants/hummus-veg-platter.png"
    },

    {
        id: "date-nut-energy-bites",
        restaurantId: "green-bowl",
        restaurant: "Green Bowl",
        category: "Healthy",
        name: "Date Nut Energy Bites",
        price: 149,
        image: "images/restaurants/date-nut-energy-bites.png"
    },

    {
        id: "mysore-masala-dosa",
        restaurantId: "south-indian-express",
        restaurant: "South Indian Express",
        category: "South Indian",
        name: "Mysore Masala Dosa",
        price: 179,
        image: "images/restaurants/mysore-masala-dosa.png"
    },

    {
        id: "podi-idli",
        restaurantId: "south-indian-express",
        restaurant: "South Indian Express",
        category: "South Indian",
        name: "Podi Idli",
        price: 139,
        image: "images/restaurants/podi-idli.png"
    },

    {
        id: "onion-uttapam",
        restaurantId: "south-indian-express",
        restaurant: "South Indian Express",
        category: "South Indian",
        name: "Onion Uttapam",
        price: 149,
        image: "images/restaurants/onion-uttapam.png"
    },

    {
        id: "filter-coffee-tiramisu",
        restaurantId: "south-indian-express",
        restaurant: "South Indian Express",
        category: "South Indian",
        name: "Filter Coffee Tiramisu",
        price: 169,
        image: "images/restaurants/filter-coffee-tiramisu.png"
    },

    {
        id: "paneer-tikka-burger",
        restaurantId: "burger-station",
        restaurant: "Burger Station",
        category: "Burger",
        name: "Paneer Tikka Burger",
        price: 199,
        image: "images/restaurants/paneer-tikka-burger.png"
    },

    {
        id: "peri-peri-veg-burger",
        restaurantId: "burger-station",
        restaurant: "Burger Station",
        category: "Burger",
        name: "Peri Peri Veg Burger",
        price: 189,
        image: "images/restaurants/peri-peri-veg-burger.png"
    },

    {
        id: "mexican-bean-burger",
        restaurantId: "burger-station",
        restaurant: "Burger Station",
        category: "Burger",
        name: "Mexican Bean Burger",
        price: 209,
        image: "images/restaurants/mexican-bean-burger.png"
    },

    {
        id: "salted-caramel-brownie-sundae",
        restaurantId: "burger-station",
        restaurant: "Burger Station",
        category: "Burger",
        name: "Salted Caramel Brownie Sundae",
        price: 179,
        image: "images/restaurants/salted-caramel-brownie-sundae.png"
    },

    {
        id: "farmhouse-paneer-pizza",
        restaurantId: "pizza-corner",
        restaurant: "Pizza Corner",
        category: "Pizza",
        name: "Farmhouse Paneer Pizza",
        price: 299,
        image: "images/restaurants/farmhouse-paneer-pizza.png"
    },

    {
        id: "pesto-corn-pizza",
        restaurantId: "pizza-corner",
        restaurant: "Pizza Corner",
        category: "Pizza",
        name: "Pesto Corn Pizza",
        price: 279,
        image: "images/restaurants/pesto-corn-pizza.png"
    },

    {
        id: "tandoori-veg-pizza",
        restaurantId: "pizza-corner",
        restaurant: "Pizza Corner",
        category: "Pizza",
        name: "Tandoori Veg Pizza",
        price: 289,
        image: "images/restaurants/tandoori-veg-pizza.png"
    },

    {
        id: "nutella-hazelnut-pizza",
        restaurantId: "pizza-corner",
        restaurant: "Pizza Corner",
        category: "Pizza",
        name: "Nutella Hazelnut Pizza",
        price: 249,
        image: "images/restaurants/nutella-hazelnut-pizza.png"
    }
];