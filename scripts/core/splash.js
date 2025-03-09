// Splash screen logic with click to enter
let isSplashScreen = true;
window.visitCount = localStorage.getItem('visitCount') ? parseInt(localStorage.getItem('visitCount')) : 86;

document.addEventListener('DOMContentLoaded', () => {
    console.log('splash.js: Loaded at', new Date().toISOString());

    // Get DOM elements
    const splashScreen = document.getElementById('splashScreen');
    const visitCounter = document.getElementById('visitCounter');
    const mainContainer = document.getElementById('mainContainer');

    // Validate elements
    if (!splashScreen || !visitCounter || !mainContainer) {
        console.error('splash.js: Required elements not found');
        return;
    }

    // Rainbow colors for counter
    const rainbowColors = ['#ff0000', '#ff8000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#8000ff'];

    // Update counter with rainbow effect
    function updateCounter() {
        const digits = window.visitCount.toString().split('');
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
        console.log('splash.js: Entering main page at', new Date().toISOString());
        isSplashScreen = false;
        splashScreen.style.display = 'none';
        mainContainer.style.display = 'block';
        window.visitCount++;
        localStorage.setItem('visitCount', window.visitCount);
        if (typeof window.sendVisitData === 'function') {
            window.sendVisitData();
        }
        if (typeof window.loadLogos === 'function') {
            console.log('splash.js: Calling loadLogos');
            window.loadLogos();
        } else {
            console.error('splash.js: loadLogos function not found');
        }
    }

    // Add click and touch events
    splashScreen.addEventListener('click', enterMainPage);
    splashScreen.addEventListener('touchstart', enterMainPage);

    // Auto-transition after 5 seconds
    setTimeout(() => {
        if (isSplashScreen && splashScreen.style.display !== 'none') {
            console.log('splash.js: Auto-transitioning after 5 seconds');
            enterMainPage(new Event('auto'));
        }
    }, 5000);
});
