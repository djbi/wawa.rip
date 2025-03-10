// Game state
let cookies = 0;
let clickMultiplier = 1;

// DOM elements
const cookieCounter = document.getElementById('cookie-counter');
const cookie = document.getElementById('cookie');
const upgradeClickBtn = document.getElementById('upgrade-click');

// Click event for cookie
cookie.addEventListener('click', () => {
    cookies += clickMultiplier;
    updateCounter();
});

// Upgrade click event
upgradeClickBtn.addEventListener('click', () => {
    if (cookies >= 10) {
        cookies -= 10;
        clickMultiplier += 1;
        updateCounter();
    } else {
        alert('Not enough cookies!');
    }
});

// Update display
function updateCounter() {
    cookieCounter.textContent = Math.floor(cookies);
}

// Initial display
updateCounter();
