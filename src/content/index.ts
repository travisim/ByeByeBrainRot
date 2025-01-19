import html2canvas from 'html2canvas';
import { checkBrainrotModel } from './model';
import './styles.css';
import "./styles2.scss";

import "./styles.css";
import html2canvas from "html2canvas";
import { checkBrainrotModel } from "./model";
import "./styles2.css";
import { create } from "domain";



const blockedUrls = ["youtube.com", "facebook.com", "twitter.com"];

const timeout = 5; // 5 seconds

function createGameContainer(overlay) {
  const wrapper = document.createElement("div");
  wrapper.className = "wrapper";

  const game = document.createElement("div");
  game.id = "game";
  game.className = "game";

  const board = document.createElement("div");
  board.className = "board";

  const button = document.createElement("button");
  button.id = "unclickable";
  button.className = "unclickable";
  button.textContent = "Bypass Screentime";

  // Make button move randomly on hover
  button.addEventListener("mouseover", (e) => {
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = "absolute";
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
  });

    setTimeout(() => {
        button.removeEventListener("mouseover", (e) => { });
    }, 10000);


  button.addEventListener("click", () => {
    overlay.style.display = "none";
  });

  board.appendChild(button);
  game.appendChild(board);
  wrapper.appendChild(game);

  const getRandomIntInRange = (min, max) =>
    Math.floor(Math.random() * (max - min) + min);

  const getRandomOffset = () => {
    const x = getRandomIntInRange(0, 80);
    const y = getRandomIntInRange(0, 80);
    return { x, y };
  };

  const updateOffset = () => {
    const { x, y } = getRandomOffset();
    button.style.left = `${x}%`;
    button.style.top = `${y}%`;
  };

  const handleClick = () => {
    game.classList.add("game--victory");
    button.textContent = "Bypass Screentime";
    button.classList.add("unclickable--active");
  };

  const resetGame = () => {
    button.textContent = "Temporary unlock for 5 minutes";
    button.classList.remove("unclickable--active");
    game.classList.remove("game--victory");
    const play = setInterval(updateOffset, getRandomIntInRange(500, 1500));
    return play;
  };

  resetGame();
  button.onclick = handleClick;


    setTimeout(() => {
        overlay.style.display = "block";
        createBlocker();
    }, timeout * 60 * 1000); // 5 minutes
  return wrapper;

}

function brainrotBlocker() {
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const message = document.createElement("div");
  message.className = "message";

  message.textContent =
    "🚨🚨Detected Distractions!!🚨🚨 You have been blocked from this site.";


  const audioTracks =
    document.querySelectorAll<HTMLMediaElement>("audio, video");
  audioTracks.forEach((track) => {
    track.pause();
  });

  overlay.appendChild(message);
  document.body.appendChild(overlay);
}

function brainrotBlocker() {
    const overlay = document.createElement("div");
    overlay.className = "overlay";

    const message = document.createElement("div");
    message.className = "message";
    message.innerHTML =
        "🚨🚨Detected Brainrot!!🚨🚨<br> Please repeat 'I will not watch brainrot' three times to continue.";

    const audioTracks = document.querySelectorAll<HTMLMediaElement>("audio, video");
    audioTracks.forEach(track => {
        track.pause();
    });
    
    overlay.appendChild(message);
    document.body.appendChild(overlay);
    var repeatMessages: HTMLDivElement[] = [];
    for(let i = 0; i < 3; i++) {
        const repeatMessage = document.createElement("div");
        repeatMessage.className = "repeat-message";
        repeatMessage.textContent = "I will not watch brainrot";
        repeatMessage.style.fontSize = "30px";
        repeatMessage.style.color = "grey";
        repeatMessage.style.opacity = "0.5";

        repeatMessage.addEventListener("mouseover", () => {
            repeatMessage.style.opacity = "1";
            repeatMessage.style.color = "black";
        });

        repeatMessage.addEventListener("mouseout", () => {
            repeatMessage.style.opacity = "0.5";
            repeatMessage.style.color = "grey";
        });

        overlay.appendChild(repeatMessage);
        repeatMessages.push(repeatMessage);
    }

}

function checkUrlAndBlock() {
    const currentUrl = window.location.href;
    if (blockedUrls.some(url => currentUrl.includes(url))) {
        // brainrotBlocker();
        setInterval(() => {
            html2canvas(document.body).then(canvas => {
                const dataUrl = canvas.toDataURL('image/png');
                console.log("Checking for brainrot...");
                // save the image to a file
                checkBrainrotModel(dataUrl)
                    .then(data => {
                        console.log(data);
                        if (data["prediction"] == "Brainrot" && data["confidence"] > 0.5) {
                          brainrotBlocker();
                        }
                    })
                    .catch(error => console.error(error));;
            });
        }, timeout * 5 * 1000); // Take a screenshot every second

    }
}

// Wait for the page to load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", checkUrlAndBlock);
} else {
  checkUrlAndBlock();
}

async function recordAudio(): Promise<void> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100,
      },
    });

    const options = { mimeType: "audio/webm" };
    const mediaRecorder = new MediaRecorder(stream, options);
    const audioChunks: Blob[] = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
      const audioUrl = URL.createObjectURL(audioBlob);
      const link = document.createElement("a");
      link.href = audioUrl;
      link.download = `recording-${Date.now()}.webm`;
      link.click();

      // Cleanup
      URL.revokeObjectURL(audioUrl);
      stream.getTracks().forEach((track) => track.stop());
    };

    // Start recording and trigger dataavailable every 100ms
    mediaRecorder.start(100);
    console.log("Recording started...");

    return new Promise((resolve) => {
      setTimeout(() => {
        if (mediaRecorder.state === "recording") {
          mediaRecorder.stop();
          console.log("Recording stopped...");
        }
        resolve();
      }, 5000);
    });
  } catch (error) {
    console.error("Error recording audio:", error);
    throw error;
  }
}

recordAudio();
