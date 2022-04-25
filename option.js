let page = document.getElementById("buttonDiv");
let selectedClassName = "current";
const presetButtonColors = ["#3aa757","#e8453c","#f9bb2d","#4688f1","#8e44ad","#f62459"];

// Reacts to a button click by marking the selected button and saving the selection 

function handleButtonClick(event){

    let current = event.target.parentElement.querySelector(`.${selectedClassName}`);

    if(current && current !== event.target){
        current.classList.remove(selectedClassName);
    }

    // mark button as selected

    let color = event.target.dataset.color;
    event.target.classList.add(selectedClassName);
    chrome.storage.sync.set({color})
}

// Add a button to the page for each supplied color 
function constructOptions(buttonColors){
    chrome.storage.sync.get("color",({color})=>{
        let currentColor = color.color;
        
        // for each color we are provided

        for (let buttonColor of buttonColors){
            // ..create button color with that color

            let button = document.createElement("button");
            button.dataset.color = buttonColor;
            button.style.backgroundColor = buttonColor;

            // ..mark the currently selected Color 

            if(buttonColor === currentColor){
                button.classList.add(selectedClassName);
            }

            // ..and register a listener for when that button is clicked
            button.addEventListener("click",handleButtonClick);
            page.appendChild(button)
        }
    })
}

constructOptions(presetButtonColors);