
import { afficherCompteur,tab} from "./module/fonction.js";
let bloc = document.createElement("div");
bloc.classList.add("container");
//url qui sera soumis à l'API en fonction du produit choix
let url;
//section qui contenir les informations du produit
let sectionArticle = document.querySelector("#sectionArticle");
//balise h2 qui va contenir le titre des produits
let h2=document.createElement("h2");

//retourne l'url en fonction du produit choisi
function createUrl(val){
  return  `http://localhost:3000/api/${val}`;
  
}

//event qui sera declenche lors du changement du produit en cliquant sur le bouton rechercher
document.querySelector(".btn-recherche").addEventListener("click",function(e){
  validChoixProduit();
  
});

//** validChoixProduit fonction appelée pour valider le choix du client dans l'input */
   function validChoixProduit(){
    if(tab.length===0){
      console.log( document.querySelector(".btn-recherche").getAttribute(" data-toggle"));
      document.querySelector(".btn-recherche").removeAttribute(" data-toggle");
      document.querySelector(".btn-recherche").removeAttribute("data-target");
  //on recupere le nom du produit saisi par le client
  let inputSearch=document.querySelector("input[type=search]").value;
  //tableau contenant les noms des produit 
  let tabProduit=["cameras","furniture","peluche","camera"];
  //variable boolean
  let test=false;
  //variable qui va contenir l'url de commande 
  let urlOrder;
  bloc.innerHTML=" ";//on vide la bloc pour afficher la liste de nouveau produit
  
  //on teste si le nom produit existe dans le tableau
  for(let element of tabProduit){
    if(element===inputSearch){
      test=true; 
        }
  }
  if(test){
     
    if(inputSearch==="furniture"){
      localStorage.setItem("option","Couleur");//creation de l'option dans le localStorage
      //titre correspondant au produit furniture
      h2.innerText="Notre selection de meubles vintages ";
      //on enregistre le titre dans le localStorage
        localStorage.setItem("titre","Notre selection de meubles vintages ");
       
      

    }
    
    if(inputSearch==="peluche"){
       inputSearch="teddies"; //changement du nom de produit pour la création de l'url
       //creation de l'option dans le localStorage
       localStorage.setItem("option","Couleur");
       //titre correspondant au produit peluche
       h2.innerText="Ours en peluche faites à la main ";
       //on enregistre le titre dans le localStorage
        localStorage.setItem("titre","Ours en peluche faites à la main ");
      }
     
    
    else if (inputSearch==="camera")
    {
      inputSearch="cameras";//changement du nom de produit pour la création de l'url
    //titre correspondant au produit camera  
    h2.innerText="Nôtre selection de caméras à prix reduit";
     //creation de l'option dans le localStorage
    localStorage.setItem("option","Lentille");
    //on enregistre le titre dans le localStorage
      localStorage.setItem("titre","Nôtre selection de caméras à prix reduit ");
    }
    //creation de l'url pour se connecte à l'API
    url=createUrl(inputSearch);
    //creation de l'url pour passer la commande l'API
    urlOrder=url+"/order";
    localStorage.setItem("url",url);//on enregistre l'url  du produit dans le localStorage
    localStorage.setItem("urlOrder",urlOrder);// on enregistre l' url pour passer la commande dans localStorage
    //fonction pour afficher le nouveau produit choisi par le client
    recuperArticle(url);
    //message qui sera affiché si le produit n'existe pas dans le tableau des produits
 
  }else {h2.innerText=`le produit ${inputSearch} est indisponible`}
  }else{
    try{
    document.querySelector(".btn-recherche").setAttribute(" data-toggle","modal");
    dicument.querySelector(".btn-recherche").setAttribute("data-target","exampleModal");
    }catch(error){
      console.log("erreur");
    }
  }

}
//********************************************************************************************** */

//fonction pour afficher le produit choisi par le client
async function recuperArticle(url) {
  let tab= await accesApi(url);
  if(localStorage.getItem("titre")!==null){
    h2.innerHTML=`${localStorage.getItem("titre")}`;

  }else{
    h2.innerText="Ours en peluche faites à la main ";
  }
 
  console.log(tab);
  for (let element of tab) {
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
      &option=${element.colors ||element.varnish||element.lenses}&price=${element.price}
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
//fonction pour se connecte à l'API
async function accesApi(url){
  console.log("la valeur de url "+url);
  let response;
  url=localStorage.getItem("url");
  console.log("la valeur de url "+url);
 
  if(url===null){
    console.log("la valeur de url1 "+url);
    url="http://localhost:3000/api/teddies";//url par defaut
    console.log(url);
    response=await fetch(url);
    return response.json();

   
  }else{
    
    response=await fetch(url);
    return  response.json();

   
  }
}
sectionArticle.appendChild(h2);
sectionArticle.appendChild(bloc);
//fonction qui affiche le compteur du panieren fonction de la quantite des produits
afficherCompteur();
//fonction pour afficher les produits stockés dans l'API
recuperArticle(url);




