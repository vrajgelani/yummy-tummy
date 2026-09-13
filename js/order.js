/* ==================================================
   YUMMY TUMMY
   CHECKOUT PAYMENT AND PLACE ORDER
   ================================================== */


/* ==================== GET CHECKOUT CART ==================== */

function getCheckoutCartItems() {

    if (
        typeof prepareCartItems === "function"
    ) {

        return prepareCartItems();

    }


    return [];

}


/* ==================== GET SELECTED ADDRESS ==================== */

function getCheckoutSelectedAddress() {

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


/* ==================== GET PAYMENT METHOD ==================== */

function getSelectedPaymentMethod() {

    const selectedPayment =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        );


    if (!selectedPayment) {
        return "";
    }


    return selectedPayment.value;

}


/* ==================== PAYMENT NAME ==================== */

function getPaymentMethodName(paymentMethod) {

    if (paymentMethod === "cod") {
        return "Cash on Delivery";
    }


    if (paymentMethod === "upi") {
        return "UPI";
    }


    if (paymentMethod === "online") {
        return "Online Payment";
    }


    return "";

}


/* ==================== CREATE ORDER ID ==================== */

function createOrderId() {

    const currentTime =
        Date.now();


    const randomNumber =
        Math.floor(
            Math.random() * 1000
        );


    return `YT-${currentTime}-${randomNumber}`;

}


/* ==================== CREATE ORDER ==================== */

function createYummyTummyOrder() {

    const cartItems =
        getCheckoutCartItems();


    if (
        !cartItems.length
    ) {

        window.alert(
            "Your cart is empty."
        );

        return false;

    }


    const selectedAddress =
        getCheckoutSelectedAddress();


    if (!selectedAddress) {

        window.alert(
            "Please select a delivery address."
        );


        window.location.href =
            "address.html";


        return false;

    }


    const paymentMethod =
        getSelectedPaymentMethod();


    if (!paymentMethod) {

        window.alert(
            "Please select a payment method."
        );


        return false;

    }


    /*
     * ==============================
     * SUBTOTAL
     * ==============================
     */

    const subtotal =
        typeof calculateCartSubtotal ===
        "function"
            ? calculateCartSubtotal(
                cartItems
            )
            : 0;


    /*
     * ==============================
     * COUPON
     * ==============================
     */

    let coupon =
        null;


    try {

        if (
            typeof getSavedCoupon ===
            "function"
        ) {

            coupon =
                getSavedCoupon();

        }

    } catch (error) {

        coupon =
            null;

    }


    /*
     * ==============================
     * DISCOUNT
     * ==============================
     */

    let couponDiscount =
        0;


    try {

        if (
            typeof calculateCouponDiscount ===
            "function"
        ) {

            couponDiscount =
                calculateCouponDiscount(
                    coupon,
                    subtotal
                );

        }

    } catch (error) {

        couponDiscount =
            0;

    }


    /*
     * ==============================
     * DELIVERY FEE
     * ==============================
     */

    let deliveryFee =
        0;


    try {

        if (
            typeof getCheckoutDeliveryFee ===
            "function"
        ) {

            deliveryFee =
                getCheckoutDeliveryFee();

        } else if (
            typeof calculateDeliveryFee ===
            "function"
        ) {

            deliveryFee =
                calculateDeliveryFee(
                    cartItems
                );

        }

    } catch (error) {

        deliveryFee =
            cartItems.length > 0
                ? 40
                : 0;

    }


    /*
     * ==============================
     * GRAND TOTAL
     * ==============================
     */

    const grandTotal =
        Math.max(
            0,
            subtotal -
            couponDiscount +
            deliveryFee
        );


    /*
     * ==============================
     * ORDER ITEMS
     * ==============================
     */

    const orderItems =
        cartItems.map(
            function (
                cartItem
            ) {

                return {

                    foodId:
                        cartItem.foodId,

                    name:
                        cartItem.food.name,

                    category:
                        cartItem.food.category,

                    price:
                        Number(
                            cartItem.food.price
                        ),

                    quantity:
                        cartItem.quantity,

                    image:
                        cartItem.food.image ||
                        "",

                    restaurantId:
                        cartItem.restaurantId ||
                        "",

                    itemTotal:
                        Number(
                            cartItem.food.price
                        ) *
                        cartItem.quantity

                };

            }
        );


    /*
     * ==============================
     * ORDER OBJECT
     * ==============================
     */

    const order = {

        id:
            createOrderId(),

        items:
            orderItems,

        address:
            selectedAddress,

        paymentMethod:
            paymentMethod,

        paymentMethodName:
            getPaymentMethodName(
                paymentMethod
            ),

        subtotal:
            subtotal,

        coupon:
            coupon
                ? coupon.code
                : "",

        couponDiscount:
            couponDiscount,

        deliveryFee:
            deliveryFee,

        grandTotal:
            grandTotal,

        status:
            "Order Placed",

        createdAt:
            new Date().toISOString()

    };


    /*
     * ==============================
     * GET EXISTING ORDERS
     * ==============================
     */

    const storedOrders =
        localStorage.getItem(
            "yummyTummyOrders"
        );


    let orders =
        [];


    if (storedOrders) {

        try {

            const parsedOrders =
                JSON.parse(
                    storedOrders
                );


            if (
                Array.isArray(
                    parsedOrders
                )
            ) {

                orders =
                    parsedOrders;

            }

        } catch (error) {

            orders =
                [];

        }

    }


    /*
     * ==============================
     * SAVE ORDER
     * ==============================
     */

    orders.unshift(
        order
    );


    localStorage.setItem(
        "yummyTummyOrders",
        JSON.stringify(
            orders
        )
    );


    /*
     * ==============================
     * CLEAR CART
     * ==============================
     */

    localStorage.removeItem(
        "yummyTummyCart"
    );


    /*
     * ==============================
     * CLEAR COUPON
     * ==============================
     */

    localStorage.removeItem(
        "yummyTummyCoupon"
    );


    /*
     * ==============================
     * SUCCESS
     * ==============================
     */

    window.alert(
        "Your order has been placed successfully."
    );


    window.location.href =
        "orders.html";


    return true;

}


/* ==================== PLACE ORDER BUTTON ==================== */

function initializePlaceOrderButton() {

    const placeOrderButton =
        document.getElementById(
            "placeOrderButton"
        );


    if (!placeOrderButton) {
        return;
    }


    placeOrderButton.addEventListener(
        "click",
        function () {

            const isLoggedIn =
                localStorage.getItem(
                    "yummyTummyLoggedIn"
                ) === "true";


            if (!isLoggedIn) {

                const shouldLogin =
                    window.confirm(
                        "Please Login First"
                    );


                if (shouldLogin) {

                    window.location.href =
                        "login.html";

                }


                return;

            }


            createYummyTummyOrder();

        }
    );

}


/* ==================== PAYMENT SELECTION ==================== */

function initializePaymentSelection() {

    const paymentInputs =
        document.querySelectorAll(
            'input[name="paymentMethod"]'
        );


    paymentInputs.forEach(
        (paymentInput) => {

            paymentInput.addEventListener(
                "change",
                function () {

                    const selectedMethod =
                        getPaymentMethodName(
                            this.value
                        );


                    if (!selectedMethod) {
                        return;
                    }


                    localStorage.setItem(
                        "yummyTummyPaymentMethod",
                        this.value
                    );

                }
            );

        }
    );


    const savedPaymentMethod =
        localStorage.getItem(
            "yummyTummyPaymentMethod"
        );


    if (!savedPaymentMethod) {
        return;
    }


    const savedPaymentInput =
        document.querySelector(
            `input[name="paymentMethod"][value="${savedPaymentMethod}"]`
        );


    if (savedPaymentInput) {

        savedPaymentInput.checked =
            true;

    }

}


/* ==================== CHECKOUT LOGIN PROTECTION ==================== */

function initializeCheckoutLoginProtection() {

    const isLoggedIn =
        localStorage.getItem(
            "yummyTummyLoggedIn"
        ) === "true";


    if (isLoggedIn) {
        return;
    }


    const placeOrderButton =
        document.getElementById(
            "placeOrderButton"
        );


    if (!placeOrderButton) {
        return;
    }


    placeOrderButton.title =
        "Please Login First";

}


/* ==================== INITIALIZATION ==================== */

function initializeOrderPage() {

    const placeOrderButton =
        document.getElementById(
            "placeOrderButton"
        );


    if (!placeOrderButton) {
        return;
    }


    initializePaymentSelection();

    initializePlaceOrderButton();

    initializeCheckoutLoginProtection();

}


document.addEventListener(
    "DOMContentLoaded",
    initializeOrderPage
);