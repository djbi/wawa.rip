document.addEventListener('DOMContentLoaded', () => {
    console.log('logos.js loaded');

    // Custom logo mapping system with GitHub added
    const customLogos = {
        'https://www.tiktok.com/@faith.meows?_t=ZN-8uT1pCNKhvC&_r=1': 'https://cdn-icons-png.flaticon.com/512/5968/5968819.png',
        'https://open.spotify.com/user/313x5v4poeytrommnmgiutn5wmpi': 'https://cdn-icons-png.flaticon.com/512/174/174872.png',
        'https://www.roblox.com/share?code=44cb54032142d34787f1f2ad3aff1033&type=Profile&source=ProfileShare&stamp=1741364262991': 'https://cdn-icons-png.flaticon.com/512/10101/10101303.png',
        'https://github.com/djbi': 'https://cdn-icons-png.flaticon.com/512/25/25231.png' // GitHub logo
    };

    // Variables for double-tap detection on mobile
    const doubleTapDelay = 300; // 300ms window for double-tap
    let lastTapTimes = {};

    // Function to populate social icons with double-click/tap redirects
    window.loadLogos = function() { // Make loadLogos globally accessible
        const socialIcons = document.getElementById('socialIcons');
        if (!socialIcons) {
            console.error('socialIcons element not found');
            return;
        }
        console.log('Loading social logos...');
        socialIcons.innerHTML = ''; // Clear any existing content
        for (const [url, imageSrc] of Object.entries(customLogos)) {
            const link = document.createElement('a');
            link.href = '#'; // Prevent default link behavior
            link.className = 'social-link';
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = url.split('/')[2]; // Simplified alt text
            img.className = 'social-logo';
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            // Add error handling for image loading
            img.onerror = () => console.error(`Failed to load image for ${url}: ${imageSrc}`);
            img.onload = () => console.log(`Loaded image for ${url}: ${imageSrc}`);
            link.appendChild(img);
            socialIcons.appendChild(link);

            // Double-click redirect for desktop
            link.addEventListener('dblclick', (e) => {
                e.preventDefault(); // Prevents default cursor behavior
                window.location.href = url;
            });

            // Double-tap redirect for mobile
            link.addEventListener('touchend', (e) => {
                e.preventDefault(); // Prevents default cursor behavior
                const currentTime = new Date().getTime();
                const linkId = url; // Use URL as unique identifier
                lastTapTimes[linkId] = lastTapTimes[linkId] || 0;
                const tapLength = currentTime - lastTapTimes[linkId];
                if (tapLength < doubleTapDelay && tapLength > 0) {
                    window.location.href = url;
                }
                lastTapTimes[linkId] = currentTime;
            });
        }
    };

    // Initial attempt to load logos (may not work if main container is hidden)
    if (document.getElementById('mainContainer').style.display === 'block') {
        loadLogos();
    }
});
