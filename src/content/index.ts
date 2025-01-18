import './styles.css';

const blockedUrls = [
    'youtube.com',
    'facebook.com',
    'twitter.com'
];

const timeout = 5; // 5 seconds

function createBlocker() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    
    const message = document.createElement('div');
    message.className = 'message';
    message.textContent = '🚨🚨Detected Brainrot!🚨🚨 You have been blocked from this site.';
    
    const button = document.createElement('button');
    button.className = 'button';
    button.textContent = `I want brainrot for ${timeout} seconds!`;
    button.addEventListener('click', () => {
      overlay.style.display = 'none';
      setTimeout(() => {
        overlay.style.display = 'flex';
      }, timeout * 1000); // 5 seconds
    });
    
    overlay.appendChild(message);
    overlay.appendChild(button);
    document.body.appendChild(overlay);
}

function checkUrlAndBlock() {
    const currentUrl = window.location.href;
    if (blockedUrls.some(url => currentUrl.includes(url))) {
        createBlocker();
    }
}

// Wait for the page to load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkUrlAndBlock);
} else {
    checkUrlAndBlock();
}