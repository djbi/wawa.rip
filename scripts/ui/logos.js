// Load social logos with redirect links
document.addEventListener('DOMContentLoaded', () => {
    console.log('logos.js: Loaded at', new Date().toISOString());

    // Define logo data with redirect URLs
    const logos = {
        'https://www.tiktok.com/@faith.meows?_t=ZN-8uT1pCNKhvC&_r=1': './assets/images/tiktok.png',
        'https://open.spotify.com/user/313x5v4poeytrommnmgiutn5wmpi': './assets/images/spotify.png',
        'https://www.roblox.com/share?code=44cb54032142d34787f1f2ad3aff1033&type=Profile&source=ProfileShare&stamp=1741364262991': './assets/images/roblox.png',
        'https://github.com/djbi': './assets/images/github.png'
    };

    // Function to load logos
    window.loadLogos = function() {
        const socialIcons = document.getElementById('socialIcons');
        if (!socialIcons) {
            console.error('logos.js: socialIcons element not found');
            return;
        }
        console.log('logos.js: Attempting to load social logos...');
        socialIcons.innerHTML = '';
        let loadedCount = 0;

        // Iterate over logos and create elements
        for (const [url, src] of Object.entries(logos)) {
            console.log(`logos.js: Processing logo for ${url} with src: ${src}`);
            const link = document.createElement('a');
            link.href = url;
            link.className = 'social-link';
            const imgContainer = document.createElement('div');
            imgContainer.className = 'logo-container';
            const img = document.createElement('img');
            img.src = src;
            img.alt = url.split('/')[2];
            img.className = 'social-logo';
            img.style.maxWidth = '50px';
            img.style.maxHeight = '50px';

            // Handle load errors
            img.onerror = () => {
                console.error(`logos.js: Failed to load image for ${url}: ${src}, using fallback`);
                img.src = `https://via.placeholder.com/50?text=${url.split('/')[2]}`;
            };

            // Log successful loads
            img.onload = () => {
                loadedCount++;
                console.log(`logos.js: Successfully loaded image for ${url}: ${src}`);
            };

            imgContainer.appendChild(img);
            link.appendChild(imgContainer);
            socialIcons.appendChild(link);
        }

        console.log(`logos.js: Finished loading ${loadedCount} logos`);
    };

    // Trigger initial load
    window.loadLogos();
});
