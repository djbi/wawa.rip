// Debug logging
setTimeout(() => {
    const socialIcons = document.getElementById('socialIcons');
    if (socialIcons && socialIcons.children.length === 0) {
        console.warn('debug.js: No logos loaded. Check image paths and deployment.');
    } else {
        console.log('debug.js: Logos loaded successfully');
    }
}, 3000);
