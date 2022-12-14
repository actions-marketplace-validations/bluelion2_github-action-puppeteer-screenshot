const core = require('@actions/core');
const puppeteer = require('puppeteer-core');
const { WebClient } = require('@slack/web-api');
const fs = require('fs');
const os = require('os');
const path = require('path');

// https://github.com/lannonbr/puppeteer-screenshot-action
function getChromePath() {
  let browserPath;

  const type = os.type();
  switch (type) {
    case 'Windows_NT': {
      const programFiles =
        os.arch() === 'x64'
          ? process.env['PROGRAMFILES(X86)']
          : process.env.PROGRAMFILES;
      browserPath = path.join(
        programFiles,
        'Google/Chrome/Application/chrome.exe'
      );
      break;
    }
    case 'Darwin': {
      browserPath =
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
      break;
    }
    case 'Linux':
    default: {
      browserPath = '/usr/bin/google-chrome';
      break;
    }
  }

  if (browserPath && browserPath.length > 0) {
    return path.normalize(browserPath);
  }

  throw new TypeError(`Cannot run action. ${type} is not supported.`);
}

try {
  (async () => {
    const targetPath = core.getInput('target-file-path');
    const slack_token = core.getInput('slack-token');
    const channels = core.getInput('slack-channels');
    const title = core.getInput('img-name') || 'test';
    const fileType = core.getInput('img-type') || 'jpeg';

    if (targetPath && slack_token && channels) {
      const web = new WebClient(slack_token);
      const browser = await puppeteer.launch({
        executablePath: getChromePath(),
      });
      const page = await browser.newPage();
      const savePath = `${title}.${fileType}`;
      const openUrl = `${`file://${process.cwd()}`}${targetPath}`;

      await page.goto(openUrl);
      setTimeout(async () => {
        await page.screenshot({
          fullPage: true,
          path: savePath,
        });

        try {
          await web.files.upload({
            channels,
            title,
            file: fs.createReadStream(savePath),
          });
        } catch (error) {
          core.setFailed(`Slack Error! - ${error.message}`);
        } finally {
          await browser.close();
        }
      }, 1000);
    }
  })();
} catch (error) {
  core.setFailed(`Github Actions Error! - ${error.message}`);
}
