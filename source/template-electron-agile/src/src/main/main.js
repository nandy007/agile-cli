/* eslint strict: 0 */
'use strict';
const { app, ipcMain, BrowserWindow } = require('electron');

let mainWindow = null;

const fs = require('fs');

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1024, height: 768 });


  const loadURL = process.env.NODE_ENV === 'development'?
                    'http://localhost:3000/'
                    :
                    `file://${__dirname}/static/index.html`
                    ;

  mainWindow.loadURL(loadURL);

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

});

ipcMain.on('connect-imserver', function (event, arg) {
  event.returnValue = 'my love!';
});