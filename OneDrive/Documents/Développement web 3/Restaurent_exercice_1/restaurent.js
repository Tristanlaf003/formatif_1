var tps = 0.05;
var tvq = 0.09975
var entree = ['Aile de poulet', 'Salade César','Pain'];
var prix = [12,10,3];
var platPrincipal = ['Poutine', 'Pizza'];
var prixPlatPrincipaux = [16,17];
var prix;
var prixTotal;
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
console.log("Bienvenue au restaurent");
console.log("Voici nos entrées que nous vous preposons :");
entree.forEach(afficherEntreePrix);

readline.question("Veuillez selectionner le numéro de l'entrée souhaité : ", reponse => {
    console.log("Voici nos plats principaux : ");
    platPrincipal.forEach(affichagePlatPrincipaux);
    readline.question("Veuillez séletionner le numéro du votre plat principal : ", reponsePlatPrincipal => {
        console.log('Vouliez-vous un Brownie comme dessert ? ');
        readline.question("O / N : ", reponseDessert => {
            console.log(reponse, reponsePlatPrincipal, reponseDessert);
            if(reponseDessert == "o" || reponseDessert == "O"){
                prix = prix[reponse] + prixPlatPrincipaux[reponsePlatPrincipal] + 5;
            }
            else{
                prix = prix[reponse] + prixPlatPrincipaux[reponsePlatPrincipal];
            }
            console.log("Prix avant taxe : " + prix);
            var prixtps = prix*tps;
            var prixtvq = prix*tvq;
            prixTotal = prix + prixtps + prixtvq;
            console.log("Prix TPS : " + prixtps);
            console.log("Prix TVQ : " + prixtvq);
            console.log("Prix total : " + prixTotal);
            readline.question('Veuillez-vous donner un pourboire : (O/N)', reponsePourboire =>{
                if(reponsePourboire == "O" || reponsePourboire == "o"){
                    readline.question('Choisiser l\'option du pouboire ($ ou %)', reponseOptionPourboire =>{
                        if(reponseOptionPourboire == "$"){
                            readline.question('Entrée le montant du pourboire : ', reponseMontantPourboire => {
                                var prixAvecPourboire = prixTotal + parseInt(reponseMontantPourboire);
                                console.log("Le montant total de la facture est de " + prixAvecPourboire);
                                readline.close();
                            })
                        }
                        else if(reponseOptionPourboire == '%'){
                            readline.question('Entrée le pourcentage de pourboire : ', reponseMontantPourboire => {
                                var prixAvecPourboire = prixTotal + (prixTotal * (parseInt(reponseMontantPourboire)/100));
                                console.log("Le montant total de la facture est de " + prixAvecPourboire);
                                readline.close();
                            })
                        }
                    })
                }
                else{
                    console.log("Le montant total de la facture est de " + prixTotal);
                    readline.close();
                }
            });
        });
    });
});

function afficherEntreePrix(item, index){
    console.log(index + " " + " " + item + " : " + prix[index]);
}

function affichagePlatPrincipaux(item, index){
    console.log(index + " " + item + " : " + prixPlatPrincipaux[index]);
}