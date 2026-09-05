/* =================================
   LOGIN
================================= */

const loginForm =
    document.querySelector("#loginForm");

const loginEmail =
    document.querySelector("#loginEmail");

const loginPassword =
    document.querySelector("#loginPassword");

const loginEmailError =
    document.querySelector("#loginEmailError");

const loginPasswordError =
    document.querySelector("#loginPasswordError");

const loginMessage =
    document.querySelector("#loginMessage");

const passwordToggle =
    document.querySelector("#passwordToggle");

const forgotPassword =
    document.querySelector("#forgotPassword");


/* =================================
   CLEAR ERRORS
================================= */

function clearLoginErrors() {

    if (loginEmailError) {
        loginEmailError.textContent = "";
    }

    if (loginPasswordError) {
        loginPasswordError.textContent = "";
    }

    if (loginMessage) {
        loginMessage.textContent = "";
    }

}


/* =================================
   VALIDATE LOGIN
================================= */

function validateLogin() {

    clearLoginErrors();

    let isValid = true;


    const emailValue =
        loginEmail
            ? loginEmail.value.trim()
            : "";


    const passwordValue =
        loginPassword
            ? loginPassword.value
            : "";


    if (!emailValue) {

        if (loginEmailError) {
            loginEmailError.textContent =
                "Please enter your email or mobile number.";
        }

        isValid = false;

    }


    if (!passwordValue) {

        if (loginPasswordError) {
            loginPasswordError.textContent =
                "Please enter your password.";
        }

        isValid = false;

    }


    if (
        passwordValue &&
        passwordValue.length < 6
    ) {

        if (loginPasswordError) {
            loginPasswordError.textContent =
                "Password must contain at least 6 characters.";
        }

        isValid = false;

    }


    return isValid;

}


/* =================================
   PASSWORD TOGGLE
================================= */

function initializePasswordToggle() {

    if (
        !passwordToggle ||
        !loginPassword
    ) {
        return;
    }


    passwordToggle.addEventListener(
        "click",
        () => {

            const isPassword =
                loginPassword.type === "password";


            loginPassword.type =
                isPassword
                    ? "text"
                    : "password";


            passwordToggle.textContent =
                isPassword
                    ? "Hide"
                    : "Show";

        }
    );

}


/* =================================
   FORGOT PASSWORD
================================= */

function initializeForgotPassword() {

    if (!forgotPassword) {
        return;
    }


    forgotPassword.addEventListener(
        "click",
        (event) => {

            event.preventDefault();


            if (loginMessage) {

                loginMessage.textContent =
                    "Password recovery will be available soon.";

            }

        }
    );

}


/* =================================
   LOGIN SUBMIT
================================= */

function initializeLoginForm() {

    if (!loginForm) {
        return;
    }


    loginForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const isValid =
                validateLogin();


            if (!isValid) {
                return;
            }


            if (loginMessage) {

                loginMessage.textContent =
                    "Login system will be connected in the next authentication part.";

            }

        }
    );

}


/* =================================
   INITIALIZE
================================= */

function initializeLogin() {

    initializePasswordToggle();

    initializeForgotPassword();

    initializeLoginForm();

}


initializeLogin();