import { app, dialog } from 'electron';
import { autoUpdater, UpdateInfo } from 'electron-updater';
import type { PublishConfiguration } from "builder-util-runtime/out/publishOptions.d.ts";
import _ from 'lodash';

export class AutoUpdater {
  private logger = console;

  private checkConfig = {
    provider: 'github',
    owner: 'helkatz',
    repo: 'electron-builder-test',
    checkInterval: 3600000, // Check for updates every 1 hour
    remindMeAt: 0, // when set the user will be reminded to update at this time (in minutes)
  };

  create() {
    autoUpdater.logger = this.logger;
    autoUpdater.autoDownload = false; // ✅ Prevent automatic downloading
    autoUpdater.autoInstallOnAppQuit = true; // ✅ Install updates when app quits

    console.log("App Version:", app.getVersion());
    console.log("Electron Version:", process.versions.electron);

    const options = _.pick(this.checkConfig, ["provider", "owner", "repo"]) as PublishConfiguration;
    autoUpdater.setFeedURL(options);

    this.installUpdateChecker();

    autoUpdater.on('update-available', (info) => {
      this.logger.info('Update available:', info);
      this.promptForDownload();
    });

    autoUpdater.on('update-downloaded', (info) => {
      this.logger.info('Update downloaded:', info);
      // this.promptForInstallation();
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
          const updateCheckResult = await autoUpdater.checkForUpdates();
          if(updateCheckResult) {
            await this.promptForInstallation(updateCheckResult.updateInfo);
          }
          this.logger.info('Update check result:', updateCheckResult);
        } catch (error) {
          this.logger.error('Error checking for updates:', error);
        }
        if (this.checkConfig.checkInterval > 1000) {
          repeatedly(this.checkConfig.checkInterval); // ✅ Schedule the next check
        }
      }, next);
    };

    repeatedly(0); // ✅ First update check runs immediately
  }

  async promptForDownload() {
    const response = await dialog.showMessageBox({
      type: 'info',
      title: 'Update Available',
      message: 'A new update is available. Do you want to download it now?',
      buttons: ['Yes', 'Later']
    });

    if (response.response === 0) {
      this.downloadUpdate();
    }
  }

  async downloadUpdate() {
    try {
      this.logger.info('Downloading update...');
      await autoUpdater.downloadUpdate();
    } catch (error) {
      this.logger.error('Error downloading update:', error);
    }
  }

  async promptForInstallation(updateInfo: UpdateInfo) {
    const response = await dialog.showMessageBox({
      type: 'info',
      title: `Update Ready version: ${updateInfo.version}`,
      message: 'A new Version is available. Do you want to download and install it now?',
      buttons: ['Yes', 'Later']
    });

    if (response.response === 0) {
      await autoUpdater.downloadUpdate()
      autoUpdater.quitAndInstall();
    } else {
      this.checkConfig.checkInterval = 10000;
    }
  }
}

export function initializeAutoUpdater() {
  new AutoUpdater().create();
}
