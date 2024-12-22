const express = require('express');
const bodyParser = require('body-parser');
const NodeMediaServer = require('node-media-server');
const { exec } = require('child_process');

const app = express();
const port = 5001;

app.use(bodyParser.json());

let ffmpegProcess = null;

app.get('/', (req, res) => {
  res.send('Streamify Backend is running!');
});

app.post('/start-stream', (req, res) => {
  const { streamKey } = req.body;

  if (!streamKey) {
    return res.status(400).json({ error: 'Stream key is required' });
  }

  console.log(`Starting stream with key: ${streamKey}`);
  startStreamingToYouTube(streamKey);

  res.status(200).json({ message: 'Stream started', streamKey });
});

app.post('/stop-stream', (req, res) => {
  if (!ffmpegProcess) {
    return res.status(400).json({ error: 'No active stream to stop' });
  }

  console.log('Stopping the stream...');
  ffmpegProcess.kill('SIGINT');
  ffmpegProcess = null;

  res.status(200).json({ message: 'Stream stopped' });
});

function startStreamingToYouTube(streamKey) {
  const youtubeRtmpUrl = `rtmp://a.rtmp.youtube.com/live2/${streamKey}`;
  const videoFilePath = './sample-02.mp4';

  const command = `ffmpeg -re -i ${videoFilePath} -f flv ${youtubeRtmpUrl}`;
  console.log('Running FFmpeg command:', command);

  ffmpegProcess = exec(command, (err, stdout, stderr) => {
    if (err) {
      if (err.killed) {
        console.log('FFmpeg process was killed intentionally. Stream stopped.');
      } else {
        console.error('Unexpected error with FFmpeg:', err);
      }
      ffmpegProcess = null;
      return;
    }

    if (stderr) {
      console.error('FFmpeg STDERR:', stderr);
    }
    console.log('FFmpeg STDOUT:', stdout);
  });

  ffmpegProcess.on('exit', (code, signal) => {
    if (signal === 'SIGINT' || signal === 'SIGKILL') {
      console.log('FFmpeg process stopped by user.');
    } else if (code !== 0) {
      console.error(`FFmpeg exited with error code: ${code}`);
    } else {
      console.log('FFmpeg process completed successfully.');
    }
    ffmpegProcess = null;
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
