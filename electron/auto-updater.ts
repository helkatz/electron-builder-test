import { app, dialog } from 'electron'
import { autoUpdater } from 'electron-updater'
import type { GithubOptions, PublishConfiguration } from "builder-util-runtime/out/publishOptions.d.ts";

import _ from 'lodash'
class AutoUpdater {
  private logger = console

  private checkConfig = {
    provider: 'github',
    owner: 'helkatz',
    repo: 'electron-builder-test',
    checkInterval: 2600, // Check for updates every hour
  }
  create() {
    autoUpdater.logger = this.logger
    autoUpdater.autoDownload = true // Automatically download updates
    autoUpdater.autoInstallOnAppQuit = true // Install updates when app quits

    // autoUpdater.forceDevUpdateConfig = true;
    console.log("App Version:", app.getVersion());
    console.log("Electron Version:", process.versions.electron);

    const options = _.pick(this.checkConfig, ["provider", "owner", "repo"]) as PublishConfiguration
    autoUpdater.setFeedURL(options);
    
    this.installUpdateChecker()

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

  installUpdateChecker() {
    const repeatedly = async (next: number) => {
      setTimeout(async () => {
        try {
          this.logger.info('Checking for updates...');
          const check = await autoUpdater.checkForUpdates();
          this.logger.info('Update check result:', check);
        } catch (error) {
          this.logger.error('Error checking for updates:', error);
        }
        if(this.checkConfig.checkInterval > 1000) {
          repeatedly(this.checkConfig.checkInterval); // ✅ Safely schedule the next update
        }
      }, next);
    };
  
    repeatedly(0); // ✅ First update check runs immediately
  }
}  

export function initializeAutoUpdater() {
  new AutoUpdater().create()
}
