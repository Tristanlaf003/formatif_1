var x = 0;
var y = 0;
var i;
for (i = 0; x < 4; i++){
    document.write("[" + x + "," + y + "]" + "\n");

    if (y === 5){
        x++;
        y = -1;
        document.write("<br>")
    }
    y++;
}