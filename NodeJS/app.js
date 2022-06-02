//Incluindo uma biblioteca HTTP
const http = require('http');
const queryString = require('query-string');
const url = require('url');
const fs = require('fs');

//Definição de endereço / URL
const hostname = '127.0.0.1'; // Localhost
const port = 3000;

//Implementação da regra de negócio
const server = http.createServer((req, res) => {

  var resposta;
  const urlparse = url.parse(req.url, true);
  //receber informações do usuario
  const params = queryString.parse(urlparse.search);
  
  //criar um usuario e atualizar um usuario
  if(urlparse.pathname == '/criar-atualizar-usuario') {

    //salvar as informações
    fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) {
      if (err) throw err;
      console.log('Saved!');

      resposta = 'usuario criado com sucesso.'

      res.statusCode = 200;
      res.setHeader('Content-type', 'text/plain');
      res.end(resposta);
    });
  }
  //selecionar-buscar usuario
  else if(urlparse.pathname == '/selecionar-usuario') {
    fs.readFile('users/' + params.id + '.txt', function(err, data) {
      resposta = data;

      res.statusCode = 200;
      res.setHeader('Content-type', 'text/plain');
      res.end(resposta);
      
    });
  }
  //remover o usuario
  else if(urlparse.pathname == '/remover-usuario') {
    fs.unlink('users/' + params.id + '.txt', function(err) {
      console.log('File deleted!');

      resposta = err ? "Usuario nao encontrado." : "Usuario removido.";

      res.statusCode = 200;
      res.setHeader('Content-type', 'text/plain');
      res.end(resposta);
    });
  }  

});

// Execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


//localhost:3000/criar-atualizar-usuario?nome=erik&idade=80&id=1
//localhost:3000/selecionar-usuario?id=2
//localhost:3000/remover-usuario?id=1
