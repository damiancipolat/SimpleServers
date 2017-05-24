var WebSocketServer = require('websocket').server;
var http 			= require('http');

var clientes = {
					cli_max  : 0,
					cli_list : new Array()
				};

var server = http.createServer(function(request, response){});

server.listen(3000, function()
{
	console.log("Webnserver iniciado");
});

wsServer = new WebSocketServer(
{
    httpServer: server
});

wsServer.on('request', function(request)
{
    var connection = request.accept(null, request.origin);
	
	clientes.cli_max++;
	connection.idconexion=clientes.cli_max;
	clientes.cli_list.push(connection);
	
	console.log("Nueva conexión, socket "+connection.idconexion);
	
    connection.on('message', function(message)
	{
       if (message.type === 'utf8')
		{
			console.log("Mensaje de socket "+connection.idconexion);	
			
            for (var i=0;i<=clientes.cli_list.length-1;i++)
			{
				var cnx = clientes.cli_list[i];
				
				if (cnx.idconexion!=this.idconexion)				
					cnx.sendUTF("cli "+connection.idconexion+" dice<br>"+message.utf8Data);
			}			
        }
    });

    connection.on('close', function(connection)
	{
        console.log("Desconexión, socket "+this.idconexion);
    });
});