# Streamify - Backend (Javascript)

Streamify is a live streaming platform that allows users to broadcast video content to YouTube using an RTMP stream. Currently, the platform streams a predefined media file (`sample-02.mp4`) to YouTube. It accepts a stream key from the user, starts the stream, and broadcasts the video. Future updates will allow stopping the stream and handling short videos.

## Features

- [x] **Start Stream**: Accepts a YouTube stream key and starts broadcasting a sample video (`sample-02.mp4`) to YouTube.
- [ ] **Stop Stream**: Allows users to stop the current stream and cease broadcasting to YouTube.
- [ ] **Connect to Frontend**: Integration with a React frontend to provide users with an interface to input the stream key and control the stream.
- [ ] **Process WebRTC**: Future integration for processing WebRTC streams (currently, only RTMP is supported).

## Setup

1. Clone the repository and navigate to the project directory.
2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Run the server:
   ```bash
   node server.js
   ```

   The backend will be running on `http://localhost:5001`.

## Endpoints

### Start Stream

Starts streaming the video to YouTube using the provided stream key.

- **Endpoint**: `POST /start-stream`
- **Request Body**:
  ```json
  {
    "streamKey": "<youtubestreamkey>"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Stream started",
    "streamKey": "<youtubestreamkey>"
  }
  ```
- **Example Request**:
  ```bash
  curl --location 'http://localhost:5001/start-stream' \
  --header 'Content-Type: application/json' \
  --data '{
    "streamKey": "<youtubestreamkey>"
  }'
  ```

### Stop Stream (Coming Soon)

This API will stop the current stream and cease broadcasting to YouTube. 

- **Endpoint**: `POST /stop-stream`
- **Response**:
  ```json
  {
    "message": "Stream stopped"
  }
  ```

### Server

The backend is set up using **Express** and **Node Media Server** (NMS). It uses **FFmpeg** to handle video streaming.

## Handling Short Videos (Coming Soon)

The current version of Streamify streams a static media file (`sample-02.mp4`). In the next phase, we will reconfigure the system to support short videos by:

- Accepting a user-uploaded video file or a dynamically set video.
- Streaming the video in shorter segments or looping based on the video length.

## Running the Server

1. Ensure `ffmpeg` is installed and accessible from your terminal. If not, install it from [here](https://ffmpeg.org/download.html).
2. Start the server:
   ```bash
   node server.js
   ```

3. The server will be available at `http://localhost:5001`.

---
