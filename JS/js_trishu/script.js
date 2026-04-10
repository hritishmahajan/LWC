function Hello(){
    alert("Hello World");
}


let con = document.querySelector('.container');

let button = document.querySelector('button');
button.innerHTML = "Click Me";

con.appendChild(button);

button.addEventListener('click', (e) => {
    alert("Hello World");
})  

// Bubbling and Event Capturing

// just make the 3rd var as true and then you can do capturing instead of bubbling
// Bubbling -> Means the event will be triggered from the innermost element to the outermost element
// Capturing -> Means the event will be triggered from the outermost element to the innermost element


