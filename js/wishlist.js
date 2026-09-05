/* =================================
   WISHLIST
================================= */

const WISHLIST_STORAGE_KEY =
    "yummyTummyWishlist";


/* =================================
   GET WISHLIST
================================= */

function getWishlist() {

    try {

        const wishlist =
            JSON.parse(
                localStorage.getItem(
                    WISHLIST_STORAGE_KEY
                )
            );


        return Array.isArray(wishlist)
            ? wishlist
            : [];

    } catch (error) {

        console.error(
            "Unable to read wishlist:",
            error
        );

        return [];
    }
}


/* =================================
   SAVE WISHLIST
================================= */

function saveWishlist(wishlist) {

    localStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(wishlist)
    );
}


/* =================================
   GET WISHLIST FOODS
================================= */

function getWishlistFoods() {

    const wishlistIds =
        getWishlist();


    if (
        typeof restaurantFoods ===
        "undefined"
    ) {

        console.error(
            "restaurantFoods is not available."
        );

        return [];
    }


    return restaurantFoods.filter(
        (food) =>
            wishlistIds.includes(
                food.id
            )
    );
}


/* =================================
   WISHLIST ELEMENTS
================================= */

const wishlistFoodGrid =
    document.querySelector(
        "#wishlistFoodGrid"
    );


const wishlistEmpty =
    document.querySelector(
        "#wishlistEmpty"
    );


/* =================================
   DISPLAY WISHLIST
================================= */

function displayWishlist() {

    if (!wishlistFoodGrid) {
        return;
    }


    const foods =
        getWishlistFoods();


    wishlistFoodGrid.replaceChildren();


    if (foods.length === 0) {

        wishlistFoodGrid.hidden =
            true;


        if (wishlistEmpty) {

            wishlistEmpty.hidden =
                false;
        }


        return;
    }


    wishlistFoodGrid.hidden =
        false;


    if (wishlistEmpty) {

        wishlistEmpty.hidden =
            true;
    }


    foods.forEach(
        (food) => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "wishlist-food-card";


            /* =========================
               IMAGE
            ========================= */

            const image =
                document.createElement(
                    "img"
                );


            image.className =
                "wishlist-food-image";


            image.src =
                food.image;


            image.alt =
                food.name;


            image.loading =
                "lazy";


            /* =========================
               CONTENT
            ========================= */

            const content =
                document.createElement(
                    "div"
                );


            content.className =
                "wishlist-food-content";


            /* CATEGORY */

            const category =
                document.createElement(
                    "p"
                );


            category.className =
                "wishlist-food-category";


            category.textContent =
                food.category;


            /* NAME */

            const name =
                document.createElement(
                    "h2"
                );


            name.className =
                "wishlist-food-name";


            name.textContent =
                food.name;


            /* RESTAURANT */

            const restaurant =
                document.createElement(
                    "p"
                );


            restaurant.className =
                "wishlist-food-restaurant";


            restaurant.textContent =
                food.restaurant;


            /* =========================
               FOOTER
            ========================= */

            const footer =
                document.createElement(
                    "div"
                );


            footer.className =
                "wishlist-food-footer";


            /* PRICE */

            const price =
                document.createElement(
                    "span"
                );


            price.className =
                "wishlist-food-price";


            price.textContent =
                `₹${food.price}`;


            /* ACTIONS */

            const actions =
                document.createElement(
                    "div"
                );


            actions.className =
                "wishlist-food-actions";


            /* VIEW BUTTON */

            const viewButton =
                document.createElement(
                    "a"
                );


            viewButton.className =
                "wishlist-food-view-button";


            viewButton.href =
                `food-details.html?food=${encodeURIComponent(
                    food.id
                )}`;


            viewButton.textContent =
                "View Food";


            /* REMOVE BUTTON */

            const removeButton =
                document.createElement(
                    "button"
                );


            removeButton.className =
                "wishlist-food-remove-button";


            removeButton.type =
                "button";


            removeButton.textContent =
                "Remove";


            removeButton.addEventListener(
                "click",
                () => {

                    removeFromWishlist(
                        food.id
                    );

                }
            );


            /* =========================
               APPEND ACTIONS
            ========================= */

            actions.append(
                viewButton,
                removeButton
            );


            footer.append(
                price,
                actions
            );


            content.append(
                category,
                name,
                restaurant,
                footer
            );


            card.append(
                image,
                content
            );


            wishlistFoodGrid.appendChild(
                card
            );

        }
    );
}


/* =================================
   REMOVE FROM WISHLIST
================================= */

function removeFromWishlist(
    foodId
) {

    const wishlist =
        getWishlist();


    const updatedWishlist =
        wishlist.filter(
            (id) =>
                id !== foodId
        );


    saveWishlist(
        updatedWishlist
    );


    displayWishlist();
}


/* =================================
   INITIALIZE WISHLIST
================================= */

function initializeWishlist() {

    displayWishlist();
}


initializeWishlist();