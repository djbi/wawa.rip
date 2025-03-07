// Mouse trail effect
const canvas = document.getElementById('trailCanvas');
const ctx = canvas.getContext('2d');
const splashScreen = document.getElementById('splashScreen');
const mainContainer = document.getElementById('mainContainer');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let mouse = { x: 0, y: 0 };
let squares = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 5; // Solid size
        this.life = 0.8; // Duration in seconds
        this.alpha = 1; // Opacity
    }

    update() {
        this.life -= 1 / 60; // Decrease life based on frame rate (approx 60fps)
        this.alpha = this.life / 0.8; // Fade out
    }

    draw() {
        ctx.fillStyle = `rgba(255, 105, 180, ${this.alpha})`; // Bubblegum pink
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff69b4'; // Glowing effect
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size); // Solid rectangle
        ctx.shadowBlur = 0; // Reset shadow
    }
}

class Square {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 50 + 20;
        this.rotation = 0;
        this.speed = Math.random() * 0.1 + 0.05;
        this.alpha = 1;
    }

    update() {
        this.rotation += this.speed;
        this.alpha = Math.sin(Date.now() * 0.01) * 0.5 + 0.5; // Blink effect
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`; // White with blinking
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (splashScreen.style.display !== 'none') {
        // Splash screen animation
        if (squares.length < 20) squares.push(new Square());
        squares.forEach((square, index) => {
            square.update();
            square.draw();
            if (square.alpha <= 0) squares.splice(index, 1);
        });
    } else {
        // Main page mouse trail
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
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
    for (let i = 0; i < 5; i++) {
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
    for (let i = 0; i < 5; i++) {
        particles.push(new Particle(touch.clientX, touch.clientY));
    }
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.left = touch.clientX + 'px';
        cursor.style.top = touch.clientY + 'px';
    }
});

window.addEventListener('click', () => {
    if (splashScreen.style.display !== 'none') {
        splashScreen.style.display = 'none';
        mainContainer.style.display = 'block';
    }
});

// Create custom cursor
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

animate();
