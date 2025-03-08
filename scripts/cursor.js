// Initialize custom cursor on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('cursor.js loaded');

    const cursor = document.getElementById('customCursor');
    if (!cursor) {
        console.error('Custom cursor element not found');
        return;
    }

    // Initialize cursor position
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    // Update cursor position
    function updateCursorPosition(x, y) {
        mouse.x = x;
        mouse.y = y;
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
        cursor.style.display = 'block';
        cursor.style.opacity = '1';
        cursor.classList.add('visible');
    }

    // Desktop: Mouse movement
    window.addEventListener('mousemove', (e) => {
        console.log('Mouse move:', { x: e.clientX, y: e.clientY });
        updateCursorPosition(e.clientX, e.clientY);
    });

    // Mobile: Touch movement
    window.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        console.log('Touch start:', { x: touch.clientX, y: touch.clientY });
        updateCursorPosition(touch.clientX, touch.clientY);
    });

    window.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        console.log('Touch move:', { x: touch.clientX, y: touch.clientY });
        updateCursorPosition(touch.clientX, touch.clientY);
    });

    // Initial position
    updateCursorPosition(mouse.x, mouse.y);

    // Resize handler
    window.addEventListener('resize', () => {
        if (mouse.x === null || mouse.y === null) {
            mouse.x = window.innerWidth / 2;
            mouse.y = window.innerHeight / 2;
            updateCursorPosition(mouse.x, mouse.y);
        }
    });
});
