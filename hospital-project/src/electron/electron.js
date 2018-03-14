const electron = require('electron');
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const os = require('os');
const ipc = electron.ipcMain;
const shell = electron.shell;
let win;
let menu;

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
    var template = [{
        label: "REPAIR",
        submenu: [
            { label: "Cerrar", accelerator: "Command+Q", click: function() { app.quit(); } }
        ]
    }, {
        label: "Editar",
        submenu: [
            { label: "Deshacer", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Rehacer", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cortar", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copiar", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Pegar", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Seleccionar Todo", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]
    }];

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
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