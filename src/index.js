document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.querySelector('.container');
  const toyCollection = document.getElementById("toy-collection");
  fetchToys();

  function likeToy(target, id,likes) {
    // target.preventDefault()
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: likes+1
      })
    })
      .then(reponse => target.querySelector(".card-likes").innerText = `${likes + 1} likes`)

  }

  function createNewToy(toy) {
    const link = "http://localhost:3000/toys";
    fetch(link, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify({
        name: toy.name,
        image: toy.image,
        likes: toy.likes    
      })    
    }).then(setToy(toy));
  }
  
  function fetchToys() {
    const link = "http://localhost:3000/toys"; 
    fetch(link)
      .then(response => response.json())
      .then(data => {
        data.forEach(toy => setToy(toy));
      });
  } 
  
  function setToy(toy){
    // let newToy = document.createElement("div");
    toyCollection.innerHTML += `<div class="card" id = "card-${toy.id}">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p class="card-likes"> ${toy.likes} likes </p>
    <button class="like-btn">Like <3</button>
  </div>
    `
    // return newToy;
  }

  document.addEventListener('click', event => {
    console.log("clicking")
    console.log(event.target)

    event.preventDefault()

    if (event.target.id === "new-toy-btn") {   
      formContainer.style.display = 'block';
    } else if (event.target.value === "Create New Toy") {
        formContainer.style.display = 'none';
        let name = event.target.parentElement.name.value;
        let image = event.target.parentElement.image.value; 
        let toy = {
          name: name,
          image: image,
          likes: 0
        }
        createNewToy(toy);
    } else if (event.target.className === "like-btn") {
        let id = event.target.parentElement.id.split("-")[1];
        let likes = parseInt(event.target.parentElement.querySelector(".card-likes").innerText.split(" ")[0]);
        likeToy(event.target.parentElement,id,likes);
    }
  })
})


// OR HERE!
