document.addEventListener("DOMContentLoaded", function () {
    initializeProfilePage();
});


function initializeProfilePage() {
    const profileName =
        document.getElementById("profileName");

    const profileEmail =
        document.getElementById("profileEmail");

    const profileMobile =
        document.getElementById("profileMobile");


    if (
        !profileName ||
        !profileEmail ||
        !profileMobile
    ) {
        return;
    }


    const isLoggedIn =
        localStorage.getItem("yummyTummyLoggedIn") === "true";


    if (!isLoggedIn) {
        window.location.href = "login.html";
        return;
    }


    const storedUser =
        localStorage.getItem("yummyTummyUser");


    if (!storedUser) {
        localStorage.removeItem("yummyTummyLoggedIn");

        window.location.href = "login.html";
        return;
    }


    let user;


    try {
        user = JSON.parse(storedUser);
    } catch (error) {
        localStorage.removeItem("yummyTummyLoggedIn");
        localStorage.removeItem("yummyTummyUser");

        window.location.href = "login.html";
        return;
    }


    if (!user || typeof user !== "object") {
        localStorage.removeItem("yummyTummyLoggedIn");
        localStorage.removeItem("yummyTummyUser");

        window.location.href = "login.html";
        return;
    }


    profileName.textContent =
        user.name || "Not Available";

    profileEmail.textContent =
        user.email || "Not Available";

    profileMobile.textContent =
        user.mobile || "Not Available";
}