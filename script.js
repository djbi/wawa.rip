// Mouse trail effect
const canvas = document.getElementById('trailCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let mouse = { x: 0, y: 0 };

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2; // Random size between 2 and 7
        this.speedX = Math.random() * 2 - 1; // Random horizontal speed
        this.speedY = Math.random() * 2 - 1; // Random vertical speed
        this.life = 0.8; // Duration in seconds
        this.alpha = 1; // Opacity
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 1 / 60; // Decrease life based on frame rate (approx 60fps)
        this.alpha = this.life / 0.8; // Fade out
    }

    draw() {
        ctx.fillStyle = `rgba(255, 105, 180, ${this.alpha})`; // Pink laser color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
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
    // Update custom cursor position
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.left = e.x + 'px';
        cursor.style.top = e.y + 'px';
    }
});

// Touch events for mobile
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

// Create custom cursor
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

animate();
