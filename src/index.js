const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
let addToy = false;

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block';
  } else {
    toyForm.style.display = 'none';
  }
})

function renderToy(toy) {
  return (`
  <div class="card" id=${toy.id}>
    <div class="toy-frame">
      <h2 class="center-text">${toy.name}</h2>
      <div class="toy-image">
        <img data-id="${toy.id}" src="${toy.image}" class="toy-avatar"/>
      </div>
      <p>"${toy.likes} Likes"</p>
      <button class="like-btn">Like<3</button>
    </div>
  </div>`)
}
  function getAllToys(){
  //call the API
  fetch('http://localhost:3000/toys',{
  //specify method, but not necessary
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    // return the API's response in JSON
    .then(resp => {
      return resp.json();
    })
    //take the data it returns, which is an array
    .then(toyData =>{
    //find a container that it will attach to soon
      let toyContainer = document.getElementById('toy-collection');
      //iterate through and render that data
      let dataArray = toyData.map(function(toy){
        return renderToy(toy);
      })
      toyContainer.innerHTML = dataArray.join(' ');
    })
  }

  function createNewToy(event){
    event.preventDefault();

    //creates usable variables based on the new toy form's values
    let name = document.querySelector('.add-toy-form').name.value;
    let image = document.querySelector('.add-toy-form').image.value;
    //calls render toy with those values, and sets id to 'temp' in case of an error
    let newToy = renderToy({name: name, image: image, id: 'temp'});
    //locates the toy container
    let toyContainer = document.getElementById('toy-collection');

    //makes the call to API, specifies POST request
    fetch('http://localhost:3000/toys',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      // sets default values for the API to use
      body: JSON.stringify({
        'name': name,
        'image': image,
        'likes': '0'
      })
    })
    //recieves the JSON response
    .then(resp =>{
      return resp.json()
    })
    //JSON generates an id for the toy, and now we assign it to our toy, overwriting temp
    .then(resource =>{
      document.getElementById('temp').setAttribute('id', resource.id);
    })
    //if there is an error, find and remove the toy with id: temp
    .catch(error => {
      let toy = document.getElementById('temp');
      toyContainer.removeChild(toy);
    })
    // add the toy to the toy container
    toyContainer.innerHTML += newToy;
  }

  function likeToy(){
    event.preventDefault();
    //(hopefully) sets likenum = the number of likes a toy already has
    let likeNum = parseInt(event.target.parentNode.querySelector('p').innerText[1]);
    //console.log(event.target.previousElementSibling)
    //increases them likes
    likeNum += 1;
    console.log(likeNum)
    //locates the id of the toy being liked
    let id = event.target.parentNode.parentNode.id;
  
    //grabs the data for that toy, with method set to patch
    fetch(`http://localhost:3000/toys/${id}`,{ 
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      //updates the likes in the body to likeNum as defined above
      body: JSON.stringify({
        'likes': likeNum
      })
    })
  }
//contains rest of code
document.addEventListener("DOMContentLoaded", function() {
  //loads all toys on start
  getAllToys()

  document.querySelector('.add-toy-form').addEventListener('submit', createNewToy);
  document.getElementById('toy-collection').addEventListener('click', function () {
    if(event.target.className === 'like-btn'){
      likeToy();
      //console.log(parseInt(event.target.parentNode.querySelector('p').innerText[1]) + 1)
    }
  })
})

