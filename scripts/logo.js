// Initialize logos on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('logos.js loaded');

    // Use alternative image sources (publicly accessible)
    const customLogos = {
        'https://www.tiktok.com/@faith.meows?_t=ZN-8uT1pCNKhvC&_r=1': {
            src: 'https://img.icons8.com/color/48/000000/tiktok.png',
            fallback: 'https://via.placeholder.com/50?text=TikTok'
        },
        'https://open.spotify.com/user/313x5v4poeytrommnmgiutn5wmpi': {
            src: 'https://img.icons8.com/color/48/000000/spotify.png',
            fallback: 'https://via.placeholder.com/50?text=Spotify'
        },
        'https://www.roblox.com/share?code=44cb54032142d34787f1f2ad3aff1033&type=Profile&source=ProfileShare&stamp=1741364262991': {
            src: 'https://img.icons8.com/color/48/000000/roblox.png',
            fallback: 'https://via.placeholder.com/50?text=Roblox'
        },
        'https://github.com/djbi': {
            src: 'https://img.icons8.com/color/48/000000/github.png',
            fallback: 'https://via.placeholder.com/50?text=GitHub'
        }
    };

    const doubleTapDelay = 300;
    let lastTapTimes = {};

    // Load social icons
    window.loadLogos = function() {
        const socialIcons = document.getElementById('socialIcons');
        if (!socialIcons) {
            console.error('socialIcons element not found');
            return;
        }
        console.log('Loading social logos...');
        socialIcons.innerHTML = '';
        for (const [url, { src, fallback }] of Object.entries(customLogos)) {
            const link = document.createElement('a');
            link.href = '#';
            link.className = 'social-link';
            const img = document.createElement('img');
            img.src = src;
            img.alt = url.split('/')[2];
            img.className = 'social-logo';
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            img.onerror = () => {
                console.error(`Failed to load image for ${url}: ${src}, using fallback`);
                img.src = fallback;
            };
            img.onload = () => console.log(`Loaded image for ${url}: ${src}`);
            link.appendChild(img);
            socialIcons.appendChild(link);

            // Double-click for desktop
            link.addEventListener('dblclick', (e) => {
                e.preventDefault();
                console.log(`Double-clicked social link: ${url}`);
                window.location.href = url;
            });

            // Double-tap for mobile
            link.addEventListener('touchend', (e) => {
                e.preventDefault();
                const currentTime = new Date().getTime();
                const linkId = url;
                lastTapTimes[linkId] = lastTapTimes[linkId] || 0;
                const tapLength = currentTime - lastTapTimes[linkId];
                if (tapLength < doubleTapDelay && tapLength > 0) {
                    console.log(`Double-tapped social link: ${url}`);
                    window.location.href = url;
                }
                lastTapTimes[linkId] = currentTime;
            });
        }
    };
});
