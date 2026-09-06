/* =================================
   YUMMY TUMMY
   LOGIN
================================= */


/* =================================
   LOGIN FORM ELEMENTS
================================= */

const loginForm =
    document.querySelector("#loginForm");


const loginEmail =
    document.querySelector("#loginEmail");


const loginPassword =
    document.querySelector("#loginPassword");


const loginMessage =
    document.querySelector("#loginMessage");


/* =================================
   SHOW MESSAGE
================================= */

function showLoginMessage(
    message,
    type = "error"
) {

    if (!loginMessage) {
        return;
    }

    loginMessage.textContent =
        message;

    loginMessage.classList.remove(
        "success",
        "error"
    );

    loginMessage.classList.add(
        type
    );
}


/* =================================
   HANDLE LOGIN
================================= */

function handleLogin(event) {

    event.preventDefault();


    const email =
        loginEmail
            ? loginEmail.value.trim()
            : "";


    const password =
        loginPassword
            ? loginPassword.value.trim()
            : "";


    /* =============================
       VALIDATION
    ============================= */

    if (!email) {

        showLoginMessage(
            "Please enter your email."
        );

        return;
    }


    if (!password) {

        showLoginMessage(
            "Please enter your password."
        );

        return;
    }


    /* =============================
       CREATE USER
    ============================= */

    const existingUser =
        typeof getCurrentUser ===
        "function"
            ? getCurrentUser()
            : null;


    const user = {

        name:
            existingUser?.name ||
            email.split("@")[0],

        email: email

    };


    /* =============================
       CHECK LOGIN FUNCTION
    ============================= */

    if (
        typeof loginUser !==
        "function"
    ) {

        console.error(
            "loginUser() is not available."
        );

        showLoginMessage(
            "Login system is not available."
        );

        return;
    }


    /* =============================
       SAVE USER
    ============================= */

    const saved =
        loginUser(user);


    if (!saved) {

        showLoginMessage(
            "Unable to save login information."
        );

        return;
    }


    /* =============================
       SUCCESS
    ============================= */

    showLoginMessage(
        "Login successful. Redirecting...",
        "success"
    );


    /* =============================
       REDIRECT
    ============================= */

    setTimeout(
        () => {

            window.location.href =
                "index.html";

        },
        500
    );

}


/* =================================
   LOGIN FORM EVENT
================================= */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        handleLogin
    );

}