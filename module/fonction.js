
//afficher le compteur sur les pages html
export function afficherCompteur() {
    if (localStorage.getItem("compteur") !== null) {
      document.querySelector(".bulle").innerText = `${localStorage.getItem(
        "compteur"
      )}`;
    }
  }
  //incrementer le compteur en tenant de la quantite dans le localStorage
 export function incrementerCompteur() {
    let compteur = 0;
    let tab;
    if (localStorage.getItem("produitPanier") !== null) {
      tab = JSON.parse(localStorage.getItem("produitPanier"));
      for (let i = 0; i < tab.length; i++) {
        compteur += parseInt(tab[i].quantite, 10);
      }
      console.log("valeur compteur" + compteur);
      localStorage.setItem("compteur", compteur);
      document.querySelector(".bulle").innerText = `${localStorage.getItem(
        "compteur"
      )}`;
    }
  }

  //la fonction recupProduit permet de recuperer les produits stockés dans le localStorage
console.log(localStorage.getItem("produitPanier"));
function recupProduit() {
  if (localStorage.getItem("produitPanier") === null) {
    return null;
  } else {
    return JSON.parse(localStorage.getItem("produitPanier"));
  }
}
//on crée un tableau tab  pour stocker les produits
export let tab = recupProduit();