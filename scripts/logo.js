// Initialize logos on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('logos.js loaded');

    // New logo sources from simpleicons.org (publicly accessible)
    const customLogos = {
        'https://www.tiktok.com/@faith.meows?_t=ZN-8uT1pCNKhvC&_r=1': {
            src: 'https://cdn.simpleicons.org/tiktok/000000',
            fallback: 'https://via.placeholder.com/50?text=TikTok'
        },
        'https://open.spotify.com/user/313x5v4poeytrommnmgiutn5wmpi': {
            src: 'https://cdn.simpleicons.org/spotify/000000',
            fallback: 'https://via.placeholder.com/50?text=Spotify'
        },
        'https://www.roblox.com/share?code=44cb54032142d34787f1f2ad3aff1033&type=Profile&source=ProfileShare&stamp=1741364262991': {
            src: 'https://cdn.simpleicons.org/roblox/000000',
            fallback: 'https://via.placeholder.com/50?text=Roblox'
        },
        'https://github.com/djbi': {
            src: 'https://cdn.simpleicons.org/github/000000',
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
            link.href = url; // Direct link for redirection
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

            // Single-click for desktop (simplified from double-click)
            link.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`Clicked social link: ${url}`);
                window.location.href = url;
            });

            // Single-tap for mobile (simplified from double-tap)
            link.addEventListener('touchend', (e) => {
                e.preventDefault();
                console.log(`Tapped social link: ${url}`);
                window.location.href = url;
            });
        }
    };
});
