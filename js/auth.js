document.addEventListener("DOMContentLoaded", function () {
    initializeAuthentication();
});


function initializeAuthentication() {
    updateAuthenticationUI();

    redirectAuthenticatedUserFromAuthPages();

    initializeLoginForm();
    initializeRegisterForm();

    initializeLogoutLinks();
}


function getRegisteredUsers() {
    const users = localStorage.getItem("yummyTummyUsers");

    if (!users) {
        return [];
    }

    try {
        const parsedUsers = JSON.parse(users);

        if (Array.isArray(parsedUsers)) {
            return parsedUsers;
        }

        return [];
    } catch (error) {
        return [];
    }
}


function saveRegisteredUsers(users) {
    localStorage.setItem(
        "yummyTummyUsers",
        JSON.stringify(users)
    );
}


function getCurrentUser() {
    const currentUser = localStorage.getItem("yummyTummyUser");

    if (!currentUser) {
        return null;
    }

    try {
        return JSON.parse(currentUser);
    } catch (error) {
        return null;
    }
}


function isUserLoggedIn() {
    return (
        localStorage.getItem("yummyTummyLoggedIn") === "true"
    );
}


function setUserLoggedIn(user) {
    localStorage.setItem(
        "yummyTummyLoggedIn",
        "true"
    );

    localStorage.setItem(
        "yummyTummyUser",
        JSON.stringify(user)
    );
}


function logoutUser() {
    localStorage.removeItem("yummyTummyLoggedIn");
    localStorage.removeItem("yummyTummyUser");

    updateAuthenticationUI();

    window.location.href = "index.html";
}


function updateAuthenticationUI() {
    const loginLinks =
        document.querySelectorAll(".login-link");

    const registerLinks =
        document.querySelectorAll(".register-link");

    const profileLinks =
        document.querySelectorAll(".profile-link");

    const loggedIn = isUserLoggedIn();

    loginLinks.forEach(function (link) {
        link.classList.toggle(
            "hidden",
            loggedIn
        );
    });

    registerLinks.forEach(function (link) {
        link.classList.toggle(
            "hidden",
            loggedIn
        );
    });

    profileLinks.forEach(function (link) {
        link.classList.toggle(
            "hidden",
            !loggedIn
        );
    });
}


function redirectAuthenticatedUserFromAuthPages() {
    if (!isUserLoggedIn()) {
        return;
    }

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    if (
        currentPage === "login.html" ||
        currentPage === "register.html"
    ) {
        window.location.href = "index.html";
    }
}


function validateEmail(email) {
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}


function validateMobile(mobile) {
    const mobilePattern =
        /^[0-9]{10}$/;

    return mobilePattern.test(mobile);
}


function validatePassword(password) {
    return password.length >= 6;
}


function initializeLoginForm() {
    const loginForm =
        document.getElementById("loginForm");

    if (!loginForm) {
        return;
    }

    loginForm.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();

            const emailInput =
                document.getElementById("loginEmail");

            const passwordInput =
                document.getElementById("loginPassword");

            const emailError =
                document.getElementById(
                    "loginEmailError"
                );

            const passwordError =
                document.getElementById(
                    "loginPasswordError"
                );

            const message =
                document.getElementById(
                    "loginMessage"
                );

            const email =
                emailInput.value
                    .trim()
                    .toLowerCase();

            const password =
                passwordInput.value;

            emailError.textContent = "";
            passwordError.textContent = "";
            message.textContent = "";

            let isValid = true;


            if (!email) {
                emailError.textContent =
                    "Please enter your email address.";

                isValid = false;
            } else if (!validateEmail(email)) {
                emailError.textContent =
                    "Please enter a valid email address.";

                isValid = false;
            }


            if (!password) {
                passwordError.textContent =
                    "Please enter your password.";

                isValid = false;
            }


            if (!isValid) {
                return;
            }


            const users =
                getRegisteredUsers();

            const matchingUser =
                users.find(function (user) {
                    return (
                        user.email === email &&
                        user.password === password
                    );
                });


            if (!matchingUser) {
                message.textContent =
                    "Invalid email or password.";

                return;
            }


            setUserLoggedIn(matchingUser);

            updateAuthenticationUI();

            message.textContent =
                "Login successful.";

            window.setTimeout(
                function () {
                    window.location.href =
                        "index.html";
                },
                500
            );
        }
    );
}


function initializeRegisterForm() {
    const registerForm =
        document.getElementById("registerForm");

    if (!registerForm) {
        return;
    }

    registerForm.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();

            const nameInput =
                document.getElementById(
                    "registerName"
                );

            const emailInput =
                document.getElementById(
                    "registerEmail"
                );

            const mobileInput =
                document.getElementById(
                    "registerMobile"
                );

            const passwordInput =
                document.getElementById(
                    "registerPassword"
                );

            const confirmPasswordInput =
                document.getElementById(
                    "registerConfirmPassword"
                );


            const nameError =
                document.getElementById(
                    "registerNameError"
                );

            const emailError =
                document.getElementById(
                    "registerEmailError"
                );

            const mobileError =
                document.getElementById(
                    "registerMobileError"
                );

            const passwordError =
                document.getElementById(
                    "registerPasswordError"
                );

            const confirmPasswordError =
                document.getElementById(
                    "registerConfirmPasswordError"
                );

            const message =
                document.getElementById(
                    "registerMessage"
                );


            const name =
                nameInput.value.trim();

            const email =
                emailInput.value
                    .trim()
                    .toLowerCase();

            const mobile =
                mobileInput.value.trim();

            const password =
                passwordInput.value;

            const confirmPassword =
                confirmPasswordInput.value;


            nameError.textContent = "";
            emailError.textContent = "";
            mobileError.textContent = "";
            passwordError.textContent = "";
            confirmPasswordError.textContent = "";
            message.textContent = "";


            let isValid = true;


            if (!name) {
                nameError.textContent =
                    "Please enter your full name.";

                isValid = false;
            } else if (name.length < 2) {
                nameError.textContent =
                    "Name must contain at least 2 characters.";

                isValid = false;
            }


            if (!email) {
                emailError.textContent =
                    "Please enter your email address.";

                isValid = false;
            } else if (!validateEmail(email)) {
                emailError.textContent =
                    "Please enter a valid email address.";

                isValid = false;
            }


            if (!mobile) {
                mobileError.textContent =
                    "Please enter your mobile number.";

                isValid = false;
            } else if (!validateMobile(mobile)) {
                mobileError.textContent =
                    "Mobile number must contain exactly 10 digits.";

                isValid = false;
            }


            if (!password) {
                passwordError.textContent =
                    "Please create a password.";

                isValid = false;
            } else if (!validatePassword(password)) {
                passwordError.textContent =
                    "Password must contain at least 6 characters.";

                isValid = false;
            }


            if (!confirmPassword) {
                confirmPasswordError.textContent =
                    "Please confirm your password.";

                isValid = false;
            }


            if (
                confirmPassword &&
                password !== confirmPassword
            ) {
                confirmPasswordError.textContent =
                    "Passwords do not match.";

                isValid = false;
            }


            if (!isValid) {
                return;
            }


            const users =
                getRegisteredUsers();


            const existingUser =
                users.find(function (user) {
                    return user.email === email;
                });


            if (existingUser) {
                message.textContent =
                    "An account with this email already exists. Please login.";

                return;
            }


            const newUser = {
                id: Date.now().toString(),
                name: name,
                email: email,
                mobile: mobile,
                password: password
            };


            users.push(newUser);

            saveRegisteredUsers(users);

            setUserLoggedIn(newUser);

            updateAuthenticationUI();

            message.textContent =
                "Registration successful.";


            window.setTimeout(
                function () {
                    window.location.href =
                        "index.html";
                },
                500
            );
        }
    );
}


function initializeLogoutLinks() {
    const logoutLinks =
        document.querySelectorAll(".logout-link");

    logoutLinks.forEach(function (link) {
        link.addEventListener(
            "click",
            function (event) {
                event.preventDefault();

                logoutUser();
            }
        );
    });
}