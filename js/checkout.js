 /* ==================================================
    YUMMY TUMMY
    CHECKOUT ADDRESS SELECTION
    ================================================== */


/* ==================== GET SAVED ADDRESSES ==================== */

function getSavedAddresses() {

    const storedAddresses =
        localStorage.getItem(
            "yummyTummyAddresses"
        );


    if (!storedAddresses) {
        return [];
    }


    try {

        const addresses =
            JSON.parse(
                storedAddresses
            );


        if (!Array.isArray(addresses)) {
            return [];
        }


        return addresses;

    } catch (error) {

        return [];

    }

}


/* ==================== GET SELECTED ADDRESS ==================== */

function getSelectedAddress() {

    const selectedAddress =
        localStorage.getItem(
            "yummyTummySelectedAddress"
        );


    if (!selectedAddress) {
        return null;
    }


    try {

        const address =
            JSON.parse(
                selectedAddress
            );


        if (
            !address ||
            typeof address !== "object"
        ) {
            return null;
        }


        return address;

    } catch (error) {

        return null;

    }

}


/* ==================== SAVE SELECTED ADDRESS ==================== */

function saveSelectedAddress(address) {

    if (
        !address ||
        typeof address !== "object"
    ) {
        return;
    }


    localStorage.setItem(
        "yummyTummySelectedAddress",
        JSON.stringify(address)
    );

}


/* ==================== FORMAT ADDRESS ==================== */

function formatCheckoutAddress(address) {

    if (!address) {
        return "";
    }


    const addressParts = [];


    if (address.address) {
        addressParts.push(
            address.address
        );
    }


    if (address.area) {
        addressParts.push(
            address.area
        );
    }


    if (address.city) {
        addressParts.push(
            address.city
        );
    }


    if (address.state) {
        addressParts.push(
            address.state
        );
    }


    if (address.pincode) {
        addressParts.push(
            address.pincode
        );
    }


    return addressParts.join(
        ", "
    );

}


/* ==================== DISPLAY SELECTED ADDRESS ==================== */

function displaySelectedCheckoutAddress() {

    const nameElement =
        document.getElementById(
            "checkoutAddressName"
        );


    const addressElement =
        document.getElementById(
            "checkoutAddressText"
        );


    const mobileElement =
        document.getElementById(
            "checkoutAddressMobile"
        );


    const selectedAddress =
        getSelectedAddress();


    if (!selectedAddress) {

        if (nameElement) {

            nameElement.textContent =
                "Select Delivery Address";

        }


        if (addressElement) {

            addressElement.textContent =
                "Your saved delivery address will appear here.";

        }


        if (mobileElement) {

            mobileElement.textContent =
                "Mobile number";

        }


        return;

    }


    if (nameElement) {

        nameElement.textContent =
            selectedAddress.name ||
            "Delivery Address";

    }


    if (addressElement) {

        const formattedAddress =
            formatCheckoutAddress(
                selectedAddress
            );


        addressElement.textContent =
            formattedAddress ||
            "Address details unavailable.";

    }


    if (mobileElement) {

        mobileElement.textContent =
            selectedAddress.mobile
                ? `Mobile: ${selectedAddress.mobile}`
                : "Mobile number unavailable.";

    }

}


/* ==================== AUTO SELECT ADDRESS ==================== */

function autoSelectAddress() {

    const selectedAddress =
        getSelectedAddress();


    if (selectedAddress) {
        return;
    }


    const addresses =
        getSavedAddresses();


    if (!addresses.length) {
        return;
    }


    const firstAddress =
        addresses[0];


    saveSelectedAddress(
        firstAddress
    );

}


/* ==================== INITIALIZE ADDRESS ==================== */

function initializeCheckoutAddress() {

    const addressName =
        document.getElementById(
            "checkoutAddressName"
        );


    if (!addressName) {
        return;
    }


    autoSelectAddress();

    displaySelectedCheckoutAddress();

}


/* ==================== PAGE INITIALIZATION ==================== */

document.addEventListener(
    "DOMContentLoaded",
    initializeCheckoutAddress
);