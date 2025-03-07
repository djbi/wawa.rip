const splashScreen = document.getElementById('splashScreen');
const visitCounter = document.getElementById('visitCounter');
const mainContainer = document.getElementById('mainContainer');

let visitCount = localStorage.getItem('visitCount') ? parseInt(localStorage.getItem('visitCount')) : 86;
localStorage.setItem('visitCount', visitCount);

const rainbowColors = ['#ff0000', '#ff8000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#8000ff'];

function updateCounter() {
    const digits = visitCount.toString().split('');
    visitCounter.innerHTML = '';
    digits.forEach((digit, index) => {
        const span = document.createElement('span');
        span.textContent = digit;
        let colorIndex = (index + Math.floor(Date.now() / 100)) % rainbowColors.length;
        let nextColorIndex = (colorIndex + 1) % rainbowColors.length;
        while (nextColorIndex === colorIndex) nextColorIndex = (nextColorIndex + 1) % rainbowColors.length;
        span.style.color = rainbowColors[colorIndex];
        visitCounter.appendChild(span);
    });
}

setInterval(updateCounter, 100);
updateCounter();

function enterMainPage() {
    isSplashScreen = false;
    splashScreen.style.display = 'none';
    mainContainer.style.display = 'block';
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    sendVisitData();
}

splashScreen.addEventListener('click', enterMainPage);
splashScreen.addEventListener('touchend', enterMainPage);
}

splashScreen.addEventListener('click', enterMainPage);
splashScreen.addEventListener('touchend', enterMainPage);
