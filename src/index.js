const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyContainer = document.getElementById('toy-collection');
let addToy = false

// YOUR CODE HERE
fetch('http://localhost:3000/toys')
  .then( function (response){
    return response.json()
  })
  .then( function (json){
    console.log(json)

    json.forEach(function(toy){
        let toyCard =`<div class="card">
        <h2 class="name">${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p class="toy-likes">${toy.likes}</p>
        <button class="like-btn">Like <3</button>
      </div>`

      toyContainer.innerHTML += toyCard; 
    })
  })

  toyForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const imgUrl = event.target.image.value; 
    console.log(name, imgUrl)
      
      let newToyCard =`<div class="card">
      <h2 class="name">${name}</h2>
      <img src=${imgUrl} class="toy-avatar" />
      <p class="toy-likes">0</p>
      <button class="like-btn">Like <3</button>
      </div>`

      toyContainer.innerHTML += newToyCard;

  
      fetch('http://localhost:3000/toys', {
        method:'POST',
          headers: 
          {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(
          {
            "name": name,
            "image": imgUrl,
            "likes": 0
          })
      })
  })


  
 




 
    
  


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!



// SPECS:
// A toy should have a toy card with its name, image, total likes, and a like-button
// There should be an add new toy form with a submit button that sends a post request to the toys index
// The like button shoul increase the toys like count, and send a patch request to the server
