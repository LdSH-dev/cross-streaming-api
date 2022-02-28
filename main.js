const { app, BrowserWindow, ipcMain} = require ('electron');

app.on('ready', () => {
    console.log('Aplicação iniciada');
    let mainWindow = new BrowserWindow({
        width  : 600,
        height : 400,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    mainWindow.loadURL(`file://${__dirname}/app/templates/index.html`);
    mainWindow.webContents.openDevTools();
    mainWindow.setMenuBarVisibility(false);
});

app.on('window-all-closed', ()=> {
    app.quit();
    console.log('Aplicação fechada')
});

ipcMain.on('open-window', () => {
    let homeWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    homeWindow.loadURL(`file://${__dirname}/app/templates/home.html`);
    homeWindow.setMenuBarVisibility(false);
});

ipcMain.on('assistir', () => {
    let assistirWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    assistirWindow.loadURL("https://www.netflix.com/watch/80057443?trackId=14170056");
    assistirWindow.setMenuBarVisibility(false);
});