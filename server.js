'use strict'
//Create a variable or the hapi module
const Hapi = require('hapi');
//Instantiate the server
const server = new Hapi.Server();
server.connection({port: 3000, host: 'localhost'});

server.route({
  method: 'GET',
  path: '/',
  handler: (request,reply) => {
    reply('Hello World');
  }
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler:(request,reply) => {
    reply('Hello ' + encodeURIComponent(request.params.name) + '!');
  }
});

server.register(require('inert'), (err) => {
  if(err){
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/hello',
    handler: function(request,reply){
      reply.file('./public/hello.html');
    }
  });
});


server.start((err)=> {
  if(err){
    throw err;
  }
  console.log(`Server running at : ${server.info.uri}` );
});
