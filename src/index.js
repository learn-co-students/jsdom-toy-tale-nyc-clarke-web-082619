const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toysContainer = document.getElementById('toy-collection');


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

//Add Toy Info to the Card

function AddToyInfoToCard(name, imageUrl, likes, id){
  let newCard = document.createElement('div');
  newCard.classList.add('card');
  newCard.setAttribute('data-id', id);
  newCard.innerHTML = `
  <h2>${name}</h2>
  <img src=${imageUrl} class="toy-avatar" />
  <p>${likes} Likes </p>
  <button class="like-btn">Like <3</button>
  `;
  return newCard;
}

document.addEventListener('DOMContentLoaded', function(){
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(function(toysData){
      toysData.forEach(function(toyObj){
        let newToyCard = AddToyInfoToCard(toyObj.name, toyObj.image, toyObj.likes, toyObj.id);
        toysContainer.appendChild(newToyCard);
      })
    });
});

//Add a New Toy
toyForm.addEventListener('submit', function(event){
  event.preventDefault();
  let name = event.target.name.value;
  let imageUrl = event.target.image.value; 
  
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body:JSON.stringify({
      'name': name,
      'image': imageUrl,
      'likes': 0
    })
  }).then(response => response.json())
    .then(data => console.log(data));
});

//Increase Toy's likes
toysContainer.addEventListener('click', function(){
  if (event.target.className == 'like-btn'){
    let toyId = event.target.parentNode.getAttribute('data-id');
    let likesItem = event.target.parentNode.getElementsByTagName('p')[0];
    let likesString = likesItem.innerText;
    let likesNumber = likesString.split(' ').shift();
    let newLikes = parseInt(likesNumber) + 1;
    console.log(newLikes);

    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body:JSON.stringify({
        'likes': newLikes
      })
    }).then(response => response.json())
      .then(function(data){
        likesItem.innerText = `${newLikes} Likes`
      });
  }
})