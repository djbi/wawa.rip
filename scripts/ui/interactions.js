// General UI interactions
document.addEventListener('DOMContentLoaded', () => {
    console.log('interactions.js: Loaded at', new Date().toISOString());

    // Prevent right-click context menu
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // Prevent drag on images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });
});

console.log('interactions.js: UI interactions initialized');
