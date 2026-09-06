/* =================================
   YUMMY TUMMY
   AUTH / USER STATE
================================= */


/* =================================
   STORAGE KEY
================================= */

const USER_STORAGE_KEY =
    "yummyTummyUser";


/* =================================
   GET CURRENT USER
================================= */

function getCurrentUser() {

    try {

        const user =
            JSON.parse(
                localStorage.getItem(
                    USER_STORAGE_KEY
                )
            );

        if (
            !user ||
            typeof user !== "object"
        ) {

            return null;

        }

        return user;

    } catch (error) {

        console.error(
            "Unable to read user state:",
            error
        );

        return null;

    }

}


/* =================================
   CHECK LOGIN STATE
================================= */

function isUserLoggedIn() {

    return (
        getCurrentUser() !== null
    );

}


/* =================================
   SAVE CURRENT USER
================================= */

function saveCurrentUser(user) {

    if (
        !user ||
        typeof user !== "object"
    ) {

        return false;

    }

    try {

        localStorage.setItem(
            USER_STORAGE_KEY,
            JSON.stringify(user)
        );

        return true;

    } catch (error) {

        console.error(
            "Unable to save user state:",
            error
        );

        return false;

    }

}


/* =================================
   LOGIN USER
================================= */

function loginUser(user) {

    return saveCurrentUser(
        user
    );

}


/* =================================
   LOGOUT USER
================================= */

function logoutUser() {

    try {

        localStorage.removeItem(
            USER_STORAGE_KEY
        );

        updateHeaderUserState();

        return true;

    } catch (error) {

        console.error(
            "Unable to logout user:",
            error
        );

        return false;

    }

}


/* =================================
   GET USER NAME
================================= */

function getCurrentUserName() {

    const user =
        getCurrentUser();

    if (!user) {

        return "";

    }

    return (
        user.name ||
        user.fullName ||
        user.username ||
        ""
    );

}


/* =================================
   GET USER EMAIL
================================= */

function getCurrentUserEmail() {

    const user =
        getCurrentUser();

    if (!user) {

        return "";

    }

    return user.email || "";

}


/* =================================
   UPDATE HEADER USER STATE
================================= */

function updateHeaderUserState() {

    const loginLinks =
        document.querySelectorAll(
            ".header-login"
        );

    const loggedIn =
        isUserLoggedIn();


    loginLinks.forEach(
        (loginLink) => {

            if (loggedIn) {

                loginLink.textContent =
                    "Profile";

                loginLink.href =
                    "profile.html";

                loginLink.classList.add(
                    "header-user-active"
                );

            } else {

                loginLink.textContent =
                    "Login";

                loginLink.href =
                    "login.html";

                loginLink.classList.remove(
                    "header-user-active"
                );

            }

        }
    );

}


/* =================================
   INITIALIZE
================================= */

function initializeUserState() {

    updateHeaderUserState();

}


/* =================================
   START
================================= */

initializeUserState();