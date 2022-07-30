const socket = io.connect( ) //TAMBIEN PUEDE SER IO(). ES INDISTINTO

function renderizador( data ) {

    const hmtl = data.map( elem => { 
        return(` <div> <strong>${elem.author}</strong>: 
                 <em>${elem.text}</em> </div>`)
     }).join( "" );
     document.getElementById( "mensajesrecibidos" ).innerHTML = hmtl;

}

// socket.on( "ID de mensaje", data =>{
//     console.log(data);
// } )

//AHORA VAMOS A ENVIAR MENSAJES AL SERVIDOR 
function addMessage( e ) {

    const NuevosMensajes = {
        author: document.getElementById( "username" ).value,
        text: document.getElementById ( "texto" ).value
    };
    socket.emit( "nuevo-mensaje", NuevosMensajes )
    return false //POR TEMAS DE FRONT SIEMPRE DEBE RETORNAR ALGO 
}



socket.on ( "ID de mensaje", data=>{  renderizador(data)  } )