const { app, BrowserWindow, BrowserView } = require('electron');
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        icon: "media/liicon.png",
        show: false,
        useContentSize: true,
        enableLargerThanScreen: true,
        webPreferences: {
            preload: path.join(__dirname, 'src/preload.js'),
            useContentSize: true,
            simpleFullscreen: true,
            type: "desktop",
        },

    });

    let view = new BrowserView();
    mainWindow.setBrowserView(view);
    mainWindow.setMinimumSize(850, 600);
    mainWindow.maximize();

    //Set minimum bounds for the contents within the BrowserView. Allow resize of loaded URL contents.
    view.setBounds(mainWindow.getBounds());
    //view.setBounds({ x: 0, y: 0, width: 850, height: 600 }); //view
    view.webContents.loadURL('https://linkedin.com/learning'); //view
    view.setAutoResize({
        width: true,
        height: true
    });

    // load the index.html of the app.
    mainWindow.loadFile('src/index.html');

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        // Open the DevTools.
        //mainWindow.webContents.openDevTools()
    });


    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow();
});
