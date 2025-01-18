class VideoRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private ws: WebSocket | null = null;

  async start() {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30 } },
        audio: false,
      });

      this.ws = new WebSocket("ws://localhost:8080");

      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp9",
      });

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0 && this.ws?.readyState === WebSocket.OPEN) {
          this.ws.send(event.data);
        }
      };

      this.ws.onopen = () => {
        this.ws?.send("START");
        this.mediaRecorder?.start(1000); // Send chunks every second
      };

      stream.getVideoTracks()[0].onended = () => this.stop();
    } catch (err) {
      console.error("Recording failed:", err);
    }
  }

  stop() {
    if (this.mediaRecorder?.state === "recording") {
      this.mediaRecorder.stop();
    }
    this.ws?.send("END");
    this.ws?.close();
  }
}

const recorder = new VideoRecorder();
recorder.start();

// Cleanup on page unload
window.addEventListener("unload", () => {
  recorder.stop();
});
