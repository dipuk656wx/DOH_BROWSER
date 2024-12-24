const { contextBridge, ipcRenderer } = require('electron');

// Expose DoH resolve functionality
contextBridge.exposeInMainWorld('doh', {
  resolve: (hostname) => ipcRenderer.invoke('resolve-dns', hostname),
});
