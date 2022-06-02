//importação de biblioteca
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parse } from 'query-string';
import * as url from 'url';
import { writeFile } from 'fs';
import { ReadableStreamBYOBRequest } from 'stream/web';

//definição de porta
const port = 5000

const server = createServer((request: IncomingMessage, response: ServerResponse) => {

    const urlparse =url.parse(request.url ? request.url : ' ', true);

    //receber informacoes do usuario
    const params = parse(urlparse.search ? urlparse.search : '');
    
    //criar um usuario e atualizar um usuario
  if(urlparse.pathname == '/criar-atualizar-usuario') {

    var resposta;

    //salvar as informações
    writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err: any) {
      if (err) throw err;
      console.log('Saved!');

      resposta = 'usuario criado/atualizado com sucesso.'

      response.statusCode = 200;
      response.setHeader('Content-type', 'text/plain');
      response.end(resposta);
    });
  }   
    
});

//execução
server.listen(port, () => {
    console.log(`Server running on port ${port}`);

});

//localhost:5000/criar-atualizar-usuario?id=123&nome=eriko