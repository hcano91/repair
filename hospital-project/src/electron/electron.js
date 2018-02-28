const electron = require('electron');
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const os = require('os');
const ipc = electron.ipcMain;
const shell = electron.shell;
let win;

function createWindow() {
    win = new BrowserWindow({
        minHeight: 822,
        minWidth: 1200,
        width: 1200,
        height: 822
    })

    win.loadURL(`file://${__dirname}/index.html`)

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

ipc.on('print-to-pdf', function(event) {
    const pdfPath = path.join(os.tmpdir(), 'print.pdf');
    const win = BrowserWindow.fromWebContents(event.sender);
    win.webContents.printToPDF({
        marginsType: 0,
        pageSize: "A3"
    }, function(error, data) {
        if (error) return console.log(error.message);

        fs.writeFile(pdfPath, data, function(err) {
            if (err) return console.log(err.message);

            shell.openExternal('file://' + pdfPath);
            event.sender.send('wrote-pdf', pdfPath);
        })
    })
})