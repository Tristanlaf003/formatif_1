const http = require('http');
const hostname = 'localhost';
const port = 3000;
const url = require("url");
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    
    var params = new URLSearchParams(url.parse(req.url, true).query);
    console.log(params);
    console.log(params);
    console.log(params);
    if (params.has('prenom') && params.has('nom') && params.has('hasard')) {
        res.write('Bonjour ' + params.get('prenom') + ' ' + params.get('nom') + '\n');
        res.write('Voici le decompte selon le nombre fourni : \n')
        for(let a = parseInt(params.get('hasard')); a >= 0; a = a - 2){
            res.write(a.toString() + '\n');
        }
    }
    else {
        res.write('Vous devez bien avoir un prénom, un nom et un chiffre ou un nombre, non ?');
    }
    res.end();
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
//http://localhost:3000/?prenom=Tristan&nom=Lafontaine&hasard=10