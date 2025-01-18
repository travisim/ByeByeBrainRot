import './styles.css';

function createBlocker() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    
    const message = document.createElement('div');
    message.className = 'message';
    message.textContent = 'This content is currently blocked';
    
    const button = document.createElement('button');
    button.className = 'button';
    button.textContent = 'Temporarily Allow (5 seconds)';
    button.addEventListener('click', () => {
      overlay.style.display = 'none';
      setTimeout(() => {
        overlay.style.display = 'flex';
      }, 5 * 1000); // 5 seconds
    });
    
    overlay.appendChild(message);
    overlay.appendChild(button);
    document.body.appendChild(overlay);
}
  
// Wait for the page to load
// This blocks every website
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createBlocker);
} else {
    createBlocker();
}