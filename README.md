# github-action-puppeteer-screenshot

puppeteer를 통해 파일을 캡쳐한 뒤 slack으로 보내는 액션입니다.

- [puppeteer-screenshot-action](https://github.com/lannonbr/puppeteer-screenshot-action) 참고

---

## Option

|      Option      | Require | Description               |
| :--------------: | :-----: | :------------------------ |
| target-file-path |  true   | 캡쳐할 파일 경로          |
|   slack-token    |  true   | slack oauth token         |
|  slack-channels  |  true   | slack channel id          |
|     img-name     |  false  | img 이름 : Default - test |
|     img-type     |  false  | img 타입 : Default - jpeg |

---

## Target File path

- 현재 위치에서 접근하는 파일경로명을 넣어 주어야 합니다.

---

## Slack Token

- Slack Token에는 `file.write` 할 수 있는 권한이 필요함.
  - [참고: Slack - Files.upload](https://api.slack.com/methods/files.upload)

---

## Slack Channels

- `slack-channels` 에는 접근 가능한 아이디를 넣어주어야 함.
