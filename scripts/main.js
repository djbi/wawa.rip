document.addEventListener('DOMContentLoaded', () => {
    console.log('main.js loaded');

    const canvas = document.getElementById('trailCanvas');
    const ctx = canvas.getContext('2d');
    if (!canvas || !ctx) {
        console.error('Canvas or context not found:', { canvas, ctx });
        return;
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    let mouse = { x: 0, y: 0 };
    let squares = [];
    let faithClickCount = 0;
    const faithText = document.getElementById('faithText');
    const cocaineText = document.getElementById('cocaineText');
    const heartText = document.querySelector('.heart-text');
    const noteInput = document.getElementById('noteInput');
    const noteTextarea = document.getElementById('noteTextarea');
    const sendNoteButton = document.getElementById('sendNote');

    if (!faithText || !cocaineText || !heartText || !noteInput || !noteTextarea || !sendNoteButton) {
        console.error('Main elements not found:', { faithText, cocaineText, heartText, noteInput, noteTextarea, sendNoteButton });
        return;
    }

    let lastTapHeart = 0;
    let lastTapCocaine = 0;
    const doubleTapDelay = 300;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const splashScreen = document.getElementById('splashScreen');
        if (splashScreen && splashScreen.style.display !== 'none') {
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
        console.log('Double-click on <3');
        window.location.href = 'https://discordapp.com/users/1265799421417754664';
    });

    heartText.addEventListener('touchend', (e) => {
        console.log('Touch on <3');
        e.preventDefault();
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTapHeart;
        if (tapLength < doubleTapDelay && tapLength > 0) {
            console.log('Double-tap on <3');
            window.location.href = 'https://discordapp.com/users/1265799421417754664';
        }
        lastTapHeart = currentTime;
    });

    cocaineText.addEventListener('dblclick', () => {
        console.log('Double-click on Cocaine Woman');
        window.location.href = 'https://youtu.be/FMw_EXe18Qg?si=uXcD2Kykxww0JJGO';
    });

    cocaineText.addEventListener('touchend', (e) => {
        console.log('Touch on Cocaine Woman');
        e.preventDefault();
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTapCocaine;
        if (tapLength < doubleTapDelay && tapLength > 0) {
            console.log('Double-tap on Cocaine Woman');
            window.location.href = 'https://youtu.be/FMw_EXe18Qg?si=uXcD2Kykxww0JJGO';
        }
        lastTapCocaine = currentTime;
    });

    faithText.addEventListener('click', () => {
        console.log('Click on Faith');
        faithClickCount++;
        if (faithClickCount === 3) {
            console.log('Triple-click on Faith, showing note input');
            noteInput.style.display = 'block';
            faithClickCount = 0;
        }
        setTimeout(() => { faithClickCount = 0; }, 1000);
    });

    sendNoteButton.addEventListener('click', () => {
        console.log('Send note clicked');
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
});
