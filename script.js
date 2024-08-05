// DOM Element
const boxes = document.querySelectorAll(".box"),         // sabhi .box wale elements ko select kar raha hai
image = document.querySelector(".image");         // .image wale element ko select kar raha hai

// loop through each boxes element
boxes.forEach((box) => {         // har ek box element ke liye loop
    // when draggable element dragged over a box element
    box.addEventListener("dragover", (e) => {     // jab draggable element box ke upar aata hai
        e.preventDefault();         // default behaviour ko rokta hai
        box.classList.add("hovered");         // box element me hovered class add karta hai
    });
    // when a draggable element leaves box element
    box.addEventListener("dragleave", () => {         // jab draggable element box se nikal jata hai
        box.classList.remove("hovered");         // box element se hovered class ko remove karta hai
    });
    // when a draggable element is dropped on a box element
    box.addEventListener("drop", () => {         // jab draggable element box par drop hota hai
        box.appendChild(image);         // image element ko box ke andar add karta hai
        box.classList.remove("hovered");         // box element se hovered class ko remove karta hai
    });
});
