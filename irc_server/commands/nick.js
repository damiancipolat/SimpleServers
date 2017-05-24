/*
module.exports =params=>{
  return (data, id)=>{
    return new Promise((resolve, reject)=>{
        if(data.length!=1) return reject('bad arguments');
        params.usersList[id].nick = data;
        resolve('new nick '+data);
    })
  }
}
*/

//Reviso si el usuario ya esta registrado o no.
logeado = (nick)=>
{
	return (usuarios.filter((user)=>user.nick==nick).length>0);
};

/*
//Cuando se registra un nuevo usuario al server.
module.exports = (canales,usuarios) => {
	(user,email,socket)=>
	{
		//Si el usuario no esta logeado.
		if (!logeado(user))
		{
			//Registro el usuario.
			usuarios.push({nick:user,emai:email,iduser:socket.id});
			
			//Envio el ok del registro al usuario.
			socket.emit('chat message','Bienvenido '+user+'!');
		}
		else
		{
			//Envio el ok del registro al usuario.
			socket.emit('chat message','Ya hay un usuario con ese nick, escoja otro.');
		}
	};
};
*/

module.exports = ()=> console.log('1');

