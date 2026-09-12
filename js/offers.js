document.addEventListener("DOMContentLoaded", () => {
    initializeOffers();
});


function initializeOffers() {
    const offerCards = document.querySelectorAll(
        "[data-offer-code]"
    );

    const offerMessage = document.getElementById(
        "offerMessage"
    );

    if (
        offerCards.length === 0 ||
        !offerMessage
    ) {
        return;
    }


    offerCards.forEach((card) => {

        const applyButton = card.querySelector(
            "[data-apply-offer]"
        );

        if (!applyButton) {
            return;
        }


        applyButton.addEventListener("click", () => {

            const offerCode =
                card.getAttribute("data-offer-code");

            const offerName =
                card.getAttribute("data-offer-name");

            if (!offerCode) {
                return;
            }


            localStorage.setItem(
                "yummyTummyAppliedOffer",
                JSON.stringify({
                    code: offerCode,
                    name: offerName || ""
                })
            );


            updateOfferButtons(
                offerCards,
                offerCode
            );


            offerMessage.textContent =
                `Offer ${offerCode} applied successfully.`;

            offerMessage.classList.add(
                "offer-success"
            );

        });

    });


    loadAppliedOffer(
        offerCards,
        offerMessage
    );
}


function loadAppliedOffer(
    offerCards,
    offerMessage
) {
    const savedOffer =
        localStorage.getItem(
            "yummyTummyAppliedOffer"
        );

    if (!savedOffer) {
        return;
    }


    try {

        const appliedOffer =
            JSON.parse(savedOffer);

        if (
            !appliedOffer ||
            !appliedOffer.code
        ) {
            return;
        }


        updateOfferButtons(
            offerCards,
            appliedOffer.code
        );


        offerMessage.textContent =
            `Offer ${appliedOffer.code} is applied.`;

        offerMessage.classList.add(
            "offer-success"
        );

    } catch (error) {

        localStorage.removeItem(
            "yummyTummyAppliedOffer"
        );

    }
}


function updateOfferButtons(
    offerCards,
    appliedCode
) {

    offerCards.forEach((card) => {

        const offerCode =
            card.getAttribute(
                "data-offer-code"
            );

        const applyButton =
            card.querySelector(
                "[data-apply-offer]"
            );

        if (!applyButton) {
            return;
        }


        if (offerCode === appliedCode) {

            applyButton.textContent =
                "Applied";

            applyButton.classList.add(
                "offer-applied"
            );

        } else {

            applyButton.textContent =
                "Apply Offer";

            applyButton.classList.remove(
                "offer-applied"
            );

        }

    });
}