const canvas = document.getElementById('trailCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let mouse = { x: 0, y: 0 };
let squares = [];
let isSplashScreen = true;
let faithClickCount = 0;
const faithText = document.getElementById('faithText');
const cocaineText = document.getElementById('cocaineText');
const heartText = document.querySelector('.heart-text');
const noteInput = document.getElementById('noteInput');
const noteTextarea = document.getElementById('noteTextarea');
const sendNoteButton = document.getElementById('sendNote');

let lastTapHeart = 0;
let lastTapCocaine = 0;
const doubleTapDelay = 300;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (isSplashScreen) {
        if (squares.length < 20) squares.push(new Square(canvas));
        squares.forEach((square, index) => {
            square.update();
            square.draw(ctx);
            if (square.alpha <= 0) squares.splice(index, 1);
        });
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
    mouse.x = window.innerWidth / 2;
    mouse.y = window.innerHeight / 2;
    updateCursorPosition();
});

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0; i < 3; i++) particles.push(new Particle(e.x, e.y));
    updateCursorPosition();
});

window.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    mouse.x = touch.clientX;
    mouse.y = touch.clientY;
    for (let i = 0; i < 3; i++) particles.push(new Particle(touch.clientX, touch.clientY));
    updateCursorPosition();
});

function enterMainPage() {
    if (isSplashScreen) {
        isSplashScreen = false;
        splashScreen.style.display = 'none';
        mainContainer.style.display = 'block';
        visitCount++;
        localStorage.setItem('visitCount', visitCount);
        sendVisitData();
    }
}

splashScreen.addEventListener('click', enterMainPage);
splashScreen.addEventListener('touchend', enterMainPage);

let cursor = null;
function createCursor() {
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
    }
    cursor.style.opacity = 1;
}

function updateCursorPosition() {
    if (cursor) {
        cursor.style.left = mouse.x + 'px';
        cursor.style.top = mouse.y + 'px';
    }
}

window.addEventListener('mousemove', createCursor, { once: true });
window.addEventListener('touchmove', createCursor, { once: true });

heartText.addEventListener('dblclick', () => {
    window.location.href = 'https://discordapp.com/users/1265799421417754664';
});

heartText.addEventListener('touchend', (e) => {
    e.preventDefault();
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapHeart;
    if (tapLength < doubleTapDelay && tapLength > 0) {
        window.location.href = 'https://discordapp.com/users/1265799421417754664';
    }
    lastTapHeart = currentTime;
});

cocaineText.addEventListener('dblclick', () => {
    window.location.href = 'https://youtu.be/FMw_EXe18Qg?si=uXcD2Kykxww0JJGO';
});

cocaineText.addEventListener('touchend', (e) => {
    e.preventDefault();
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapCocaine;
    if (tapLength < doubleTapDelay && tapLength > 0) {
        window.location.href = 'https://youtu.be/FMw_EXe18Qg?si=uXcD2Kykxww0JJGO';
    }
    lastTapCocaine = currentTime;
});

faithText.addEventListener('click', () => {
    faithClickCount++;
    if (faithClickCount === 3) {
        noteInput.style.display = 'block';
        faithClickCount = 0;
    }
    setTimeout(() => { faithClickCount = 0; }, 1000);
});

sendNoteButton.addEventListener('click', () => {
    const note = noteTextarea.value.trim();
    if (note) sendNoteData(note);
    else alert('Please enter a note before sending.');
});

const titles = ["meow meow", "meow", ""];
let titleIndex = 0;
setInterval(() => {
    document.title = titles[titleIndex];
    titleIndex = (titleIndex + 1) % titles.length;
}, 300);

animate();
    }, 300);

    animate();
});
