/* =========================================================
   YUMMY TUMMY - ADDRESS MANAGEMENT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        "use strict";


        /* =====================================================
           STORAGE KEYS
        ===================================================== */

        const ADDRESS_STORAGE_KEY =
            "yummyTummyAddresses";

        const SELECTED_ADDRESS_STORAGE_KEY =
            "yummyTummySelectedAddress";


        /* =====================================================
           LOGIN CHECK
        ===================================================== */

        const loggedIn =
            localStorage.getItem(
                "yummyTummyLoggedIn"
            ) === "true";


        if (!loggedIn) {

            window.location.href =
                "login.html";

            return;
        }


        /* =====================================================
           ELEMENTS
        ===================================================== */

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


        const addressCount =
            document.getElementById(
                "addressCount"
            );


        const addressGrid =
            document.getElementById(
                "addressGrid"
            );


        const addressEmptyState =
            document.getElementById(
                "addressEmptyState"
            );


        const addressLabelInput =
            document.getElementById(
                "addressLabel"
            );


        const addressNameInput =
            document.getElementById(
                "addressName"
            );


        const addressMobileInput =
            document.getElementById(
                "addressMobile"
            );


        const addressHouseInput =
            document.getElementById(
                "addressHouse"
            );


        const addressAreaInput =
            document.getElementById(
                "addressArea"
            );


        const addressCityInput =
            document.getElementById(
                "addressCity"
            );


        const addressStateInput =
            document.getElementById(
                "addressState"
            );


        const addressPincodeInput =
            document.getElementById(
                "addressPincode"
            );


        const saveAddressButton =
            document.getElementById(
                "saveAddressButton"
            );


        const cancelAddressButton =
            document.getElementById(
                "cancelAddressButton"
            );


        /* =====================================================
           EDIT STATE
        ===================================================== */

        let editingAddressId =
            null;


        /* =====================================================
           STORAGE HELPERS
        ===================================================== */

        function getAddresses() {

            try {

                const stored =
                    localStorage.getItem(
                        ADDRESS_STORAGE_KEY
                    );


                if (!stored) {
                    return [];
                }


                const parsed =
                    JSON.parse(
                        stored
                    );


                if (
                    Array.isArray(parsed)
                ) {

                    return parsed;
                }


                return [];

            } catch (error) {

                console.error(
                    "Unable to read addresses:",
                    error
                );


                return [];
            }
        }


        function saveAddresses(
            addresses
        ) {

            try {

                localStorage.setItem(
                    ADDRESS_STORAGE_KEY,
                    JSON.stringify(
                        addresses
                    )
                );


                return true;

            } catch (error) {

                console.error(
                    "Unable to save addresses:",
                    error
                );


                return false;
            }
        }


        function getSelectedAddress() {

            try {

                const stored =
                    localStorage.getItem(
                        SELECTED_ADDRESS_STORAGE_KEY
                    );


                if (!stored) {
                    return null;
                }


                return JSON.parse(
                    stored
                );

            } catch (error) {

                console.error(
                    "Unable to read selected address:",
                    error
                );


                return null;
            }
        }


        function saveSelectedAddress(
            address
        ) {

            try {

                localStorage.setItem(
                    SELECTED_ADDRESS_STORAGE_KEY,
                    JSON.stringify(
                        address
                    )
                );


                return true;

            } catch (error) {

                console.error(
                    "Unable to save selected address:",
                    error
                );


                return false;
            }
        }


        function removeSelectedAddress() {

            localStorage.removeItem(
                SELECTED_ADDRESS_STORAGE_KEY
            );
        }


        /* =====================================================
           ID GENERATOR
        ===================================================== */

        function createAddressId() {

            return (
                "address-" +
                Date.now() +
                "-" +
                Math.random()
                    .toString(36)
                    .substring(2, 9)
            );
        }


        /* =====================================================
           FORM SHOW
        ===================================================== */

        function showAddressForm() {

            if (!addressFormSection) {
                return;
            }


            addressFormSection.hidden =
                false;
        }


        /* =====================================================
           FORM HIDE
        ===================================================== */

        function hideAddressForm() {

            if (!addressFormSection) {
                return;
            }


            addressFormSection.hidden =
                true;
        }


        /* =====================================================
           RESET FORM
        ===================================================== */

        function resetAddressForm() {

            if (addressForm) {

                addressForm.reset();
            }


            editingAddressId =
                null;


            if (saveAddressButton) {

                saveAddressButton.textContent =
                    "Save Address";
            }
        }


        /* =====================================================
           SCROLL TO FORM
        ===================================================== */

        function scrollToForm() {

            if (!addressFormSection) {
                return;
            }


            addressFormSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }


        /* =====================================================
           ADD NEW ADDRESS
        ===================================================== */

        function openAddAddressForm() {

            resetAddressForm();


            showAddressForm();


            scrollToForm();


            if (
                addressLabelInput
            ) {

                addressLabelInput.focus();
            }
        }


        /* =====================================================
           EDIT ADDRESS
        ===================================================== */

        function openEditAddress(
            address
        ) {

            if (!address) {
                return;
            }


            editingAddressId =
                address.id;


            showAddressForm();


            /* ================= LABEL ================= */

            if (
                addressLabelInput
            ) {

                addressLabelInput.value =
                    address.label ||
                    address.type ||
                    "";
            }


            /* ================= NAME ================= */

            if (
                addressNameInput
            ) {

                addressNameInput.value =
                    address.name ||
                    "";
            }


            /* ================= MOBILE ================= */

            if (
                addressMobileInput
            ) {

                addressMobileInput.value =
                    address.mobile ||
                    "";
            }


            /* ================= HOUSE ================= */

            if (
                addressHouseInput
            ) {

                addressHouseInput.value =
                    address.house ||
                    address.address ||
                    "";
            }


            /* ================= AREA ================= */

            if (
                addressAreaInput
            ) {

                addressAreaInput.value =
                    address.area ||
                    "";
            }


            /* ================= CITY ================= */

            if (
                addressCityInput
            ) {

                addressCityInput.value =
                    address.city ||
                    "";
            }


            /* ================= STATE ================= */

            if (
                addressStateInput
            ) {

                addressStateInput.value =
                    address.state ||
                    "";
            }


            /* ================= PINCODE ================= */

            if (
                addressPincodeInput
            ) {

                addressPincodeInput.value =
                    address.pincode ||
                    "";
            }


            if (
                saveAddressButton
            ) {

                saveAddressButton.textContent =
                    "Update Address";
            }


            scrollToForm();


            if (
                addressLabelInput
            ) {

                addressLabelInput.focus();
            }
        }


        /* =====================================================
           READ FORM
        ===================================================== */

        function getFormAddress() {

            return {

                id:
                    editingAddressId ||
                    createAddressId(),

                label:
                    addressLabelInput
                        ? addressLabelInput.value.trim()
                        : "",

                name:
                    addressNameInput
                        ? addressNameInput.value.trim()
                        : "",

                mobile:
                    addressMobileInput
                        ? addressMobileInput.value.trim()
                        : "",

                house:
                    addressHouseInput
                        ? addressHouseInput.value.trim()
                        : "",

                area:
                    addressAreaInput
                        ? addressAreaInput.value.trim()
                        : "",

                city:
                    addressCityInput
                        ? addressCityInput.value.trim()
                        : "",

                state:
                    addressStateInput
                        ? addressStateInput.value.trim()
                        : "",

                pincode:
                    addressPincodeInput
                        ? addressPincodeInput.value.trim()
                        : ""
            };
        }


        /* =====================================================
           VALIDATE FORM
        ===================================================== */

        function validateAddress(
            address
        ) {

            if (!address.label) {

                alert(
                    "Please select address type."
                );

                return false;
            }


            if (
                address.name.length <
                2
            ) {

                alert(
                    "Please enter your full name."
                );

                return false;
            }


            if (
                !/^[0-9]{10}$/.test(
                    address.mobile
                )
            ) {

                alert(
                    "Please enter a valid 10 digit mobile number."
                );

                return false;
            }


            if (!address.house) {

                alert(
                    "Please enter House / Flat / Building."
                );

                return false;
            }


            if (!address.area) {

                alert(
                    "Please enter Area / Street."
                );

                return false;
            }


            if (!address.city) {

                alert(
                    "Please enter City."
                );

                return false;
            }


            if (!address.state) {

                alert(
                    "Please enter State."
                );

                return false;
            }


            if (
                !/^[0-9]{6}$/.test(
                    address.pincode
                )
            ) {

                alert(
                    "Please enter a valid 6 digit pincode."
                );

                return false;
            }


            return true;
        }


        /* =====================================================
           UPDATE ADDRESS COUNT
        ===================================================== */

        function updateAddressCount(
            count
        ) {

            if (!addressCount) {
                return;
            }


            addressCount.textContent =
                count +
                (
                    count === 1
                        ? " Address"
                        : " Addresses"
                );
        }


        /* =====================================================
           RENDER EMPTY STATE
        ===================================================== */

        function updateEmptyState(
            hasAddresses
        ) {

            if (
                addressEmptyState
            ) {

                addressEmptyState.hidden =
                    hasAddresses;
            }


            if (
                addressGrid
            ) {

                addressGrid.hidden =
                    !hasAddresses;
            }
        }


        /* =====================================================
           FORMAT ADDRESS LINE
        ===================================================== */

        function buildAddressLine(
            address
        ) {

            return [
                address.house,
                address.area
            ]
                .filter(Boolean)
                .join(", ");
        }


        /* =====================================================
           RENDER ADDRESSES
        ===================================================== */

        function renderAddresses() {

            if (!addressGrid) {
                return;
            }


            const addresses =
                getAddresses();


            const selected =
                getSelectedAddress();


            const cards =
                addressGrid.querySelectorAll(
                    ".address-card"
                );


            updateAddressCount(
                addresses.length
            );


            updateEmptyState(
                addresses.length > 0
            );


            /*
               First hide all template cards.
            */

            cards.forEach(
                function (card) {

                    card.hidden =
                        true;

                    card.removeAttribute(
                        "data-address-id"
                    );

                    card.classList.remove(
                        "selected-address-card"
                    );
                }
            );


            /*
               Maximum cards available
               in current address.html = 4.
            */

            addresses.forEach(
                function (
                    address,
                    index
                ) {

                    const card =
                        cards[index];


                    if (!card) {
                        return;
                    }


                    card.hidden =
                        false;


                    card.setAttribute(
                        "data-address-id",
                        address.id
                    );


                    const labelElement =
                        card.querySelector(
                            "[data-address-label]"
                        );


                    const nameElement =
                        card.querySelector(
                            "[data-address-name]"
                        );


                    const lineElement =
                        card.querySelector(
                            "[data-address-line]"
                        );


                    const cityElement =
                        card.querySelector(
                            "[data-address-city]"
                        );


                    const stateElement =
                        card.querySelector(
                            "[data-address-state]"
                        );


                    const pincodeElement =
                        card.querySelector(
                            "[data-address-pincode]"
                        );


                    const mobileElement =
                        card.querySelector(
                            "[data-address-mobile]"
                        );


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


                    if (
                        labelElement
                    ) {

                        labelElement.textContent =
                            address.label ||
                            "Other";
                    }


                    if (
                        nameElement
                    ) {

                        nameElement.textContent =
                            address.name ||
                            "Customer";
                    }


                    if (
                        lineElement
                    ) {

                        lineElement.textContent =
                            buildAddressLine(
                                address
                            );
                    }


                    if (
                        cityElement
                    ) {

                        cityElement.textContent =
                            address.city ||
                            "-";
                    }


                    if (
                        stateElement
                    ) {

                        stateElement.textContent =
                            address.state ||
                            "-";
                    }


                    if (
                        pincodeElement
                    ) {

                        pincodeElement.textContent =
                            address.pincode ||
                            "-";
                    }


                    if (
                        mobileElement
                    ) {

                        mobileElement.textContent =
                            "Mobile: " +
                            (
                                address.mobile ||
                                "-"
                            );
                    }


                    const isSelected =
                        selected &&
                        String(
                            selected.id
                        ) ===
                        String(
                            address.id
                        );


                    if (
                        isSelected
                    ) {

                        card.classList.add(
                            "selected-address-card"
                        );
                    }


                    if (
                        selectButton
                    ) {

                        selectButton.textContent =
                            isSelected
                                ? "Selected"
                                : "Select";

                        selectButton.disabled =
                            isSelected;
                    }


                    /*
                       Important:
                       Store address id directly
                       on each button.
                    */

                    if (
                        editButton
                    ) {

                        editButton.setAttribute(
                            "data-address-id",
                            address.id
                        );
                    }


                    if (
                        selectButton
                    ) {

                        selectButton.setAttribute(
                            "data-address-id",
                            address.id
                        );
                    }


                    if (
                        deleteButton
                    ) {

                        deleteButton.setAttribute(
                            "data-address-id",
                            address.id
                        );
                    }
                }
            );
        }


        /* =====================================================
           SELECT ADDRESS
        ===================================================== */

        function selectAddress(
            addressId
        ) {

            const addresses =
                getAddresses();


            const address =
                addresses.find(
                    function (item) {

                        return String(
                            item.id
                        ) ===
                        String(
                            addressId
                        );
                    }
                );


            if (!address) {
                return;
            }


            saveSelectedAddress(
                address
            );


            renderAddresses();
        }


        /* =====================================================
           DELETE ADDRESS
        ===================================================== */

        function deleteAddress(
            addressId
        ) {

            const addresses =
                getAddresses();


            const address =
                addresses.find(
                    function (item) {

                        return String(
                            item.id
                        ) ===
                        String(
                            addressId
                        );
                    }
                );


            if (!address) {
                return;
            }


            const confirmed =
                window.confirm(
                    "Are you sure you want to delete this address?"
                );


            if (!confirmed) {
                return;
            }


            const updated =
                addresses.filter(
                    function (item) {

                        return String(
                            item.id
                        ) !==
                        String(
                            addressId
                        );
                    }
                );


            if (
                !saveAddresses(
                    updated
                )
            ) {

                alert(
                    "Unable to delete address."
                );

                return;
            }


            const selected =
                getSelectedAddress();


            if (
                selected &&
                String(
                    selected.id
                ) ===
                String(
                    addressId
                )
            ) {

                removeSelectedAddress();


                if (
                    updated.length >
                    0
                ) {

                    saveSelectedAddress(
                        updated[0]
                    );
                }
            }


            renderAddresses();
        }


        /* =====================================================
           SELECT / EDIT / DELETE EVENTS
        ===================================================== */

        if (addressGrid) {

            addressGrid.addEventListener(
                "click",
                function (event) {

                    const editButton =
                        event.target.closest(
                            "[data-address-edit]"
                        );


                    if (
                        editButton
                    ) {

                        event.preventDefault();
                        event.stopPropagation();


                        const addressId =
                            editButton.getAttribute(
                                "data-address-id"
                            );


                        const addresses =
                            getAddresses();


                        const address =
                            addresses.find(
                                function (item) {

                                    return String(
                                        item.id
                                    ) ===
                                    String(
                                        addressId
                                    );
                                }
                            );


                        if (
                            address
                        ) {

                            openEditAddress(
                                address
                            );
                        }


                        return;
                    }


                    const selectButton =
                        event.target.closest(
                            "[data-address-select]"
                        );


                    if (
                        selectButton
                    ) {

                        event.preventDefault();
                        event.stopPropagation();


                        const addressId =
                            selectButton.getAttribute(
                                "data-address-id"
                            );


                        selectAddress(
                            addressId
                        );


                        return;
                    }


                    const deleteButton =
                        event.target.closest(
                            "[data-address-delete]"
                        );


                    if (
                        deleteButton
                    ) {

                        event.preventDefault();
                        event.stopPropagation();


                        const addressId =
                            deleteButton.getAttribute(
                                "data-address-id"
                            );


                        deleteAddress(
                            addressId
                        );
                    }
                }
            );
        }


        /* =====================================================
           ADD BUTTON
        ===================================================== */

        if (
            addAddressButton
        ) {

            addAddressButton.addEventListener(
                "click",
                function () {

                    openAddAddressForm();
                }
            );
        }


        /* =====================================================
           EMPTY STATE ADD BUTTON
        ===================================================== */

        if (
            emptyAddAddressButton
        ) {

            emptyAddAddressButton.addEventListener(
                "click",
                function () {

                    openAddAddressForm();
                }
            );
        }


        /* =====================================================
           CANCEL BUTTON
        ===================================================== */

        if (
            cancelAddressButton
        ) {

            cancelAddressButton.addEventListener(
                "click",
                function () {

                    resetAddressForm();


                    hideAddressForm();
                }
            );
        }


        /* =====================================================
           FORM SUBMIT
        ===================================================== */

        if (
            addressForm
        ) {

            addressForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const address =
                        getFormAddress();


                    if (
                        !validateAddress(
                            address
                        )
                    ) {

                        return;
                    }


                    const addresses =
                        getAddresses();


                    /*
                       UPDATE
                    */

                    if (
                        editingAddressId
                    ) {

                        const updated =
                            addresses.map(
                                function (
                                    item
                                ) {

                                    if (
                                        String(
                                            item.id
                                        ) ===
                                        String(
                                            editingAddressId
                                        )
                                    ) {

                                        return address;
                                    }


                                    return item;
                                }
                            );


                        if (
                            !saveAddresses(
                                updated
                            )
                        ) {

                            alert(
                                "Unable to update address."
                            );

                            return;
                        }


                        const selected =
                            getSelectedAddress();


                        if (
                            selected &&
                            String(
                                selected.id
                            ) ===
                            String(
                                editingAddressId
                            )
                        ) {

                            saveSelectedAddress(
                                address
                            );
                        }


                        alert(
                            "Address updated successfully."
                        );


                        resetAddressForm();


                        hideAddressForm();


                        renderAddresses();


                        return;
                    }


                    /*
                       ADD
                    */

                    addresses.push(
                        address
                    );


                    if (
                        !saveAddresses(
                            addresses
                        )
                    ) {

                        alert(
                            "Unable to save address."
                        );

                        return;
                    }


                    /*
                       Automatically select
                       first address.
                    */

                    if (
                        !getSelectedAddress()
                    ) {

                        saveSelectedAddress(
                            address
                        );
                    }


                    alert(
                        "Address saved successfully."
                    );


                    resetAddressForm();


                    hideAddressForm();


                    renderAddresses();
                }
            );
        }


        /* =====================================================
           MOBILE INPUT
        ===================================================== */

        if (
            addressMobileInput
        ) {

            addressMobileInput.addEventListener(
                "input",
                function () {

                    this.value =
                        this.value
                            .replace(
                                /\D/g,
                                ""
                            )
                            .slice(
                                0,
                                10
                            );
                }
            );
        }


        /* =====================================================
           PINCODE INPUT
        ===================================================== */

        if (
            addressPincodeInput
        ) {

            addressPincodeInput.addEventListener(
                "input",
                function () {

                    this.value =
                        this.value
                            .replace(
                                /\D/g,
                                ""
                            )
                            .slice(
                                0,
                                6
                            );
                }
            );
        }


        /* =====================================================
           INITIAL PAGE STATE
        ===================================================== */

        hideAddressForm();


        renderAddresses();

    }
);