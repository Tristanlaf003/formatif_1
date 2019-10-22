var nombrePersonne = 1;
var prix = 0;
var invalide = 0;
for (var y = 1; y <= nombrePersonne; y++) {
    var entree = prompt("Voulez-vous des rouleaux impériaux en entrée: 3.50$ (o/n)");
    var platPrincipal = prompt("Plats principaux" + "\n1. Makis : 10$" + "\n2.Nigiris : 11$" + "\n3. PadThai : 14$");
    var dessert = prompt("Voulez-vous un dessert: 4.50$ (o/O/n/N)");

    var personnes = prompt("Personne de plus (o/n)");


    if (entree === "o") {
        prix += 3.50;
    }
    for (var i = 0; i <= invalide; i++) {
        if (platPrincipal === "1") {
            prix += 10;
        } else if (platPrincipal === "2") {
            prix += 11;
        } else if (platPrincipal === "3") {
            prix += 14;
        } else {
            alert("Ce plat n’est pas disponible pour le moment, mais nous prenons votre demande en note.")
            platPrincipal = prompt("Prenait un autre plat");
            invalide++;
        }
    }
    if (dessert.toUpperCase() === "O") {
        prix += 4.50;
    }


    if (personnes.toUpperCase() === "O") {
        nombrePersonne += 2;
    }
    if (personnes.toUpperCase() === "N"){
        document.write(prix + "<br>");
        nombrePersonne = 1;
        var tps = prix * 0.05;
        var tvq = prix * 0.09975;
        var total = prix + tps + tvq;
        document.write(tps + "<br>");
        document.write(tvq + "<br>");
        document.write(total);
    }
}
