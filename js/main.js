"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* ================================
       ACTIVE NAVIGATION
    ================================= */

    const currentPage = window.location.pathname
        .split("/")
        .pop();

    const navigationLinks = document.querySelectorAll(".nav-link");

    navigationLinks.forEach(function (link) {

        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });


    /* ================================
       FOOD CATEGORY CAROUSEL
    ================================= */

    const categoryCarousel =
        document.querySelector("#category-carousel");

    const previousButton =
        document.querySelector("#category-prev");

    const nextButton =
        document.querySelector("#category-next");


    if (
        categoryCarousel &&
        previousButton &&
        nextButton
    ) {

        const getScrollAmount = function () {

            const categoryItem =
                categoryCarousel.querySelector(".category-item");

            if (!categoryItem) {
                return 300;
            }

            const itemWidth =
                categoryItem.getBoundingClientRect().width;

            return itemWidth + 34;
        };


        const updateNavigationButtons = function () {

            const maximumScroll =
                categoryCarousel.scrollWidth -
                categoryCarousel.clientWidth;

            previousButton.disabled =
                categoryCarousel.scrollLeft <= 5;

            nextButton.disabled =
                categoryCarousel.scrollLeft >=
                maximumScroll - 5;
        };


        previousButton.addEventListener(
            "click",
            function () {

                categoryCarousel.scrollBy({
                    left: -getScrollAmount(),
                    behavior: "smooth"
                });

            }
        );


        nextButton.addEventListener(
            "click",
            function () {

                categoryCarousel.scrollBy({
                    left: getScrollAmount(),
                    behavior: "smooth"
                });

            }
        );


        categoryCarousel.addEventListener(
            "scroll",
            updateNavigationButtons
        );


        window.addEventListener(
            "resize",
            updateNavigationButtons
        );


        updateNavigationButtons();

    }


    console.log(
        "Yummy Tummy Customer Panel loaded successfully."
    );

});