const restaurantTableData = {
    "rajasthani-rasoi": [
        { number: 1, seats: 2, status: "available", position: "top-left" },
        { number: 2, seats: 4, status: "booked", position: "top-center" },
        { number: 3, seats: 2, status: "available", position: "top-right" },
        { number: 4, seats: 6, status: "available", position: "middle-left" },
        { number: 5, seats: 4, status: "booked", position: "middle-center" },
        { number: 6, seats: 4, status: "available", position: "middle-right" },
        { number: 7, seats: 2, status: "available", position: "bottom-left" },
        { number: 8, seats: 4, status: "available", position: "bottom-center" },
        { number: 9, seats: 6, status: "booked", position: "bottom-right" },
        { number: 10, seats: 2, status: "available", position: "side-left" }
    ],

    "gujarati-thali-house": [
        { number: 1, seats: 4, status: "available", position: "top-left" },
        { number: 2, seats: 2, status: "available", position: "top-right" },
        { number: 3, seats: 6, status: "booked", position: "middle-left" },
        { number: 4, seats: 4, status: "available", position: "middle-right" },
        { number: 5, seats: 2, status: "booked", position: "center" },
        { number: 6, seats: 4, status: "available", position: "bottom-left" },
        { number: 7, seats: 6, status: "available", position: "bottom-right" },
        { number: 8, seats: 2, status: "available", position: "side-left" },
        { number: 9, seats: 4, status: "booked", position: "side-right" },
        { number: 10, seats: 4, status: "available", position: "corner-top" },
        { number: 11, seats: 2, status: "available", position: "corner-bottom" },
        { number: 12, seats: 6, status: "booked", position: "center-bottom" }
    ],

    "punjabi-zaika": [
        { number: 1, seats: 4, status: "booked", position: "top-left" },
        { number: 2, seats: 6, status: "available", position: "top-right" },
        { number: 3, seats: 2, status: "available", position: "middle-left" },
        { number: 4, seats: 4, status: "available", position: "middle-center" },
        { number: 5, seats: 6, status: "booked", position: "middle-right" },
        { number: 6, seats: 2, status: "available", position: "bottom-left" },
        { number: 7, seats: 4, status: "available", position: "bottom-right" },
        { number: 8, seats: 4, status: "booked", position: "side-top" },
        { number: 9, seats: 2, status: "available", position: "side-bottom" },
        { number: 10, seats: 6, status: "available", position: "corner-left" },
        { number: 11, seats: 4, status: "available", position: "corner-right" }
    ],

    "bengal-bhojan": [
        { number: 1, seats: 2, status: "available", position: "top-left" },
        { number: 2, seats: 4, status: "booked", position: "top-center" },
        { number: 3, seats: 6, status: "available", position: "top-right" },
        { number: 4, seats: 4, status: "available", position: "middle-left" },
        { number: 5, seats: 2, status: "booked", position: "center" },
        { number: 6, seats: 4, status: "available", position: "middle-right" },
        { number: 7, seats: 6, status: "booked", position: "bottom-left" },
        { number: 8, seats: 2, status: "available", position: "bottom-center" },
        { number: 9, seats: 4, status: "available", position: "bottom-right" },
        { number: 10, seats: 4, status: "available", position: "side-left" },
        { number: 11, seats: 2, status: "booked", position: "side-right" },
        { number: 12, seats: 6, status: "available", position: "corner" },
        { number: 13, seats: 4, status: "available", position: "entrance" }
    ],

    "south-spice-kitchen": [
        { number: 1, seats: 2, status: "available", position: "top-left" },
        { number: 2, seats: 4, status: "available", position: "top-right" },
        { number: 3, seats: 6, status: "booked", position: "middle-left" },
        { number: 4, seats: 4, status: "available", position: "middle-center" },
        { number: 5, seats: 2, status: "available", position: "middle-right" },
        { number: 6, seats: 6, status: "available", position: "bottom-left" },
        { number: 7, seats: 4, status: "booked", position: "bottom-center" },
        { number: 8, seats: 2, status: "available", position: "bottom-right" },
        { number: 9, seats: 4, status: "available", position: "side-left" },
        { number: 10, seats: 6, status: "booked", position: "side-right" },
        { number: 11, seats: 2, status: "available", position: "corner-top" },
        { number: 12, seats: 4, status: "available", position: "corner-bottom" },
        { number: 13, seats: 6, status: "available", position: "entrance" },
        { number: 14, seats: 4, status: "booked", position: "window" }
    ],

    "maharashtra-tadka": [
        { number: 1, seats: 4, status: "available", position: "top-left" },
        { number: 2, seats: 2, status: "booked", position: "top-center" },
        { number: 3, seats: 6, status: "available", position: "top-right" },
        { number: 4, seats: 2, status: "available", position: "middle-left" },
        { number: 5, seats: 4, status: "booked", position: "middle-right" },
        { number: 6, seats: 6, status: "available", position: "center" },
        { number: 7, seats: 4, status: "available", position: "bottom-left" },
        { number: 8, seats: 2, status: "available", position: "bottom-right" },
        { number: 9, seats: 4, status: "booked", position: "side-left" },
        { number: 10, seats: 6, status: "available", position: "side-right" },
        { number: 11, seats: 2, status: "available", position: "entrance" },
        { number: 12, seats: 4, status: "available", position: "window" }
    ],

    "kashmir-valley-kitchen": [
        { number: 1, seats: 2, status: "booked", position: "top-left" },
        { number: 2, seats: 4, status: "available", position: "top-right" },
        { number: 3, seats: 6, status: "available", position: "middle-left" },
        { number: 4, seats: 4, status: "booked", position: "middle-center" },
        { number: 5, seats: 2, status: "available", position: "middle-right" },
        { number: 6, seats: 6, status: "available", position: "bottom-left" },
        { number: 7, seats: 4, status: "available", position: "bottom-right" },
        { number: 8, seats: 2, status: "booked", position: "side-top" },
        { number: 9, seats: 4, status: "available", position: "side-bottom" },
        { number: 10, seats: 6, status: "available", position: "window" }
    ],

    "awadhi-dastarkhwan": [
        { number: 1, seats: 4, status: "available", position: "top-left" },
        { number: 2, seats: 6, status: "booked", position: "top-right" },
        { number: 3, seats: 2, status: "available", position: "middle-left" },
        { number: 4, seats: 4, status: "available", position: "middle-center" },
        { number: 5, seats: 6, status: "available", position: "middle-right" },
        { number: 6, seats: 2, status: "booked", position: "bottom-left" },
        { number: 7, seats: 4, status: "available", position: "bottom-center" },
        { number: 8, seats: 6, status: "available", position: "bottom-right" },
        { number: 9, seats: 2, status: "available", position: "side-left" },
        { number: 10, seats: 4, status: "booked", position: "side-right" },
        { number: 11, seats: 6, status: "available", position: "corner" }
    ],

    "hyderabadi-nizams-kitchen": [
        { number: 1, seats: 6, status: "available", position: "top-left" },
        { number: 2, seats: 4, status: "booked", position: "top-center" },
        { number: 3, seats: 2, status: "available", position: "top-right" },
        { number: 4, seats: 4, status: "available", position: "middle-left" },
        { number: 5, seats: 6, status: "booked", position: "center" },
        { number: 6, seats: 2, status: "available", position: "middle-right" },
        { number: 7, seats: 4, status: "available", position: "bottom-left" },
        { number: 8, seats: 6, status: "available", position: "bottom-right" },
        { number: 9, seats: 2, status: "booked", position: "side-left" },
        { number: 10, seats: 4, status: "available", position: "side-right" },
        { number: 11, seats: 6, status: "available", position: "entrance" },
        { number: 12, seats: 2, status: "booked", position: "window" },
        { number: 13, seats: 4, status: "available", position: "corner" },
        { number: 14, seats: 6, status: "available", position: "private-area" },
        { number: 15, seats: 4, status: "booked", position: "lounge" }
    ],

    "goan-coastal-bites": [
        { number: 1, seats: 2, status: "available", position: "top-left" },
        { number: 2, seats: 4, status: "available", position: "top-right" },
        { number: 3, seats: 6, status: "booked", position: "middle-left" },
        { number: 4, seats: 4, status: "available", position: "middle-right" },
        { number: 5, seats: 2, status: "available", position: "center" },
        { number: 6, seats: 6, status: "available", position: "bottom-left" },
        { number: 7, seats: 4, status: "booked", position: "bottom-right" },
        { number: 8, seats: 2, status: "available", position: "side-top" },
        { number: 9, seats: 4, status: "available", position: "side-bottom" },
        { number: 10, seats: 6, status: "booked", position: "window" }
    ],

    "kerala-coconut-kitchen": [
        { number: 1, seats: 4, status: "available", position: "top-left" },
        { number: 2, seats: 2, status: "booked", position: "top-center" },
        { number: 3, seats: 6, status: "available", position: "top-right" },
        { number: 4, seats: 4, status: "available", position: "middle-left" },
        { number: 5, seats: 2, status: "available", position: "middle-center" },
        { number: 6, seats: 6, status: "booked", position: "middle-right" },
        { number: 7, seats: 4, status: "available", position: "bottom-left" },
        { number: 8, seats: 2, status: "available", position: "bottom-right" },
        { number: 9, seats: 6, status: "available", position: "side-left" },
        { number: 10, seats: 4, status: "booked", position: "side-right" },
        { number: 11, seats: 2, status: "available", position: "window" },
        { number: 12, seats: 6, status: "available", position: "garden" },
        { number: 13, seats: 4, status: "booked", position: "entrance" }
    ],

    "bihar-swad-ghar": [
        { number: 1, seats: 2, status: "available", position: "top-left" },
        { number: 2, seats: 4, status: "booked", position: "top-right" },
        { number: 3, seats: 6, status: "available", position: "middle-left" },
        { number: 4, seats: 4, status: "available", position: "middle-center" },
        { number: 5, seats: 2, status: "booked", position: "middle-right" },
        { number: 6, seats: 6, status: "available", position: "bottom-left" },
        { number: 7, seats: 4, status: "available", position: "bottom-right" },
        { number: 8, seats: 2, status: "available", position: "side-left" },
        { number: 9, seats: 6, status: "booked", position: "side-right" },
        { number: 10, seats: 4, status: "available", position: "corner-top" },
        { number: 11, seats: 2, status: "available", position: "corner-bottom" },
        { number: 12, seats: 6, status: "booked", position: "entrance" },
        { number: 13, seats: 4, status: "available", position: "window" },
        { number: 14, seats: 2, status: "available", position: "garden" }
    ]
};