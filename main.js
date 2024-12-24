import { app, BrowserWindow, shell  } from 'electron';
import path from "path";
function createWindow() {
  const win = new BrowserWindow({
    minWidth: 980,
    minHeight: 680,
    backgroundColor: "#181818",
    alwaysOnTop: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
    },
  });
  win.removeMenu();
  win.loadURL('https://theporndude.com/');
  win.webContents.openDevTools();
  win.webContents.setWindowOpenHandler(({ url }) => {
    win.loadURL(url);
    return { action: 'deny' };
  });

  win.webContents.on('will-navigate', (event, url) => {
    console.log('Intercepted navigation:', url);
    event.preventDefault();
    win.loadURL(url);
  });
}

app.whenReady().then(() => {
  app.configureHostResolver({
    secureDnsMode: 'secure', 
    secureDnsServers: [
      'https://cloudflare-dns.com/dns-query', 
      'https://dns.google/dns-query', 
    ],
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
