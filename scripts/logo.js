// Initialize logos on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('logos.js loaded at', new Date().toISOString());

    // Use reliable internet-hosted images with absolute URLs from cdnjs
    const customLogos = {
        'https://www.tiktok.com/@faith.meows?_t=ZN-8uT1pCNKhvC&_r=1': {
            src: 'https://cdnjs.cloudflare.com/ajax/libs/simple-icons/12.1.0/tiktok.svg',
            fallback: 'https://via.placeholder.com/50?text=TikTok'
        },
        'https://open.spotify.com/user/313x5v4poeytrommnmgiutn5wmpi': {
            src: 'https://cdnjs.cloudflare.com/ajax/libs/simple-icons/12.1.0/spotify.svg',
            fallback: 'https://via.placeholder.com/50?text=Spotify'
        },
        'https://www.roblox.com/share?code=44cb54032142d34787f1f2ad3aff1033&type=Profile&source=ProfileShare&stamp=1741364262991': {
            src: 'https://cdnjs.cloudflare.com/ajax/libs/simple-icons/12.1.0/roblox.svg',
            fallback: 'https://via.placeholder.com/50?text=Roblox'
        },
        'https://github.com/djbi': {
            src: 'https://cdnjs.cloudflare.com/ajax/libs/simple-icons/12.1.0/github.svg',
            fallback: 'https://via.placeholder.com/50?text=GitHub'
        }
    };

    window.loadLogos = function() {
        const socialIcons = document.getElementById('socialIcons');
        if (!socialIcons) {
            console.error('socialIcons element not found');
            return;
        }
        console.log('Attempting to load social logos...');
        socialIcons.innerHTML = ''; // Clear any existing content
        let loadedCount = 0;
        for (const [url, { src, fallback }] of Object.entries(customLogos)) {
            console.log(`Processing logo for ${url} with src: ${src}`);
            const link = document.createElement('a');
            link.href = url;
            link.className = 'social-link';
            const imgContainer = document.createElement('div');
            imgContainer.className = 'logo-container';
            const img = document.createElement('img');
            img.src = src; // Use absolute URL
            img.alt = url.split('/')[2];
            img.className = 'social-logo';
            img.style.maxWidth = '50px';
            img.style.maxHeight = '50px';
            img.style.display = 'block';
            img.onerror = () => {
                console.error(`Failed to load image for ${url}: ${src}, switching to fallback ${fallback}`);
                img.src = fallback;
                if (typeof window.debugImageLoad === 'function') {
                    window.debugImageLoad(url, 'error', fallback);
                }
            };
            img.onload = () => {
                loadedCount++;
                console.log(`Successfully loaded image for ${url}: ${src}`);
                console.log(`Total loaded images: ${loadedCount}`);
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
            } else {
                console.log(`Image for ${url} is already in cache: ${src}`);
            }
        }
        console.log(`Finished loading logos. Total elements in socialIcons: ${socialIcons.children.length}`);
    };

    // Force reload logos after a short delay to ensure DOM is ready
    setTimeout(() => {
        const mainContainer = document.getElementById('mainContainer');
        if (mainContainer && mainContainer.style.display === 'block') {
            console.log('Triggering logo load due to mainContainer visibility');
            window.loadLogos();
        } else {
            console.log('mainContainer not visible yet, delaying logo load');
            // Retry after another delay if mainContainer isn't visible yet
            setTimeout(() => {
                if (mainContainer && mainContainer.style.display === 'block') {
                    console.log('Retry: Triggering logo load due to mainContainer visibility');
                    window.loadLogos();
                } else {
                    console.error('mainContainer still not visible after retry');
                }
            }, 2000);
        }
    }, 500);
});
