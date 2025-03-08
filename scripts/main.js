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
    const cursor = document.getElementById('customCursor');

    if (!faithText || !cocaineText || !heartText || !noteInput || !noteTextarea || !sendNoteButton || !cursor) {
        console.error('Main elements not found:', { faithText, cocaineText, heartText, noteInput, noteTextarea, sendNoteButton, cursor });
        return;
    }

    // Initialize custom cursor
    cursor.classList.add('visible');
    cursor.style.display = 'block'; // Ensure display is set
    console.log('Custom cursor initialized:', cursor);

    function updateCursorPosition(x, y) {
        if (cursor && x !== null && y !== null) {
            cursor.style.left = x + 'px';
            cursor.style.top = y + 'px';
            cursor.style.display = 'block'; // Ensure it’s visible
            cursor.style.opacity = '1'; // Ensure opacity is set
        } else {
            console.warn('Cursor or position not available:', { cursor, x, y });
        }
    }

    // Variables for double-tap and triple-tap detection
    let lastTapHeart = 0;
    let lastTapCocaine = 0;
    let lastTapFaith = 0;
    const doubleTapDelay = 300; // 300ms window for double-tap
    const tripleTapDelay = 300; // 300ms window for triple-tap

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
            updateCursorPosition(mouse.x, mouse.y);
        }
    });

    window.addEventListener('mousemove', (e) => {
        console.log('Mouse move detected:', { x: e.clientX, y: e.clientY });
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        for (let i = 0; i < 3; i++) {
            particles.push(new Particle(e.clientX, e.clientY));
        }
        updateCursorPosition(e.clientX, e.clientY);
    });

    window.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Prevent scrolling
        const touch = e.touches[0];
        console.log('Touch move detected:', { x: touch.clientX, y: touch.clientY });
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
        for (let i = 0; i < 3; i++) {
            particles.push(new Particle(touch.clientX, touch.clientY));
        }
        updateCursorPosition(touch.clientX, touch.clientY);
    });

    window.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
        updateCursorPosition(touch.clientX, touch.clientY);
    });

    // Initialize mouse position
    mouse.x = window.innerWidth / 2;
    mouse.y = window.innerHeight / 2;
    updateCursorPosition(mouse.x, mouse.y);

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
                // Delay logo loading to ensure main container is fully rendered
                setTimeout(() => {
                    if (typeof window.loadLogos === 'function') {
                        console.log('Loading logos after transition');
                        window.loadLogos();
                    }
                }, 100); // 100ms delay
            } else {
                console.error('Splash screen or main container not found during transition');
            }
        }
    }

    const splashScreen = document.getElementById('splashScreen');
    if (splashScreen) {
        splashScreen.addEventListener('click', enterMainPage);
        splashScreen.addEventListener('touchstart', enterMainPage); // Use touchstart for better mobile responsiveness
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

    // Triple-click "Faith" to show note input (Desktop)
    faithText.addEventListener('click', () => {
        faithClickCount++;
        console.log('Faith clicked, count:', faithClickCount);
        if (faithClickCount === 3) {
            noteInput.style.display = 'block';
            faithClickCount = 0; // Reset after showing input
        }
        setTimeout(() => {
            if (faithClickCount !== 0) {
                faithClickCount = 0; // Reset after 1 second if not triple-clicked
                console.log('Faith click count reset');
            }
        }, 1000);
    });

    // Triple-tap "Faith" to show note input (Mobile)
    faithText.addEventListener('touchend', (e) => {
        e.preventDefault();
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTapFaith;
        console.log('Faith tapped, tapLength:', tapLength, 'count:', faithClickCount + 1);
        if (tapLength < tripleTapDelay && tapLength > 0) {
            faithClickCount++;
            if (faithClickCount === 3) {
                noteInput.style.display = 'block';
                faithClickCount = 0; // Reset after showing input
                console.log('Note input shown on mobile');
            }
        } else {
            faithClickCount = 1; // Reset if taps are too far apart
        }
        lastTapFaith = currentTime;
        setTimeout(() => {
            if (faithClickCount !== 0) {
                faithClickCount = 0; // Reset after 1 second if not triple-tapped
                console.log('Faith tap count reset');
            }
        }, 1000);
    });

    // Send note to webhook (Desktop)
    sendNoteButton.addEventListener('click', () => {
        const note = noteTextarea.value.trim();
        if (note) {
            if (typeof window.sendNoteData === 'function') {
                window.sendNoteData(note);
            } else {
                console.error('sendNoteData function not found');
                alert('Failed to send note. Please try again.');
            }
        } else {
            alert('Please enter a note before sending.');
        }
    });

    // Send note to webhook (Mobile)
    sendNoteButton.addEventListener('touchend', (e) => {
        e.preventDefault();
        const note = noteTextarea.value.trim();
        if (note) {
            if (typeof window.sendNoteData === 'function') {
                window.sendNoteData(note);
            } else {
                console.error('sendNoteData function not found');
                alert('Failed to send note. Please try again.');
            }
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
    updateTitle(); // Initial call to ensure it starts
    setTimeout(() => {
        if (document.title === 'meow meow') {
            console.warn('Title animation stuck, restarting');
            updateTitle();
        }
    }, 1000); // Check after 1 second

    animate();
});
