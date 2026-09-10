"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname.split("/").pop();

    const navigationLinks = document.querySelectorAll(".nav-link");

    navigationLinks.forEach(function (link) {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });

    console.log("Yummy Tummy Customer Panel loaded successfully.");
});