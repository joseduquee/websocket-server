export const socketController = (clientSocket) => {
  console.log("Client connected", clientSocket.id);

  clientSocket.on("disconnect", () => {
    console.log("client disconnected", clientSocket.id);
  });

  clientSocket.on("send-msg", (payload, callback) => {
    const id = 123456789;
    callback({ id, fecha: new Date().getTime() });
    //con el broadcast envio la emisiona a todos los clientes
    //si usara esta funcion en en server seria desde el this.io
    //y en ese caso no se usa el broadcast
    //es mejor no usar el this.io
    clientSocket.broadcast.emit('send-msg', payload)
  });
};
