const url = "http://localhost:3000/api/teddies";
let bloc = document.createElement("div");
bloc.classList.add("container");
let sectionArticle = document.querySelector("#sectionArticle");
try {
  if (localStorage.getItem("compteur") != null) {
    console.log(localStorage.getItem("compteur"));
    document.querySelector(".bulle").innerHTML =
      localStorage.getItem("compteur");
  }
} catch (err) {
  console.log("impossible");
}

console.log(bloc);
function recuperArticle(tab) {
  for (element of tab) {
    //article qui va contenir  toutes informations
    let article = document.createElement("article");
    let nomProduit = document.createElement("p");

    //le div qui va contenir l'image du produit
    let divImage = document.createElement("div");

    //le lien vers la page du produit
    let lien = document.createElement("a");
    //url contenant les parametres des produits
    lien.setAttribute(
      "href",
      `./produit.html?name=${element.name}&id=${element._id}
      &color=${element.colors}&price=${element.price}
      &image=${element.imageUrl}&description=${element.description}`
    );
    lien.innerHTML = `<img  title=" photo de la peluche ${element.name}" src="${element.imageUrl}"/>`;
    divImage.appendChild(lien);
    article.appendChild(divImage);
    nomProduit.innerHTML = `<span>${element.name}</span><br/><span><strong>${
      element.price / 100
    }€</strong></span>`;
    article.appendChild(nomProduit);
    bloc.appendChild(article);
  }
}
fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((value) => {
    recuperArticle(value);
    console.log(recuperArticle);
  })
  .catch((error) => {
    console.log(error);
  });
sectionArticle.appendChild(bloc);
