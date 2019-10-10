const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let toyCollection = document.getElementById("toy-collection");

// YOUR CODE HERE
function fetchToys(){
  return fetch("http://localhost:3000/toys", {
    method: 'GET',
    headers:  {"Content-Type": "application/json"
    }
  })
  .then(resp => resp.json())
  .then(json => renderToys(json))
}

function renderToys(json){
  json.forEach(toy => {
    let divTag = document.createElement("div");
    let h2Tag = document.createElement("h2");
    let imgTag = document.createElement("img");
    let likesPTag = document.createElement("p");
    let likeBtn = document.createElement("button");
    h2Tag.innerHTML = toy.name;
    imgTag.setAttribute("src", toy.image);
    imgTag.setAttribute("height", "220");
    imgTag.setAttribute("width", "240");
    imgTag.setAttribute("class", "toy-avatar");
    likesPTag.innerHTML = toy.likes + " Likes";
    likesPTag.setAttribute("id", "likes")
    likeBtn.innerHTML = "Like &#9829"
    likeBtn.setAttribute("class", "like-btn");
    divTag.appendChild(h2Tag);
    divTag.appendChild(imgTag);
    divTag.appendChild(likesPTag);
    divTag.appendChild(likeBtn);
    toyCollection.appendChild(divTag);
    divTag.setAttribute("class", "card");
    divTag.setAttribute("data-id", toy.id);
  })
}

function addNewToy(){
  event.preventDefault();
  let name = document.getElementById("name-input").value;
  let image = document.getElementById("image-input").value;
  let newOptimisticToy = renderSingleToy({name: name, image: image, likes: 0, id:"temp"})

  return fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers:  {"Content-Type": "application/json"},
    body: JSON.stringify({
      'name': name,
      'image': image,
      'likes': 0
    })
  })
  .then(resp => resp.json())
  .then(resource => {
    document.getElementById('temp').setAttribute('id',resource.id);
    toyCollection.appendChild(newOptimisticToy); 
  })
  .catch(error => {
    let optimisticToy = document.getElementById('temp'); 
    toyCollection.removeChild(optimisticToy);
  })
    
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } 
  else {
    toyForm.style.display = 'none'
  }
})

document.addEventListener('DOMContentLoaded', function(){
  fetchToys();
  incrementLikes();
  document.getElementById("add-toy-form").addEventListener("submit", addNewToy); 
})

function renderSingleToy(toy){
  return (`
    <div class="card" data-id=${toy.id}>
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>0 Likes</p>
      <button class="like-btn" id="like-btn">Like &#9829</button>
    </div>
  `)
}

  function incrementLikes(){  
    event.preventDefault();
    let toyCollection = document.getElementById("toy-collection");
    toyCollection.addEventListener("click", function(event){
      if(event.target.className === "like-btn"){
        const id = event.target.parentNode.dataset.id;
        let likesUp = parseInt(event.target.previousElementSibling.innerText) + 1
        fetch(`http://localhost:3000/toys/${id}`, {
          method: "PATCH", 
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: 
            JSON.stringify({
              'likes': likesUp
            })
        });
      }
    })
  };