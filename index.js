const core = require('@actions/core');
const fs = require('fs');
const axios = require('axios');

try {
  (async () => {
    const target = core.getInput('target-file-path');
    const slack_token =
      core.getInput('slack-token') ||
      'xoxp-366190432502-725008683671-4114705957909-a870d1e79904a9ea498639e2bcd9b9e2';

    const channelId = core.getInput('slack-channels') || 'DM948GFS4';
    const sendUrl =
      core.getInput('send-url') ||
      'https://automation-mathflat.vercel.app/api/cypress/postReport';
    const fileType = core.getInput('file-type') || 'html';
    const imgName = core.getInput('img-name') || 'test';
    const imgType = core.getInput('img-type') || 'jpeg';

    if (!slack_token || !channelId || !target) {
      core.setFailed('필수값이 빠졌습니다. 확인해주세요.');
      return;
    }

    const encodedData = `data:${type};base64,${fs.readFileSync(target, {
      encoding: 'base64',
    })}`;

    try {
      axios.post(sendUrl, {
        channels: channelId,
        encodedData,
        fileType,
        imgName,
        imgType,
      });
    } catch (error) {
      console.log('error', error);
      core.setFailed(error.message);
    }
  })();
} catch (error) {
  core.setFailed(error.message);
}
