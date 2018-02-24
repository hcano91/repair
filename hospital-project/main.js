const { app, BrowserWindow } = require('electron')

let win;

function createWindow() {
    win = new BrowserWindow({
        minHeight: 822,
        minWidth: 1200,
        width: 1200,
        height: 822
    })

    win.loadURL(`file://${__dirname}/dist/index.html`)

    win.webContents.openDevTools();

    win.on('close', function() {
        win = null
    });
}

app.on('ready', createWindow)

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    if (win === null) {
        createWindow()
    }
})