import './styles.css';
import html2canvas from 'html2canvas';
import { checkBrainrotModel } from './model';
import "./styles2.css";


const blockedUrls = [
    'youtube.com',
    'facebook.com',
    'twitter.com'
];

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
    button.textContent = "Bypass Screentime";
    button.classList.remove("unclickable--active");
    game.classList.remove("game--victory");
    const play = setInterval(updateOffset, getRandomIntInRange(500, 1500));
    return play
  };

  resetGame();
  button.onclick = handleClick;




  return wrapper;


}

function createBlocker() {
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const message = document.createElement("div");
  message.className = "message";
  message.textContent =
    "🚨🚨Detected Brainrot!🚨🚨 You have been blocked from this site.";

  const gameContainer = createGameContainer(overlay);

  overlay.appendChild(message);
    overlay.appendChild(gameContainer);
    
  document.body.appendChild(overlay);
}

function checkUrlAndBlock() {
    const currentUrl = window.location.href;
    if (blockedUrls.some(url => currentUrl.includes(url))) {
        setInterval(() => {
            html2canvas(document.body).then(canvas => {
                const dataUrl = canvas.toDataURL('image/png');
                console.log(dataUrl);
                console.log("Checking for brainrot...");
                // save the image to a file
                // checkBrainrotModel(dataUrl)
                //     .then(data => {
                //         if (data > 0.5) {
                //             createBlocker();
                //         }
                //     })
                //     .catch(error => console.error(error));;
            });
        }, timeout * 1000); // Take a screenshot every second
    }
}

// Wait for the page to load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkUrlAndBlock);
} else {
    checkUrlAndBlock();
}