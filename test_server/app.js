//Incluyo modulos.
const http   	 = require('http');
const express 	 = require('express');

//Instancias.
const app 	 	 = express();
const server 	 = http.createServer(app);
const port 		 = 8080;

//Buscar colectivos cercanos a un punto.
app.get('/hello',(req,res)=>{

	//Antes, envio los headers para permitir el cross-origin.
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");

  	//Envio la respuesta.
  	res.json({"status":"ok","msj":"hola damian"});
});

//Agrego health
app.get('/health',(req,res)=>{

	//Antes, envio los headers para permitir el cross-origin.
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");

  	//Envio la respuesta.
  	res.json({"status":"ok"});
});

//Agrego test
app.get('/test',(req,res)=>{

	//Antes, envio los headers para permitir el cross-origin.
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	const response = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
	
  	//Envio la respuesta.
  	res.json({"status":"ok","body":response});
});

//Agrego esta ruta, para los casos en que se escribe mal la url para obtener siempre un retorno.
app.get('*',(req,res)=>{
	res.json({error:"Servicio inexistente."});
});

//Inicializo el servidor, escuchando conexiones en el puerto fijado en port.
app.listen(port,(err)=>
{
	//Si hay un error, muestro por la consola, sino msj de inicio.
	if (err)
		console.log('ERROR: hubo un problema al inciar el server.');
	else
	{
		console.log('');		
		console.log('Server | Api Test');		
		console.log('>Listen on port: '+port);
		console.log('');
	}
});
