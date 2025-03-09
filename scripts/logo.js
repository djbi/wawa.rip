// Initialize logos on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('logos.js loaded');

    // Use reliable internet-hosted images
    const customLogos = {
        'https://www.tiktok.com/@faith.meows?_t=ZN-8uT1pCNKhvC&_r=1': {
            src: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/TikTok_logo.svg', // TikTok logo from Wikimedia
            fallback: 'https://via.placeholder.com/50?text=TikTok'
        },
        'https://open.spotify.com/user/313x5v4poeytrommnmgiutn5wmpi': {
            src: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg', // Spotify logo from Wikimedia
            fallback: 'https://via.placeholder.com/50?text=Spotify'
        },
        'https://www.roblox.com/share?code=44cb54032142d34787f1f2ad3aff1033&type=Profile&source=ProfileShare&stamp=1741364262991': {
            src: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Roblox_icon_logo.svg', // Roblox logo from Wikimedia
            fallback: 'https://via.placeholder.com/50?text=Roblox'
        },
        'https://github.com/djbi': {
            src: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg', // GitHub logo from Wikimedia
            fallback: 'https://via.placeholder.com/50?text=GitHub'
        }
    };

    window.loadLogos = function() {
        const socialIcons = document.getElementById('socialIcons');
        if (!socialIcons) {
            console.error('socialIcons element not found');
            return;
        }
        console.log('Loading social logos...');
        socialIcons.innerHTML = ''; // Clear any existing content
        for (const [url, { src, fallback }] of Object.entries(customLogos)) {
            const link = document.createElement('a');
            link.href = url;
            link.className = 'social-link';
            const imgContainer = document.createElement('div');
            imgContainer.className = 'logo-container';
            const img = document.createElement('img');
            img.src = src;
            img.alt = url.split('/')[2];
            img.className = 'social-logo';
            img.style.maxWidth = '50px'; // Fixed size for consistency
            img.style.maxHeight = '50px';
            img.style.display = 'block'; // Ensure visibility
            img.onerror = () => {
                console.error(`Failed to load image for ${url}: ${src}, using fallback`);
                img.src = fallback;
                if (typeof window.debugImageLoad === 'function') {
                    window.debugImageLoad(url, 'error', fallback);
                }
            };
            img.onload = () => {
                console.log(`Successfully loaded image for ${url}: ${src}`);
                if (typeof window.debugImageLoad === 'function') {
                    window.debugImageLoad(url, 'success', src);
                }
            };
            imgContainer.appendChild(img);
            link.appendChild(imgContainer);
            socialIcons.appendChild(link);

            // Add placeholder while loading
            if (!img.complete) {
                const placeholder = document.createElement('span');
                placeholder.textContent = `Loading ${img.alt}...`;
                placeholder.style.color = '#ff69b4';
                imgContainer.appendChild(placeholder);
            }
        }
    };

    // Force reload logos after a short delay to ensure DOM is ready
    setTimeout(() => {
        if (document.getElementById('mainContainer').style.display === 'block') {
            window.loadLogos();
        }
    }, 500);
});
