let pokemonRepository = (function () {
  let t = [],
    e = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  function n(e) {
    "object" == typeof e ? t.push(e) : console.log("pokemon is not correct");
  }
  function o(t) {
    pokemonRepository.loadDetails(t).then(function () {
      !(function (t) {
        let e = $(".modal-body"),
          n = $(".modal-title");
        $(".modal-header");
        e.empty(), n.empty();
        let o = document.createElement("img");
        (o.src = t.imageUrl),
          o.classList.add("pokemonImage"),
          n.append("Name: " + t.name),
          e.append(o);
        let i = "";
        t.types.forEach((t) => {
          i = i + " " + t.type.name;
        });
        let a = $("<p>Types:" + i + "</p>"),
          l = $("<p>Height:" + t.height + "</p>");
        e.append(l), e.append(a);
      })(t);
    });
  }
  return {
    add: n,
    getAll: function () {
      return t;
    },
    addListItem: function (t) {
      let e = document.querySelector(".list-group"),
        n = document.createElement("li");
      n.classList.add("list-group-item");
      let i = document.createElement("btn");
      (i.innerText = t.name),
        i.classList.add("btn", "btn-primary"),
        i.setAttribute("data-target", "#pokemonModal"),
        i.setAttribute("data-toggle", "modal"),
        n.appendChild(i),
        e.appendChild(n),
        i.addEventListener("click", function () {
          o(t);
        });
    },
    loadList: function () {
      return fetch(e)
        .then(function (t) {
          return t.json();
        })
        .then(function (t) {
          t.results.forEach(function (t) {
            n({ name: t.name, detailsUrl: t.url });
          });
        })
        .catch(function (t) {
          console.error(t);
        });
    },
    loadDetails: function (t) {
      let e = t.detailsUrl;
      return fetch(e)
        .then(function (t) {
          return t.json();
        })
        .then(function (e) {
          (t.imageUrl = e.sprites.front_default),
            (t.height = e.height),
            (t.types = e.types);
        })
        .catch(function (t) {
          console.error(t);
        });
    },
    showDetails: o,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});
