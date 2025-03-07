// Initialize splash screen elements and counter
const splashScreen = document.getElementById('splashScreen');
const mainContainer = document.getElementById('mainContainer');
const visitCounter = document.getElementById('visitCounter');

// Counter starting at 86
let visitCount = localStorage.getItem('visitCount') ? parseInt(localStorage.getItem('visitCount')) : 86;
localStorage.setItem('visitCount', visitCount);

// Rainbow colors for counter digits
const rainbowColors = ['#ff0000', '#ff8000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#8000ff'];

// Function to update counter display with rainbow colors
function updateCounter() {
    const digits = visitCount.toString().split('');
    visitCounter.innerHTML = '';
    digits.forEach((digit, index) => {
        const span = document.createElement('span');
        span.textContent = digit;
        span.style.color = rainbowColors[(index + Date.now() / 100) % rainbowColors.length];
        // Ensure no two digits have the same color
        let nextColorIndex = (index + 1) % rainbowColors.length;
        while (nextColorIndex === (index % rainbowColors.length)) {
            nextColorIndex = (nextColorIndex + 1) % rainbowColors.length;
        }
        visitCounter.appendChild(span);
    });
}

// Animate counter colors
setInterval(updateCounter, 100); // Update every 0.1 seconds for fast color change
updateCounter(); // Initial display
