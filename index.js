const core = require('@actions/core');
const puppeteer = require('puppeteer');
const { WebClient } = require('@slack/web-api');
const fs = require('fs');

try {
  (async () => {
    const target = core.getInput('target-file') || '/index.html';
    // SLACK
    const slack_token =
      core.getInput('slack-token') ||
      'xoxp-366190432502-725008683671-4080987952628-1638edc6608fd9ed0dfeeced2f0c56ea';
    const channels = core.getInput('slack-channels') || 'DM948GFS4';
    const title = core.getInput('img-name') || 'test';
    const filePath = `file://${process.cwd()}${target}`;
    const executablePath = puppeteer.executablePath();
    console.log('executablePath', executablePath);

    if (target && slack_token && channels) {
      const web = new WebClient(slack_token);
      const browser = await puppeteer.launch({
        headless: true,
        executablePath,
      });

      const page = await browser.newPage();
      const savePath = `${title}.jpeg`;
      await page.goto(filePath, { waitUntil: 'load' });
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
        console.log('slack error', error);
        core.setFailed(error.message);
      } finally {
        await browser.close();
      }
    }
  })();
} catch (error) {
  console.log('error', error);
  core.setFailed(error.message);
}
