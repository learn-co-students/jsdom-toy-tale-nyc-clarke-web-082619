const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyURL = 'http://localhost:3000/toys' 
let addToy = false

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
let toyContainer = document.getElementById('toy-collection')
let newToyForm = document.getElementsByClassName('add-toy-form')[0]

fetch(toyURL)
  .then(function(response) {
    return response.json();
  })
  .then(function(toysArray) { 
    toysArray.forEach(function(toyObj) { //create new card for each toys object
      let toyCard = newToyCard( toyObj.name, toyObj.image, toyObj.likes, toyObj.id)
      toyContainer.append(toyCard);
    })
  })

function newToyCard(name, image, likes=0, id) {
  const newToyCard = document.createElement('div');
  newToyCard.classList.add('card');
  newToyCard.innerHTML = `
    <h2 class='name'>${name}</h2>
    <img class='image' src="${image}" class="toy-avatar" />
    <p class='likes'> ${likes} Likes </p>
    <button id='card ${id}' class="like-btn">Like ♥</button>
  `;
  return newToyCard;
}

newToyForm.addEventListener('submit', event => {
  event.preventDefault();
  let name = event.target.name.value;
  let image = event.target.image.value;
 
  fetch(toyURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: image,
    })
  })
  toyContainer.append(newToyCard(name, image, likes, id));
})

//  Button += Likes
toyContainer.addEventListener('click', (event) => {
  console.log(event.target)
  if (event.target.className = 'like-btn') {
  let id = event.target.id.split(" ")[1]; 
  console.log("id:", id)
  let numLikes = event.target.parentElement.children[2].innerText.split(" ")[0];
  console.log("numLikes:", numLikes)
  // event.target.parentElement.children[2].innerHTML = `${parseInt(numLikes) + 1} Likes` (optimistic approach)
  // debugger  
  let param = {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ 
      likes: parseInt(numLikes) + 1
    })
  }
  fetch(`http://localhost:3000/toys/${id}`, param)
    .then(event.target.parentElement.children[2].innerHTML = `${parseInt(numLikes) + 1} Likes`) //pessimistic approach
  }
  })
  


//  CODE STEPS:
// 1. Upon load, make fetch request to get all toy objects from toyURL === DONE!

// 2. Make a card for each toy & ADD to collection === DONE!
  // Each card should have:
    // <div class="card">
    //   <h2>Woody</h2>
    //   <img src=toy_image_url class="toy-avatar" />
    //   <p>4 Likes </p>
    //   <button class="like-btn">Like <3</button>
    // </div>

// 3. Add eventlistener to 'new toy' button === DONE!
  // Find the form DONE: newToyForm
  // Adds event listener to form
    // prevent default for submit 
    // grab inputs
  // Persists to the db via fetch (POST request)
  // Should conditionally??? render to the page

// 4. Add event listener to toys like-buttons (STABLE Parent===toyContainer) when user clicks like button
  // patch request to server using fetch? to update number of likes ("UPDATE" in RESTful)
  // 

