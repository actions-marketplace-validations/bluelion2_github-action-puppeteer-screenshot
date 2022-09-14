const core = require('@actions/core');
const puppeteer = require('puppeteer');
const { WebClient } = require('@slack/web-api');
const fs = require('fs');

try {
  (async () => {
    const target = core.getInput('target-file') || '/index.html';
    const slack_token =
      core.getInput('slack-token') ||
      'xoxp-366190432502-725008683671-4078730998738-b342812f3b9f3fb528a128151b0ebd9a';
    const channels = core.getInput('slack-channels') || 'DM948GFS4';
    const title = core.getInput('img-name') || 'test';

    if (target && slack_token && channels) {
      const web = new WebClient(slack_token);
      const executablePath = puppeteer.executablePath();
      const browser = await puppeteer.launch({
        headless: true,
        executablePath,
      });
      const page = await browser.newPage();
      const savePath = `${title}.jpeg`;

      console.log('browser', browser);

      // await page.goto(`file://${process.cwd()}/index.html`);
      // await page.waitForTimeout(1000);
      // await page.screenshot({
      //   fullPage: true,
      //   path: savePath,
      // });

      // try {
      //   await web.files.upload({
      //     channels,
      //     title,
      //     file: fs.createReadStream(savePath),
      //   });
      // } catch (error) {
      //   console.log('error', error);
      //   core.setFailed(error.message);
      // } finally {
      //   await browser.close();
      // }
    }
  })();
} catch (error) {
  console.log('error', error);
  core.setFailed(error.message);
}
