# github-action-puppeteer-screenshot

puppeteer를 통해 파일을 캡쳐한 뒤 slack으로 보내는 액션입니다.

- [puppeteer-screenshot-action](https://github.com/lannonbr/puppeteer-screenshot-action) 참고

---

## Option

|      Option      | Require | Description               |
| :--------------: | :-----: | :------------------------ |
| target-file-path |  true   | 캡쳐할 파일 절대경로      |
|   slack-token    |  true   | slack oauth token         |
|  slack-channels  |  true   | slack channel id          |
|     img-name     |  false  | img 이름 : Default - test |
|     img-type     |  false  | img 타입 : Default - jpeg |

---
