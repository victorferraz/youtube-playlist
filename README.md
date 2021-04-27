#### Get youtube playlist without headless browser or youtube api

<img width="200" src="https://raw.githubusercontent.com/victorferraz/youtube-playlist/main/media/img/youtube.png">

### How to install

```
$ npm install yt-channel-playlist
```

### How to use

```js
import YoutubePlaylist from `yt-channel-playlist`;

async () => {
 await YoutubePlaylist('programmingwithmosh');

  [{
    thumbnails: [
      {
        url: 'https://i.ytimg.com/vi/lhFvMsy6VX8/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAyF1RJ58fsRsIf3r1jJX18zkVX_Q',
        width: 480,
        height: 270
      }
    ],
    title: 'DevOps Bootcamp',
    url: 'https://www.youtube.com/playlist?list=PLy7NrYWoggjwwEpZO8sscD9X6EH39njz6'
  }]

}
```

### How to run tests

```js
npm run test
```
