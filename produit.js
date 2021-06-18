import { afficherCompteur,incrementerCompteur } from './module/fonction.js';
//recuperation de l'url avec location.href
let urlProduit = window.location.href;
console.log(urlProduit);
//balise select qui va contenir les couleur
let selectOption = document.querySelector("#couleur");
//balise option de select
let option;
//on crée une instance url
urlProduit = new URL(urlProduit);
//recuperation des paramètres
let id = urlProduit.searchParams.get("id");
let nom = urlProduit.searchParams.get("name");
let image = urlProduit.searchParams.get("image");
let color = urlProduit.searchParams.get("color");
let description = urlProduit.searchParams.get("description");
let price = urlProduit.searchParams.get("price") / 100;

//balise contenant le nom du produit
let nomProduit = document.querySelector(".nomProduit");
nomProduit.innerText = `${nom}`;

//balise contenant le prix du produit
let priceProduit = document.querySelector(".priceProduit");
priceProduit.innerHTML = `<strong>Prix : ${price} euros</strong>`;
//la balise contenant l'image du produit
let imageProduit = document.querySelector(".card-img-top");
imageProduit.setAttribute("src", image);
//balise contenant la description du produit
let descriptionProduit = document.querySelector(".card-text");
descriptionProduit.innerText = `${description}`;

//expression reguliere pour recuperer les couleurs dans la variable color
let regex = /[a-z\s|A-Z\s]+/g;
//tab qui va stocker les couleurs
let tab;
//on recuperer les couleurs dans un  tableau
tab = color.match(regex);
console.log(tab.length);
console.log(tab);
//on ajoute les couleurs dans la balise select
for (let couleur of tab) {
  option = document.createElement("option");
  option.innerText = `${couleur}`;
  selectOption.appendChild(option);
}
//affiche compteur du panier
afficherCompteur();

//bouton pour ajouter des produits dans le locaStorage
document.querySelector(".btn-panier").addEventListener("click", (e) => {
  e.target.innerText = "Ajouté au panier";
  e.preventDefault();
  envoiLocalStorage(nom, price, description, id);
  incrementerCompteur();
});
//Event pour changer le texte dans le bouton ajout panier
document.querySelector(".btn-panier").addEventListener("mouseout", (e) => {
  e.target.innerText = "Ajouter au panier";
  e.stopPropagation;
});

//ajout des produits dans le localStorage
function envoiLocalStorage(nom, price, description, id) {
  let colorSelect = document.querySelector("#couleur").value;

  if (colorSelect === "Couleur") {
    colorSelect = "inconnue";
  }
  console.log(colorSelect);

  let tab = [];
  let prod = {
    id: id,
    quantite: 1,
    price: price,
    description: description,
    nom: nom,
    image: image,
    couleur: colorSelect,
  };
  let test = false;

  if (localStorage.getItem("produitPanier") === null) {
    tab.push(prod);
    localStorage.setItem("produitPanier", JSON.stringify(tab));
  } else {
    let v = JSON.parse(localStorage.getItem("produitPanier"));
    for (let i = 0; i < v.length; i++) {
      if (v[i].id == prod.id && prod.couleur == v[i].couleur) {
        console.log("couleur tab" + v[i].color);
        console.log("couleur prod" + prod.couleur);
        test = true;
        v[i].quantite++;
        tab.push(v[i]);
      } else {
        tab.push(v[i]);
      }
    }
    if (test) {
      console.log("element existe");
      localStorage.setItem("produitPanier", JSON.stringify(tab));
    } else {
      console.log("element n'existe pas");
      tab.push(prod);
      localStorage.setItem("produitPanier", JSON.stringify(tab));
      test = false;
    }
  }
}




//localStorage.removeItem("produitPanier");
//localStorage.removeItem("compteur");
