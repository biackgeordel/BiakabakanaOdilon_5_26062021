import {tab} from './module/fonction.js';
/*
validNom:boolean
validPrenom: boolean
validAdress: boolean
validEmail: boolean
validCity: boolean
*/
let validNom;
let validPrenom;
let valideAdress;
let validEmail;
let validCity;
console.log(tab);
afficherFormulaire(tab);

function afficherFormulaire(tab) {
  if (tab!==null || tab.length!==0) {
    let titre = document.createElement("h2");
    titre.innerText = "Information du client";
    let form = document.createElement("form");
    form.innerHTML = `
    
    <div class="form-row">
      <div class="col-md-4 mb-3">
        <label for="firstName">Nom</label>
        <input type="text" id="firstName"  class="form-control" placeholder="Votre nom" required>
        <div class="valid-feedback">
          
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <label for="lastName">Prenom</label>
        <input type="text" class="form-control" id="lastName" placeholder="Votre prenom"required>
        <div>
          
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <label for="email">Adresse mail</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroupPrepend3">@</span>
          </div>
          <input type="email" class="form-control " id="email" placeholder="Username" aria-describedby="inputGroupPrepend3" required>
          <div class="invalid-feedback">
          
          </div>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-6 mb-3">
        <label for="adress">Adresse</label>
        <input type="adress" class="form-control " id="adress" placeholder="Votre adresse" required>
        <div class="invalid-feedback">
          
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <label for="city">Ville</label>
        <input type="text" class="form-control" id="city" placeholder="Le nom de la ville" required>
        <div>
          
        </div>
      </div>
      
    </div>
    
    <button class="btn btn-primary btn-command" type="submit">Passer la commande</button><div role="alert"></div>
  `;
    document.querySelector(".cont").appendChild(titre);
    document.querySelector(".cont").appendChild(form);
  } else {
    console.log("le tableau n'est pas disponible");
  }

}

//verification du nom du client
document.querySelector("#firstName").addEventListener("input", function (e) {
  let regex = new RegExp(/^[a-zA-Z]+[\s(a-zA-Z)]+$/);
  let nomInput = "nom";
  validNom = validationElement(e, regex, nomInput);
  console.log(validNom);
});

//verification du prenom du client
document.querySelector("#lastName").addEventListener("input", function (e) {
  let regex = new RegExp(/^[a-zA-Z]+[-\s(a-zA-Z)]+?$/);
  let nomInput = "prenom";
  validPrenom = validationElement(e, regex, nomInput);
  console.log(validPrenom);
});
//verification du nom de la ville saisi par le client
document.querySelector("#city").addEventListener("input", function (e) {
  let regex = new RegExp(/^[a-zA-Z]+[\'-\sa-zA-Z]+[a-zA-Z]$/);
  let nomInput = "ville";
  validCity = validationElement(e, regex, nomInput);
  console.log(validCity);
});
//verification de l'adresse saisi par le client
document.querySelector("#adress").addEventListener("input", function (e) {
  let regex = new RegExp(/^[0-9]{1,4}[,\s]{1}[-,\sa-zA-Z0-9]{10,}$/);
  let nomInput = "adresse";
  valideAdress = validationElement(e, regex, nomInput);
  console.log(valideAdress);
});

//verification de l'adresse email du client
document.querySelector("#email").addEventListener("input", function (e) {
  let regex = new RegExp(/^[a-z]+[.a-z0-9\-]+@[a-z]+[.][a-z]{2,}$/);
  let nomInput = " adresse email";
  validEmail = validationElement(e, regex, nomInput);
  console.log(validEmail);
});

//*****************fonction pour verifier les données saisies par le client*************** */
function validationElement(e, regex, nomInput) {
  let selectId = e.target.getAttribute("id");
  let test;
  selectId = "#" + selectId;
  if ((test = regex.test(e.target.value)) && e.target.value.length >= 3) {
    e.target.classList.add("is-valid");
    e.target.classList.remove("is-invalid");
  } else {
    e.target.classList.remove("is-valid");
    e.target.classList.add("is-invalid");
  }
  if (test) {
    document
      .querySelector(selectId + "+div")
      .classList.remove("invalid-feedback");
    document.querySelector(selectId + "+div").classList.add("valid-feedback");
    document.querySelector(selectId + "+div").innerText =
      "Votre " + nomInput + " saisi est valide";
    return test;
  } else {
    document.querySelector(selectId + "+div").classList.add("invalid-feedback");
    document.querySelector(selectId + "+div").innerText =
      "Votre " + nomInput + " n'est pas valide ";
    test = false;
    return test;
  }
}
/****************************************************************************** */
document.querySelector(".btn").addEventListener("click", function (e) {
  e.preventDefault();
  if (validCity && validEmail && validNom && validPrenom && valideAdress) {
    document.querySelector(".btn+div").innerText = " ";
    document.querySelector(".btn+div").classList.remove("alert");
    document.querySelector(".btn+div").classList.remove("alert-danger");
    window.setTimeout(function () {
      commanderProduit();
      window.location.href = "commande.html";
    }, 300);
  } else {
    document.querySelector(".btn+div").classList.add("alert");
    document.querySelector(".btn+div").classList.add("alert-danger");
    document.querySelector(".btn+div").innerText =
      "Impossible de passer la commande,les informations saisies sont incomplétes";
    console.log(document.querySelector(".btn+div").innerText);
  }
});

/*la fonction commanderProduit recupererles informations du client 
et le tableau des produits qui seront stockés dans un localStorage afin d'être envoyer à l'API */
function commanderProduit() {
  let product_id = [];//tableau contenant les id des produits
  let contact;//objet contenant les informations du client
  for (let i = 0; i < tab.length; i++) {
    product_id.push(tab[i].id);
  }
  contact = {
    'firstName': document.querySelector("#firstName").value,
    'lastName': document.querySelector("#lastName").value,
   'address': document.querySelector("#adress").value,
    'city': document.querySelector("#city").value,
    'email': document.querySelector("#email").value,
  };
  localStorage.setItem("commandeContact", JSON.stringify(contact));
  localStorage.setItem("produit", JSON.stringify(product_id));
}
