var i;
var nombre = prompt("Entez un nombre");
var g = nombre.length - 1;

for (i = 0; g > -1 ; i++){
    document.write(nombre[g]);
    g--;
}