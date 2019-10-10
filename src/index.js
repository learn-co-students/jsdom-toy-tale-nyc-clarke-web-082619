const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let container = document.getElementById('toy-collection');

// YOUR CODE HERE
function renderToys(){
  console.log("Hello?");
  let configurationObject = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }
  fetch("http://localhost:3000/toys", configurationObject)
  .then(resp => resp.json())
  .then(json => {
    
    console.log(json);
    let toyArray = json.map(function(toy){
      return renderSingleToy(toy)
    })
    container.innerHTML = toyArray.join(' ');
  })
}

function addOneToy(event,name, image, likes){
  event.preventDefault();
  let configurationObject ={
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: image,
      likes: likes,
    })

  }
  fetch("http://localhost:3000/toys", configurationObject)
  .then(resp => resp.json())
  .then(json => {
    console.log(json);
    container.innerHTML += renderSingleToy(json)
  })
  .catch(error =>{
    console.log(error.message)
  })

}

function updateToylikes(event){
  
  let id = event.target.parentElement.id;

  let likes = parseInt(event.target.previousElementSibling.innerText.split(' ')[0]) +1; 
  console.log(`this is some number: ${likes}`);
  // debugger;
  let sibling = event.target.previousElementSibling;
  let configurationObject ={
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ 
      likes: likes
    })
  }
  console.log("worked?")
  fetch(`http://localhost:3000/toys/${id}`, configurationObject)
  .then(resp => resp.json)
  .then(json => {
    event.target.previousElementSibling.innerText = `${likes} likes`;
    console.log(json)
  })
}



addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
  
})

document.addEventListener('DOMContentLoaded', () => {
  console.log("hello?");
  renderToys()
})

document.addEventListener('submit', (event) =>{
  let name = document.getElementsByClassName('input-text')[0].value;
  let image = document.getElementsByClassName('input-text')[1].value;
  addOneToy(event, name, image, 0)
});

document.addEventListener('click', (event) =>{
  if (event.target.tagName === "BUTTON" ){
    
    updateToylikes(event)
  }
  
})




// OR HERE!
function renderSingleToy(toy){
  return (`<div class="card" id = ${toy.id}>
  <h2>${toy.name}</h2>
  <img src=${toy.image} class ="toy-avatar"/>
  <p>${toy.likes} likes</p>
  <button class ="like-btn">likes <3</button>
  </div>`)
}

