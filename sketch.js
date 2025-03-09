// Fetch and display IP with changing colors
fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        const ip = data.ip;
        displayIPWithChangingColors(ip);
    })
    .catch(error => {
        console.error('Error fetching IP:', error);
        document.getElementById('ip-display').innerText = 'Could not fetch IP';
    });

function displayIPWithChangingColors(ip) {
    const display = document.getElementById('ip-display');
    const colors = [
        '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF',
        '#00FFFF', '#FFA500', '#800080', '#008000', '#FF4500',
        '#00CED1', '#FF69B4'
    ];

    const spans = [];
    ip.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerText = char;
        display.appendChild(span);
        spans.push(span);
    });

    function updateColors() {
        let usedColors = new Set();
        spans.forEach(span => {
            let newColor;
            do {
                newColor = colors[Math.floor(Math.random() * colors.length)];
            } while (usedColors.has(newColor));
            usedColors.add(newColor);
            span.style.color = newColor;
        });
    }

    updateColors();
    setInterval(updateColors, 1000);
}

// Move custom cursor
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.pageX - 10}px`;
    cursor.style.top = `${e.pageY - 10}px`;
});

// p5.js sketch for trail
let trail = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);
    textSize(20);
}

function draw() {
    clear(); // Clear canvas for smooth trails
    trail.forEach((t, index) => {
        let col = color(t.col);
        col.setAlpha(t.alpha);
        fill(col);
        noStroke();
        push(); // Save transformation state
        translate(t.x, t.y);
        rotate(-45 * (PI / 180)); // Rotate -45 degrees
        text('♡', 0, 0);
        pop(); // Restore transformation state
        t.alpha -= 255 / (1.2 * 60); // Fade over 1.2s (assuming 60 FPS)
        if (t.alpha <= 0) trail.splice(index, 1); // Remove faded trails
    });
}

function mouseMoved() {
    const cursorColor = window.getComputedStyle(cursor).color;
    trail.push({
        x: mouseX,
        y: mouseY,
        col: cursorColor,
        alpha: 255
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
