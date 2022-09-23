const core = require('@actions/core');
const fs = require('fs');
const axios = require('axios');

try {
  (async () => {
    const target = core.getInput('target-file-path');
    const sendUrl = core.getInput('send-url');
    const fileType = core.getInput('file-type') || 'html';

    if (!sendUrl || !target) {
      core.setFailed('필수값이 빠졌습니다. 확인해주세요.');
      return;
    }

    const path = `${process.cwd()}${target}`;
    console.log('path', path);

    const encodedData = `data:${fileType};base64,${fs.readFileSync(path, {
      encoding: 'base64',
    })}`;

    try {
      axios.post(sendUrl, {
        encodedData,
        fileType,
      });
    } catch (error) {
      console.log('error', error);
      core.setFailed(error.message);
    }
  })();
} catch (error) {
  core.setFailed(error.message);
}
