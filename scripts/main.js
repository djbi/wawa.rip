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

    let particles = [];
    let squares = [];

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
