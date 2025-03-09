// Custom mouse cursor
const cursor = document.getElementById('customCursor');

// Ensure cursor element exists
if (!cursor) {
    console.error('cursor.js: customCursor element not found');
} else {
    // Style the cursor
    cursor.style.position = 'fixed';
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.background = `url('./assets/images/cursor.png') no-repeat center`;
    cursor.style.backgroundSize = 'contain';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '10000';
    cursor.style.animation = 'cursorPulse 1s infinite';

    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX - 10}px`; // Center the cursor
        cursor.style.top = `${e.clientY - 10}px`;
    });

    // Hide default cursor
    document.body.style.cursor = 'none';
}

console.log('cursor.js: Custom cursor initialized');
