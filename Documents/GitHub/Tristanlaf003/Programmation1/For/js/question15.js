var i;
var N = Number(prompt("Entrez un nombre entier"));
var compteur = 0;
document.write("N=" + N + "<br>");
for (i = 1; compteur < N; i++ ){
    document.write("*");
    compteur++;
}