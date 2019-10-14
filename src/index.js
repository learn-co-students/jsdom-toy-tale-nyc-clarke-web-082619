const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let toyContainer = document.querySelector('#toy-collection');
const URL_PREFIX = 'http://localhost:3000/toys';

// YOUR CODE HERE

function fetchToys(){
  return fetch(URL_PREFIX)
    .then(res => res.json())
}

function renderToy(toy){

  let card = document.createElement('div');
  card.classList.add('card');
  card.dataset.id = toy.id;

  let heading = document.createElement('h2');
  heading.innerText = toy.name;

  let image = document.createElement('img');
  image.src = toy.image;
  image.classList.add('toy-avatar');

  let likesCount = document.createElement('p');
  likesCount.innerText = `${toy.likes} Likes`;

  let likeButton = document.createElement('button');
  likeButton.innerText = 'Like';
  likeButton.classList.add('like-btn');

  

  card.append(heading, image, likesCount, likeButton);

  toyContainer.append(card);
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


// OR HERE!

document.querySelector('.add-toy-form').addEventListener('submit', event => {
  event.preventDefault();
  alert('Submitted');
  postToy(event.target);
})

function postToy(toy_object){
  fetch(URL_PREFIX, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      "name": toy_object.name.value,
      "image": toy_object.image.value,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then((newToy) => {
    renderToy(newToy);
  })
}


fetchToys().then(toys => {
  toys.forEach(toy => {
    //function to render toys goes here or something
    renderToy(toy)
  })
  toyContainer.addEventListener('click', function(event){
    if (event.target.className == 'like-btn'){
      incrementLikes(event.target.parentNode);
    }
  })
})

function incrementLikes(toyCard){
  let likesDisplay = toyCard.childNodes[2];
  let newLikes = parseInt(likesDisplay.innerText) + 1;
  likesDisplay.innerText = `${newLikes} Likes`;
  fetch(`${URL_PREFIX}/${toyCard.dataset.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'likes': newLikes
    })

  })
}
