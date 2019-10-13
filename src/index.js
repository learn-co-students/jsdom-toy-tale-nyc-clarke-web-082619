const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyDiv = document.querySelector('#toy-collection')
const likeBtn = document.querySelectorAll('.like-btn')
const toyUrl = 'http://localhost:3000/toys'

let addToy = false

document.addEventListener('DOMContentLoaded', () => {
  event.preventDefault()
  
  function getToys() {
    return fetch(toyUrl)
  .then(resp => resp.json())
  .then(toys => {toys.map(toy => {renderToys(toy) })})
    }

function postToys(toyData){
  return fetch(toyUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify( {
    'name': toyData.name.value,
    'image': toyData.image.value,
    'likes': 0
  })
})
.then(resp => resp.json()) 
.then(toy => renderToys(toy))
}

function increaseLikes(event){
  event.preventDefault()
  let more = parseInt(event.target.previousElementSibling.innerText) + 1

  return fetch(`http://localhost:3000/toys/${event.target.id}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify( {
    'likes': more 
  })
})
.then(resp => resp.json()) 
.then(x => {
  event.target.previousElementSibling.innerText = `${more} likes`
})
}

function renderToys(toy) {
  toyDiv.innerHTML += 
    `<div class='card'><h2>${toy.name}</h2><br>
  <img class='toy-avatar' src="${toy.image}"><br>
  <p>${toy.likes} likes</p>
  <button class="like-btn" id=${toy.id}>Like <3</button></div>`;
 
  const likeBtn = document.querySelectorAll('.like-btn')
  for (button of likeBtn) {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      increaseLikes(event)
    })
  }
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      postToys(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

getToys()

})
// OR HERE!

