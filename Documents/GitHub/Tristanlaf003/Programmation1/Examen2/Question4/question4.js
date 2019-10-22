var horizontal = Number(prompt("Nombre de chiffre horizontal"));
var vertical = Number(prompt("Nombre de chiffre vertical"));
var chiffre = 1;
var nombre = 1;
var reponse;
var test = horizontal;
var point = 3 * horizontal;
document.write("*" + " | ");

for (var t = 1; t<=horizontal; t++){
    document.write(nombre + "   ");
    nombre++;
}
document.write("<br>");
for (var x = 1; x <= point; x++){
    document.write(" - ");
}
nombre = 1;
document.write("<br>");

for(var z = 1; z <= vertical;z++) {
    document.write(chiffre + " | ");
    for (var i = 1; i <= horizontal; i++) {
        reponse = chiffre * nombre;
        if (reponse < 10) {
            document.write("  " + "       " + reponse + "  ");
        }
        else{
            document.write(reponse + " ");
        }
        if (nombre === test) {
            chiffre++;
            test =+horizontal;
            document.write("<br>");
            nombre = 0;
        }
        nombre++;
    }
}
