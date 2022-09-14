const core = require('@actions/core');
const puppeteer = require('puppeteer');
const { WebClient } = require('@slack/web-api');
const fs = require('fs');

try {
  (async () => {
    const target = core.getInput('target-file') || '/index.html';
    const slack_token =
      core.getInput('slack-token') ||
      'xoxp-366190432502-725008683671-3544498211840-2f09bdabcd0982b97850e0b9e8873430';
    const channels = core.getInput('slack-channels') || 'DM948GFS4';
    const title = core.getInput('img-name') || 'test';
    const filePath = `file://${process.cwd()}${target}`;
    console.log('filePath', filePath);

    if (target && slack_token && channels) {
      const web = new WebClient(slack_token);

      const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disabled-setuid-sandbox'],
      });

      console.log('browser', browser);

      const page = await browser.newPage();
      const savePath = `${title}.jpeg`;
      await page.goto(filePath);
      await page.waitForTimeout(1000);
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
        console.log('error', error);
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
