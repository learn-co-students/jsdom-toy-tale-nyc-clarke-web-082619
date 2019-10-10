const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
let addToy = false;

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

// YOUR CODE HERE

const toyCollection = document.getElementById('toy-collection');

document.addEventListener('DOMContentLoaded', function(){

    fetch("http://localhost:3000/toys", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(resp => resp.json())
        .then(data => {
            data.forEach(toy => {
                let newToy = createNewToy(toy.name, toy.image, toy.likes, toy.id);
                toyCollection.appendChild(newToy);
            })
        })

    toyForm.addEventListener("submit", function(event){
        event.preventDefault();
        const name = event.target.name.value;
        const image = event.target.image.value;

        fetch("http://localhost:3000/toys", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: name,
                image: image,
                likes: 0
            })
        })
        toyCollection.appendChild(createNewToy(name, image))
    });

    toyCollection.addEventListener("click", function(event){
        if (event.target.className === "like-btn"){
            const id = event.target.parentNode.getAttribute('data-id');
            let incrementLikes = parseInt(event.target.previousElementSibling.innerText) + 1;
            fetch(`http://localhost:3000/toys/${id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    likes: incrementLikes
                })
            })
        }
    })
        
})

function createNewToy(name, image, likes, id){
    let newToyCard = document.createElement("div");
    newToyCard.setAttribute('class', 'card');
    newToyCard.setAttribute('data-id', id);
    newToyCard.innerHTML = `
        <h2>${name}</h2>
        <img src=${image} class="toy-avatar" />
        <p>${likes} Likes </p>
        <button class="like-btn">Like &#9829</button>
    `;
    return newToyCard;
}


// OR HERE!