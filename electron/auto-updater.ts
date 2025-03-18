import { app, dialog } from 'electron'
import { autoUpdater } from 'electron-updater'

class AutoUpdater {
  private logger = console

  create() {
    autoUpdater.logger = this.logger
    autoUpdater.autoDownload = true // Automatically download updates
    autoUpdater.autoInstallOnAppQuit = true // Install updates when app quits

    // autoUpdater.forceDevUpdateConfig = true;
    console.log("App Version:", app.getVersion());
    console.log("Electron Version:", process.versions.electron);

    autoUpdater.setFeedURL({
      provider: 'github',
      owner: 'helkatz',
      repo: 'electron-builder-test',
    });
    
    autoUpdater.checkForUpdatesAndNotify()

    this.logger.info('Checking for updates...');
    autoUpdater.on('update-available', (info) => {
      this.logger.info('Update available:', info);
    });

    autoUpdater.on('update-downloaded', (info) => {
      this.logger.info('Update downloaded:', info);
      dialog.showMessageBox({
        type: 'info',
        title: 'Update Ready',
        message: 'A new update is ready. Quit and install now?',
        buttons: ['Yes', 'Later']
      }).then((result) => {
        if (result.response === 0) {
          autoUpdater.quitAndInstall();
        }
      });
    });

    autoUpdater.on('error', (err) => {
      this.logger.error('Error in auto-updater:', err);
    });
  }
}

export function initializeAutoUpdater() {
  new AutoUpdater().create()
}
