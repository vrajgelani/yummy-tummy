/* =================================
   CART FOUNDATION
================================= */

const cartItems =
    document.querySelector("#cartItems");

const cartEmpty =
    document.querySelector("#cartEmpty");

const cartItemCount =
    document.querySelector("#cartItemCount");

const cartSubtotal =
    document.querySelector("#cartSubtotal");

const cartDeliveryFee =
    document.querySelector("#cartDeliveryFee");

const cartTotal =
    document.querySelector("#cartTotal");

const cartCheckoutButton =
    document.querySelector("#cartCheckoutButton");


/* =================================
   INITIAL CART STATE
================================= */

function initializeCart() {

    if (!cartItems || !cartEmpty) {
        return;
    }


    /*
        Day 4 Part 4:
        Cart starts empty.

        Actual cart data, quantity,
        remove and total calculation
        will be implemented in Day 5.
    */

    cartEmpty.hidden = false;


    if (cartItemCount) {
        cartItemCount.textContent = "0";
    }


    if (cartSubtotal) {
        cartSubtotal.textContent = "₹0";
    }


    if (cartDeliveryFee) {
        cartDeliveryFee.textContent = "₹0";
    }


    if (cartTotal) {
        cartTotal.textContent = "₹0";
    }


    if (cartCheckoutButton) {
        cartCheckoutButton.setAttribute(
            "aria-disabled",
            "true"
        );
    }

}


initializeCart();