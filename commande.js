let cont = JSON.parse(localStorage.getItem("commandeContact"));
let prod=(localStorage.getItem("produit"));
let tab=[];
prod=prod.match(/[a-z0-9]+/g);
let command={
  contact:{
    "firstName":`${cont.firstName}`,
    "lastName":`${cont.lastName}`,
    "address":`${cont.address}`,
    "city":`${cont.city}`,
    "email":`${cont.email}`,
  },
  products:prod
};

fetch("http://localhost:3000/api/teddies/order",{
  method:"POST",
  headers:{
    'Accept':"application/json",
    'Content-Type':"application/json"
  },

  body:JSON.stringify(command)
    


}).then((response)=>{
  if(response.ok)
  console.log(response);
  return response.json();
  
}).then((value)=>{
  afficherCommande(value);
  console.log(value);
}).catch((error)=>{
  console.log(error);
});
function afficherCommande(info){
  let div=document.createElement("div");
  let bodyTable = document.querySelector(".body-tab");
  let footTable = document.querySelector(".foot-tab");
  let resultat = 0;
  let tab=JSON.parse(localStorage.getItem("produitPanier"));
  document.querySelector(".info-command").appendChild(div);
  div.innerHTML=`
  <div  class="alert alert-secondary" role="alert">

      <p>Nom et prenom: ${info.contact.firstName} ${info.contact.lastName}</p>
      
      <p>Adresse mail: ${info.contact.email}</p>
      <p>Adresse: ${info.contact.address} ${info.contact.city}</p>
      <p>N° de la commande: ${info.orderId}</p>
     
  </div>
  `;
    for (let i = 0; i < tab.length; i++) {
      resultat += tab[i].quantite * tab[i].price;
      bodyTable.innerHTML += `
      <tr>
        <td>${tab[i].nom} </td>
        <td>${tab[i].couleur}</td>
        <td>${tab[i].quantite}</td>
        <td>${tab[i].price}€</td>
      </tr>`;
    };
    footTable.innerHTML = ` <tr>
    <th  scope="row" colspan=2>Total de la commande:
    </th>
    <td colspan=2 >${resultat} €</td>
    </tr>`;




}
 
