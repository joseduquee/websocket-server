//Referencias del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMsg = document.querySelector('#txtMsg');
const btnSend = document.querySelector('#btnSend');


const socketClient = io();

//On es para escuchar eventos
socketClient.on('connect', () => {
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socketClient.on('disconnect', () => {
    console.log('desconectado del servidor');
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
})

socketClient.on('send-msg', (payload) => {
    console.log(payload);
})

btnSend.addEventListener('click', () => {
    const msg = txtMsg.value;
    const payload = {
        msg,
        id: '324234',
        date: new Date().getTime()
    }
    //aqui emitimos con el socket
    socketClient.emit('send-msg', payload, (id) => {
        console.log('desde el server', id);
    });
})