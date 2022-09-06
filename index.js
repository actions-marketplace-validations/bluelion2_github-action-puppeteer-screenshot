const core = require('@actions/core');
const puppeteer = require('puppeteer');

try {
  (async () => {
    const target = core.getInput('target-file');
    const slack_token = core.getInput('slack-token');
    const channels = core.getInput('slack-channels');
    const imgName = core.getInput('img-name') || 'test';
    const imgType = core.getInput('img-type') || 'jpeg';

    if (target && slack_token && channels) {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const path = `${imgName}.${imgType}`;

      await page.goto(`file://${process.cwd()}/${target}`);
      await page.waitForTimeout(1000);
      await page.screenshot({
        fullPage: true,
        path,
      });
      const Axios = axios.create({
        baseURL: 'https://slack.com/api',
        headers: {
          Authorization: `Bearer ${slack_token}`,
        },
      });

      await Axios.post('/files.upload', {
        channels,
        file: fs.createReadStream(path),
      });

      await browser.close();
    }
  })();
} catch (error) {
  core.setFailed(error.message);
}
