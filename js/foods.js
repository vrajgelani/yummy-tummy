const foodData = [

    /* =====================================================
       STARTERS — 5 FOODS
       ===================================================== */

    {
        id: 1,
        name: "Paneer Tikka",
        category: "Starters",
        price: 220,
        rating: 4.6,
        orders: 1250,
        description: "Grilled cottage cheese cubes marinated with aromatic spices.",
        image: "images/foods/paneer-tikka.png"
    },

    {
        id: 2,
        name: "Hara Bhara Kebab",
        category: "Starters",
        price: 180,
        rating: 4.5,
        orders: 1100,
        description: "Crispy vegetarian kebabs prepared with spinach and green vegetables.",
        image: "images/foods/hara-bhara-kebab.png"
    },

    {
        id: 3,
        name: "Veg Spring Roll",
        category: "Starters",
        price: 160,
        rating: 4.4,
        orders: 980,
        description: "Crispy rolls filled with seasoned fresh vegetables.",
        image: "images/foods/veg-spring-roll.png"
    },

    {
        id: 4,
        name: "Crispy Corn",
        category: "Starters",
        price: 150,
        rating: 4.3,
        orders: 870,
        description: "Crispy golden corn tossed with herbs and mild spices.",
        image: "images/foods/crispy-corn.png"
    },

    {
        id: 5,
        name: "Paneer Chilli",
        category: "Starters",
        price: 210,
        rating: 4.7,
        orders: 1340,
        description: "Soft paneer tossed with peppers, onions and flavorful spices.",
        image: "images/foods/paneer-chilli.png"
    },


    /* =====================================================
       PIZZA — 5 FOODS
       ===================================================== */

    {
        id: 6,
        name: "Margherita Pizza",
        category: "Pizza",
        price: 240,
        rating: 4.5,
        orders: 1450,
        description: "Classic pizza topped with tomato sauce, mozzarella and herbs.",
        image: "images/foods/margherita-pizza.png"
    },

    {
        id: 7,
        name: "Farmhouse Pizza",
        category: "Pizza",
        price: 320,
        rating: 4.6,
        orders: 1680,
        description: "Loaded vegetarian pizza with fresh vegetables and mozzarella.",
        image: "images/foods/farmhouse-pizza.png"
    },

    {
        id: 8,
        name: "Paneer Tikka Pizza",
        category: "Pizza",
        price: 350,
        rating: 4.7,
        orders: 1520,
        description: "Fusion pizza topped with spiced paneer tikka and vegetables.",
        image: "images/foods/paneer-tikka-pizza.png"
    },

    {
        id: 9,
        name: "Mexican Green Wave Pizza",
        category: "Pizza",
        price: 330,
        rating: 4.4,
        orders: 920,
        description: "Spicy vegetarian pizza with jalapenos, capsicum and herbs.",
        image: "images/foods/mexican-green-wave-pizza.png"
    },

    {
        id: 10,
        name: "Cheese Burst Veg Pizza",
        category: "Pizza",
        price: 380,
        rating: 4.8,
        orders: 1890,
        description: "Rich vegetarian pizza with a creamy cheese-filled crust.",
        image: "images/foods/cheese-burst-veg-pizza.png"
    },


    /* =====================================================
       BURGER — 5 FOODS
       ===================================================== */

    {
        id: 11,
        name: "Classic Veg Burger",
        category: "Burger",
        price: 150,
        rating: 4.3,
        orders: 1050,
        description: "Classic vegetarian burger with a crispy vegetable patty.",
        image: "images/foods/classic-veg-burger.png"
    },

    {
        id: 12,
        name: "Paneer Burger",
        category: "Burger",
        price: 190,
        rating: 4.6,
        orders: 1280,
        description: "Soft bun filled with grilled paneer and fresh vegetables.",
        image: "images/foods/paneer-burger.png"
    },

    {
        id: 13,
        name: "Cheese Veg Burger",
        category: "Burger",
        price: 180,
        rating: 4.5,
        orders: 1190,
        description: "Crispy vegetarian patty topped with melted cheese.",
        image: "images/foods/cheese-veg-burger.png"
    },

    {
        id: 14,
        name: "Mexican Veg Burger",
        category: "Burger",
        price: 200,
        rating: 4.4,
        orders: 880,
        description: "Spicy vegetarian burger with Mexican-style seasoning.",
        image: "images/foods/mexican-veg-burger.png"
    },

    {
        id: 15,
        name: "Tandoori Paneer Burger",
        category: "Burger",
        price: 220,
        rating: 4.7,
        orders: 1410,
        description: "Gourmet burger with smoky tandoori paneer and vegetables.",
        image: "images/foods/tandoori-paneer-burger.png"
    },


    /* =====================================================
       SOUTH INDIAN — 5 FOODS
       ===================================================== */

    {
        id: 16,
        name: "Masala Dosa",
        category: "South Indian",
        price: 140,
        rating: 4.7,
        orders: 2100,
        description: "Crispy dosa filled with flavorful spiced potato masala.",
        image: "images/foods/masala-dosa.png"
    },

    {
        id: 17,
        name: "Plain Dosa",
        category: "South Indian",
        price: 110,
        rating: 4.4,
        orders: 1250,
        description: "Thin and crispy traditional South Indian dosa.",
        image: "images/foods/plain-dosa.png"
    },

    {
        id: 18,
        name: "Idli Sambar",
        category: "South Indian",
        price: 120,
        rating: 4.5,
        orders: 1380,
        description: "Soft steamed idlis served with warm sambar.",
        image: "images/foods/idli-sambar.png"
    },

    {
        id: 19,
        name: "Medu Vada",
        category: "South Indian",
        price: 130,
        rating: 4.3,
        orders: 940,
        description: "Crispy lentil fritters served with traditional accompaniments.",
        image: "images/foods/medu-vada.png"
    },

    {
        id: 20,
        name: "Rava Dosa",
        category: "South Indian",
        price: 150,
        rating: 4.6,
        orders: 1160,
        description: "Crispy semolina dosa with aromatic South Indian seasoning.",
        image: "images/foods/rava-dosa.png"
    },


    /* =====================================================
       PUNJABI — 5 FOODS
       ===================================================== */

    {
        id: 21,
        name: "Paneer Butter Masala",
        category: "Punjabi",
        price: 280,
        rating: 4.7,
        orders: 1760,
        description: "Creamy paneer curry cooked in a rich tomato-based gravy.",
        image: "images/foods/paneer-butter-masala.png"
    },

    {
        id: 22,
        name: "Dal Makhani",
        category: "Punjabi",
        price: 240,
        rating: 4.6,
        orders: 1520,
        description: "Slow-cooked black lentils prepared with butter and cream.",
        image: "images/foods/dal-makhani.png"
    },

    {
        id: 23,
        name: "Chole Bhature",
        category: "Punjabi",
        price: 190,
        rating: 4.5,
        orders: 1490,
        description: "Spiced chickpeas served with fluffy fried bhature.",
        image: "images/foods/chole-bhature.png"
    },

    {
        id: 24,
        name: "Amritsari Kulcha",
        category: "Punjabi",
        price: 180,
        rating: 4.4,
        orders: 1080,
        description: "Stuffed Punjabi bread baked with aromatic spices.",
        image: "images/foods/amritsari-kulcha.png"
    },

    {
        id: 25,
        name: "Palak Paneer",
        category: "Punjabi",
        price: 260,
        rating: 4.8,
        orders: 1630,
        description: "Paneer cooked in a smooth spinach-based gravy.",
        image: "images/foods/palak-paneer.png"
    },


    /* =====================================================
       GUJARATI — 5 FOODS
       ===================================================== */

    {
        id: 26,
        name: "Khaman",
        category: "Gujarati",
        price: 100,
        rating: 4.5,
        orders: 1150,
        description: "Soft steamed Gujarati savory snack with a light texture.",
        image: "images/foods/khaman.png"
    },

    {
        id: 27,
        name: "Khandvi",
        category: "Gujarati",
        price: 130,
        rating: 4.6,
        orders: 980,
        description: "Delicate gram-flour rolls tempered with aromatic spices.",
        image: "images/foods/khandvi.png"
    },

    {
        id: 28,
        name: "Gujarati Fafda",
        category: "Gujarati",
        price: 120,
        rating: 4.4,
        orders: 1320,
        description: "Crispy traditional Gujarati snack with a savory flavor.",
        image: "images/foods/gujarati-fafda.png"
    },

    {
        id: 29,
        name: "Handvo",
        category: "Gujarati",
        price: 160,
        rating: 4.3,
        orders: 850,
        description: "Savory Gujarati baked lentil and vegetable cake.",
        image: "images/foods/handvo.png"
    },

    {
        id: 30,
        name: "Gujarati Dal Dhokli",
        category: "Gujarati",
        price: 180,
        rating: 4.7,
        orders: 1210,
        description: "Traditional Gujarati wheat dumplings cooked in flavorful dal.",
        image: "images/foods/dal-dhokli.png"
    },


    /* =====================================================
       CHINESE — 5 FOODS
       ===================================================== */

    {
        id: 31,
        name: "Veg Hakka Noodles",
        category: "Chinese",
        price: 190,
        rating: 4.5,
        orders: 1460,
        description: "Stir-fried noodles tossed with fresh vegetables and sauces.",
        image: "images/foods/veg-hakka-noodles.png"
    },

    {
        id: 32,
        name: "Veg Fried Rice",
        category: "Chinese",
        price: 180,
        rating: 4.4,
        orders: 1290,
        description: "Fragrant fried rice prepared with colorful vegetables.",
        image: "images/foods/veg-fried-rice.png"
    },

    {
        id: 33,
        name: "Veg Manchurian",
        category: "Chinese",
        price: 210,
        rating: 4.6,
        orders: 1580,
        description: "Crispy vegetable balls tossed in flavorful Manchurian sauce.",
        image: "images/foods/veg-manchurian.png"
    },

    {
        id: 34,
        name: "Chilli Paneer",
        category: "Chinese",
        price: 230,
        rating: 4.7,
        orders: 1420,
        description: "Paneer cubes tossed with peppers and Indo-Chinese sauces.",
        image: "images/foods/chilli-paneer.png"
    },

    {
        id: 35,
        name: "Veg Schezwan Noodles",
        category: "Chinese",
        price: 220,
        rating: 4.5,
        orders: 1170,
        description: "Spicy noodles cooked with vegetables and Schezwan sauce.",
        image: "images/foods/veg-schezwan-noodles.png"
    },


    /* =====================================================
       ITALIAN — 5 FOODS
       ===================================================== */

    {
        id: 36,
        name: "Penne Arrabbiata",
        category: "Italian",
        price: 240,
        rating: 4.5,
        orders: 980,
        description: "Penne pasta tossed in a spicy tomato and herb sauce.",
        image: "images/foods/penne-arrabbiata.png"
    },

    {
        id: 37,
        name: "Creamy Alfredo Pasta",
        category: "Italian",
        price: 280,
        rating: 4.6,
        orders: 1260,
        description: "Creamy pasta prepared with herbs and rich Alfredo sauce.",
        image: "images/foods/creamy-alfredo-pasta.png"
    },

    {
        id: 38,
        name: "Vegetable Lasagna",
        category: "Italian",
        price: 320,
        rating: 4.7,
        orders: 890,
        description: "Layered pasta with vegetables, tomato sauce and cheese.",
        image: "images/foods/vegetable-lasagna.png"
    },

    {
        id: 39,
        name: "Cheesy Garlic Bread",
        category: "Italian",
        price: 170,
        rating: 4.4,
        orders: 1430,
        description: "Toasted garlic bread topped with melted cheese and herbs.",
        image: "images/foods/cheesy-garlic-bread.png"
    },

    {
        id: 40,
        name: "Veg Risotto",
        category: "Italian",
        price: 300,
        rating: 4.3,
        orders: 760,
        description: "Creamy Italian rice dish cooked with fresh vegetables.",
        image: "images/foods/veg-risotto.png"
    },


    /* =====================================================
       DESSERTS — 5 FOODS
       ===================================================== */

    {
        id: 41,
        name: "Gulab Jamun",
        category: "Desserts",
        price: 110,
        rating: 4.7,
        orders: 1890,
        description: "Soft milk-solid dumplings soaked in fragrant sugar syrup.",
        image: "images/foods/gulab-jamun.png"
    },

    {
        id: 42,
        name: "Rasmalai",
        category: "Desserts",
        price: 150,
        rating: 4.6,
        orders: 1120,
        description: "Soft cottage cheese dumplings served in sweet saffron milk.",
        image: "images/foods/rasmalai.png"
    },

    {
        id: 43,
        name: "Jalebi",
        category: "Desserts",
        price: 100,
        rating: 4.4,
        orders: 1350,
        description: "Crispy spiral sweets soaked in aromatic sugar syrup.",
        image: "images/foods/jalebi.png"
    },

    {
        id: 44,
        name: "Kesar Pista Kulfi",
        category: "Desserts",
        price: 140,
        rating: 4.5,
        orders: 1040,
        description: "Traditional frozen Indian dessert flavored with saffron and pistachios.",
        image: "images/foods/kesar-pista-kulfi.png"
    },

    {
        id: 45,
        name: "Gajar Halwa",
        category: "Desserts",
        price: 160,
        rating: 4.8,
        orders: 1270,
        description: "Rich carrot dessert cooked with milk, nuts and aromatic spices.",
        image: "images/foods/gajar-halwa.png"
    },


    /* =====================================================
       BROWNIE — 5 FOODS
       ===================================================== */

    {
        id: 46,
        name: "Classic Chocolate Brownie",
        category: "Brownie",
        price: 150,
        rating: 4.6,
        orders: 1180,
        description: "Rich fudgy chocolate brownie with a soft moist center.",
        image: "images/foods/classic-chocolate-brownie.png"
    },

    {
        id: 47,
        name: "Walnut Brownie",
        category: "Brownie",
        price: 180,
        rating: 4.7,
        orders: 970,
        description: "Fudgy chocolate brownie filled with crunchy walnuts.",
        image: "images/foods/walnut-brownie.png"
    },

    {
        id: 48,
        name: "Double Chocolate Brownie",
        category: "Brownie",
        price: 190,
        rating: 4.8,
        orders: 1340,
        description: "Decadent brownie made with rich double chocolate.",
        image: "images/foods/double-chocolate-brownie.png"
    },

    {
        id: 49,
        name: "Fudge Brownie",
        category: "Brownie",
        price: 170,
        rating: 4.5,
        orders: 1090,
        description: "Dense and fudgy chocolate brownie with a rich cocoa flavor.",
        image: "images/foods/fudge-brownie.png"
    },

    {
        id: 50,
        name: "Choco Chip Brownie",
        category: "Brownie",
        price: 180,
        rating: 4.4,
        orders: 910,
        description: "Soft chocolate brownie loaded with delicious chocolate chips.",
        image: "images/foods/choco-chip-brownie.png"
    }

];