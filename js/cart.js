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

const cartDelivery =
    document.querySelector("#cartDelivery");

const cartTotal =
    document.querySelector("#cartTotal");


function initializeCart() {

    if (!cartItems) {
        return;
    }

    updateCartFoundation();

}


function updateCartFoundation() {

    const items =
        cartItems.querySelectorAll(".cart-item");

    const itemCount =
        items.length;


    if (cartItemCount) {

        cartItemCount.textContent =
            `${itemCount} ${itemCount === 1 ? "Item" : "Items"}`;

    }


    if (itemCount === 0) {

        if (cartEmpty) {
            cartEmpty.hidden = false;
        }

        if (cartItems) {
            cartItems.hidden = true;
        }

        if (cartSubtotal) {
            cartSubtotal.textContent = "₹0";
        }

        if (cartDelivery) {
            cartDelivery.textContent = "₹0";
        }

        if (cartTotal) {
            cartTotal.textContent = "₹0";
        }

        return;
    }


    if (cartEmpty) {
        cartEmpty.hidden = true;
    }

    if (cartItems) {
        cartItems.hidden = false;
    }

}


initializeCart();