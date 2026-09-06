/* =================================
   YUMMY TUMMY
   PROFILE
================================= */


/* =================================
   PROFILE ELEMENTS
================================= */

const profileName =
    document.querySelector(
        "#profileName"
    );


const profileEmail =
    document.querySelector(
        "#profileEmail"
    );


const profileDetailName =
    document.querySelector(
        "#profileDetailName"
    );


const profileDetailEmail =
    document.querySelector(
        "#profileDetailEmail"
    );


const profileInitial =
    document.querySelector(
        "#profileInitial"
    );


const logoutButton =
    document.querySelector(
        "#logoutButton"
    );


/* =================================
   SHOW USER INFORMATION
================================= */

function showProfileUser() {

    if (
        typeof getCurrentUser !==
        "function"
    ) {

        console.error(
            "auth.js is not loaded."
        );

        return;

    }


    const user =
        getCurrentUser();


    if (!user) {

        window.location.href =
            "login.html";

        return;

    }


    const userName =
        user.name ||
        user.fullName ||
        user.username ||
        "User";


    const userEmail =
        user.email ||
        "-";


    /* ---------------------------------
       PROFILE HEADER
    --------------------------------- */

    if (profileName) {

        profileName.textContent =
            userName;

    }


    if (profileEmail) {

        profileEmail.textContent =
            userEmail;

    }


    /* ---------------------------------
       PROFILE DETAILS
    --------------------------------- */

    if (profileDetailName) {

        profileDetailName.textContent =
            userName;

    }


    if (profileDetailEmail) {

        profileDetailEmail.textContent =
            userEmail;

    }


    /* ---------------------------------
       PROFILE INITIAL
    --------------------------------- */

    if (profileInitial) {

        profileInitial.textContent =
            userName
                .trim()
                .charAt(0)
                .toUpperCase() || "U";

    }

}


/* =================================
   LOGOUT
================================= */

function initializeLogout() {

    if (!logoutButton) {

        return;

    }


    logoutButton.addEventListener(
        "click",
        () => {

            if (
                typeof logoutUser !==
                "function"
            ) {

                console.error(
                    "logoutUser function is not available."
                );

                return;

            }


            const loggedOut =
                logoutUser();


            if (!loggedOut) {

                return;

            }


            window.location.href =
                "index.html";

        }
    );

}


/* =================================
   INITIALIZE PROFILE
================================= */

function initializeProfile() {

    showProfileUser();

    initializeLogout();

}


/* =================================
   START
================================= */

initializeProfile();