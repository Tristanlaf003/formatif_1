var i;
var ligne = 1;
var nombre = 2;
for (i = 1; ligne <= 30; i++){
    document.write(nombre + "<br>");

    if (nombre === 10){
        nombre = 0;
    }
    ligne++;
    nombre+=2;
}