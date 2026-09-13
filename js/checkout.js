/* =========================================================
   YUMMY TUMMY
   CHECKOUT PAGE
   ADDRESS + ORDER ITEMS + COUPON
   ========================================================= */


/* =========================================================
   GET SAVED ADDRESSES
   ========================================================= */

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


        if (
            !Array.isArray(
                addresses
            )
        ) {
            return [];
        }


        return addresses;

    } catch (error) {

        return [];

    }

}


/* =========================================================
   GET SELECTED ADDRESS
   ========================================================= */

function getSelectedAddress() {

    const storedAddress =
        localStorage.getItem(
            "yummyTummySelectedAddress"
        );


    if (!storedAddress) {
        return null;
    }


    try {

        const address =
            JSON.parse(
                storedAddress
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


/* =========================================================
   SAVE SELECTED ADDRESS
   ========================================================= */

function saveSelectedAddress(
    address
) {

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


/* =========================================================
   FORMAT ADDRESS
   ========================================================= */

function formatCheckoutAddress(
    address
) {

    if (!address) {
        return "";
    }


    const parts = [];


    if (address.house) {

        parts.push(
            address.house
        );

    }


    if (address.area) {

        parts.push(
            address.area
        );

    }


    if (
        address.address &&
        !address.house
    ) {

        parts.push(
            address.address
        );

    }


    if (address.city) {

        parts.push(
            address.city
        );

    }


    if (address.state) {

        parts.push(
            address.state
        );

    }


    if (address.pincode) {

        parts.push(
            address.pincode
        );

    }


    return parts.join(
        ", "
    );

}


/* =========================================================
   DISPLAY SELECTED ADDRESS
   ========================================================= */

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

        addressElement.textContent =
            formatCheckoutAddress(
                selectedAddress
            ) ||
            "Address details unavailable.";

    }


    if (mobileElement) {

        mobileElement.textContent =
            selectedAddress.mobile
                ? "Mobile: " +
                  selectedAddress.mobile
                : "Mobile number unavailable.";

    }

}


/* =========================================================
   AUTO SELECT FIRST ADDRESS
   ========================================================= */

function autoSelectAddress() {

    const currentAddress =
        getSelectedAddress();


    if (currentAddress) {
        return;
    }


    const addresses =
        getSavedAddresses();


    if (
        !addresses.length
    ) {
        return;
    }


    saveSelectedAddress(
        addresses[0]
    );

}


/* =========================================================
   GET CHECKOUT CART ITEMS
   ========================================================= */

function getCheckoutPageItems() {

    if (
        typeof prepareCartItems ===
        "function"
    ) {

        return prepareCartItems();

    }


    return [];

}


/* =========================================================
   FORMAT PRICE
   ========================================================= */

function formatCheckoutPrice(
    value
) {

    const amount =
        Number(
            value || 0
        );


    if (
        !Number.isFinite(
            amount
        )
    ) {

        return "₹0";

    }


    return "₹" +
        amount;

}


/* =========================================================
   RENDER CHECKOUT ORDER ITEMS
   ========================================================= */

function renderCheckoutOrderItems() {

    const itemsList =
        document.getElementById(
            "checkoutItemsList"
        );


    const emptyState =
        document.getElementById(
            "checkoutEmptyState"
        );


    if (!itemsList) {
        return;
    }


    const itemCards =
        itemsList.querySelectorAll(
            ".checkout-item"
        );


    /*
     * Get actual cart items
     */
    const cartItems =
        getCheckoutPageItems();


    /*
     * Hide every pre-created card first.
     */
    itemCards.forEach(
        function (
            card
        ) {

            card.hidden =
                true;

            card.style.display =
                "none";

        }
    );


    /*
     * EMPTY CART
     */
    if (
        cartItems.length === 0
    ) {

        if (emptyState) {

            emptyState.hidden =
                false;

            emptyState.style.display =
                "";

        }


        updateCheckoutTotals();

        return;

    }


    /*
     * CART HAS ITEMS
     */
    if (emptyState) {

        emptyState.hidden =
            true;

        emptyState.style.display =
            "none";

    }


    /*
     * Render each real cart item
     */
    cartItems.forEach(
        function (
            cartItem,
            index
        ) {

            const card =
                itemCards[index];


            if (!card) {
                return;
            }


            const food =
                cartItem.food;


            if (!food) {
                return;
            }


            const quantity =
                Number(
                    cartItem.quantity || 1
                );


            const image =
                card.querySelector(
                    "[data-checkout-image]"
                );


            const category =
                card.querySelector(
                    "[data-checkout-category]"
                );


            const name =
                card.querySelector(
                    "[data-checkout-name]"
                );


            const quantityElement =
                card.querySelector(
                    "[data-checkout-quantity]"
                );


            const price =
                card.querySelector(
                    "[data-checkout-price]"
                );


            /*
             * IMAGE
             */
            if (image) {

                image.src =
                    food.image ||
                    "";

                image.alt =
                    food.name ||
                    "Food";


                image.onerror =
                    function () {

                        image.onerror =
                            null;

                        if (
                            food.image
                        ) {

                            image.src =
                                food.image;

                        }

                    };

            }


            /*
             * CATEGORY
             */
            if (category) {

                category.textContent =
                    food.category ||
                    "Food";

            }


            /*
             * NAME
             */
            if (name) {

                name.textContent =
                    food.name ||
                    "Food";

            }


            /*
             * QUANTITY
             */
            if (
                quantityElement
            ) {

                quantityElement.textContent =
                    "Quantity: " +
                    quantity;

            }


            /*
             * ITEM TOTAL
             */
            if (price) {

                const itemTotal =
                    Number(
                        food.price || 0
                    ) *
                    quantity;


                price.textContent =
                    formatCheckoutPrice(
                        itemTotal
                    );

            }


            /*
             * Save food ID
             */
            card.dataset.foodId =
                cartItem.foodId ||
                food.id ||
                "";


            card.hidden =
                false;

            card.style.display =
                "";

        }
    );


    updateCheckoutTotals();

}


/* =========================================================
   COUPON DATA
   ========================================================= */

const yummyTummyCoupons = {

    YUMMY100: {

        code:
            "YUMMY100",

        type:
            "flat",

        value:
            100,

        minimumSubtotal:
            499

    },


    FOODIE20: {

        code:
            "FOODIE20",

        type:
            "percentage",

        value:
            20,

        minimumSubtotal:
            0

    },


    FREEDEL: {

        code:
            "FREEDEL",

        type:
            "free-delivery",

        value:
            0,

        minimumSubtotal:
            0

    }

};


/* =========================================================
   GET SAVED COUPON
   ========================================================= */

function getSavedCoupon() {

    const savedCoupon =
        localStorage.getItem(
            "yummyTummyCoupon"
        );


    if (!savedCoupon) {
        return null;
    }


    try {

        const coupon =
            JSON.parse(
                savedCoupon
            );


        if (
            !coupon ||
            typeof coupon !== "object"
        ) {

            return null;

        }


        return coupon;

    } catch (error) {

        return null;

    }

}


/* =========================================================
   SAVE COUPON
   ========================================================= */

function saveCoupon(
    coupon
) {

    localStorage.setItem(
        "yummyTummyCoupon",
        JSON.stringify(
            coupon
        )
    );

}


/* =========================================================
   CLEAR COUPON
   ========================================================= */

function clearCoupon() {

    localStorage.removeItem(
        "yummyTummyCoupon"
    );

}


/* =========================================================
   NORMALIZE COUPON
   ========================================================= */

function normalizeCouponCode(
    code
) {

    return String(
        code || ""
    )
        .trim()
        .toUpperCase();

}


/* =========================================================
   GET SUBTOTAL
   ========================================================= */

function getCheckoutSubtotal() {

    const items =
        getCheckoutPageItems();


    if (
        typeof calculateCartSubtotal ===
        "function"
    ) {

        return calculateCartSubtotal(
            items
        );

    }


    return items.reduce(
        function (
            total,
            item
        ) {

            const price =
                Number(
                    item.food.price || 0
                );

            const quantity =
                Number(
                    item.quantity || 1
                );


            return total +
                (
                    price *
                    quantity
                );

        },
        0
    );

}


/* =========================================================
   CALCULATE COUPON DISCOUNT
   ========================================================= */

function calculateCouponDiscount(
    coupon,
    subtotal
) {

    if (
        !coupon ||
        subtotal <= 0
    ) {

        return 0;

    }


    const couponData =
        yummyTummyCoupons[
            normalizeCouponCode(
                coupon.code
            )
        ];


    if (!couponData) {
        return 0;
    }


    if (
        subtotal <
        couponData.minimumSubtotal
    ) {

        return 0;

    }


    if (
        couponData.type ===
        "flat"
    ) {

        return Math.min(
            couponData.value,
            subtotal
        );

    }


    if (
        couponData.type ===
        "percentage"
    ) {

        return Math.round(
            subtotal *
            couponData.value /
            100
        );

    }


    return 0;

}


/* =========================================================
   FREE DELIVERY CHECK
   ========================================================= */

function isFreeDeliveryCoupon(
    coupon
) {

    if (!coupon) {
        return false;
    }


    return (
        normalizeCouponCode(
            coupon.code
        ) ===
        "FREEDEL"
    );

}


/* =========================================================
   GET DELIVERY FEE
   ========================================================= */

function getCheckoutDeliveryFee() {

    const items =
        getCheckoutPageItems();


    /*
     * Empty cart = ₹0
     */
    if (
        items.length === 0
    ) {

        return 0;

    }


    const coupon =
        getSavedCoupon();


    /*
     * FREEDEL = ₹0
     */
    if (
        isFreeDeliveryCoupon(
            coupon
        )
    ) {

        return 0;

    }


    /*
     * Normal delivery = ₹40
     */
    return 40;

}


/* =========================================================
   GET TOTALS
   ========================================================= */

function getCheckoutTotals() {

    const items =
        getCheckoutPageItems();


    const subtotal =
        getCheckoutSubtotal();


    if (
        items.length === 0
    ) {

        return {

            subtotal:
                0,

            discount:
                0,

            deliveryFee:
                0,

            grandTotal:
                0

        };

    }


    const coupon =
        getSavedCoupon();


    const discount =
        calculateCouponDiscount(
            coupon,
            subtotal
        );


    const deliveryFee =
        getCheckoutDeliveryFee();


    const grandTotal =
        Math.max(
            0,
            subtotal -
            discount +
            deliveryFee
        );


    return {

        subtotal:
            subtotal,

        discount:
            discount,

        deliveryFee:
            deliveryFee,

        grandTotal:
            grandTotal

    };

}


/* =========================================================
   UPDATE CHECKOUT TOTALS
   ========================================================= */

function updateCheckoutTotals() {

    const subtotalElement =
        document.getElementById(
            "checkoutSubtotal"
        );


    const deliveryElement =
        document.getElementById(
            "checkoutDeliveryFee"
        );


    const discountElement =
        document.getElementById(
            "checkoutDiscount"
        );


    const discountRow =
        document.getElementById(
            "checkoutDiscountRow"
        );


    const grandTotalElement =
        document.getElementById(
            "checkoutGrandTotal"
        );


    const totals =
        getCheckoutTotals();


    if (
        subtotalElement
    ) {

        subtotalElement.textContent =
            formatCheckoutPrice(
                totals.subtotal
            );

    }


    if (
        deliveryElement
    ) {

        deliveryElement.textContent =
            formatCheckoutPrice(
                totals.deliveryFee
            );

    }


    if (
        discountElement
    ) {

        discountElement.textContent =
            formatCheckoutPrice(
                totals.discount
            );

    }


    if (
        discountRow
    ) {

        discountRow.hidden =
            totals.discount <= 0;

        discountRow.style.display =
            totals.discount > 0
                ? ""
                : "none";

    }


    if (
        grandTotalElement
    ) {

        grandTotalElement.textContent =
            formatCheckoutPrice(
                totals.grandTotal
            );

    }

}


/* =========================================================
   UPDATE APPLIED COUPON
   ========================================================= */

function updateAppliedCouponUI() {

    const appliedBox =
        document.getElementById(
            "appliedCouponBox"
        );


    const appliedCode =
        document.getElementById(
            "appliedCouponCode"
        );


    const appliedDiscount =
        document.getElementById(
            "appliedCouponDiscount"
        );


    const input =
        document.getElementById(
            "checkoutCouponInput"
        );


    const coupon =
        getSavedCoupon();


    if (!coupon) {

        if (appliedBox) {

            appliedBox.hidden =
                true;

        }


        if (input) {

            input.disabled =
                false;

        }


        return;

    }


    if (appliedBox) {

        appliedBox.hidden =
            false;

    }


    if (appliedCode) {

        appliedCode.textContent =
            coupon.code;

    }


    if (appliedDiscount) {

        if (
            isFreeDeliveryCoupon(
                coupon
            )
        ) {

            appliedDiscount.textContent =
                "Free Delivery";

        } else {

            appliedDiscount.textContent =
                formatCheckoutPrice(
                    calculateCouponDiscount(
                        coupon,
                        getCheckoutSubtotal()
                    )
                );

        }

    }


    if (input) {

        input.value =
            coupon.code;

        input.disabled =
            true;

    }

}


/* =========================================================
   SHOW COUPON MESSAGE
   ========================================================= */

function showCouponMessage(
    message,
    type
) {

    const element =
        document.getElementById(
            "couponMessage"
        );


    if (!element) {
        return;
    }


    element.textContent =
        message || "";


    element.classList.remove(
        "success",
        "error"
    );


    if (type) {

        element.classList.add(
            type
        );

    }

}


/* =========================================================
   VALIDATE COUPON
   ========================================================= */

function validateCoupon(
    code
) {

    const normalizedCode =
        normalizeCouponCode(
            code
        );


    if (!normalizedCode) {

        return {

            valid:
                false,

            message:
                "Please enter a coupon code."

        };

    }


    const coupon =
        yummyTummyCoupons[
            normalizedCode
        ];


    if (!coupon) {

        return {

            valid:
                false,

            message:
                "Invalid coupon code."

        };

    }


    const items =
        getCheckoutPageItems();


    const subtotal =
        getCheckoutSubtotal();


    if (
        items.length === 0
    ) {

        return {

            valid:
                false,

            message:
                "Add food to your cart before applying a coupon."

        };

    }


    if (
        subtotal <
        coupon.minimumSubtotal
    ) {

        return {

            valid:
                false,

            message:
                "Minimum order amount for this coupon is ₹" +
                coupon.minimumSubtotal +
                "."

        };

    }


    return {

        valid:
            true,

        coupon:
            {

                code:
                    coupon.code,

                type:
                    coupon.type,

                value:
                    coupon.value

            }

    };

}


/* =========================================================
   APPLY COUPON
   ========================================================= */

function applyCheckoutCoupon() {

    const input =
        document.getElementById(
            "checkoutCouponInput"
        );


    if (!input) {
        return;
    }


    const result =
        validateCoupon(
            input.value
        );


    if (!result.valid) {

        showCouponMessage(
            result.message,
            "error"
        );

        return;

    }


    saveCoupon(
        result.coupon
    );


    const discount =
        calculateCouponDiscount(
            result.coupon,
            getCheckoutSubtotal()
        );


    if (
        isFreeDeliveryCoupon(
            result.coupon
        )
    ) {

        showCouponMessage(
            "FREEDEL applied. Delivery is free.",
            "success"
        );

    } else {

        showCouponMessage(
            result.coupon.code +
            " applied. You saved ₹" +
            discount +
            ".",
            "success"
        );

    }


    updateAppliedCouponUI();

    updateCheckoutTotals();

}


/* =========================================================
   REMOVE COUPON
   ========================================================= */

function removeCheckoutCoupon() {

    clearCoupon();


    const input =
        document.getElementById(
            "checkoutCouponInput"
        );


    if (input) {

        input.value =
            "";

        input.disabled =
            false;

    }


    showCouponMessage(
        "Coupon removed.",
        "success"
    );


    updateAppliedCouponUI();

    updateCheckoutTotals();

}


/* =========================================================
   INITIALIZE COUPON SYSTEM
   ========================================================= */

function initializeCouponSystem() {

    const applyButton =
        document.getElementById(
            "applyCouponButton"
        );


    const removeButton =
        document.getElementById(
            "removeCouponButton"
        );


    const input =
        document.getElementById(
            "checkoutCouponInput"
        );


    if (applyButton) {

        applyButton.addEventListener(
            "click",
            function () {

                applyCheckoutCoupon();

            }
        );

    }


    if (removeButton) {

        removeButton.addEventListener(
            "click",
            function () {

                removeCheckoutCoupon();

            }
        );

    }


    if (input) {

        input.addEventListener(
            "keydown",
            function (
                event
            ) {

                if (
                    event.key ===
                    "Enter"
                ) {

                    event.preventDefault();

                    applyCheckoutCoupon();

                }

            }
        );

    }


    updateAppliedCouponUI();

}


/* =========================================================
   INITIALIZE CHECKOUT PAGE
   ========================================================= */

function initializeCheckoutPage() {

    autoSelectAddress();

    displaySelectedCheckoutAddress();

    renderCheckoutOrderItems();

    initializeCouponSystem();

    updateCheckoutTotals();

}


/* =========================================================
   PAGE INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeCheckoutPage();

    }
);