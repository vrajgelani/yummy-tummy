/* =========================================================
   YUMMY TUMMY
   ADDRESS PAGE
   ADD ADDRESS
   ========================================================= */


/* =========================================================
   PAGE INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeAddressPage();

    }
);


/* =========================================================
   INITIALIZE ADDRESS PAGE
   ========================================================= */

function initializeAddressPage() {

    const addressGrid =
        document.getElementById(
            "addressGrid"
        );

    const emptyState =
        document.getElementById(
            "addressEmptyState"
        );

    const addressCount =
        document.getElementById(
            "addressCount"
        );

    const addAddressButton =
        document.getElementById(
            "addAddressButton"
        );

    const emptyAddAddressButton =
        document.getElementById(
            "emptyAddAddressButton"
        );

    const addressFormSection =
        document.getElementById(
            "addressFormSection"
        );

    const addressForm =
        document.getElementById(
            "addressForm"
        );

    const cancelAddressButton =
        document.getElementById(
            "cancelAddressButton"
        );


    if (
        !addressGrid ||
        !emptyState ||
        !addressCount
    ) {
        return;
    }


    /*
     * Login Protection
     */
    if (
        !isAddressUserLoggedIn()
    ) {

        window.location.href =
            "login.html";

        return;
    }


    /*
     * Show current saved addresses
     */
    renderAddresses();


    /*
     * Add button
     */
    if (
        addAddressButton
    ) {

        addAddressButton.addEventListener(
            "click",
            function () {

                openAddressForm();

            }
        );

    }


    /*
     * Empty state add button
     */
    if (
        emptyAddAddressButton
    ) {

        emptyAddAddressButton.addEventListener(
            "click",
            function () {

                openAddressForm();

            }
        );

    }


    /*
     * Cancel
     */
    if (
        cancelAddressButton
    ) {

        cancelAddressButton.addEventListener(
            "click",
            function () {

                closeAddressForm();

            }
        );

    }


    /*
     * Form Submit
     */
    if (
        addressForm
    ) {

        addressForm.addEventListener(
            "submit",
            function (
                event
            ) {

                event.preventDefault();

                saveNewAddress();

            }
        );

    }

}


/* =========================================================
   LOGIN CHECK
   ========================================================= */

function isAddressUserLoggedIn() {

    return (
        localStorage.getItem(
            "yummyTummyLoggedIn"
        ) === "true"
    );

}


/* =========================================================
   GET STORED ADDRESSES
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

        const parsedAddresses =
            JSON.parse(
                storedAddresses
            );


        if (
            Array.isArray(
                parsedAddresses
            )
        ) {

            return parsedAddresses;

        }


        return [];

    } catch (error) {

        return [];

    }

}


/* =========================================================
   SAVE ADDRESSES
   ========================================================= */

function saveAddresses(
    addresses
) {

    localStorage.setItem(
        "yummyTummyAddresses",
        JSON.stringify(
            addresses
        )
    );

}


/* =========================================================
   OPEN FORM
   ========================================================= */

function openAddressForm() {

    const formSection =
        document.getElementById(
            "addressFormSection"
        );

    const addressForm =
        document.getElementById(
            "addressForm"
        );


    if (
        !formSection
    ) {
        return;
    }


    formSection.hidden =
        false;


    formSection.style.display =
        "";


    if (
        addressForm
    ) {

        addressForm.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* =========================================================
   CLOSE FORM
   ========================================================= */

function closeAddressForm() {

    const formSection =
        document.getElementById(
            "addressFormSection"
        );

    const addressForm =
        document.getElementById(
            "addressForm"
        );


    if (
        formSection
    ) {

        formSection.hidden =
            true;

        formSection.style.display =
            "none";

    }


    if (
        addressForm
    ) {

        addressForm.reset();

    }

}


/* =========================================================
   GET FORM VALUE
   ========================================================= */

function getAddressFormValue(
    id
) {

    const field =
        document.getElementById(
            id
        );


    if (!field) {
        return "";
    }


    return String(
        field.value || ""
    ).trim();

}


/* =========================================================
   SAVE NEW ADDRESS
   ========================================================= */

function saveNewAddress() {

    const label =
        getAddressFormValue(
            "addressLabel"
        );

    const fullName =
        getAddressFormValue(
            "addressName"
        );

    const mobile =
        getAddressFormValue(
            "addressMobile"
        );

    const house =
        getAddressFormValue(
            "addressHouse"
        );

    const area =
        getAddressFormValue(
            "addressArea"
        );

    const city =
        getAddressFormValue(
            "addressCity"
        );

    const state =
        getAddressFormValue(
            "addressState"
        );

    const pincode =
        getAddressFormValue(
            "addressPincode"
        );


    /* ==================== VALIDATION ==================== */

    if (!label) {

        window.alert(
            "Please select an address type."
        );

        return;
    }


    if (
        fullName.length < 2
    ) {

        window.alert(
            "Please enter a valid full name."
        );

        return;
    }


    if (
        !/^[0-9]{10}$/.test(
            mobile
        )
    ) {

        window.alert(
            "Please enter a valid 10 digit mobile number."
        );

        return;
    }


    if (!house) {

        window.alert(
            "Please enter house, flat or building details."
        );

        return;
    }


    if (!area) {

        window.alert(
            "Please enter area or street."
        );

        return;
    }


    if (!city) {

        window.alert(
            "Please enter city."
        );

        return;
    }


    if (!state) {

        window.alert(
            "Please enter state."
        );

        return;
    }


    if (
        !/^[0-9]{6}$/.test(
            pincode
        )
    ) {

        window.alert(
            "Please enter a valid 6 digit pincode."
        );

        return;
    }


    /* ==================== ADDRESS LIMIT ==================== */

    const addresses =
        getSavedAddresses();


    if (
        addresses.length >= 4
    ) {

        window.alert(
            "You can save maximum 4 addresses."
        );

        return;
    }


    /* ==================== CREATE ADDRESS ==================== */

    const address = {

        id:
            "address-" +
            Date.now(),

        label:
            label,

        name:
            fullName,

        mobile:
            mobile,

        house:
            house,

        area:
            area,

        city:
            city,

        state:
            state,

        pincode:
            pincode,

        selected:
            addresses.length === 0

    };


    /* ==================== SAVE ==================== */

    addresses.push(
        address
    );


    saveAddresses(
        addresses
    );


    /*
     * Close form
     */
    closeAddressForm();


    /*
     * Render immediately
     */
    renderAddresses();


    /*
     * Success message
     */
    window.alert(
        "Address saved successfully."
    );

}


/* =========================================================
   RENDER ADDRESSES
   ========================================================= */

function renderAddresses() {

    const addressGrid =
        document.getElementById(
            "addressGrid"
        );

    const emptyState =
        document.getElementById(
            "addressEmptyState"
        );

    const addressCount =
        document.getElementById(
            "addressCount"
        );


    if (
        !addressGrid ||
        !emptyState ||
        !addressCount
    ) {
        return;
    }


    const addresses =
        getSavedAddresses();


    const cards =
        addressGrid.querySelectorAll(
            ".address-card"
        );


    /*
     * Hide all cards first
     */
    cards.forEach(
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
     * Empty State
     */
    if (
        addresses.length === 0
    ) {

        emptyState.hidden =
            false;

        emptyState.style.display =
            "";


        addressCount.textContent =
            "0 Addresses";


        return;
    }


    /*
     * Hide Empty State
     */
    emptyState.hidden =
        true;

    emptyState.style.display =
        "none";


    let visibleCount =
        0;


    /*
     * Render cards
     */
    addresses
        .slice(
            0,
            cards.length
        )
        .forEach(
            function (
                address,
                index
            ) {

                const card =
                    cards[index];


                if (!card) {
                    return;
                }


                fillAddressCard(
                    card,
                    address
                );


                card.hidden =
                    false;

                card.style.display =
                    "";


                initializeAddressCardButtons(
                    card,
                    address.id
                );


                visibleCount++;

            }
        );


    /*
     * Count
     */
    addressCount.textContent =
        visibleCount +
        (
            visibleCount === 1
                ? " Address"
                : " Addresses"
        );

}


/* =========================================================
   FILL ADDRESS CARD
   ========================================================= */

function fillAddressCard(
    card,
    address
) {

    if (
        !card ||
        !address
    ) {
        return;
    }


    const label =
        card.querySelector(
            "[data-address-label]"
        );

    const name =
        card.querySelector(
            "[data-address-name]"
        );

    const line =
        card.querySelector(
            "[data-address-line]"
        );

    const city =
        card.querySelector(
            "[data-address-city]"
        );

    const state =
        card.querySelector(
            "[data-address-state]"
        );

    const pincode =
        card.querySelector(
            "[data-address-pincode]"
        );

    const mobile =
        card.querySelector(
            "[data-address-mobile]"
        );


    if (label) {

        label.textContent =
            address.label ||
            "Address";

    }


    if (name) {

        name.textContent =
            address.name ||
            "";

    }


    if (line) {

        line.textContent =
            (
                address.house ||
                ""
            ) +
            ", " +
            (
                address.area ||
                ""
            );

    }


    if (city) {

        city.textContent =
            "City: " +
            (
                address.city ||
                ""
            );

    }


    if (state) {

        state.textContent =
            "State: " +
            (
                address.state ||
                ""
            );

    }


    if (pincode) {

        pincode.textContent =
            "Pincode: " +
            (
                address.pincode ||
                ""
            );

    }


    if (mobile) {

        mobile.textContent =
            "Mobile: " +
            (
                address.mobile ||
                ""
            );

    }


    card.dataset.addressId =
        address.id;


    /*
     * Selected state
     */
    card.dataset.selected =
        address.selected
            ? "true"
            : "false";

}


/* =========================================================
   INITIALIZE CARD BUTTONS
   ========================================================= */

function initializeAddressCardButtons(
    card,
    addressId
) {

    if (
        !card ||
        !addressId
    ) {
        return;
    }


    const selectButton =
        card.querySelector(
            "[data-address-select]"
        );


    const editButton =
        card.querySelector(
            "[data-address-edit]"
        );


    const deleteButton =
        card.querySelector(
            "[data-address-delete]"
        );


    /*
     * SELECT
     *
     * Functionality will be expanded
     * in Part 3.
     */

    if (
        selectButton
    ) {

        selectButton.onclick =
            function () {

                selectAddress(
                    addressId
                );

            };

    }


    /*
     * EDIT
     *
     * Functionality will be expanded
     * in Part 3.
     */

    if (
        editButton
    ) {

        editButton.onclick =
            function () {

                window.alert(
                    "Edit Address will be available in the next part."
                );

            };

    }


    /*
     * DELETE
     *
     * Functionality will be expanded
     * in Part 3.
     */

    if (
        deleteButton
    ) {

        deleteButton.onclick =
            function () {

                deleteAddress(
                    addressId
                );

            };

    }

}


/* =========================================================
   SELECT ADDRESS
   ========================================================= */

function selectAddress(
    addressId
) {

    const addresses =
        getSavedAddresses();


    addresses.forEach(
        function (
            address
        ) {

            address.selected =
                address.id ===
                addressId;

        }
    );


    saveAddresses(
        addresses
    );


    renderAddresses();


    window.alert(
        "Address selected."
    );

}


/* =========================================================
   DELETE ADDRESS
   ========================================================= */

function deleteAddress(
    addressId
) {

    if (!addressId) {
        return;
    }


    const shouldDelete =
        window.confirm(
            "Delete this address?"
        );


    if (!shouldDelete) {
        return;
    }


    const addresses =
        getSavedAddresses();


    const deletedAddress =
        addresses.find(
            function (
                address
            ) {

                return (
                    address.id ===
                    addressId
                );

            }
        );


    const updatedAddresses =
        addresses.filter(
            function (
                address
            ) {

                return (
                    address.id !==
                    addressId
                );

            }
        );


    /*
     * If selected address was deleted,
     * select another saved address.
     */
    if (
        deletedAddress &&
        deletedAddress.selected &&
        updatedAddresses.length > 0
    ) {

        updatedAddresses[0].selected =
            true;

    }


    saveAddresses(
        updatedAddresses
    );


    /*
     * Instant UI update
     */
    renderAddresses();

}


/* =========================================================
   STORAGE CHANGE SUPPORT
   ========================================================= */

window.addEventListener(
    "storage",
    function (
        event
    ) {

        if (
            event.key ===
            "yummyTummyAddresses"
        ) {

            renderAddresses();

        }

    }
);