### Streamify - MVP (Minimum Viable Product) To-Do Checklist

#### Frontend (React):
- [ ] Create user interface to input streaming key for YouTube.
- [ ] Implement WebRTC video capture for live streaming.
- [ ] Integrate WebRTC with RTMP for streaming from browser to backend.
- [ ] Implement basic streaming control: Start and Stop stream buttons.
- [ ] Display streaming status (active/inactive).

#### Backend (Express):
- [ ] Handle incoming WebRTC stream and convert it to RTMP.
- [ ] Support a single YouTube streaming key.
- [ ] Create API to accept streaming key and start stream.
- [ ] Integrate with RTMP server (e.g., using `node-media-server` or `ffmpeg`).
- [ ] Send the RTMP stream to YouTube using the provided key and YouTube API.

#### YouTube Integration:
- [ ] Allow backend to take a custom stream key from the user.
- [ ] Enable stream video to YouTube via RTMP.

#### Features:
- [ ] Basic streaming functionality to YouTube.
- [ ] User interface to input stream key and control streaming.
- [ ] Basic error handling and feedback for users.

### About the Project (MVP)
Streamify is a live streaming platform that enables users to stream directly to YouTube using WebRTC and RTMP. The MVP version focuses on the core functionality, including:
- A simple React frontend to allow users to input their YouTube stream key.
- WebRTC integration for live video capture from the browser.
- A backend in Express to handle the stream conversion to RTMP and send it to YouTube via the YouTube API.
- Basic controls to start and stop streaming and display the stream status.
