import { afficherCompteur,incrementerCompteur } from './module/fonction.js';
//recuperation de l'url avec location.href
let urlProduit = window.location.href;
console.log(urlProduit);
//balise select qui va contenir les options
let selectOption = document.querySelector("#optionProduit");
//balise option de select
let option;
//on crée une instance url
urlProduit = new URL(urlProduit);
//recuperation des paramètres
let id = urlProduit.searchParams.get("id");
let nom = urlProduit.searchParams.get("name");
let image = urlProduit.searchParams.get("image");
let optionProd = urlProduit.searchParams.get("option");
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
let regex = /[.-\/0-9a-z\s|.\-\/0-9A-Z\s]+/g;
//tab qui va stocker les options du produits
let tabOption;
//on recuperer les  options dans un  tableau
console.log(optionProd);
tabOption= optionProd.match(regex);
console.log(tabOption);
//on recupere l'option en fonction du produit choisi
if(localStorage.getItem("option")!==null){
  document.querySelector("#optChoix").innerText=`${localStorage.getItem("option")}`;
}else{
  document.querySelector("#optChoix").innerText="Couleur";
}

//on ajoute la liste d'option dans la balise select
for (let OptionProduit of tabOption) {
  option = document.createElement("option");
  option.innerText = `${OptionProduit}`;
  console.log(OptionProduit);
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
  let colorSelect = document.querySelector("#optionProduit").value;

  if (colorSelect === "lentille"||colorSelect==="Couleur") {
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
      localStorage.setItem("produitPanier", JSON.stringify(tab));
    } else {
      tab.push(prod);
      localStorage.setItem("produitPanier", JSON.stringify(tab));
      test = false;
    }
  }
}





