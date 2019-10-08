const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
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

function renderToy(json){
  let toyDiv = document.getElementById('toy-collection');
  let div = document.createElement('div');
  div.setAttribute('class', 'card');
  div.setAttribute('id', json.id);
  let h2 = document.createElement('h2');
  let h2TextNode = document.createTextNode(json.name);
  h2TextNode.textContent = json.name;
  h2.appendChild(h2TextNode);

  let img = document.createElement('img');
  let imgSrc = json.image;
  img.src = imgSrc;
  img.setAttribute('class', 'toy-avatar');

  let p = document.createElement('p');
  let pTextNode = document.createTextNode(`${json.likes} likes`);
  p.appendChild(pTextNode);

  let btn = document.createElement('button');
  btn.setAttribute('class', 'like-btn');
  let btnTextNode = document.createTextNode('Like <3');
  btn.appendChild(btnTextNode);

  div.appendChild(h2);
  div.appendChild(img);
  div.appendChild(p);
  div.appendChild(btn);

  toyDiv.appendChild(div);
}


// OR HERE!

document.addEventListener("DOMContentLoaded", () => {
  fetch('http://localhost:3000/toys')
  .then(response => {
    return response.json();
  })
  .then (json => {
    for (toy of json){
      renderToy(toy);
    }
  })
  function submitToy(name, image){
    let formData = {
        "name": name,
        "image": image,
        "likes": 0
    };
    
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
        body: JSON.stringify(formData)
    };
    
     fetch("http://localhost:3000/toys", configObj)
    .then(function(response) {
        return response.json();
    })
    .then(json => {
        renderToy(json);
    })
  }

  function addLike(){
      let numLikes = parseInt(event.target.parentNode.querySelector('p').textContent.split(" ")[0], 10);
      numLikes += 1;
      console.log(numLikes);
      let formData = {
        "likes": numLikes
      };

      let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
        body: JSON.stringify(formData)
    };

      let id = event.target.parentNode.id;
      fetch(`http://localhost:3000/toys/${id}`, configObj);
    }

  document.querySelector('.add-toy-form').addEventListener("submit", function(){
    event.preventDefault();
    let inputs = document.getElementsByClassName('input-text');
    //debugger;
    let name = inputs[0].value;
    let image = inputs[1].value;
    submitToy(name,image);
  })

  document.getElementById('toy-collection').addEventListener("click", function () {

    if(event.target.tagName === "BUTTON"){
      addLike();
    }
  })



});