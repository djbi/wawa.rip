// Initialize splash screen elements and counter
const splashScreen = document.getElementById('splashScreen');
const visitCounter = document.getElementById('visitCounter');
const mainContainer = document.getElementById('mainContainer');

// Counter starting at 86
let visitCount = localStorage.getItem('visitCount') ? parseInt(localStorage.getItem('visitCount')) : 86;
localStorage.setItem('visitCount', visitCount);

// Rainbow colors for counter digits
const rainbowColors = ['#ff0000', '#ff8000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#8000ff'];

// Function to update counter display with rainbow colors and spaces
function updateCounter() {
    const digits = visitCount.toString().split('');
    visitCounter.innerHTML = '';
    digits.forEach((digit, index) => {
        const span = document.createElement('span');
        span.textContent = digit;
        // Ensure no two digits have the same color
        let colorIndex = (index + Math.floor(Date.now() / 100)) % rainbowColors.length;
        let nextColorIndex = (colorIndex + 1) % rainbowColors.length;
        while (nextColorIndex === colorIndex) {
            nextColorIndex = (nextColorIndex + 1) % rainbowColors.length;
        }
        span.style.color = rainbowColors[colorIndex];
        visitCounter.appendChild(span);
    });
}

// Animate counter colors
setInterval(updateCounter, 100); // Update every 0.1 seconds for fast color change
updateCounter(); // Initial display

// Ensure click to enter works
function enterMainPage() {
    isSplashScreen = false;
    splashScreen.style.display = 'none';
    mainContainer.style.display = 'block'; // Ensure main page is shown
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    sendVisitData();
}

splashScreen.addEventListener('click', enterMainPage);
splashScreen.addEventListener('touchend', enterMainPage);
}

splashScreen.addEventListener('click', enterMainPage);
splashScreen.addEventListener('touchend', enterMainPage);
