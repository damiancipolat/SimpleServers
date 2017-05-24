const http 		= require('http');
const express   = require('express');
const app 		= express();
const server    = http.createServer(app);
const io 		= require('socket.io')(server);

app.use(express.static('./public'));

//Listado de canales.
var canales  = [];

//Listado de usuarios.
var usuarios = [];

const commands = require('./commands')({canales:[],usuarios:[]});
console.log(commands.nick);

//Reviso si el usuario ya esta registrado o no.
idlogeado = (id)=>
{
	return (usuarios.filter((user)=>user.iduser==id).length>0);
}

//Revisa si el canal ya esta creado.
existeCanal = (nombre)=>
{
	return (canales.filter((canal)=>canal.nombre==nombre).length>0);	
};

reject = (socket)=>
{
	socket.emit('chat message','Usuario no registrado!');
};

regCanal = (nombre,socket)=>
{
	canales.forEach((canal)=>{
		if (canal.nombre==nombre)
			canal.users.push(socket);
	});
};

//Registra el canal.
crearCanal = (nombre,socket)=>
{
	//Reviso primero que este logeado este socket.
	if (idlogeado(socket.id))
	{
		//Si no existe.
		if (!existeCanal(nombre))
		{
			//Agrego el nuevo canal y el primer usuario
			canales.push({nombre:nombre,users:[socket]});
			
			socket.emit('chat message','Nuevo canal '+nombre+' creado!');
		}
		else
		{
			regCanal(nombre,socket);
			socket.emit('chat message','Registro en el  canal  ok!');
		}
	}
	else
		reject(socket);
};

//Ver listado de canales.
listar = (socket)=>
{
	console.log('list '+socket.id);
	if(canales.length>0)
		canales.forEach((canal)=>socket.emit('chat message','*'+canal.nombre));
	else
		socket.emit('chat message','No hay canales cargados!');
}

//Reviso si el socket esta registrado en el canal.
socketEnCanal = (nomb,socket)=>
{
	return canales.filter(
							(canal)=>(
										(canal.nombre==nomb)&&
										(canal.users.filter((user)=>user.id==socket.id)).length>0
									  )
						 );
};

//Difunde un mensaje en todo el canal.
difundirCanal = (nombre,msg,socket)=>
{
	canales.map((canal)=>{
		if (canal.nombre==nombre)
		{
			canal.users.forEach((user)=>{
				if (user.id!=socket.id)
					user.emit('chat message',msg);
			});	
		}
	})
};

//Mensaje
mensaje = (canal,mensaje,socket)=>
{
	//Reviso si esta logeado el socket.
	if (idlogeado(socket.id))
	{
		//Si esta el socket registrado en el canal.
		if (socketEnCanal(canal,socket))
			difundirCanal(canal,mensaje,socket);
		else					
			socket.emit('chat message','Usuario no registrado en canal');
	}
	else
		reject(socket);
};

//Cuando se conecta un usuario, seteo eventos a los sockets.
io.on('connection',(socket)=>{

		console.log('Nueva conexion', socket.id);

		//Cuando llega info sobre el evento 'chat-message.'
		socket.on('test',(data)=>{
			console.log(`TEST ${data}`);
		});

		//Cuando llega info sobre el evento 'chat-message.'
		socket.on('chat message',(data)=>{

		let comandos = data.split(" ");

		//Segun cada comando.
		switch(comandos[0])
		{
		    case '/NICK':
		    		//Registro el usuario si se puede.
		    		commands.nick(comandos[1],comandos[2],socket);
		    		break;	        
		    case '/JOIN':			        			    	
		    		//Cuando piden unirse o crear un canal.
					//crearCanal(comandos[1],socket);
		        	break;
		    case '/LIST':
		    		listar(socket);
		    		break;
		    case '/MSG':
		    		//mensaje(comandos[1],comandos[2],socket);
		    	break;
		}

		console.log(`${socket.id}:${data}`);

		//Envio a todos los clientes bajo el evento una respuesta.
		//io.emit('chat message',('user '+socket.id+' : '+data));
	});	

	//Cuando el socket se desconecta.
	socket.on('disconnect',()=>{

	});
});


server.listen(process.env.PORT||5000);

console.log("---------------------");
console.log("IRC TEST 1.0");
console.log("By Damian Cipolat");
console.log("---------------------");