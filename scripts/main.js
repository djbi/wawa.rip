// Declare isSplashScreen globally
let isSplashScreen = true;

document.addEventListener('DOMContentLoaded', () => {
    console.log('main.js loaded');

    const canvas = document.getElementById('trailCanvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    if (!canvas || !ctx) {
        console.error('Canvas or context not found:', { canvas, ctx });
        return;
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    let mouse = { x: null, y: null }; // Initialize as null
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

    // Create and initialize custom cursor immediately
    let cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
        console.log('Creating custom cursor');
        cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
    }
    cursor.classList.add('visible');
    cursor.style.display = 'block'; // Ensure display is set
    console.log('Custom cursor initialized:', cursor);

    function updateCursorPosition() {
        if (cursor && mouse.x !== null && mouse.y !== null) {
            cursor.style.left = mouse.x + 'px';
            cursor.style.top = mouse.y + 'px';
        } else {
            console.warn('Cursor or mouse position not available:', { cursor, mouse });
        }
    }

    // Variables for double-tap detection on mobile
    let lastTapHeart = 0;
    let lastTapCocaine = 0;
    const doubleTapDelay = 300; // 300ms window for double-tap

    // Initialize particles and squares
    function animate() {
        if (!ctx) {
            console.error('Cannot animate: Canvas context not available');
            return;
        }
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
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        if (mouse.x === null && mouse.y === null) {
            mouse.x = window.innerWidth / 2;
            mouse.y = window.innerHeight / 2;
        }
        updateCursorPosition();
    });

    window.addEventListener('mousemove', (e) => {
        console.log('Mouse move detected:', { x: e.x, y: e.y });
        mouse.x = e.x;
        mouse.y = e.y;
        for (let i = 0; i < 3; i++) {
            particles.push(new Particle(e.x, e.y));
        }
        console.log('Particles added:', particles.length);
        updateCursorPosition();
    });

    window.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Prevent scrolling
        console.log('Touch move detected:', e.touches[0]);
        const touch = e.touches[0];
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
        for (let i = 0; i < 3; i++) {
            particles.push(new Particle(touch.clientX, touch.clientY));
        }
        console.log('Particles added:', particles.length);
        updateCursorPosition();
    });

    // Initialize mouse position
    mouse.x = window.innerWidth / 2;
    mouse.y = window.innerHeight / 2;
    updateCursorPosition();

    // Ensure splash screen is clickable and displays main page
    function enterMainPage() {
        if (isSplashScreen) {
            console.log('enterMainPage called');
            isSplashScreen = false;
            const splashScreen = document.getElementById('splashScreen');
            const mainContainer = document.getElementById('mainContainer');
            if (splashScreen && mainContainer) {
                splashScreen.style.display = 'none';
                mainContainer.style.display = 'block'; // Ensure main page is shown
                visitCount++;
                localStorage.setItem('visitCount', visitCount);
                if (typeof sendVisitData === 'function') {
                    sendVisitData();
                }
            } else {
                console.error('Splash screen or main container not found during transition');
            }
        }
    }

    const splashScreen = document.getElementById('splashScreen');
    if (splashScreen) {
        splashScreen.addEventListener('click', enterMainPage);
        splashScreen.addEventListener('touchend', enterMainPage);
    }

    // Fallback: Automatically transition after 5 seconds if no interaction
    setTimeout(() => {
        if (isSplashScreen) {
            console.log('Fallback: Automatically transitioning after 5 seconds');
            enterMainPage();
        }
    }, 5000);

    // Double-click redirect for <3 (Desktop)
    heartText.addEventListener('dblclick', () => {
        window.location.href = 'https://discordapp.com/users/1265799421417754664';
    });

    // Double-tap redirect for <3 (Mobile)
    heartText.addEventListener('touchend', (e) => {
        e.preventDefault();
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTapHeart;
        if (tapLength < doubleTapDelay && tapLength > 0) {
            window.location.href = 'https://discordapp.com/users/1265799421417754664';
        }
        lastTapHeart = currentTime;
    });

    // Double-click redirect for "Cocaine Woman" (Desktop)
    cocaineText.addEventListener('dblclick', () => {
        window.location.href = 'https://youtu.be/FMw_EXe18Qg?si=uXcD2Kykxww0JJGO';
    });

    // Double-tap redirect for "Cocaine Woman" (Mobile)
    cocaineText.addEventListener('touchend', (e) => {
        e.preventDefault();
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTapCocaine;
        if (tapLength < doubleTapDelay && tapLength > 0) {
            window.location.href = 'https://youtu.be/FMw_EXe18Qg?si=uXcD2Kykxww0JJGO';
        }
        lastTapCocaine = currentTime;
    });

    // Triple-click "Faith" to show note input
    faithText.addEventListener('click', () => {
        faithClickCount++;
        if (faithClickCount === 3) {
            noteInput.style.display = 'block';
            faithClickCount = 0; // Reset after showing input
        }
        setTimeout(() => {
            faithClickCount = 0; // Reset after 1 second if not triple-clicked
        }, 1000);
    });

    // Send note to webhook
    sendNoteButton.addEventListener('click', () => {
        const note = noteTextarea.value.trim();
        if (note) {
            sendNoteData(note);
        } else {
            alert('Please enter a note before sending.');
        }
    });

    // Moving title effect with only two "meow"s
    const titles = ["meow meow", "meow", ""];
    let titleIndex = 0;
    function updateTitle() {
        console.log('Updating title to:', titles[titleIndex]);
        document.title = titles[titleIndex];
        titleIndex = (titleIndex + 1) % titles.length;
    }
    setInterval(updateTitle, 300); // Update every 300ms
    updateTitle(); // Initial call

    animate();
});
