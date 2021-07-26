//This code creates a repository for holding all of the pokemon
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  /* The below code creates a function called add, which allows for the addition of a new pokemon using .push*/
  function add(pokemon) {
    if (typeof pokemon === "object") {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  /*The below code creates a getAll function which returns pokemonList*/
  function getAll() {
    return pokemonList;
  }
  /*this function recreates the list of Pokemon (including the added pokemon) as buttons.
These buttons are then added to the list of pokemon */
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".list-group");
    let pokemonItem = document.createElement("li");
    pokemonItem.classList.add("list-group-item");
    let button = document.createElement("btn");
    button.innerText = pokemon.name;
    button.classList.add("btn", "btn-primary", "d-md-block");
    button.setAttribute("data-target", "#pokemonModal");
    button.setAttribute("data-toggle", "modal");

    pokemonItem.appendChild(button);
    pokemonList.appendChild(pokemonItem);
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  //loads the list of pokemon as JSON and loops through each item - the results of which are stored under name and detailsURL
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  /* this code creates a function which loads the details for each item(pokemon) within the URL */
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })

      .catch(function (e) {
        console.error(e);
      });
  }

  /* this code creates a function which shows the details of the items within the modal */

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
    });
  }

  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    //clear all modal content
    modalBody.empty();
    modalTitle.empty();

    //creates an image element to access the images for the pokemon
    let pokemonImageElement = document.createElement("img");
    pokemonImageElement.src = item.imageUrl;
    pokemonImageElement.classList.add("pokemonImage");

    //appends the content to the modal for display
    modalTitle.append("Name: " + item.name);
    modalBody.append(pokemonImageElement);

    //creates a function which accesses and loops through the various types for each pokemon and then displayes these as a string
    let pokemonTypes = "";
    item.types.forEach((element) => {
      pokemonTypes = pokemonTypes + " " + element.type.name;
    });
    //creates a p element to display and access the pokemon types
    let contentElement = $("<p>" + "Types:" + pokemonTypes + "</p>");
    //creates a p element which shows the height for each pokemon
    let heightElement = $("<p>" + "Height:" + item.height + "</p>");
    modalBody.append(heightElement);
    modalBody.append(contentElement);
  }

  /* the below code returns the add and getAll functions */
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();
//This code adds a new pokemon to the list with the details listed as below
// console.log(pokemonRepository.getAll());
// pokemonRepository.add({name:'Lapras', height:"8.02", types:["Water Absorb", "Shell Armor"]});
//This code cycles through the list of all pokemon held within the repository

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
