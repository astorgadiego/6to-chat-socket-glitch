//ESTO VIENE A REPRESENTEAR EL LADO DEL SERVIDOR
//IMPORTANDO LIBRERIAS
const express = require('express')

const { Server : IOServer } = require ('socket.io')

const { Server : HttpServer } = require ( 'http' )

//INSTANCIANDO EL SERVIDOR Y EL SOCKET
const app = express()
const httpServer = new HttpServer ( app )
const io  = new IOServer ( httpServer )

//INDICAMOS QUE QUEREMOS CARGAR NUESTRO ARCHIVO INDEX.HTML EN LA RAIZ DE LA MISMA
app.use ( express.static ( './public' )  )

//ESTA RUTA CARGA NUESTRO ARCHIVO INDEX.HTML EN LA RAIZ DE LA MISMA
app.get ( '/', ( req, res)=>{ 
    res.sendFile ( 'index.html', { root:__dirname }  ) 
    }
)

const Arraymensajes = [
    { author: "Juan", text: "Hola, que tal" },
    { author: "Pedro", text: "Muy bien! y vos?" },
    { author: "Ana", text: "Genial!" }
];

io.on( "connection", ( socket )=>{
    console.log("!Nuevo Cliente Conectado!");
    socket.emit("ID de mensaje", Arraymensajes)//ACA LE ENVIAMOS LOS MENSAJES QUE ESTAN A ESE CLIENTE NUEVO!!

    socket.on ( "nuevo-mensaje", data=>{ 
        Arraymensajes.push(data)
        io.sockets.emit("Mensajes Actualizados", Arraymensajes)
     });

});


//EL SERVIDOR FUNCIONANDO EN EL PUERTO 3000
httpServer.listen ( 8080, ()=> console.log('Server Funcionando en Puerto 8080'))