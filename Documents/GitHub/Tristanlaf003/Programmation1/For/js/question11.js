var i;
var ligne = 1;
var nombre = 1;
for (i = 1; ligne <= 13; i++){
    document.write(nombre + "<br>");

    if (nombre === 11){
        nombre = -1;
    }
    ligne++;
    nombre+=2;
}