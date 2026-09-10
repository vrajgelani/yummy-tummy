"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const navMenu = document.getElementById("navMenu");
    const navMenuToggle = document.getElementById("navMenuToggle");

    if (navMenu && navMenuToggle) {
        navMenuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("is-open");

            navMenuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });
    }

    console.log("Yummy Tummy frontend loaded successfully.");
});