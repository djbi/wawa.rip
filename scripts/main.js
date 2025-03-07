// Main script to manage page interactions
const canvas = document.getElementById('trailCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let mouse = { x: 0, y: 0 };
let squares = [];
let isSplashScreen = true;

// Initialize particles and squares
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (isSplashScreen) {
        if (squares.length < 20) squares.push(new Square(canvas));
        squares.forEach((square, index) => {
            square.update();
            square.draw(ctx);
            if (square.alpha <= 0) squares.splice(index, 1);
        });
        // Mouse effect on splash screen
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw(ctx);
            if (particles[i].life <= 0) particles.splice(i, 1);
        }
    } else {
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw(ctx);
            if (particles[i].life <= 0) particles.splice(i, 1);
        }
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
    for (let i = 0; i < 3; i++) {
        particles.push(new Particle(e.x, e.y));
    }
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
    for (let i = 0; i < 3; i++) {
        particles.push(new Particle(touch.clientX, touch.clientY));
    }
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
    mainContainer.style.display = 'block';
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

// Moving title effect
const titles = ["meow meow meow meow meow meow meow", "meow meow meow meow meow meow", "meow meow meow meow meow", "meow meow meow meow", "meow meow meow", "meow meow", "meow"];
let titleIndex = 0;
setInterval(() => {
    document.title = titles[titleIndex];
    titleIndex = (titleIndex + 1) % titles.length;
}, 300);

// Redirect on <3 click
document.querySelector('.heart-text').addEventListener('click', () => {
    window.location.href = 'https://discordapp.com/users/1265799421417754664';
});

animate();
