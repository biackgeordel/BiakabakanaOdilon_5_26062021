import {incrementerCompteur,tab, viderPanier} from './module/fonction.js';


//afficherPanier() permet d'afficher les produits dans un tableau dans la page panier.html
function afficherPanier(tab) {
  let bodyTable = document.querySelector(".body-tab");
  let footTable = document.querySelector(".foot-tab");
  let resultat = 0;
  let c;
  if (tab === null || tab.length === 0) {
    document.querySelector(".cont").innerHTML =
      `<h2 class="info-panier">Votre panier est vide</h2>
      <div class="panier-vide"><i class="fas fa-shopping-cart"></i></div>`;
  } else {
    bodyTable.innerHTML = "";
    for (let i = 0; i < tab.length; i++) {
      tab[i].quantite === 1 ? (c = "X") : (c = "-");

      resultat += tab[i].quantite * tab[i].price;
      bodyTable.innerHTML += `
      <tr>
        <td>
           <img  class=" img-tab" src="${tab[i].image}"/>
           <br/>${tab[i].nom}
        </td>
        <td colspan=2>
        <div class="container-btn">
        <button  class=produit-${i}${i}>+</button>
        <button class=produit-${i}>${c}</button>
        <input 
        type="text"value="${tab[i].quantite}" id="idProduit${i}"class="${tab[i].id}"/>
        <span id=colorProduit${i}>
            ${tab[i].couleur}
            </span>
               
      </div>
        </td>
        <td>${tab[i].price}€</td>
        <td>${tab[i].quantite * tab[i].price}€</td>
      </tr>`;
    }
    footTable.innerHTML = ` <tr>
    <th scope="row">Total de la commande:
    <th>
    <td  class="resultat" colspan=3>${resultat} €</td>
    </tr>`;
  }
}
//augmente la quantite du produit en fonction de l'event click
document.querySelector(".body-tab").addEventListener("click", function (e) {
  let max = e.target.innerText; //texte contenu dans le  button
  if (max === "+") {
    let classButton = e.target.getAttribute("class");
    classButton = "." + classButton; //creation d'un selecteur de type class du button
    let classIdProduit = document //class contenant le vrai id du produit
      .querySelector(classButton + "+button+input")
      .getAttribute("class");

    let idColor = document //on recupere l'id de la couleur
      .querySelector(classButton + "+button+input+span")
      .getAttribute("id");
    idColor = "#" + idColor; //creation d'un selecteur de type id de la couleur
    let couleurProduit = document.querySelector(idColor).innerText; //on recupere la couleur du produit

    let quantite = parseInt(
      document.querySelector(classButton + "+button+input").value //on recupere la quantite dans l'input
    );
    quantite++; //on incremente la quantite en fonction du nombre de click
    document.querySelector(classButton + "+button+input").value = quantite; //on insere la nouvelle valeur  de quantite dans value de l'input
    for (let i = 0; i < tab.length; i++) {
      //on parcours le tab de localstorage contenu les produits
      if (tab[i].id === classIdProduit && tab[i].couleur === couleurProduit) {
        tab[i].quantite = quantite; //on ajoute la nouvelle valeur
        afficherPanier(tab); //on affiche le nouveau tab
        localStorage.setItem("produitPanier", JSON.stringify(tab)); //on enregistre le nouveau tab dans le localStorage
        incrementerCompteur(); //mise à jour du compteur
      }
    }
  }
});
//diminue la quantite du produit en fonction de l'event click
document.querySelector(".body-tab").addEventListener("click", function (e) {
  let mini = e.target.innerText; //texte contenu dans le  button
  if (mini === "-") {
    let classButton = e.target.getAttribute("class");
    classButton = "." + classButton; //creation d'un selecteur de type class du button

    let classIdProduit = document //class contenant le vrai id du produit
      .querySelector(classButton + "+input")
      .getAttribute("class");

    let idColor = document //on recupere l'id de la couleur
      .querySelector(classButton + "+input+span")
      .getAttribute("id");
    idColor = "#" + idColor; //creation d'un selecteur de type id de la couleur
    let couleurProduit = document.querySelector(idColor).innerText; //on recupere la couleur du produit

    let quantite = parseInt(
      document.querySelector(classButton + "+input").value //on recupere la quantite dans l'input
    );
    quantite--; //on incremente la quantite en fonction du nombre de click
    document.querySelector(classButton + "+input").value = quantite; //on insere la nouvelle valeur  de quantite dans value de l'input
    for (let i = 0; i < tab.length; i++) {
      //on parcours le tab de localstorage contenu les produits
      if (tab[i].id === classIdProduit && tab[i].couleur === couleurProduit) {
        tab[i].quantite = quantite; //on ajoute la nouvelle valeur
        afficherPanier(tab); //on affiche le nouveau tab
        localStorage.setItem("produitPanier", JSON.stringify(tab)); //on enregistre le nouveau tab dans le localStorage
        incrementerCompteur(); //mise à jour du compteur
      }
    }
  }
});
//supprimer le produit en fonction de l'event click
document.querySelector(".body-tab").addEventListener("click", function (e) {
  let deleteProduit = e.target.innerText; //texte contenu dans le  button
  if (deleteProduit === "X") {
    let classButton = e.target.getAttribute("class");
    classButton = "." + classButton; //creation d'un selecteur de type class du button

    let classIdProduit = document //class contenant le vrai id du produit
      .querySelector(classButton + "+input")
      .getAttribute("class");

    let idColor = document //on recupere l'id de la couleur
      .querySelector(classButton + "+input+span")
      .getAttribute("id");
    idColor = "#" + idColor; //creation d'un selecteur de type id de la couleur
    let couleurProduit = document.querySelector(idColor).innerText; //on recupere la couleur du produit

    for (let i = 0; i < tab.length; i++) {
      //on parcours le tab de localstorage contenu les produits
      if (tab[i].id === classIdProduit && tab[i].couleur === couleurProduit) {
        tab.splice(i, 1);
        afficherPanier(tab); //on affiche le nouveau tab
      }
    }
    localStorage.setItem("produitPanier", JSON.stringify(tab)); //on enregistre le nouveau tab dans le localStorage
    incrementerCompteur(); //mise à jour du compteur
  }
});

//supprimer le panier
document.querySelector(".btn-vide").addEventListener("click",function(e){
  viderPanier();
  document.location.href="panier.html";

});

//modifier la quantite du produit avec l'event change
document.querySelector(".body-tab").addEventListener("change", function (e) {
  let quantite = parseInt(e.target.value);
  if (isNaN(quantite) || quantite < 0) {
    afficherPanier(tab); //on afficher le tableau des produits stocké dans le localStorage
  } else {
    let idProduit = e.target.getAttribute("class"); //on recupere l'id du produit correspendant à l'id contenu dans le tab
    let idInput = "#" + e.target.getAttribute("id"); //id de l'input concerné par le changement de la valeur
    console.log(idInput);
    let couleurProduit = document //on recupére l'id de la couleur du produit
      .querySelector(idInput + "+span")
      .getAttribute("id");
    couleurProduit = document.querySelector("#" + couleurProduit).innerText;
    console.log(couleurProduit);
    for (let i = 0; i < tab.length; i++) {
      if (tab[i].id === idProduit && tab[i].couleur === couleurProduit) {
        tab[i].quantite = quantite;
        afficherPanier(tab);
      }
    }
    localStorage.setItem("produitPanier", JSON.stringify(tab)); //on enregistre le nouveau tab dans le localStorage
    incrementerCompteur(); //mise à jour du compteur
  }
});

window.addEventListener("load", function (e) {
  console.log(e.target);
  afficherPanier(tab);
});

