// Declare isSplashScreen globally
let isSplashScreen = true;

document.addEventListener('DOMContentLoaded', () => {
    console.log('splash.js loaded');

    // Initialize splash screen elements and counter
    const splashScreen = document.getElementById('splashScreen');
    const visitCounter = document.getElementById('visitCounter');
    const mainContainer = document.getElementById('mainContainer');

    if (!splashScreen || !visitCounter || !mainContainer) {
        console.error('Splash screen elements not found:', { splashScreen, visitCounter, mainContainer });
        return;
    }

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
            let colorIndex = (index + Math.floor(Date.now() / 100)) % rainbowColors.length;
            span.style.color = rainbowColors[colorIndex];
            visitCounter.appendChild(span);
        });
    }

    // Animate counter colors
    setInterval(updateCounter, 100); // Update every 0.1 seconds for fast color change
    updateCounter(); // Initial display

    // Ensure click to enter works anywhere on the splash screen
    function enterMainPage(e) {
        e.preventDefault(); // Prevent default behaviors
        console.log('enterMainPage called');
        isSplashScreen = false;
        splashScreen.style.display = 'none';
        mainContainer.style.display = 'block'; // Ensure main page is shown
        visitCount++;
        localStorage.setItem('visitCount', visitCount);
        if (typeof sendVisitData === 'function') {
            sendVisitData();
        }
        // Delay logo loading to ensure main container is fully rendered
        setTimeout(() => {
            if (typeof window.loadLogos === 'function') {
                console.log('Loading logos after transition');
                window.loadLogos();
            }
        }, 100); // 100ms delay
    }

    // Attach event listeners to the entire splash screen
    splashScreen.addEventListener('click', enterMainPage);
    splashScreen.addEventListener('touchstart', enterMainPage); // Use touchstart for better mobile responsiveness

    // Fallback: Automatically transition after 5 seconds if no interaction
    setTimeout(() => {
        if (isSplashScreen && splashScreen.style.display !== 'none') {
            console.log('Fallback: Automatically transitioning after 5 seconds');
            enterMainPage(new Event('auto'));
        }
    }, 5000);
});
