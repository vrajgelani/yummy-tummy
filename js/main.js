/* =================================
   LOGIN CHECK
================================= */

const PROTECTED_PAGES = [
    "profile.html",
    "cart.html",
    "wishlist.html",
    "checkout.html",
    "orders.html"
];


/* =================================
   CHECK CURRENT USER
================================= */

function isUserLoggedIn() {

    try {

        const user =
            JSON.parse(
                localStorage.getItem(
                    "yummyTummyUser"
                )
            );

        return Boolean(user);

    } catch (error) {

        console.error(
            "Unable to check login state:",
            error
        );

        return false;

    }

}


/* =================================
   GET CURRENT PAGE
================================= */

function getCurrentPageName() {

    const path =
        window.location.pathname;

    return path
        .split("/")
        .pop()
        .toLowerCase();

}


/* =================================
   LOGIN PROTECTION
================================= */

function checkLoginRequired() {

    const currentPage =
        getCurrentPageName();


    if (
        !PROTECTED_PAGES.includes(
            currentPage
        )
    ) {

        return;

    }


    if (
        isUserLoggedIn()
    ) {

        return;

    }


    const loginUrl =
        `login.html?redirect=${encodeURIComponent(
            currentPage
        )}`;


    window.location.replace(
        loginUrl
    );

}


/* =================================
   START LOGIN CHECK
================================= */

checkLoginRequired();