// Initialize main logic on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('main.js loaded');

    // Initialize canvas for particles
    const canvas = document.getElementById('trailCanvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    if (!canvas || !ctx) {
        console.error('Canvas not found');
        return;
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize elements
    const faithText = document.getElementById('faithText');
    const cocaineText = document.getElementById('cocaineText');
    const heartText = document.querySelector('.heart-text');
    const noteInput = document.getElementById('noteInput');
    const noteTextarea = document.getElementById('noteTextarea');
    const sendNoteButton = document.getElementById('sendNote');

    if (!faithText || !cocaineText || !heartText || !noteInput || !noteTextarea || !sendNoteButton) {
        console.error('Main elements not found');
        return;
    }

    let particles = [];
    let squares = [];
    let faithClickCount = 0;

    // Animation loop for particles and squares
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
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw(ctx);
            if (particles[i].life <= 0) particles.splice(i, 1);
        }
        requestAnimationFrame(animate);
    }

    // Add particles on mouse move
    window.addEventListener('mousemove', (e) => {
        for (let i = 0; i < 3; i++) {
            particles.push(new Particle(e.clientX, e.clientY));
        }
    });

    // Add particles on touch move
    window.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        for (let i = 0; i < 3; i++) {
            particles.push(new Particle(touch.clientX, touch.clientY));
        }
    });

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Triple-click on Faith to show note input (Desktop)
    faithText.addEventListener('click', () => {
        faithClickCount++;
        console.log('Faith clicked, count:', faithClickCount);
        if (faithClickCount === 3) {
            noteInput.style.display = 'block';
            faithClickCount = 0;
        }
        setTimeout(() => {
            if (faithClickCount !== 0) {
                faithClickCount = 0;
                console.log('Faith click count reset');
            }
        }, 1000);
    });

    // Double-click on Cocaine Woman to redirect (Desktop)
    cocaineText.addEventListener('dblclick', () => {
        console.log('Double-clicked Cocaine Woman');
        window.location.href = 'https://youtu.be/FMw_EXe18Qg?si=uXcD2Kykxww0JJGO';
    });

    // Double-click on <3 to redirect (Desktop)
    heartText.addEventListener('dblclick', () => {
        console.log('Double-clicked heart');
        window.location.href = 'https://discordapp.com/users/1265799421417754664';
    });

    // Send note on desktop
    sendNoteButton.addEventListener('click', () => {
        const note = noteTextarea.value.trim();
        if (note) {
            if (typeof window.sendNoteData === 'function') {
                window.sendNoteData(note);
            } else {
                console.error('sendNoteData not found');
                alert('Failed to send note.');
            }
        } else {
            alert('Please enter a note.');
        }
    });

    // Title animation
    const titles = ["meow meow", "meow", ""];
    let titleIndex = 0;
    function updateTitle() {
        console.log('Updating title to:', titles[titleIndex]);
        document.title = titles[titleIndex];
        titleIndex = (titleIndex + 1) % titles.length;
    }
    setInterval(updateTitle, 300);
    updateTitle();

    // Start animation
    animate();
});
