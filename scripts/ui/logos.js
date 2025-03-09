// Logo loading with stock images
document.addEventListener('DOMContentLoaded', () => {
    console.log('logos.js loaded at', new Date().toISOString());
    window.loadLogos = window.loadLogos || function() {
        const socialIcons = document.getElementById('socialIcons');
        if (!socialIcons) {
            console.error('socialIcons element not found');
            return;
        }
        console.log('Attempting to load social logos...');
        socialIcons.innerHTML = '';
        const logos = {
            'https://www.tiktok.com': './assets/images/tiktok.png',
            'https://open.spotify.com': './assets/images/spotify.png',
            'https://www.roblox.com': './assets/images/roblox.png',
            'https://github.com': './assets/images/github.png'
        };
        let loadedCount = 0;
        for (const [url, src] of Object.entries(logos)) {
            console.log(`Processing logo for ${url} with src: ${src}`);
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
            img.onerror = () => {
                console.error(`Failed to load image for ${url}: ${src}, using fallback`);
                img.src = `https://via.placeholder.com/50?text=${url.split('/')[2]}`;
            };
            img.onload = () => {
                loadedCount++;
                console.log(`Successfully loaded image for ${url}: ${src}`);
            };
            imgContainer.appendChild(img);
            link.appendChild(imgContainer);
            socialIcons.appendChild(link);
        }
        console.log(`Finished loading ${loadedCount} logos`);
    };

    // Trigger initial load
    window.loadLogos();
});
