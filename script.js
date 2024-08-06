// Select all elements with the class "box" and the element with the class "image"
const boxes = document.querySelectorAll(".box"),
      image = document.querySelector(".image");

// Handle drag and drop for desktop
boxes.forEach((box) => {
    // When a draggable element is dragged over a box element
    box.addEventListener("dragover", (e) => {
        e.preventDefault(); // Prevent the default behavior to allow dropping
        box.classList.add("hovered"); // Add the "hovered" class to indicate a valid drop target
    });
    // When a draggable element leaves a box element
    box.addEventListener("dragleave", () => {
        box.classList.remove("hovered"); // Remove the "hovered" class
    });
    // When a draggable element is dropped on a box element
    box.addEventListener("drop", () => {
        box.appendChild(image); // Append the image element to the box
        box.classList.remove("hovered"); // Remove the "hovered" class
    });
});

// Handle touch events for mobile
image.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Prevent default behavior to handle custom touch interactions
    const touch = e.touches[0]; // Get the first touch point
    image.style.position = 'absolute'; // Set image position to absolute to move it
    image.style.zIndex = '1000'; // Set z-index to make sure image is on top

    // Function to move image to specified coordinates
    function moveAt(pageX, pageY) {
        image.style.left = pageX - image.offsetWidth / 2 + 'px'; // Set horizontal position
        image.style.top = pageY - image.offsetHeight / 2 + 'px'; // Set vertical position
    }

    moveAt(touch.pageX, touch.pageY); // Initial move to the touch point

    // Event listener to handle touch move
    function onTouchMove(event) {
        const touchMove = event.touches[0]; // Get the current touch point
        moveAt(touchMove.pageX, touchMove.pageY); // Move the image to the new touch point
    }

    document.addEventListener("touchmove", onTouchMove); // Attach touchmove listener to the document

    // Event listener to handle touch end
    image.addEventListener("touchend", function onTouchEnd(event) {
        document.removeEventListener("touchmove", onTouchMove); // Remove the touchmove listener
        image.style.position = ''; // Reset image position
        image.style.zIndex = ''; // Reset z-index

        // Determine the drop target
        let dropped = false; // Flag to check if image is dropped in a valid box
        boxes.forEach((box) => {
            const boxRect = box.getBoundingClientRect(); // Get box's position and dimensions
            const imageRect = image.getBoundingClientRect(); // Get image's position and dimensions

            // Check if the image intersects with the box
            if (
                imageRect.left < boxRect.right &&
                imageRect.right > boxRect.left &&
                imageRect.top < boxRect.bottom &&
                imageRect.bottom > boxRect.top
            ) {
                box.appendChild(image); // Append image to the box if intersecting
                dropped = true; // Set dropped flag to true
            }
        });

        if (!dropped) {
            image.style.left = ''; // Reset image horizontal position
            image.style.top = ''; // Reset image vertical position
        }

        image.removeEventListener("touchend", onTouchEnd); // Remove the touchend listener
    });
});
