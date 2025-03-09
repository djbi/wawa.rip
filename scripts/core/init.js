// Initialize the page and ensure everything loads correctly
document.addEventListener('DOMContentLoaded', () => {
    console.log('init.js: Page initialization started at', new Date().toISOString());
    // Ensure all elements are present
    const requiredElements = ['splashScreen', 'visitCounter', 'mainContainer', 'socialIcons', 'faithText', 'cocaineText', 'trailCanvas', 'customCursor', 'noteInput'];
    requiredElements.forEach(id => {
        if (!document.getElementById(id)) {
            console.error(`init.js: Element ${id} not found`);
        }
    });
    console.log('init.js: Page initialization completed');
});
