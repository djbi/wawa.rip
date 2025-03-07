// Main script to manage page interactions
const canvas = document.getElementById('trailCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = []; // Removed trail since cursor is now custom
let mouse = { x: 0, y: 0 };
let squares = [];
let isSplashScreen = true;

// Initialize animation (currently empty since trail is removed)
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (isSplashScreen) {
        if (squares.length < 20) squares.push(new Square(canvas));
        squares.forEach((square, index) => {
            square.update();
            square.draw(ctx);
            if (square.alpha <= 0) squares.splice(index, 1);
        });
    }
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.left = e.x + 'px';
        cursor.style.top = e.y + 'px';
    }
});

window.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    mouse.x = touch.clientX;
    mouse.y = touch.clientY;
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.left = touch.clientX + 'px';
        cursor.style.top = touch.clientY + 'px';
    }
});

// Ensure splash screen is clickable
function enterMainPage() {
    isSplashScreen = false;
    splashScreen.style.display = 'none';
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    sendVisitData();
}

splashScreen.addEventListener('click', enterMainPage);
splashScreen.addEventListener('touchend', enterMainPage);

// Create custom cursor
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

// Moving title effect with only two "meow"s
const titles = ["meow meow", "meow", ""];
let titleIndex = 0;
setInterval(() => {
    document.title = titles[titleIndex];
    titleIndex = (titleIndex + 1) % titles.length;
}, 300);

animate();
