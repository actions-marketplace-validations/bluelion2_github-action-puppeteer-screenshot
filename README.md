# github-action-puppeteer-screenshot

Puppeteer를 통해 스크린샷 찍어, slack으로 보내는 actions 입니다.

---

## Option

|     Option     | Require | Description                                    |
| :------------: | :-----: | :--------------------------------------------- |
|  target-file   |  true   | Puppeteer로 스캔할 파일 경로                   |
|  slack-token   |  true   | slack api token - file upload 권한이 있어야 함 |
| slack-channels |  true   | 공유될 Slack Channel id                        |
|    img-name    |  false  | 결과물 이름 : Default - test                   |
