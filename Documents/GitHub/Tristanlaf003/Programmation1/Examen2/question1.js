var base = prompt("Entrer une base");
var exposant = prompt("Entrer l’exposant maximal");
var nombre = 0;
var reponse;

for(var i = 0; i <= exposant; i++){
    reponse = Math.floor(Math.pow(base,nombre));
    document.write(base + " exp " + nombre + " = " + reponse + "<br>");
    nombre++;
}

