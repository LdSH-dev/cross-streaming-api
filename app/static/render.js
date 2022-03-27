const { ipcRenderer } = require('electron');

let login = document.querySelector('#signin');
let assistir = document.querySelector('#assistir');

login.addEventListener('click', function() {
    ipcRenderer.send('open-window');
});

assistir.addEventListener('click', function() {
    ipcRenderer.send('assistir');
});
