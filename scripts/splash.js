// Global variable to track splash screen state
let isSplashScreen = true;

// Initialize splash screen on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('splash.js loaded');

    // Get DOM elements
    const splashScreen = document.getElementById('splashScreen');
    const visitCounter = document.getElementById('visitCounter');
    const mainContainer = document.getElementById('mainContainer');

    if (!splashScreen || !visitCounter || !mainContainer) {
        console.error('Splash screen elements not found');
        return;
    }

    // Initialize visit counter
    let visitCount = localStorage.getItem('visitCount') ? parseInt(localStorage.getItem('visitCount')) : 86;
    localStorage.setItem('visitCount', visitCount);

    // Rainbow colors for counter digits
    const rainbowColors = ['#ff0000', '#ff8000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#8000ff'];

    // Update counter display with rainbow colors
    function updateCounter() {
        const digits = visitCount.toString().split('');
        visitCounter.innerHTML = '';
        digits.forEach((digit, index) => {
            const span = document.createElement('span');
            span.textContent = digit;
            const colorIndex = (index + Math.floor(Date.now() / 100)) % rainbowColors.length;
            span.style.color = rainbowColors[colorIndex];
            visitCounter.appendChild(span);
        });
    }

    setInterval(updateCounter, 100);
    updateCounter();

    // Transition to main page
    function enterMainPage(e) {
        e.preventDefault();
        console.log('Entering main page');
        isSplashScreen = false;
        splashScreen.style.display = 'none';
        mainContainer.style.display = 'block';
        visitCount++;
        localStorage.setItem('visitCount', visitCount);
        if (typeof window.sendVisitData === 'function') {
            window.sendVisitData();
        }
        // Load logos after transition
        setTimeout(() => {
            if (typeof window.loadLogos === 'function') {
                window.loadLogos();
            }
        }, 100);
    }

    // Add click and touch events for splash screen
    splashScreen.addEventListener('click', enterMainPage);
    splashScreen.addEventListener('touchstart', enterMainPage);

    // Fallback: Auto-transition after 5 seconds
    setTimeout(() => {
        if (isSplashScreen && splashScreen.style.display !== 'none') {
            console.log('Auto-transitioning after 5 seconds');
            enterMainPage(new Event('auto'));
        }
    }, 5000);
});
