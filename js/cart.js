/* =================================
   CART
================================= */

const CART_STORAGE_KEY =
    "yummyTummyCart";


const CART_DELIVERY_FEE = 40;


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


/* =================================
   GET CART
================================= */

function getCart() {

    try {

        const cart =
            JSON.parse(
                localStorage.getItem(
                    CART_STORAGE_KEY
                )
            );


        if (!Array.isArray(cart)) {

            return [];

        }


        return cart;

    } catch (error) {

        console.error(
            "Unable to read cart:",
            error
        );

        return [];

    }

}


/* =================================
   SAVE CART
================================= */

function saveCart(cart) {

    try {

        localStorage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify(cart)
        );

        return true;

    } catch (error) {

        console.error(
            "Unable to save cart:",
            error
        );

        return false;

    }

}


/* =================================
   FORMAT PRICE
================================= */

function formatPrice(price) {

    return `₹${Number(price) || 0}`;

}


/* =================================
   GET ITEM QUANTITY
================================= */

function getItemQuantity(item) {

    const quantity =
        Number(item.quantity);


    if (!Number.isFinite(quantity) ||
        quantity < 1) {

        return 1;

    }


    return Math.floor(quantity);

}


/* =================================
   GET ITEM PRICE
================================= */

function getItemPrice(item) {

    const price =
        Number(item.price);


    if (!Number.isFinite(price) ||
        price < 0) {

        return 0;

    }


    return price;

}


/* =================================
   UPDATE CART QUANTITY
================================= */

function updateCartQuantity(
    foodId,
    newQuantity
) {

    const cart =
        getCart();


    const quantity =
        Math.max(
            1,
            Number(newQuantity) || 1
        );


    const item =
        cart.find(
            (cartItem) =>
                cartItem.id === foodId
        );


    if (!item) {

        return;

    }


    item.quantity =
        Math.floor(quantity);


    const saved =
        saveCart(cart);


    if (!saved) {

        return;

    }


    renderCart();

}


/* =================================
   INCREASE QUANTITY
================================= */

function increaseCartQuantity(foodId) {

    const cart =
        getCart();


    const item =
        cart.find(
            (cartItem) =>
                cartItem.id === foodId
        );


    if (!item) {

        return;

    }


    const currentQuantity =
        getItemQuantity(item);


    updateCartQuantity(
        foodId,
        currentQuantity + 1
    );

}


/* =================================
   DECREASE QUANTITY
================================= */

function decreaseCartQuantity(foodId) {

    const cart =
        getCart();


    const item =
        cart.find(
            (cartItem) =>
                cartItem.id === foodId
        );


    if (!item) {

        return;

    }


    const currentQuantity =
        getItemQuantity(item);


    if (currentQuantity <= 1) {

        return;

    }


    updateCartQuantity(
        foodId,
        currentQuantity - 1
    );

}


/* =================================
   REMOVE CART ITEM
================================= */

function removeCartItem(foodId) {

    const cart =
        getCart();


    const updatedCart =
        cart.filter(
            (item) =>
                item.id !== foodId
        );


    const saved =
        saveCart(updatedCart);


    if (!saved) {

        return;

    }


    renderCart();

}


/* =================================
   CREATE CART ITEM
================================= */

function createCartItem(item) {

    const article =
        document.createElement("article");


    article.className =
        "cart-item";


    article.dataset.foodId =
        item.id;


    const imageWrapper =
        document.createElement("div");


    imageWrapper.className =
        "cart-item-image-wrapper";


    const image =
        document.createElement("img");


    image.className =
        "cart-item-image";


    image.src =
        item.image || "";


    image.alt =
        item.name || "Food";


    imageWrapper.appendChild(
        image
    );


    const content =
        document.createElement("div");


    content.className =
        "cart-item-content";


    const name =
        document.createElement("h2");


    name.className =
        "cart-item-name";


    name.textContent =
        item.name || "Food";


    const restaurant =
        document.createElement("p");


    restaurant.className =
        "cart-item-restaurant";


    restaurant.textContent =
        item.restaurant || "";


    const price =
        document.createElement("p");


    price.className =
        "cart-item-price";


    price.textContent =
        formatPrice(
            getItemPrice(item)
        );


    /* =================================
       QUANTITY
    ================================= */

    const quantityWrapper =
        document.createElement("div");


    quantityWrapper.className =
        "cart-item-quantity";


    const decreaseButton =
        document.createElement("button");


    decreaseButton.type =
        "button";


    decreaseButton.className =
        "cart-quantity-minus";


    decreaseButton.textContent =
        "−";


    decreaseButton.setAttribute(
        "aria-label",
        "Decrease quantity"
    );


    const quantityValue =
        document.createElement("span");


    quantityValue.className =
        "cart-quantity-value";


    quantityValue.textContent =
        getItemQuantity(item);


    const increaseButton =
        document.createElement("button");


    increaseButton.type =
        "button";


    increaseButton.className =
        "cart-quantity-plus";


    increaseButton.textContent =
        "+";


    increaseButton.setAttribute(
        "aria-label",
        "Increase quantity"
    );


    decreaseButton.addEventListener(
        "click",
        () => {

            decreaseCartQuantity(
                item.id
            );

        }
    );


    increaseButton.addEventListener(
        "click",
        () => {

            increaseCartQuantity(
                item.id
            );

        }
    );


    quantityWrapper.append(
        decreaseButton,
        quantityValue,
        increaseButton
    );


    /* =================================
       REMOVE
    ================================= */

    const actions =
        document.createElement("div");


    actions.className =
        "cart-item-actions";


    const removeButton =
        document.createElement("button");


    removeButton.type =
        "button";


    removeButton.className =
        "cart-item-remove";


    removeButton.textContent =
        "Remove";


    removeButton.addEventListener(
        "click",
        () => {

            removeCartItem(
                item.id
            );

        }
    );


    actions.appendChild(
        removeButton
    );


    content.append(
        name,
        restaurant,
        price,
        quantityWrapper,
        actions
    );


    article.append(
        imageWrapper,
        content
    );


    return article;

}


/* =================================
   CALCULATE CART SUBTOTAL
================================= */

function calculateCartSubtotal(cart) {

    return cart.reduce(
        (total, item) => {

            const price =
                getItemPrice(item);


            const quantity =
                getItemQuantity(item);


            return total +
                (price * quantity);

        },
        0
    );

}


/* =================================
   CALCULATE ITEM COUNT
================================= */

function calculateCartItemCount(cart) {

    return cart.reduce(
        (total, item) => {

            return total +
                getItemQuantity(item);

        },
        0
    );

}


/* =================================
   CALCULATE DELIVERY
================================= */

function calculateDeliveryFee(cart) {

    if (cart.length === 0) {

        return 0;

    }


    return CART_DELIVERY_FEE;

}


/* =================================
   UPDATE CART SUMMARY
================================= */

function updateCartSummary(cart) {

    const itemCount =
        calculateCartItemCount(
            cart
        );


    const subtotal =
        calculateCartSubtotal(
            cart
        );


    const delivery =
        calculateDeliveryFee(
            cart
        );


    const total =
        subtotal +
        delivery;


    /* =================================
       ITEM COUNT
    ================================= */

    if (cartItemCount) {

        cartItemCount.textContent =
            `${itemCount} ${
                itemCount === 1
                    ? "Item"
                    : "Items"
            }`;

    }


    /* =================================
       SUBTOTAL
    ================================= */

    if (cartSubtotal) {

        cartSubtotal.textContent =
            formatPrice(
                subtotal
            );

    }


    /* =================================
       DELIVERY
    ================================= */

    if (cartDelivery) {

        cartDelivery.textContent =
            formatPrice(
                delivery
            );

    }


    /* =================================
       TOTAL
    ================================= */

    if (cartTotal) {

        cartTotal.textContent =
            formatPrice(
                total
            );

    }

}


/* =================================
   EMPTY CART STATE
================================= */

function updateEmptyState(cart) {

    if (!cartEmpty) {

        return;

    }


    if (cart.length === 0) {

        cartEmpty.hidden =
            false;


        if (cartItems) {

            cartItems.hidden =
                true;

        }

        return;

    }


    cartEmpty.hidden =
        true;


    if (cartItems) {

        cartItems.hidden =
            false;

    }

}


/* =================================
   RENDER CART
================================= */

function renderCart() {

    if (!cartItems) {

        return;

    }


    const cart =
        getCart();


    cartItems.replaceChildren();


    cart.forEach(
        (item) => {

            const cartItem =
                createCartItem(
                    item
                );


            cartItems.appendChild(
                cartItem
            );

        }
    );


    updateEmptyState(
        cart
    );


    updateCartSummary(
        cart
    );

}


/* =================================
   INITIALIZE CART
================================= */

function initializeCart() {

    renderCart();

}


/* =================================
   START
================================= */

initializeCart();