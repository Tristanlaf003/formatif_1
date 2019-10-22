var i;
var metre = 0;
var jour = 1;
var nuit = 1;
var reponse;
var metre2 = 0;
var b = 0;
for(i = 0; b < 50; i++){
   document.write("jour"+jour);
   jour++;
   metre +=3;
   document.write("\n"+metre + "<br>");
   document.write("nuit"+ nuit);
   nuit++;
   metre2 -=2;
   document.write("\n" + metre2 + "<br>");
   reponse = metre + metre2;
   document.write("total" + reponse + "<br>" );
    b++;
}