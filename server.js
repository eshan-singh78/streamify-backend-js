const express = require('express');
const bodyParser = require('body-parser');
const NodeMediaServer = require('node-media-server');
const { exec } = require('child_process');

const app = express();
const port = 5001;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Streamify Backend is running!');
});

app.post('/start-stream', (req, res) => {
  const { streamKey } = req.body;

  if (!streamKey) {
    return res.status(400).json({ error: 'Stream key is required' });
  }

  console.log(`Starting stream with key: ${streamKey}`);
  sendToYouTube(streamKey);

  res.status(200).json({ message: 'Stream started', streamKey });
});

function sendToYouTube(streamKey) {
  const youtubeRtmpUrl = `rtmp://a.rtmp.youtube.com/live2/${streamKey}`;
  const videoFilePath = './sample-02.mp4';

  const command = `ffmpeg -re -i ${videoFilePath} -f flv ${youtubeRtmpUrl}`;

  console.log('Running FFmpeg command:', command);

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error('Error streaming to YouTube:', err);
      return;
    }
    if (stderr) {
      console.error('FFmpeg STDERR:', stderr);
    }
    console.log('FFmpeg STDOUT:', stdout);
  });
}

const nms = new NodeMediaServer({
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 30,
  },
  http: {
    port: 8000,
    mediaroot: './media',
    allow_origin: '*',
  },
});

nms.run();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
