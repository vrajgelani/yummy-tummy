/* =================================
   CART
================================= */

const CART_STORAGE_KEY =
    "yummyTummyCart";

const CART_DELIVERY_CHARGE =
    40;


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

        return Array.isArray(cart)
            ? cart
            : [];

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

    localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
    );
}


/* =================================
   DISPLAY CART
================================= */

function displayCart() {

    if (!cartItems) {
        return;
    }


    const cart =
        getCart();


    cartItems.replaceChildren();


    if (cart.length === 0) {

        cartItems.hidden =
            true;


        if (cartEmpty) {

            cartEmpty.hidden =
                false;
        }


        updateSummary(
            cart
        );

        return;
    }


    cartItems.hidden =
        false;


    if (cartEmpty) {

        cartEmpty.hidden =
            true;
    }


    cart.forEach(
        (food) => {

            const item =
                createCartItem(
                    food
                );

            cartItems.appendChild(
                item
            );

        }
    );


    updateSummary(
        cart
    );
}


/* =================================
   CREATE CART ITEM
================================= */

function createCartItem(food) {

    const article =
        document.createElement(
            "article"
        );


    article.className =
        "cart-item";


    article.dataset.foodId =
        food.id;


    /* IMAGE */

    const imageWrapper =
        document.createElement(
            "div"
        );


    imageWrapper.className =
        "cart-item-image-wrapper";


    const image =
        document.createElement(
            "img"
        );


    image.className =
        "cart-item-image";


    image.src =
        food.image;


    image.alt =
        food.name;


    imageWrapper.appendChild(
        image
    );


    /* CONTENT */

    const content =
        document.createElement(
            "div"
        );


    content.className =
        "cart-item-content";


    /* DETAILS */

    const details =
        document.createElement(
            "div"
        );


    details.className =
        "cart-item-details";


    const category =
        document.createElement(
            "span"
        );


    category.className =
        "cart-item-category";


    category.textContent =
        food.category;


    const name =
        document.createElement(
            "h3"
        );


    name.className =
        "cart-item-name";


    name.textContent =
        food.name;


    const restaurant =
        document.createElement(
            "p"
        );


    restaurant.className =
        "cart-item-restaurant";


    restaurant.textContent =
        food.restaurant;


    details.append(
        category,
        name,
        restaurant
    );


    /* BOTTOM */

    const bottom =
        document.createElement(
            "div"
        );


    bottom.className =
        "cart-item-bottom";


    /* PRICE */

    const price =
        document.createElement(
            "span"
        );


    price.className =
        "cart-item-price";


    price.textContent =
        `₹${food.price}`;


    /* QUANTITY */

    const quantityWrapper =
        document.createElement(
            "div"
        );


    quantityWrapper.className =
        "cart-item-quantity";


    const decreaseButton =
        document.createElement(
            "button"
        );


    decreaseButton.type =
        "button";


    decreaseButton.className =
        "quantity-button";


    decreaseButton.dataset.action =
        "decrease";


    decreaseButton.textContent =
        "−";


    decreaseButton.setAttribute(
        "aria-label",
        "Decrease quantity"
    );


    const quantityValue =
        document.createElement(
            "span"
        );


    quantityValue.className =
        "quantity-value";


    quantityValue.textContent =
        food.quantity;


    const increaseButton =
        document.createElement(
            "button"
        );


    increaseButton.type =
        "button";


    increaseButton.className =
        "quantity-button";


    increaseButton.dataset.action =
        "increase";


    increaseButton.textContent =
        "+";


    increaseButton.setAttribute(
        "aria-label",
        "Increase quantity"
    );


    quantityWrapper.append(
        decreaseButton,
        quantityValue,
        increaseButton
    );


    /* REMOVE */

    const removeButton =
        document.createElement(
            "button"
        );


    removeButton.type =
        "button";


    removeButton.className =
        "cart-remove-button";


    removeButton.dataset.action =
        "remove";


    removeButton.textContent =
        "Remove";


    bottom.append(
        price,
        quantityWrapper,
        removeButton
    );


    content.append(
        details,
        bottom
    );


    article.append(
        imageWrapper,
        content
    );


    return article;
}


/* =================================
   QUANTITY
================================= */

function updateQuantity(
    foodId,
    change
) {

    const cart =
        getCart();


    const food =
        cart.find(
            (item) =>
                item.id === foodId
        );


    if (!food) {
        return;
    }


    food.quantity +=
        change;


    if (food.quantity < 1) {

        food.quantity = 1;
    }


    saveCart(
        cart
    );


    displayCart();
}


/* =================================
   UPDATE SUMMARY
================================= */

function updateSummary(
    cart
) {

    let totalQuantity = 0;

    let subtotal = 0;


    cart.forEach(
        (food) => {

            const quantity =
                Number(food.quantity) || 1;

            const price =
                Number(food.price) || 0;


            totalQuantity +=
                quantity;


            subtotal +=
                price * quantity;

        }
    );


    const delivery =
        subtotal > 0
            ? CART_DELIVERY_CHARGE
            : 0;


    const total =
        subtotal + delivery;


    if (cartItemCount) {

        cartItemCount.textContent =
            `${totalQuantity} ${
                totalQuantity === 1
                    ? "Item"
                    : "Items"
            }`;
    }


    if (cartSubtotal) {

        cartSubtotal.textContent =
            `₹${subtotal}`;
    }


    if (cartDelivery) {

        cartDelivery.textContent =
            `₹${delivery}`;
    }


    if (cartTotal) {

        cartTotal.textContent =
            `₹${total}`;
    }
}


/* =================================
   CART CLICK EVENTS
================================= */

function initializeCartEvents() {

    if (!cartItems) {
        return;
    }


    cartItems.addEventListener(
        "click",
        (event) => {

            const button =
                event.target.closest(
                    "button"
                );


            if (!button) {
                return;
            }


            const item =
                button.closest(
                    ".cart-item"
                );


            if (!item) {
                return;
            }


            const foodId =
                item.dataset.foodId;


            const action =
                button.dataset.action;


            if (
                action ===
                "increase"
            ) {

                updateQuantity(
                    foodId,
                    1
                );

            }


            if (
                action ===
                "decrease"
            ) {

                updateQuantity(
                    foodId,
                    -1
                );

            }

        }
    );
}


/* =================================
   INITIALIZE
================================= */

function initializeCart() {

    displayCart();

    initializeCartEvents();
}


initializeCart();