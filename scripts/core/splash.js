// Splash screen logic
let isSplashScreen = true;
window.visitCount = localStorage.getItem('visitCount') ? parseInt(localStorage.getItem('visitCount')) : 86;

document.addEventListener('DOMContentLoaded', () => {
    console.log('splash.js loaded at', new Date().toISOString());

    const splashScreen = document.getElementById('splashScreen');
    const visitCounter = document.getElementById('visitCounter');
    const mainContainer = document.getElementById('mainContainer');

    if (!splashScreen || !visitCounter || !mainContainer) {
        console.error('Splash screen elements not found');
        return;
    }

    const rainbowColors = ['#ff0000', '#ff8000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#8000ff'];

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

    function enterMainPage(e) {
        e.preventDefault();
        console.log('Entering main page at', new Date().toISOString());
        isSplashScreen = false;
        splashScreen.style.display = 'none';
        mainContainer.style.display = 'block';
        window.visitCount++;
        localStorage.setItem('visitCount', window.visitCount);
        if (typeof window.sendVisitData === 'function') {
            window.sendVisitData();
        }
        if (typeof window.loadLogos === 'function') {
            console.log('Calling loadLogos');
            window.loadLogos();
        } else {
            console.error('loadLogos function not found');
        }
    }

    splashScreen.addEventListener('click', enterMainPage);
    splashScreen.addEventListener('touchstart', enterMainPage);

    setTimeout(() => {
        if (isSplashScreen && splashScreen.style.display !== 'none') {
            console.log('Auto-transitioning after 5 seconds');
            enterMainPage(new Event('auto'));
        }
    }, 5000);
});
