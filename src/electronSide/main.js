//Imported 3rd party modules
const electron = require('electron')
const {app, BrowserWindow, dialog, Menu, globalShortcut } = electron
const ipcMain = electron.ipcMain
const path = require('path')
const url = require('url')


//Imported javascript files
//const countdown = require('./countdown')

const helpers = require('./helpers.js');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

var themeEnum = {
    Light:0,
    Dark :1
};

//Global variable to share the css Theme
var themeGlobal = themeEnum.Dark;

function createWindow() {
    const screenshotCmd = 'Ctrl+Shift+A';
    var videoFilePath;

    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: '#e0e0eb',
        icon: path.join(__dirname,'..','resources/images/icon.png'),
        webPreferences: {
            //nodeIntegration: false,
            webSecurity: false

        }
        //type: 'toolbar'
    });

    /*Meter aqui conexão com o uilayout.js ipcMain.on e mandar fazer resizeCanvasJM
    win.on('maximize', function () {
        console.log('maximized!');
    });
    win.on('enter-full-screen', function () {
        console.log('entered full screen');
    });*/

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname,'..','index.html'),
        protocol: 'file:',
        slashes: true
    }))

    globalShortcut.register(screenshotCmd, () => {
        win.webContents.send('capture', path.join(__dirname, '..'));
        console.log('Screen taken');
    });



    const template = [
        {
            label: app.getName(),
            submenu: [
                {
                    label: 'About'
                },
                {
                    label: 'Quit',
                    click(item, focusedWindow) {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Load',
            submenu: [
                {
                    label: 'Video',
                    accelerator: 'Shift+V',
                    click(item, focusedWindow) {
                        dialog.showOpenDialog(
                            win,
                            {
                                filters: [{ name: 'Video files', extensions: ['mkv','ogv','webm', 'mp4','mp3'] }],
                                properties: ['openFile']
                            }, (fileNames) => {

                                if (fileNames === undefined) {
                                    dialog.showErrorBox("Error", "Error opening file.");
                                    return;
                                }

                                var videoFilePath = fileNames[0];

                                var Helper = new helpers();

                                Helper.getFramerate(videoFilePath, function (frameRate) {
                                    if (frameRate === null) {
                                        dialog.showErrorBox("Error", "No frame rate was found!");
                                        return;
                                    }
                                    win.webContents.send('videoFilePath', videoFilePath, frameRate);
                                });
                                                                
                              }

                        );

                    }
                },
                {
                    label: 'Data File',
                    accelerator: 'Shift+D',
                    click(item, focusedWindow) {
                        dialog.showOpenDialog(
                            win,
                            {
                                filters: [{ name: 'Data files', extensions: ['csv'] }],
                                properties: ['openFile']
                            }, (fileNames) => {

                                if (fileNames === undefined) return;

                                var dataFilePath = fileNames[0];

                                win.webContents.send('dataFilePath', dataFilePath);
                            }

                        );
                    }
                }
            ]
        },
        {
            label: 'Animations',
            submenu: [
                {
                    label: 'Points View'
                }

            ]
        },
        {
            label: 'Export',
            submenu: [
                {
                    label: 'Single Graphic'
                },
                {
                    label: 'Visualization Panel'
                },
                {
                    label: 'Full Screenshot',
                    accelerator: screenshotCmd,
                    click(item, focusedWindow) {
                        win.webContents.send('capture', path.join(__dirname,'..'));
                        console.log("screen again");
                    }
                }

            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Theme',
                    submenu: [
                        {
                            type: 'radio',
                            label: 'Dark',
                            clicked: true,
                            click (){
                                themeGlobal = themeEnum.Dark;
                                win.webContents.send('theme', themeGlobal);
                           
                            }
                        },
                        {
                            type:'radio',
                            label: 'Light',
                            click (){
                                themeGlobal = themeEnum.Light;
                                win.webContents.send('theme', themeGlobal);
                            }
                        },
                        
                    ]
                }
            ]
        }
    ]

    win.webContents.send('getIpcRenderer', () => {
      return electron.ipcRenderer;
    });
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);




    //dialog.showOpenDialog([win])
    // Open the DevTools.
    win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
        // Unregister all shortcuts.
        globalShortcut.unregisterAll();
    })

}

/*ipcMain.on('countdown-start', _ => {
    countdown(count => {
        win.webContents.send('countdown',count)
    });
});*/

console.log(require.resolve('electron'))


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})
