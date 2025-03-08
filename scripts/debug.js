// Debugging utilities
document.addEventListener('DOMContentLoaded', () => {
    console.log('debug.js loaded');

    window.debugImageLoad = function(url, status, source) {
        console.log(`Debug - Image for ${url}: ${status}, Source: ${source}`);
        const socialIcons = document.getElementById('socialIcons');
        if (status === 'error' && socialIcons) {
            const errorDiv = document.createElement('div');
            errorDiv.textContent = `Failed to load ${url.split('/')[2]} - Check console for details`;
            errorDiv.style.color = '#ff0000';
            errorDiv.style.fontSize = '12px';
            socialIcons.appendChild(errorDiv);
            alert(`Failed to load image for ${url.split('/')[2]}. Using fallback. Please check the console for more details.`);
        } else if (status === 'success') {
            console.log(`Successfully loaded image for ${url}: ${source}`);
        }
    };

    // Verify logo loading after a delay
    setTimeout(() => {
        const socialIcons = document.getElementById('socialIcons');
        if (socialIcons && socialIcons.children.length === 0) {
            console.error('No logos loaded. Check image paths and deployment.');
            const warning = document.createElement('div');
            warning.textContent = 'Error: Logos failed to load. Check console for details.';
            warning.style.color = '#ff69b4';
            warning.style.fontSize = '16px';
            socialIcons.appendChild(warning);
            alert('Logos failed to load. Please check the console for error messages.');
        } else {
            console.log(`Loaded ${socialIcons.children.length} logos.`);
        }
    }, 3000); // Check after 3 seconds to allow loading
});
