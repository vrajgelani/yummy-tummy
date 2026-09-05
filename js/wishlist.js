/* =================================
   WISHLIST
================================= */

const WISHLIST_STORAGE_KEY =
    "yummyTummyWishlist";


/* =================================
   GET WISHLIST
================================= */

function getWishlist() {

    const savedWishlist =
        localStorage.getItem(
            WISHLIST_STORAGE_KEY
        );

    if (!savedWishlist) {
        return [];
    }

    try {

        const wishlist =
            JSON.parse(savedWishlist);

        if (!Array.isArray(wishlist)) {
            return [];
        }

        return wishlist;

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
   CHECK WISHLIST
================================= */

function isInWishlist(foodId) {

    const wishlist =
        getWishlist();

    return wishlist.some(
        (food) =>
            food.id === foodId
    );

}


/* =================================
   ADD TO WISHLIST
================================= */

function addToWishlist(food) {

    if (!food || !food.id) {
        return false;
    }

    const wishlist =
        getWishlist();


    const alreadyExists =
        wishlist.some(
            (item) =>
                item.id === food.id
        );


    if (alreadyExists) {
        return false;
    }


    wishlist.push({
        id: food.id,
        name: food.name,
        category: food.category,
        restaurantId: food.restaurantId,
        restaurant: food.restaurant,
        price: food.price,
        image: food.image
    });


    saveWishlist(wishlist);

    return true;

}


/* =================================
   REMOVE FROM WISHLIST
================================= */

function removeFromWishlist(foodId) {

    const wishlist =
        getWishlist();


    const updatedWishlist =
        wishlist.filter(
            (food) =>
                food.id !== foodId
        );


    saveWishlist(updatedWishlist);

    return updatedWishlist;

}


/* =================================
   CLEAR WISHLIST
================================= */

function clearWishlist() {

    localStorage.removeItem(
        WISHLIST_STORAGE_KEY
    );

}


/* =================================
   WISHLIST COUNT
================================= */

function getWishlistCount() {

    return getWishlist().length;

}