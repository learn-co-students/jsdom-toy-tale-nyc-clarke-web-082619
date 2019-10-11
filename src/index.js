const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let toyCollection = document.getElementById("toy-collection")
let addToy = false

// YOUR CODE HERE

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
document.addEventListener("DOMContentLoaded", () =>{
  
  return fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(function(object) {
    object.forEach(toy => createToy(toy)
      )
  })
})

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault()
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    })
  })
    .then(response => response.json())
    .then(object => createToy(object))
  })

  const createToy = (toy) => {
    let div = document.createElement("div")
    div.className = "card"
    div.setAttribute("data-id", toy.id)
    div.innerHTML = `<h2>${toy.name}</h2> <img class= "toy-avatar" src= ${toy.image}> <p>${toy.likes}</p> <button class= "like-btn">Like <3</button>`
    toyCollection.append(div)
  }


document.addEventListener("click", (event)=>{
    if (event.target.className === "like-btn"){
      let id = event.target.parentNode.getAttribute("data-id")
      let likes = parseInt(event.target.previousElementSibling.innerText) + 1
      fetch(`http://localhost:3000/toys/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: likes
        })
      }).then(response => response.json())
      .then(data => event.target.previousElementSibling.innerText = data.likes)
    }
  })