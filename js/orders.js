document.addEventListener("DOMContentLoaded", () => {
    initializeOrdersPage();
});


function initializeOrdersPage() {
    const ordersList = document.getElementById("ordersList");
    const ordersEmptyState = document.getElementById("ordersEmptyState");
    const ordersCount = document.getElementById("ordersCount");

    if (!ordersList || !ordersEmptyState || !ordersCount) {
        return;
    }

    const isLoggedIn = localStorage.getItem("yummyTummyLoggedIn") === "true";

    if (!isLoggedIn) {
        window.location.href = "login.html";
        return;
    }

    const orders = getSavedOrders();

    resetOrderCards();

    if (orders.length === 0) {
        ordersCount.textContent = "0";
        ordersEmptyState.hidden = false;
        return;
    }

    ordersCount.textContent = String(orders.length);
    ordersEmptyState.hidden = true;

    const orderCards = ordersList.querySelectorAll("[data-order-card]");

    orders.forEach((order, orderIndex) => {
        const card = orderCards[orderIndex];

        if (!card) {
            return;
        }

        fillOrderCard(card, order);
        initializeOrderDetailsButton(card);

        card.hidden = false;
    });
}


function getSavedOrders() {
    const savedOrders = localStorage.getItem("yummyTummyOrders");

    if (!savedOrders) {
        return [];
    }

    try {
        const orders = JSON.parse(savedOrders);

        if (!Array.isArray(orders)) {
            return [];
        }

        return orders;
    } catch (error) {
        return [];
    }
}


function resetOrderCards() {
    const orderCards = document.querySelectorAll("[data-order-card]");

    orderCards.forEach((card) => {
        card.hidden = true;

        const orderId = card.querySelector("[data-order-id]");
        const orderDate = card.querySelector("[data-order-date]");
        const orderPayment = card.querySelector("[data-order-payment]");
        const orderTotal = card.querySelector("[data-order-total]");
        const orderAddress = card.querySelector("[data-order-address]");
        const orderStatus = card.querySelector("[data-order-status]");
        const detailsButton = card.querySelector(
            "[data-order-details-button]"
        );
        const detailsSection = card.querySelector("[data-order-details]");

        if (orderId) {
            orderId.textContent = "Order ID";
        }

        if (orderDate) {
            orderDate.textContent = "-";
        }

        if (orderPayment) {
            orderPayment.textContent = "-";
        }

        if (orderTotal) {
            orderTotal.textContent = "₹0";
        }

        if (orderAddress) {
            orderAddress.textContent = "-";
        }

        if (orderStatus) {
            orderStatus.textContent = "Order Placed";
            applyOrderStatusClass(orderStatus, "Order Placed");
        }

        if (detailsButton) {
            detailsButton.textContent = "View Details";
            detailsButton.setAttribute("aria-expanded", "false");
        }

        if (detailsSection) {
            detailsSection.hidden = true;
        }

        resetOrderItems(card);
    });
}


function resetOrderItems(card) {
    const itemElements = card.querySelectorAll("[data-order-item]");

    itemElements.forEach((itemElement) => {
        itemElement.hidden = true;

        const image = itemElement.querySelector("[data-order-item-image]");
        const name = itemElement.querySelector("[data-order-item-name]");
        const category = itemElement.querySelector(
            "[data-order-item-category]"
        );
        const quantity = itemElement.querySelector(
            "[data-order-item-quantity]"
        );
        const price = itemElement.querySelector("[data-order-item-price]");

        if (image) {
            image.src = "";
            image.alt = "";
        }

        if (name) {
            name.textContent = "Food Name";
        }

        if (category) {
            category.textContent = "Category";
        }

        if (quantity) {
            quantity.textContent = "Quantity: 1";
        }

        if (price) {
            price.textContent = "₹0";
        }
    });
}


function fillOrderCard(card, order) {
    const orderId = card.querySelector("[data-order-id]");
    const orderDate = card.querySelector("[data-order-date]");
    const orderPayment = card.querySelector("[data-order-payment]");
    const orderTotal = card.querySelector("[data-order-total]");
    const orderAddress = card.querySelector("[data-order-address]");
    const orderStatus = card.querySelector("[data-order-status]");

    if (orderId) {
        orderId.textContent = order.id || "Order ID";
    }

    if (orderDate) {
        orderDate.textContent = formatOrderDate(order.createdAt);
    }

    if (orderPayment) {
        orderPayment.textContent =
            order.paymentMethodName ||
            getPaymentMethodName(order.paymentMethod);
    }

    if (orderTotal) {
        orderTotal.textContent = formatPrice(order.grandTotal);
    }

    if (orderAddress) {
        orderAddress.textContent = formatAddress(order.address);
    }

    if (orderStatus) {
        const status = order.status || "Order Placed";

        orderStatus.textContent = status;
        applyOrderStatusClass(orderStatus, status);
    }

    fillOrderItems(card, order.items);
}


function fillOrderItems(card, items) {
    if (!Array.isArray(items)) {
        return;
    }

    const itemElements = card.querySelectorAll("[data-order-item]");

    items.forEach((item, itemIndex) => {
        const itemElement = itemElements[itemIndex];

        if (!itemElement) {
            return;
        }

        const image = itemElement.querySelector("[data-order-item-image]");
        const name = itemElement.querySelector("[data-order-item-name]");
        const category = itemElement.querySelector(
            "[data-order-item-category]"
        );
        const quantity = itemElement.querySelector(
            "[data-order-item-quantity]"
        );
        const price = itemElement.querySelector("[data-order-item-price]");

        if (image) {
            image.src = item.image || "";
            image.alt = item.name || "Food";
        }

        if (name) {
            name.textContent = item.name || "Food Name";
        }

        if (category) {
            category.textContent = item.category || "Category";
        }

        if (quantity) {
            quantity.textContent = `Quantity: ${item.quantity || 1}`;
        }

        if (price) {
            const itemTotal =
                Number(item.price || 0) * Number(item.quantity || 1);

            price.textContent = formatPrice(itemTotal);
        }

        itemElement.hidden = false;
    });
}


function initializeOrderDetailsButton(card) {
    const button = card.querySelector("[data-order-details-button]");
    const detailsSection = card.querySelector("[data-order-details]");

    if (!button || !detailsSection) {
        return;
    }

    button.onclick = () => {
        const isHidden = detailsSection.hidden;

        detailsSection.hidden = !isHidden;

        button.setAttribute(
            "aria-expanded",
            String(isHidden)
        );

        button.textContent = isHidden
            ? "Hide Details"
            : "View Details";
    };
}


function applyOrderStatusClass(statusElement, status) {
    statusElement.classList.remove(
        "status-placed",
        "status-confirmed",
        "status-preparing",
        "status-out-for-delivery",
        "status-delivered",
        "status-cancelled"
    );

    const normalizedStatus = String(status)
        .toLowerCase()
        .trim();

    if (normalizedStatus === "order placed") {
        statusElement.classList.add("status-placed");
        return;
    }

    if (normalizedStatus === "confirmed") {
        statusElement.classList.add("status-confirmed");
        return;
    }

    if (normalizedStatus === "preparing") {
        statusElement.classList.add("status-preparing");
        return;
    }

    if (normalizedStatus === "out for delivery") {
        statusElement.classList.add("status-out-for-delivery");
        return;
    }

    if (normalizedStatus === "delivered") {
        statusElement.classList.add("status-delivered");
        return;
    }

    if (normalizedStatus === "cancelled") {
        statusElement.classList.add("status-cancelled");
    }
}


function formatPrice(value) {
    const amount = Number(value || 0);

    return `₹${amount}`;
}


function formatOrderDate(value) {
    if (!value) {
        return "-";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}


function formatAddress(address) {
    if (!address || typeof address !== "object") {
        return "-";
    }

    const parts = [
        address.name,
        address.address,
        address.area,
        address.city,
        address.state,
        address.pincode,
        address.mobile
    ];

    return parts
        .filter((part) => {
            return (
                part !== undefined &&
                part !== null &&
                part !== ""
            );
        })
        .join(", ");
}


function getPaymentMethodName(method) {
    if (method === "cod") {
        return "Cash on Delivery";
    }

    if (method === "upi") {
        return "UPI";
    }

    if (method === "online") {
        return "Online Payment";
    }

    return "Not Available";
}